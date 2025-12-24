'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function BlogPostForm() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const excerpt = formData.get('excerpt') as string;
        const category = formData.get('category') as string;
        const author = formData.get('author') as string;
        const readTime = formData.get('readTime') as string;
        const featured = formData.get('featured') === 'on';
        const content = formData.get('content') as string;
        const file = formData.get('image') as File;

        let imageUrl = '';

        if (file && file.size > 0) {
            try {
                setUploading(true);
                
                // Upload to Supabase Storage
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
                const filePath = `blog/${fileName}`;

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

                imageUrl = publicUrl;
            } catch (error: any) {
                alert('Error uploading image: ' + error.message);
                setLoading(false);
                setUploading(false);
                return;
            } finally {
                setUploading(false);
            }
        }

        const defaultImage = 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop';
        const finalImageUrl = imageUrl || defaultImage;
        
        const { error } = await supabase.from('blogs').insert({
            title,
            excerpt,
            category,
            author,
            read_time: readTime,
            featured,
            content,
            image: finalImageUrl,
            image_url: finalImageUrl, // Also save to image_url for compatibility
            slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), // Generate slug
            is_published: featured, // Also set is_published for compatibility
        });

        if (error) {
            alert('Error adding blog post: ' + error.message);
        } else {
            (e.target as HTMLFormElement).reset();
            router.refresh();
        }
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-navy-300 mb-1">Title</label>
                <input
                    name="title"
                    required
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    placeholder="Blog post title"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-navy-300 mb-1">Excerpt</label>
                <textarea
                    name="excerpt"
                    required
                    rows={3}
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    placeholder="Brief description..."
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                        <option value="Success Stories">Success Stories</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-navy-300 mb-1">Read Time</label>
                    <input
                        name="readTime"
                        required
                        className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                        placeholder="5 min read"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-navy-300 mb-1">Author</label>
                <input
                    name="author"
                    required
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    placeholder="Author name"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-navy-300 mb-1">Content</label>
                <textarea
                    name="content"
                    required
                    rows={6}
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    placeholder="Full blog post content..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-navy-300 mb-1">Featured Image (Optional)</label>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-400"
                />
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="featured"
                    id="featured"
                    className="w-4 h-4 rounded border-navy-700 bg-navy-950 text-teal-500 focus:ring-2 focus:ring-teal-500"
                />
                <label htmlFor="featured" className="text-sm text-navy-300">Featured Post</label>
            </div>

            <button
                type="submit"
                disabled={loading || uploading}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-medium py-2 rounded-lg transition-all shadow-lg shadow-teal-500/20 disabled:opacity-50"
            >
                {uploading ? 'Uploading...' : loading ? 'Adding...' : 'Add Blog Post'}
            </button>
        </form>
    );
}

