'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function UploadGalleryImage() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const category = formData.get('category') as string;
        const file = formData.get('image') as File;

        if (!file) {
            alert('Please select an image');
            setLoading(false);
            return;
        }

        try {
            setUploading(true);

            // Upload to Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `${fileName}`; // Removed 'gallery/' prefix as we are putting it in gallery bucket

            const { error: uploadError } = await supabase.storage
                .from('gallery') // Changed from 'uploads' to 'gallery'
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('gallery')
                .getPublicUrl(filePath);

            // Save to database
            const { error: dbError } = await supabase.from('gallery_images').insert({
                title,
                category,
                image_url: publicUrl,
            });

            if (dbError) {
                throw dbError;
            }

            (e.target as HTMLFormElement).reset();
            router.refresh();
        } catch (error: any) {
            alert('Error uploading image: ' + error.message);
        } finally {
            setLoading(false);
            setUploading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-navy-300 mb-1">Title</label>
                <input
                    name="title"
                    required
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    placeholder="e.g. Student Success"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-navy-300 mb-1">Category</label>
                <select
                    name="category"
                    required
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                >
                    <option value="Success Stories">Success Stories</option>
                    <option value="Triumphs">Triumphs</option>
                    <option value="Office">Office</option>
                    <option value="Events">Events</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-navy-300 mb-1">Image</label>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    required
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-400"
                />
            </div>

            <button
                type="submit"
                disabled={loading || uploading}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-medium py-2 rounded-lg transition-all shadow-lg shadow-teal-500/20 disabled:opacity-50"
            >
                {uploading ? 'Uploading...' : loading ? 'Saving...' : 'Upload Image'}
            </button>
        </form>
    );
}

