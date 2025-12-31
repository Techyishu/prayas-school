"use client"

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/ui/page-header';
import { Trophy, Award, Star, GraduationCap } from 'lucide-react';
import { supabase } from '@/lib/supabase';
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

export default function ToppersPage() {
    const [toppers, setToppers] = useState<Topper[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchToppers();
    }, []);

    const fetchToppers = async () => {
        const { data, error } = await supabase
            .from('toppers')
            .select('*')
            .order('year', { ascending: false })
            .order('rank', { ascending: true });

        if (!error && data) {
            setToppers(data);
        }
        setLoading(false);
    };

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Trophy className="h-6 w-6 text-gold-500" />;
            case 2:
                return <Award className="h-6 w-6 text-gray-400" />;
            case 3:
                return <Award className="h-6 w-6 text-amber-700" />;
            default:
                return <Star className="h-6 w-6 text-teal-500" />;
        }
    };

    const getRankBadgeColor = (rank: number) => {
        switch (rank) {
            case 1:
                return 'from-yellow-500 to-amber-600';
            case 2:
                return 'from-gray-300 to-gray-500';
            case 3:
                return 'from-amber-600 to-amber-800';
            default:
                return 'from-teal-500 to-emerald-600';
        }
    };

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <PageHeader
                badge="Academic Excellence"
                badgeIcon={GraduationCap}
                title="Our"
                highlight="Top Achievers"
                description="Celebrating the outstanding academic achievements of our brilliant students"
            />

            {/* Toppers Grid */}
            <section className="py-24">
                <div className="container-custom">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent"></div>
                            <p className="mt-4 text-gray-600">Loading toppers...</p>
                        </div>
                    ) : toppers.length === 0 ? (
                        <div className="text-center py-12">
                            <GraduationCap className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-600">No toppers data available yet</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {toppers.map((topper, index) => (
                                <motion.div
                                    key={topper.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative group"
                                >
                                    <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-teal-500 transition-all duration-300 hover:shadow-xl">
                                        {/* Rank Badge */}
                                        <div className="absolute top-4 right-4 z-10">
                                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getRankBadgeColor(topper.rank)} flex items-center justify-center shadow-lg`}>
                                                {getRankIcon(topper.rank)}
                                            </div>
                                        </div>

                                        {/* Image */}
                                        <div className="relative h-64 bg-gradient-to-br from-teal-100 to-blue-100">
                                            {topper.image_url ? (
                                                <Image
                                                    src={topper.image_url}
                                                    alt={topper.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <GraduationCap className="h-24 w-24 text-gray-400" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-navy-900 mb-2">{topper.name}</h3>
                                            <div className="space-y-2 text-sm text-gray-600">
                                                <p><strong>Class:</strong> {topper.class_grade}</p>
                                                <p><strong>Year:</strong> {topper.year}</p>
                                                <div className="flex items-center gap-2">
                                                    <strong>Percentage:</strong>
                                                    <span className="text-lg font-bold text-teal-600">{topper.percentage}%</span>
                                                </div>
                                                {topper.achievement && (
                                                    <p className="text-xs text-gray-500 mt-3 italic">
                                                        {topper.achievement}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
