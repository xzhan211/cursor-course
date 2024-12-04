import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: keys, error } = await supabase
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ keys });
  } catch (error) {
    console.error('Error fetching keys:', error);
    return NextResponse.json(
      { message: 'Failed to fetch API keys' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, monthlyLimit } = body;

    if (!name) {
      return NextResponse.json(
        { message: 'Name is required' },
        { status: 400 }
      );
    }

    const newKey = {
      name,
      key: `sk_${uuidv4().replace(/-/g, '')}`,
      monthly_limit: monthlyLimit || 1000,
      usage: 0,
    };

    const { data, error } = await supabase
      .from('api_keys')
      .insert([newKey])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating key:', error);
    return NextResponse.json(
      { message: 'Failed to create API key' },
      { status: 500 }
    );
  }
}
