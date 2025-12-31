import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, visa_type, message } = body;

        // Validate required fields
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and email are required' },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        // Insert into contact_submissions table
        const { data, error } = await supabase
            .from('contact_submissions')
            .insert([
                {
                    name,
                    email,
                    phone,
                    visa_type,
                    message,
                    created_at: new Date().toISOString(),
                }
            ])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to save submission' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, data },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error processing contact form:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
