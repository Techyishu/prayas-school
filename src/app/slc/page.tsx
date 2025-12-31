'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { FileText, Download, ChevronRight, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';

interface SLCRecord {
    id: string;
    admission_no: string;
    student_name: string;
    academic_year: string;
    slc_url: string;
}

export default function SLCPage() {
    const supabase = createClient();
    const [records, setRecords] = useState<SLCRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [years, setYears] = useState<string[]>([]);

    useEffect(() => {
        fetchRecords();
    }, []);

    async function fetchRecords() {
        setLoading(true);
        const { data, error } = await supabase
            .from('slc')
            .select('*')
            .order('academic_year', { ascending: false })
            .order('student_name', { ascending: true });

        if (error) {
            console.error('Error fetching SLC records:', error);
        } else if (data) {
            setRecords(data);

            // Extract unique years
            const uniqueYears = Array.from(new Set(data.map((r: SLCRecord) => r.academic_year))).sort().reverse();
            setYears(uniqueYears);

            // Set default selected year to the most recent one
            if (uniqueYears.length > 0) {
                setSelectedYear(uniqueYears[0]);
            }
        }
        setLoading(false);
    }

    // Filter records for the selected year
    const displayedRecords = records.filter(r => r.academic_year === selectedYear);

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <PageHeader
                badge="Official Documents"
                badgeIcon={FileText}
                title="School Leaving"
                highlight="Certificates"
                description="Download official school leaving certificates for students."
            />

            <main className="container-custom py-12">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
                    </div>
                ) : records.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200">
                        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900">No SLC Records Found</h3>
                        <p className="text-gray-500 mt-2">No certificates have been uploaded yet.</p>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar */}
                        <aside className="w-full md:w-64 shrink-0">
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden sticky top-24">
                                {years.map((year) => (
                                    <button
                                        key={year}
                                        onClick={() => setSelectedYear(year)}
                                        className={cn(
                                            "w-full text-left px-5 py-4 flex items-center justify-between transition-all border-b border-gray-100 last:border-0",
                                            selectedYear === year
                                                ? "bg-red-600 text-white font-bold shadow-md"
                                                : "bg-gray-50 text-gray-600 hover:bg-gray-100 font-medium"
                                        )}
                                    >
                                        <span>{year}</span>
                                        {selectedYear === year && <ChevronRight className="w-5 h-5" />}
                                    </button>
                                ))}
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="flex-1">
                            <div className="bg-white border-t-4 border-t-red-600 rounded-lg shadow-sm border-x border-b border-gray-200 overflow-hidden">
                                <div className="bg-red-600 text-white px-6 py-3 font-bold text-lg uppercase flex items-center gap-2">
                                    <GraduationCap className="w-6 h-6" />
                                    School Leaving Certificate : {selectedYear}
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-gray-900 bg-gray-50 font-bold border-b border-gray-200">
                                            <tr>
                                                <th className="px-6 py-4 border-r border-gray-200 w-1/4">Admission No.</th>
                                                <th className="px-6 py-4 border-r border-gray-200 w-1/2">Student Name</th>
                                                <th className="px-6 py-4 font-bold text-gray-800">School Leaving Certificate</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {displayedRecords.map((record) => (
                                                <tr key={record.id} className="hover:bg-red-50/10 transition-colors">
                                                    <td className="px-6 py-4 text-gray-700 font-medium border-r border-gray-100">
                                                        {record.admission_no}
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-800 font-semibold border-r border-gray-100 uppercase">
                                                        {record.student_name}
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        <Button
                                                            onClick={() => window.open(record.slc_url, '_blank')}
                                                            className="bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20"
                                                            size="sm"
                                                        >
                                                            <Download className="w-4 h-4 mr-2" />
                                                            Download
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {displayedRecords.length === 0 && (
                                                <tr>
                                                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                                        No records found for {selectedYear}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
