
import { createClient } from '@/lib/supabase-server';
import UploadGalleryImage from './upload-gallery-image';
import GalleryImageList from './gallery-image-list';

export const revalidate = 0;

export default async function GalleryPage() {
    const supabase = await createClient();
    const { data: galleryImages } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Manage Gallery</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upload Section */}
                <div className="lg:col-span-1">
                    <div className="bg-navy-900/50 border border-navy-700 rounded-2xl p-6 sticky top-24 backdrop-blur-sm">
                        <h2 className="text-lg font-semibold text-white mb-4">Upload Gallery Image</h2>
                        <UploadGalleryImage />
                    </div>
                </div>

                {/* Images List Section */}
                <div className="lg:col-span-2">
                    <GalleryImageList initialImages={galleryImages || []} />
                </div>
            </div>
        </div>
    );
}

