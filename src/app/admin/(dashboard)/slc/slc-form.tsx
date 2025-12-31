'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';
import { Loader2, Upload, FileMinus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function SLCForm() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [fileFile, setFileFile] = useState<File | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const admissionNo = formData.get('admissionNo') as string;
        const studentName = formData.get('studentName') as string;
        const academicYear = formData.get('academicYear') as string;

        if (!fileFile) {
            alert('Please select an SLC document to upload');
            setLoading(false);
            return;
        }

        try {
            // Upload file
            const fileExt = fileFile.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('slc_documents')
                .upload(fileName, fileFile);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('slc_documents')
                .getPublicUrl(fileName);

            // Insert record
            const { error: dbError } = await supabase.from('slc').insert({
                admission_no: admissionNo,
                student_name: studentName,
                academic_year: academicYear,
                slc_url: publicUrl,
            });

            if (dbError) throw dbError;

            // Reset form
            (e.target as HTMLFormElement).reset();
            setFileFile(null);
            router.refresh();

        } catch (error: any) {
            console.error('Error:', error);
            alert('Error adding SLC: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    // Generate academic years (e.g., last 5 years)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => {
        const start = currentYear - i;
        return `${start}-${start + 1}`;
    });

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="admissionNo" className="text-white">Admission No. *</Label>
                    <Input
                        id="admissionNo"
                        name="admissionNo"
                        required
                        placeholder="e.g. 3339"
                        className="bg-navy-950 border-navy-700 text-white"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="studentName" className="text-white">Student Name *</Label>
                    <Input
                        id="studentName"
                        name="studentName"
                        required
                        placeholder="e.g. ANMOL"
                        className="bg-navy-950 border-navy-700 text-white"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="academicYear" className="text-white">Academic Year *</Label>
                    <Select name="academicYear" required defaultValue={years[0]}>
                        <SelectTrigger className="bg-navy-950 border-navy-700 text-white">
                            <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent className="bg-navy-950 border-navy-700 text-white">
                            {years.map(year => (
                                <SelectItem key={year} value={year}>{year}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="file" className="text-white">SLC Document (PDF/Image) *</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            id="file"
                            type="file"
                            accept=".pdf,image/*"
                            required
                            onChange={(e) => setFileFile(e.target.files?.[0] || null)}
                            className="bg-navy-950 border-navy-700 text-white file:bg-teal-600 file:text-white file:border-0 file:rounded-md file:mr-4 file:px-4 file:py-1 hover:file:bg-teal-500"
                        />
                    </div>
                </div>
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white shadow-lg shadow-teal-500/20"
            >
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                    </>
                ) : (
                    <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Certificate
                    </>
                )}
            </Button>
        </form>
    );
}
