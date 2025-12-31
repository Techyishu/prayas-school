-- Prayas School Database Schema
-- Run this in your Supabase SQL Editor to create all necessary tables

-- 1. Contact Submissions Table (already exists, but here for reference)
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    visa_type TEXT,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Admission Submissions Table
CREATE TABLE IF NOT EXISTS admission_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    parent_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    student_name TEXT NOT NULL,
    grade TEXT NOT NULL,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Toppers Table
CREATE TABLE IF NOT EXISTS toppers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    class_grade TEXT NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    year TEXT NOT NULL,
    rank INTEGER NOT NULL,
    image_url TEXT,
    achievement TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Faculty Table
CREATE TABLE IF NOT EXISTS faculty (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    subject TEXT NOT NULL,
    experience TEXT NOT NULL,
    image_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Storage Buckets (run these separately if needed)
-- For toppers images
INSERT INTO storage.buckets (id, name, public)
VALUES ('toppers', 'toppers', true)
ON CONFLICT (id) DO NOTHING;

-- For faculty images
INSERT INTO storage.buckets (id, name, public)
VALUES ('faculty', 'faculty', true)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admission_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE toppers ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;

-- Policies for public read access
CREATE POLICY "Public can view toppers" ON toppers FOR SELECT USING (true);
CREATE POLICY "Public can view faculty" ON faculty FOR SELECT USING (true);

-- Policies for authenticated users (admin) to manage
CREATE POLICY "Authenticated users can insert contact submissions" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can insert admission submissions" ON admission_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can manage toppers" ON toppers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage faculty" ON faculty FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can view contact submissions" ON contact_submissions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can view admission submissions" ON admission_submissions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete contact submissions" ON contact_submissions FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete admission submissions" ON admission_submissions FOR DELETE USING (auth.role() = 'authenticated');

-- Storage policies
CREATE POLICY "Public can view topper images" ON storage.objects FOR SELECT USING (bucket_id = 'toppers');
CREATE POLICY "Authenticated users can upload topper images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'toppers' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete topper images" ON storage.objects FOR DELETE USING (bucket_id = 'toppers' AND auth.role() = 'authenticated');

CREATE POLICY "Public can view faculty images" ON storage.objects FOR SELECT USING (bucket_id = 'faculty');
CREATE POLICY "Authenticated users can upload faculty images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'faculty' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete faculty images" ON storage.objects FOR DELETE USING (bucket_id = 'faculty' AND auth.role() = 'authenticated');
