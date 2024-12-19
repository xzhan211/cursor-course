import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { analyzeReadme } from '@/lib/chain';

const DEMO_API_KEY = 'demo-api-key';
const DEMO_REQUESTS_LIMIT = 3; // Allow 3 demo requests per minute
const demoRequestsCount = new Map();

export async function POST(request) {
  try {
    const body = await request.json();
    const { githubUrl } = body;
    const apiKey = request.headers.get('x-api-key');
    let keyData = null; // Declare keyData at the top level of the function
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    if (!githubUrl) {
      return NextResponse.json(
        { error: 'GitHub URL is required' },
        { status: 400 }
      );
    }

    // Handle demo API key differently
    if (apiKey === DEMO_API_KEY) {
      // Rate limiting for demo key
      const now = Date.now();
      const minute = Math.floor(now / 60000);
      const count = demoRequestsCount.get(minute) || 0;
      
      if (count >= DEMO_REQUESTS_LIMIT) {
        return NextResponse.json(
          { error: 'Demo rate limit exceeded. Please try again in a minute or sign up for an API key.' },
          { status: 429 }
        );
      }
      
      demoRequestsCount.set(minute, count + 1);
      
      // Clean up old entries
      for (const key of demoRequestsCount.keys()) {
        if (key < minute) {
          demoRequestsCount.delete(key);
        }
      }
    } else {
      // Regular API key validation
      const { data, error: keyError } = await supabase
        .from('api_keys')
        .select('*')
        .eq('key', apiKey)
        .single();

      if (keyError || !data) {
        return NextResponse.json(
          { error: 'Invalid API key' },
          { status: 401 }
        );
      }

      if (!data.is_active) {
        return NextResponse.json(
          { error: 'API key is inactive' },
          { status: 401 }
        );
      }

      keyData = data; // Store the key data
    }

    async function fetchGitHubReadme(githubUrl) {
      // Extract owner and repo from GitHub URL
      const urlParts = githubUrl.replace('https://github.com/', '').split('/');
      const [owner, repo] = urlParts;

      // Fetch the README content from GitHub API
      const readmeUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
      const response = await fetch(readmeUrl);
      
      if (!response.ok) {
        throw new Error('Failed to fetch README from GitHub');
      }

      const readmeData = await response.json();
      
      // README content is base64 encoded, so decode it
      return Buffer.from(readmeData.content, 'base64').toString('utf8');
    }

    const readmeContent = await fetchGitHubReadme(githubUrl);
    const analysis = await analyzeReadme(readmeContent);

    return NextResponse.json({
      message: 'GitHub repository analyzed successfully',
      url: githubUrl,
      keyId: apiKey === DEMO_API_KEY ? 'demo' : keyData?.id,
      analysis
    });

  } catch (error) {
    console.error('Error in GitHub summarizer:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
} 

