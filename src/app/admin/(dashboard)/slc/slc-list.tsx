'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';
import { Trash2, FileText, Download, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SLCList({ initialRecords }: { initialRecords: any[] }) {
    const router = useRouter();
    const supabase = createClient();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this SLC record?')) return;
        setDeletingId(id);

        try {
            // First delete file if possible (optional, or we rely on cascading/manual cleanup)
            // Then delete record
            await supabase.from('slc').delete().eq('id', id);
            router.refresh();
        } catch (error: any) {
            alert('Error deleting record: ' + error.message);
        } finally {
            setDeletingId(null);
        }
    }

    if (initialRecords.length === 0) {
        return (
            <div className="text-center py-12 bg-navy-900/30 rounded-2xl border border-navy-800 border-dashed">
                <FileText className="w-12 h-12 text-navy-400 mx-auto mb-4" />
                <p className="text-navy-400">No SLC records found. Upload one to get started.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {initialRecords.map((record) => (
                <div key={record.id} className="bg-navy-900/50 border border-navy-700 rounded-xl p-4 hover:border-navy-600 transition group backdrop-blur-sm flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0">
                                <User className="w-5 h-5 text-teal-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white truncate">{record.student_name}</h3>
                                <div className="flex items-center gap-4 text-sm text-navy-300">
                                    <span>Adm No: <span className="text-white">{record.admission_no}</span></span>
                                    <span>Year: <span className="text-white">{record.academic_year}</span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            className="text-teal-400 border-teal-500/30 hover:bg-teal-500/10 hover:text-teal-300"
                            onClick={() => window.open(record.slc_url, '_blank')}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            View/Download
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                            onClick={() => handleDelete(record.id)}
                            disabled={deletingId === record.id}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}


