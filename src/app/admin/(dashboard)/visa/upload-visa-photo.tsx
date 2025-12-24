'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function UploadVisaPhoto() {
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
        const file = formData.get('photo') as File;

        if (!file) {
            alert('Please select a photo');
            setLoading(false);
            return;
        }

        try {
            setUploading(true);
            
            // Upload to Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `visa-photos/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('uploads')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('uploads')
                .getPublicUrl(filePath);

            // Save to database
            const { error: dbError } = await supabase.from('visa_photos').insert({
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
            alert('Error uploading photo: ' + error.message);
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
                    placeholder="e.g. UK Visa Approved - John Doe"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-navy-300 mb-1">Category</label>
                <select
                    name="category"
                    required
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                >
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="USA">USA</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-navy-300 mb-1">Photo</label>
                <input
                    type="file"
                    name="photo"
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
                {uploading ? 'Uploading...' : loading ? 'Saving...' : 'Upload Photo'}
            </button>
        </form>
    );
}

