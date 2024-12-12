import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { analyzeReadme } from '@/lib/chain';

export async function POST(request) {
  try {
    // First validate the API key
    const body = await request.json();
    const { githubUrl } = body;
    const apiKey = request.headers.get('x-api-key');
    
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

    // Validate API key against database
    const { data: keyData, error: keyError } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key', apiKey)
      .single();

    if (keyError || !keyData) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      );
    }

    if (!keyData.is_active) {
      return NextResponse.json(
        { error: 'API key is inactive' },
        { status: 401 }
      );
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
      keyId: keyData.id,
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

