-- SLC Schema Update
-- Replaces previous SLC schema with simplified version for file uploads

-- Drop existing table if it exists (recreating for new schema)
DROP TABLE IF EXISTS slc;

-- 1. Create SLC Table
CREATE TABLE IF NOT EXISTS slc (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    admission_no TEXT NOT NULL,
    student_name TEXT NOT NULL,
    academic_year TEXT NOT NULL,
    slc_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create 'slc_documents' Storage Bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('slc_documents', 'slc_documents', true)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE slc ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public can view slc" ON slc FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage slc" ON slc FOR ALL USING (auth.role() = 'authenticated');

-- Storage Policies
CREATE POLICY "Public can view slc documents" ON storage.objects FOR SELECT USING (bucket_id = 'slc_documents');
CREATE POLICY "Authenticated users can upload slc documents" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'slc_documents' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete slc documents" ON storage.objects FOR DELETE USING (bucket_id = 'slc_documents' AND auth.role() = 'authenticated');
