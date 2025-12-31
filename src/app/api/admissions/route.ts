import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { parent_name, phone, email, student_name, grade, message } = body;

        // Validate required fields
        if (!parent_name || !phone || !student_name || !grade) {
            return NextResponse.json(
                { error: 'Parent name, phone, student name, and grade are required' },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        // Insert into admission_submissions table
        const { data, error } = await supabase
            .from('admission_submissions')
            .insert([
                {
                    parent_name,
                    phone,
                    email,
                    student_name,
                    grade,
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
        console.error('Error processing admission form:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
