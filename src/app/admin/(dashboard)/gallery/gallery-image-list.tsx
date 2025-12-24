'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function GalleryImageList({ initialImages }: { initialImages: any[] }) {
    const router = useRouter();
    const supabase = createClient();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    async function handleDelete(id: string, imageUrl: string) {
        if (!confirm('Are you sure you want to delete this image?')) return;
        setDeletingId(id);

        try {
            // Extract file path from URL
            const urlParts = imageUrl.split('/');
            const filePath = urlParts.slice(urlParts.indexOf('gallery')).join('/');

            // Delete from storage
            await supabase.storage.from('uploads').remove([filePath]);

            // Delete from database
            await supabase.from('gallery_images').delete().eq('id', id);
            router.refresh();
        } catch (error: any) {
            alert('Error deleting image: ' + error.message);
        } finally {
            setDeletingId(null);
        }
    }

    if (initialImages.length === 0) {
        return (
            <div className="text-center py-12 bg-navy-900/30 rounded-2xl border border-navy-800 border-dashed">
                <p className="text-navy-400">No gallery images found. Upload one to get started.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {initialImages.map((image) => (
                <div key={image.id} className="bg-navy-900/50 border border-navy-700 rounded-xl overflow-hidden hover:border-navy-600 transition group backdrop-blur-sm">
                    <div className="relative aspect-square">
                        <Image
                            src={image.image_url}
                            alt={image.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    </div>
                    <div className="p-4">
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-white mb-1 line-clamp-1">{image.title}</h3>
                                <span className="text-xs px-2 py-1 bg-navy-800 rounded text-navy-300">
                                    {image.category}
                                </span>
                            </div>
                            <button
                                onClick={() => handleDelete(image.id, image.image_url)}
                                disabled={deletingId === image.id}
                                className="p-2 text-navy-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition shrink-0"
                                title="Delete"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

