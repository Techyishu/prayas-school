"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Loader2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function TopperForm() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        let imageUrl = null;

        // Upload image if provided
        if (imageFile) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('toppers')
                .upload(fileName, imageFile);

            if (uploadError) {
                console.error('Error uploading image:', uploadError);
                alert('Failed to upload image');
                setLoading(false);
                return;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('toppers')
                .getPublicUrl(fileName);

            imageUrl = publicUrl;
        }

        const data = {
            name: formData.get('name') as string,
            class_grade: formData.get('class_grade') as string,
            percentage: parseFloat(formData.get('percentage') as string),
            year: formData.get('year') as string,
            rank: parseInt(formData.get('rank') as string),
            achievement: formData.get('achievement') as string || null,
            image_url: imageUrl,
        };

        const { error } = await supabase
            .from('toppers')
            .insert([data]);

        if (error) {
            console.error('Error adding topper:', error);
            alert('Failed to add topper');
        } else {
            (e.target as HTMLFormElement).reset();
            setImageFile(null);
            setIsOpen(false);
            router.refresh();
        }

        setLoading(false);
    };

    return (
        <div>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="btn-gold"
            >
                <Plus className="mr-2 h-4 w-4" />
                Add New Topper
            </Button>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6"
                >
                    <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-white mb-6">Add New Topper</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-white">Student Name *</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        required
                                        placeholder="John Doe"
                                        className="bg-navy-800 border-navy-600 text-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="class_grade" className="text-white">Class/Grade *</Label>
                                    <Input
                                        id="class_grade"
                                        name="class_grade"
                                        required
                                        placeholder="Class 10"
                                        className="bg-navy-800 border-navy-600 text-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="percentage" className="text-white">Percentage *</Label>
                                    <Input
                                        id="percentage"
                                        name="percentage"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        max="100"
                                        required
                                        placeholder="95.5"
                                        className="bg-navy-800 border-navy-600 text-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="year" className="text-white">Year *</Label>
                                    <Input
                                        id="year"
                                        name="year"
                                        required
                                        placeholder="2024"
                                        className="bg-navy-800 border-navy-600 text-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="rank" className="text-white">Rank *</Label>
                                    <Input
                                        id="rank"
                                        name="rank"
                                        type="number"
                                        min="1"
                                        required
                                        placeholder="1"
                                        className="bg-navy-800 border-navy-600 text-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="image" className="text-white">Student Photo</Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                            className="bg-navy-800 border-navy-600 text-white"
                                        />
                                        <Upload className="h-5 w-5 text-navy-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="achievement" className="text-white">Achievement/Note</Label>
                                <Textarea
                                    id="achievement"
                                    name="achievement"
                                    rows={3}
                                    placeholder="Special achievements or notes..."
                                    className="bg-navy-800 border-navy-600 text-white resize-none"
                                />
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-gold"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Adding...
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Topper
                                        </>
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsOpen(false)}
                                    className="bg-navy-800 border-navy-600 text-white hover:bg-navy-700"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
