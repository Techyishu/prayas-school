'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';
import * as Icons from 'lucide-react';

export default function VisaTypeList({ initialVisaTypes }: { initialVisaTypes: any[] }) {
    const router = useRouter();
    const supabase = createClient();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this visa type?')) return;
        setDeletingId(id);
        await supabase.from('visa_types').delete().eq('id', id);
        router.refresh();
        setDeletingId(null);
    }

    if (initialVisaTypes.length === 0) {
        return (
            <div className="text-center py-12 bg-navy-900/30 rounded-2xl border border-navy-800 border-dashed">
                <p className="text-navy-400">No visa types found. Add one to get started.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {initialVisaTypes.map((visaType) => {
                // @ts-ignore
                const IconComponent = Icons[visaType.icon] || Icons.HelpCircle;

                return (
                    <div key={visaType.id} className="bg-navy-900/50 border border-navy-700 rounded-xl p-5 flex items-start gap-4 hover:border-navy-600 transition group backdrop-blur-sm">
                        <div className="w-12 h-12 rounded-lg bg-navy-800 flex items-center justify-center shrink-0 group-hover:bg-teal-500/10 group-hover:text-teal-400 transition-colors text-white">
                            <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-2xl">{visaType.flag}</span>
                                <h3 className="text-lg font-semibold text-white">{visaType.title}</h3>
                            </div>
                            <p className="text-navy-300 text-sm line-clamp-2 mb-2">{visaType.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {visaType.features?.slice(0, 3).map((feature: string, i: number) => (
                                    <span key={i} className="text-xs px-2 py-1 bg-navy-800 rounded text-navy-300">
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(visaType.id)}
                            disabled={deletingId === visaType.id}
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

