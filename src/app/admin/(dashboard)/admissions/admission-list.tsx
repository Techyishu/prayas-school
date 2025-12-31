"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Eye, X, User, Phone, Mail, GraduationCap, MessageSquare, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

type Admission = {
    id: string;
    parent_name: string;
    phone: string;
    email: string | null;
    student_name: string;
    grade: string;
    message: string | null;
    created_at: string;
};

export default function AdmissionList({ initialAdmissions }: { initialAdmissions: Admission[] }) {
    const [admissions, setAdmissions] = useState<Admission[]>(initialAdmissions);
    const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this admission inquiry?')) return;

        setIsDeleting(id);
        const { error } = await supabase
            .from('admission_submissions')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting admission:', error);
            alert('Failed to delete admission');
        } else {
            setAdmissions(admissions.filter(a => a.id !== id));
        }
        setIsDeleting(null);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <div className="grid gap-4">
                {admissions.length === 0 ? (
                    <div className="text-center py-12 text-navy-400">
                        <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No admission inquiries yet</p>
                    </div>
                ) : (
                    admissions.map((admission, index) => (
                        <motion.div
                            key={admission.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="relative overflow-hidden rounded-2xl bg-navy-900 border border-navy-700 p-6 group hover:border-navy-600 transition duration-300"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                                            <User className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white">{admission.parent_name}</h3>
                                            <p className="text-sm text-navy-400">Parent</p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                                        <div className="flex items-center gap-2 text-navy-300">
                                            <GraduationCap className="h-4 w-4 text-teal-400" />
                                            <span><strong>Student:</strong> {admission.student_name}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-navy-300">
                                            <GraduationCap className="h-4 w-4 text-gold-400" />
                                            <span><strong>Grade:</strong> {admission.grade}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-navy-300">
                                            <Phone className="h-4 w-4 text-blue-400" />
                                            <a href={`tel:${admission.phone}`} className="hover:text-teal-400">
                                                {admission.phone}
                                            </a>
                                        </div>
                                        {admission.email && (
                                            <div className="flex items-center gap-2 text-navy-300">
                                                <Mail className="h-4 w-4 text-purple-400" />
                                                <a href={`mailto:${admission.email}`} className="hover:text-teal-400 truncate">
                                                    {admission.email}
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-navy-400">
                                        <Calendar className="h-3 w-3" />
                                        {formatDate(admission.created_at)}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setSelectedAdmission(admission)}
                                        className="bg-navy-800 border-navy-600 text-white hover:bg-navy-700"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleDelete(admission.id)}
                                        disabled={isDeleting === admission.id}
                                        className="bg-red-900/20 border-red-700/50 text-red-400 hover:bg-red-900/40"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedAdmission && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedAdmission(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-navy-900 border border-navy-700 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Admission Inquiry Details</h2>
                                <button
                                    onClick={() => setSelectedAdmission(null)}
                                    className="text-navy-400 hover:text-white transition"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm text-navy-400 mb-1 block">Parent's Name</label>
                                        <p className="text-white font-medium">{selectedAdmission.parent_name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-navy-400 mb-1 block">Student's Name</label>
                                        <p className="text-white font-medium">{selectedAdmission.student_name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-navy-400 mb-1 block">Phone Number</label>
                                        <a href={`tel:${selectedAdmission.phone}`} className="text-teal-400 hover:underline">
                                            {selectedAdmission.phone}
                                        </a>
                                    </div>
                                    <div>
                                        <label className="text-sm text-navy-400 mb-1 block">Grade Applying For</label>
                                        <p className="text-white font-medium">{selectedAdmission.grade}</p>
                                    </div>
                                    {selectedAdmission.email && (
                                        <div className="md:col-span-2">
                                            <label className="text-sm text-navy-400 mb-1 block">Email Address</label>
                                            <a href={`mailto:${selectedAdmission.email}`} className="text-teal-400 hover:underline">
                                                {selectedAdmission.email}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {selectedAdmission.message && (
                                    <div>
                                        <label className="text-sm text-navy-400 mb-1 block flex items-center gap-2">
                                            <MessageSquare className="h-4 w-4" />
                                            Message
                                        </label>
                                        <p className="text-white bg-navy-800/50 p-4 rounded-xl border border-navy-700">
                                            {selectedAdmission.message}
                                        </p>
                                    </div>
                                )}

                                <div>
                                    <label className="text-sm text-navy-400 mb-1 block">Submitted On</label>
                                    <p className="text-white">{formatDate(selectedAdmission.created_at)}</p>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button
                                        onClick={() => window.open(`tel:${selectedAdmission.phone}`)}
                                        className="flex-1 btn-gold"
                                    >
                                        <Phone className="mr-2 h-4 w-4" />
                                        Call Parent
                                    </Button>
                                    {selectedAdmission.email && (
                                        <Button
                                            onClick={() => window.open(`mailto:${selectedAdmission.email}`)}
                                            variant="outline"
                                            className="flex-1 bg-navy-800 border-navy-600 text-white hover:bg-navy-700"
                                        >
                                            <Mail className="mr-2 h-4 w-4" />
                                            Send Email
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
