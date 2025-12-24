
'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function AddServiceForm() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const icon = formData.get('icon') as string;

        const { error } = await supabase.from('services').insert({
            title,
            description,
            icon,
        });

        if (error) {
            alert('Error adding service: ' + error.message);
        } else {
            // Reset form
            (e.target as HTMLFormElement).reset();
            router.refresh();
        }
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-navy-300 mb-1">Service Title</label>
                <input
                    name="title"
                    required
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    placeholder="e.g. Web Development"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-navy-300 mb-1">Description</label>
                <textarea
                    name="description"
                    required
                    rows={4}
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    placeholder="Brief description of the service..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-navy-300 mb-1">Icon Name (Lucide)</label>
                <input
                    name="icon"
                    required
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    placeholder="e.g. Code, Database, Globe"
                />
                <p className="text-xs text-navy-500 mt-1">Use icon names from Lucide React</p>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-medium py-2 rounded-lg transition-all shadow-lg shadow-teal-500/20 disabled:opacity-50"
            >
                {loading ? 'Adding...' : 'Add Service'}
            </button>
        </form>
    );
}
