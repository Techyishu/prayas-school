"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type FacultyMember = {
    id: string;
    name: string;
    role: string;
    subject: string;
    experience: string;
    image_url: string | null;
    bio: string | null;
};

export default function FacultyList({ initialFaculty }: { initialFaculty: FacultyMember[] }) {
    const router = useRouter();
    const [faculty, setFaculty] = useState<FacultyMember[]>(initialFaculty);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const handleDelete = async (id: string, imageUrl: string | null) => {
        if (!confirm('Are you sure you want to delete this faculty member?')) return;

        setIsDeleting(id);

        // Delete image from storage if exists
        if (imageUrl) {
            const fileName = imageUrl.split('/').pop();
            if (fileName) {
                await supabase.storage.from('faculty').remove([fileName]);
            }
        }

        const { error } = await supabase
            .from('faculty')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting faculty:', error);
            alert('Failed to delete faculty member');
        } else {
            setFaculty(faculty.filter(f => f.id !== id));
            router.refresh();
        }
        setIsDeleting(null);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">All Faculty Members</h2>

            {faculty.length === 0 ? (
                <div className="text-center py-12 text-navy-400 bg-navy-900 border border-navy-700 rounded-2xl">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No faculty members added yet</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {faculty.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="relative overflow-hidden rounded-2xl bg-navy-900 border border-navy-700 group hover:border-navy-600 transition duration-300"
                        >
                            {/* Image */}
                            <div className="relative h-48 bg-gradient-to-br from-teal-900/20 to-blue-900/20">
                                {member.image_url ? (
                                    <Image
                                        src={member.image_url}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-6xl">
                                        👤
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                                <p className="text-teal-400 font-medium text-sm mb-3">{member.role}</p>

                                <div className="space-y-2 text-sm text-navy-300 mb-4">
                                    <div className="flex justify-between">
                                        <span>Subject:</span>
                                        <span className="font-medium text-white">{member.subject}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Experience:</span>
                                        <span className="font-medium text-white">{member.experience}</span>
                                    </div>
                                    {member.bio && (
                                        <p className="text-xs text-navy-400 mt-3 pt-3 border-t border-navy-700 italic">
                                            {member.bio}
                                        </p>
                                    )}
                                </div>

                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDelete(member.id, member.image_url)}
                                    disabled={isDeleting === member.id}
                                    className="w-full bg-red-900/20 border-red-700/50 text-red-400 hover:bg-red-900/40"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    {isDeleting === member.id ? 'Deleting...' : 'Delete'}
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
