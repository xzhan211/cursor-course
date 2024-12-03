import { NextResponse } from 'next/server';
import { apiKeysStore } from '../route';

export async function DELETE(request, { params }) {
  try {
    const { keyId } = await params;
    
    if (!apiKeysStore.has(keyId)) {
      return NextResponse.json(
        { message: 'API key not found' },
        { status: 404 }
      );
    }

    // Delete the key from the Map
    apiKeysStore.delete(keyId);
    return NextResponse.json({ message: 'API key deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { message: 'Failed to delete API key' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { keyId } = await params;
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { message: 'Name is required' },
        { status: 400 }
      );
    }

    if (!apiKeysStore.has(keyId)) {
      return NextResponse.json(
        { message: 'API key not found' },
        { status: 404 }
      );
    }

    const existingKey = apiKeysStore.get(keyId);
    const updatedKey = {
      ...existingKey,
      name,
      updatedAt: new Date().toISOString()
    };

    // Update the key in the Map
    apiKeysStore.set(keyId, updatedKey);

    return NextResponse.json(updatedKey);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { message: 'Failed to update API key' },
      { status: 500 }
    );
  }
} 