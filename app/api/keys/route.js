import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Create a Map to store API keys with better state management
const apiKeysStore = new Map();

export async function GET() {
  // Convert Map values to array for response
  const keys = Array.from(apiKeysStore.values());
  return NextResponse.json({ keys });
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

    // Store the new key in our Map
    apiKeysStore.set(newKey.id, newKey);

    return NextResponse.json(newKey);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create API key' },
      { status: 500 }
    );
  }
}

// Export the store for other route handlers
export { apiKeysStore };
