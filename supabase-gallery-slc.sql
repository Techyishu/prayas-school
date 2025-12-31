-- Gallery and SLC Schema Setup
-- Run this in your Supabase SQL Editor

-- 1. Gallery Images Table
CREATE TABLE IF NOT EXISTS gallery_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. SLC (School Leaving Certificate) Table
CREATE TABLE IF NOT EXISTS slc (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_name TEXT NOT NULL,
    father_name TEXT NOT NULL,
    mother_name TEXT NOT NULL,
    date_of_birth TEXT NOT NULL,
    admission_date TEXT NOT NULL,
    leaving_date TEXT NOT NULL,
    class_or_standard TEXT NOT NULL,
    roll_number TEXT NOT NULL,
    academic_year TEXT NOT NULL,
    reason_for_leaving TEXT NOT NULL,
    promotion_class TEXT,
    conduct TEXT NOT NULL,
    remarks TEXT,
    identification_marks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create 'gallery' Storage Bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE slc ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Gallery
CREATE POLICY "Public can view gallery images" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage gallery images" ON gallery_images FOR ALL USING (auth.role() = 'authenticated');

-- RLS Policies for SLC
CREATE POLICY "Authenticated users can manage slc" ON slc FOR ALL USING (auth.role() = 'authenticated');
-- SLC might need public read for verifying certificates? Assuming public shouldn't see full details unless there is a specific public page.
-- If there is a public SLC verification page, we might need a policy for that. For now, limiting to authenticated.

-- Storage Policies for Gallery Bucket
CREATE POLICY "Public can view gallery files" ON storage.objects FOR SELECT USING (bucket_id = 'gallery');
CREATE POLICY "Authenticated users can upload gallery files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete gallery files" ON storage.objects FOR DELETE USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');
