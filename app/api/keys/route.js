import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Export the apiKeys array so it can be shared between route handlers
export const apiKeys = [];

export async function GET() {
  return NextResponse.json({ keys: apiKeys });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { message: 'Name is required' },
        { status: 400 }
      );
    }

    const newKey = {
      id: uuidv4(),
      name,
      key: `sk_${uuidv4().replace(/-/g, '')}`,
      createdAt: new Date().toISOString(),
    };

    apiKeys.push(newKey);

    return NextResponse.json(newKey);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create API key' },
      { status: 500 }
    );
  }
}
