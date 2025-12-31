"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Trophy, Award, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Topper = {
    id: string;
    name: string;
    class_grade: string;
    percentage: number;
    year: string;
    image_url: string | null;
    achievement: string | null;
    rank: number;
};

export default function TopperList({ initialToppers }: { initialToppers: Topper[] }) {
    const router = useRouter();
    const [toppers, setToppers] = useState<Topper[]>(initialToppers);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const handleDelete = async (id: string, imageUrl: string | null) => {
        if (!confirm('Are you sure you want to delete this topper?')) return;

        setIsDeleting(id);

        // Delete image from storage if exists
        if (imageUrl) {
            const fileName = imageUrl.split('/').pop();
            if (fileName) {
                await supabase.storage.from('toppers').remove([fileName]);
            }
        }

        const { error } = await supabase
            .from('toppers')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting topper:', error);
            alert('Failed to delete topper');
        } else {
            setToppers(toppers.filter(t => t.id !== id));
            router.refresh();
        }
        setIsDeleting(null);
    };

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Trophy className="h-5 w-5 text-gold-500" />;
            case 2:
                return <Award className="h-5 w-5 text-gray-400" />;
            case 3:
                return <Award className="h-5 w-5 text-amber-700" />;
            default:
                return <Star className="h-5 w-5 text-teal-500" />;
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">All Toppers</h2>

            {toppers.length === 0 ? (
                <div className="text-center py-12 text-navy-400 bg-navy-900 border border-navy-700 rounded-2xl">
                    <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No toppers added yet</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {toppers.map((topper, index) => (
                        <motion.div
                            key={topper.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="relative overflow-hidden rounded-2xl bg-navy-900 border border-navy-700 group hover:border-navy-600 transition duration-300"
                        >
                            {/* Rank Badge */}
                            <div className="absolute top-3 right-3 z-10">
                                <div className="w-10 h-10 rounded-full bg-navy-800/90 backdrop-blur-sm flex items-center justify-center border border-navy-600">
                                    {getRankIcon(topper.rank)}
                                </div>
                            </div>

                            {/* Image */}
                            <div className="relative h-48 bg-gradient-to-br from-teal-900/20 to-blue-900/20">
                                {topper.image_url ? (
                                    <Image
                                        src={topper.image_url}
                                        alt={topper.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Trophy className="h-16 w-16 text-navy-600" />
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-white mb-3">{topper.name}</h3>
                                <div className="space-y-2 text-sm text-navy-300">
                                    <div className="flex justify-between">
                                        <span>Class:</span>
                                        <span className="font-medium text-white">{topper.class_grade}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Year:</span>
                                        <span className="font-medium text-white">{topper.year}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Percentage:</span>
                                        <span className="font-bold text-teal-400">{topper.percentage}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Rank:</span>
                                        <span className="font-medium text-gold-400">#{topper.rank}</span>
                                    </div>
                                    {topper.achievement && (
                                        <p className="text-xs text-navy-400 mt-3 pt-3 border-t border-navy-700 italic">
                                            {topper.achievement}
                                        </p>
                                    )}
                                </div>

                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDelete(topper.id, topper.image_url)}
                                    disabled={isDeleting === topper.id}
                                    className="w-full mt-4 bg-red-900/20 border-red-700/50 text-red-400 hover:bg-red-900/40"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    {isDeleting === topper.id ? 'Deleting...' : 'Delete'}
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
