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

export default function FacultyForm() {
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
                .from('faculty')
                .upload(fileName, imageFile);

            if (uploadError) {
                console.error('Error uploading image:', uploadError);
                alert('Failed to upload image');
                setLoading(false);
                return;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('faculty')
                .getPublicUrl(fileName);

            imageUrl = publicUrl;
        }

        const data = {
            name: formData.get('name') as string,
            role: formData.get('role') as string,
            subject: formData.get('subject') as string,
            experience: formData.get('experience') as string,
            bio: formData.get('bio') as string || null,
            image_url: imageUrl,
        };

        const { error } = await supabase
            .from('faculty')
            .insert([data]);

        if (error) {
            console.error('Error adding faculty:', error);
            alert('Failed to add faculty member');
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
                Add Faculty Member
            </Button>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6"
                >
                    <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-white mb-6">Add Faculty Member</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-white">Name *</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        required
                                        placeholder="Dr. John Doe"
                                        className="bg-navy-800 border-navy-600 text-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="role" className="text-white">Role/Position *</Label>
                                    <Input
                                        id="role"
                                        name="role"
                                        required
                                        placeholder="Principal / Senior Teacher"
                                        className="bg-navy-800 border-navy-600 text-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="text-white">Subject *</Label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        required
                                        placeholder="Mathematics / Science"
                                        className="bg-navy-800 border-navy-600 text-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="experience" className="text-white">Experience *</Label>
                                    <Input
                                        id="experience"
                                        name="experience"
                                        required
                                        placeholder="15+ Years"
                                        className="bg-navy-800 border-navy-600 text-white"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="image" className="text-white">Photo</Label>
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
                                <Label htmlFor="bio" className="text-white">Bio/Description</Label>
                                <Textarea
                                    id="bio"
                                    name="bio"
                                    rows={3}
                                    placeholder="Brief description about the faculty member..."
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
                                            Add Faculty
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
