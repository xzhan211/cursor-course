import { NextResponse } from 'next/server';
import { apiKeys } from '../route';

export async function DELETE(request, { params }) {
  try {
    const { keyId } = await params;
    
    const keyIndex = apiKeys.findIndex(key => key.id === keyId);
    if (keyIndex === -1) {
      return NextResponse.json(
        { message: 'API key not found' },
        { status: 404 }
      );
    }

    apiKeys.splice(keyIndex, 1);
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

    const keyIndex = apiKeys.findIndex(key => key.id === keyId);
    if (keyIndex === -1) {
      return NextResponse.json(
        { message: 'API key not found' },
        { status: 404 }
      );
    }

    apiKeys[keyIndex] = {
      ...apiKeys[keyIndex],
      name,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(apiKeys[keyIndex]);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { message: 'Failed to update API key' },
      { status: 500 }
    );
  }
} 