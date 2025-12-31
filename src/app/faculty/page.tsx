
"use client"

import { useEffect, useState } from 'react';
import Image from "next/image";
import { supabase } from '@/lib/supabase';
import { Users } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';

type FacultyMember = {
    id: string;
    name: string;
    role: string;
    subject: string;
    experience: string;
    image_url: string | null;
    bio: string | null;
};

export default function FacultyPage() {
    const [faculty, setFaculty] = useState<FacultyMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFaculty();
    }, []);

    const fetchFaculty = async () => {
        const { data, error } = await supabase
            .from('faculty')
            .select('*')
            .order('created_at', { ascending: true });

        if (!error && data) {
            setFaculty(data);
        }
        setLoading(false);
    };

    return (
        <div className="bg-white">
            <PageHeader
                badge="Our Team"
                badgeIcon={Users}
                title="Expert"
                highlight="Faculty"
                description="Our team of dedicated educators is the backbone of Prayas School. Qualified, experienced, and passionate about shaping future leaders."
            />

            <section className="py-20">
                <div className="container-custom">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent"></div>
                            <p className="mt-4 text-gray-600">Loading faculty...</p>
                        </div>
                    ) : faculty.length === 0 ? (
                        <div className="text-center py-12">
                            <Users className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-600">No faculty members listed yet</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {faculty.map((member) => (
                                <div key={member.id} className="bg-white border hover:border-teal-500 transition-colors p-6 rounded-2xl shadow-sm text-center group">
                                    <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden relative">
                                        {member.image_url ? (
                                            <Image
                                                src={member.image_url}
                                                alt={member.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-400">
                                                👤
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-navy-900">{member.name}</h3>
                                    <p className="text-teal-600 font-medium mb-2">{member.role}</p>
                                    <hr className="w-12 border-teal-200 mx-auto my-3" />
                                    <div className="text-sm text-gray-500 space-y-1">
                                        <p><strong>Subject:</strong> {member.subject}</p>
                                        <p><strong>Experience:</strong> {member.experience}</p>
                                        {member.bio && (
                                            <p className="text-xs mt-3 text-gray-600 italic">{member.bio}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="bg-teal-900 text-white py-16 mt-12">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
                    <p className="mb-8 text-teal-100">We are always looking for passionate educators to join us.</p>
                    <button className="px-8 py-3 bg-white text-teal-900 rounded-xl font-bold hover:bg-teal-50 transition-colors">Career Opportunities</button>
                </div>
            </section>
        </div>
    );
}
