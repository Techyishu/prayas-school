'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function BlogPostList({ initialPosts }: { initialPosts: any[] }) {
    const router = useRouter();
    const supabase = createClient();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    async function handleDelete(id: string, imageUrl?: string) {
        if (!confirm('Are you sure you want to delete this blog post?')) return;
        setDeletingId(id);

        try {
            // Delete image from storage if it's from our storage
            const imgUrl = post.image || post.image_url;
            if (imgUrl && imgUrl.includes('supabase.co/storage')) {
                const urlParts = imgUrl.split('/');
                const filePath = urlParts.slice(urlParts.indexOf('blog')).join('/');
                await supabase.storage.from('uploads').remove([filePath]);
            }

            // Delete from database
            await supabase.from('blogs').delete().eq('id', id);
            router.refresh();
        } catch (error: any) {
            alert('Error deleting post: ' + error.message);
        } finally {
            setDeletingId(null);
        }
    }

    if (initialPosts.length === 0) {
        return (
            <div className="text-center py-12 bg-navy-900/30 rounded-2xl border border-navy-800 border-dashed">
                <p className="text-navy-400">No blog posts found. Add one to get started.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {initialPosts.map((post) => (
                    <div key={post.id} className="bg-navy-900/50 border border-navy-700 rounded-xl p-5 flex items-start gap-4 hover:border-navy-600 transition group backdrop-blur-sm">
                    <div className="relative w-32 h-24 rounded-lg overflow-hidden shrink-0">
                        <Image
                            src={post.image || post.image_url || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop'}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="128px"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                            {(post.featured || post.is_published) && (
                                <span className="text-xs px-2 py-1 bg-gold-500/20 text-gold-400 rounded">Featured</span>
                            )}
                        </div>
                        <p className="text-navy-300 text-sm line-clamp-2 mb-2">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="text-xs px-2 py-1 bg-navy-800 rounded text-navy-300">{post.category}</span>
                            <span className="text-xs px-2 py-1 bg-navy-800 rounded text-navy-300">{post.read_time}</span>
                            <span className="text-xs px-2 py-1 bg-navy-800 rounded text-navy-300">{post.author}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => handleDelete(post.id, post.image)}
                        disabled={deletingId === post.id}
                        className="p-2 text-navy-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition shrink-0"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}

