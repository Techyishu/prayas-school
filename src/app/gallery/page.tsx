import { createClient } from '@/lib/supabase-server';
import GalleryClient from './gallery-client';

export const revalidate = 60;

export default async function GalleryPage() {
    let galleryImages = [];

    try {
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            const supabase = await createClient();
            const { data } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: false });
            if (data) galleryImages = data;
        } else {
            console.warn("Supabase credentials missing. Showing placeholder gallery.");
            // Optional: Provide mock data here if desired, or just leave as empty/static
        }
    } catch (error) {
        console.error("Failed to fetch gallery images:", error);
    }

    return <GalleryClient galleryImages={galleryImages || []} />;
}
