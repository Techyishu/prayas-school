'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function VisaTypeForm() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const flag = formData.get('flag') as string;
        const description = formData.get('description') as string;
        const icon = formData.get('icon') as string;
        const gradient = formData.get('gradient') as string;
        const features = (formData.get('features') as string).split(',').map(f => f.trim()).filter(f => f);
        
        // Get accordion items
        const accordionTitles = formData.getAll('accordion_title') as string[];
        const accordionContents = formData.getAll('accordion_content') as string[];
        const accordion = accordionTitles.map((title, i) => ({
            title: title.trim(),
            content: accordionContents[i]?.trim() || ''
        })).filter(item => item.title && item.content);

        const { error } = await supabase.from('visa_types').insert({
            title,
            flag,
            description,
            icon,
            gradient,
            features,
            accordion,
        });

        if (error) {
            alert('Error adding visa type: ' + error.message);
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
                    placeholder="e.g. UK Study Visa"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-navy-300 mb-1">Flag Emoji</label>
                <input
                    name="flag"
                    required
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    placeholder="🇬🇧"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-navy-300 mb-1">Description</label>
                <textarea
                    name="description"
                    required
                    rows={3}
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    placeholder="Brief description..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-navy-300 mb-1">Icon Name (Lucide)</label>
                <input
                    name="icon"
                    required
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    placeholder="e.g. GraduationCap, Globe"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-navy-300 mb-1">Gradient</label>
                <input
                    name="gradient"
                    required
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    placeholder="from-blue-500 to-indigo-600"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-navy-300 mb-1">Features (comma-separated)</label>
                <input
                    name="features"
                    required
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    placeholder="Feature 1, Feature 2, Feature 3"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-navy-300 mb-2">Accordion Items</label>
                <div id="accordion-container" className="space-y-3">
                    <div className="accordion-item space-y-2 p-3 bg-navy-950 rounded-lg border border-navy-700">
                        <input
                            name="accordion_title"
                            className="w-full bg-navy-900 border border-navy-700 rounded px-3 py-1.5 text-white text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                            placeholder="Title"
                        />
                        <textarea
                            name="accordion_content"
                            rows={2}
                            className="w-full bg-navy-900 border border-navy-700 rounded px-3 py-1.5 text-white text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                            placeholder="Content"
                        />
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => {
                        const container = document.getElementById('accordion-container');
                        const newItem = document.createElement('div');
                        newItem.className = 'accordion-item space-y-2 p-3 bg-navy-950 rounded-lg border border-navy-700';
                        newItem.innerHTML = `
                            <input
                                name="accordion_title"
                                class="w-full bg-navy-900 border border-navy-700 rounded px-3 py-1.5 text-white text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                placeholder="Title"
                            />
                            <textarea
                                name="accordion_content"
                                rows="2"
                                class="w-full bg-navy-900 border border-navy-700 rounded px-3 py-1.5 text-white text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                placeholder="Content"
                            />
                        `;
                        container?.appendChild(newItem);
                    }}
                    className="mt-2 text-sm text-teal-400 hover:text-teal-300"
                >
                    + Add Accordion Item
                </button>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-medium py-2 rounded-lg transition-all shadow-lg shadow-teal-500/20 disabled:opacity-50"
            >
                {loading ? 'Adding...' : 'Add Visa Type'}
            </button>
        </form>
    );
}

