import { createClient } from '@/lib/supabase-server';
import GalleryClient from './gallery-client';

export const revalidate = 60;

export default async function GalleryPage() {
    const supabase = await createClient();
    const { data: galleryImages } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: false });

    return <GalleryClient galleryImages={galleryImages || []} />;
}
