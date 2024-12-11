import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function DELETE(request, { params }) {
  try {
    const { keyId } = await params;
    
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('key', keyId);

    if (error) throw error;

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
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { message: 'Name is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('api_keys')
      .update({ 
        name,
        updated_at: new Date().toISOString()
      })
      .eq('id', keyId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { message: 'Failed to update API key' },
      { status: 500 }
    );
  }
} 