import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { apiKey } = body;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key', apiKey)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'API key not found in database' },
        { status: 401 }
      );
    }

    if (!data.is_active) {
      return NextResponse.json(
        { error: 'API key is inactive' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: 'Valid API key', keyId: data.id },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 