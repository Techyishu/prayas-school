
'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';
import * as Icons from 'lucide-react';

export default function ServiceList({ initialServices }: { initialServices: any[] }) {
    const router = useRouter();
    const supabase = createClient();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this service?')) return;
        setDeletingId(id);
        await supabase.from('services').delete().eq('id', id);
        router.refresh();
        setDeletingId(null);
    }

    if (initialServices.length === 0) {
        return (
            <div className="text-center py-12 bg-navy-900/30 rounded-2xl border border-navy-800 border-dashed">
                <p className="text-navy-400">No services found. Add one to get started.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {initialServices.map((service) => {
                // Dynamic Icon
                // @ts-ignore
                const IconComponent = Icons[service.icon] || Icons.HelpCircle;

                return (
                    <div key={service.id} className="bg-navy-900/50 border border-navy-700 rounded-xl p-5 flex items-start gap-4 hover:border-navy-600 transition group backdrop-blur-sm">
                        <div className="w-12 h-12 rounded-lg bg-navy-800 flex items-center justify-center shrink-0 group-hover:bg-teal-500/10 group-hover:text-teal-400 transition-colors text-white">
                            <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-white mb-1">{service.title}</h3>
                            <p className="text-navy-300 text-sm line-clamp-2">{service.description}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(service.id)}
                            disabled={deletingId === service.id}
                            className="p-2 text-navy-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition"
                            title="Delete"
                        >
                            <Icons.Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
