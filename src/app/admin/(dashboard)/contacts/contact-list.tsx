'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';
import { Trash2, Mail, Phone, User, Calendar, MessageSquare } from 'lucide-react';

export default function ContactList({ initialContacts }: { initialContacts: any[] }) {
    const router = useRouter();
    const supabase = createClient();
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [selectedContact, setSelectedContact] = useState<any | null>(null);

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this message?')) return;
        setDeletingId(id);
        await supabase.from('contact_submissions').delete().eq('id', id);
        router.refresh();
        setDeletingId(null);
        if (selectedContact?.id === id) {
            setSelectedContact(null);
        }
    }

    if (initialContacts.length === 0) {
        return (
            <div className="text-center py-12 bg-navy-900/30 rounded-2xl border border-navy-800 border-dashed">
                <MessageSquare className="w-12 h-12 text-navy-500 mx-auto mb-4" />
                <p className="text-navy-400">No contact messages found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-2 space-y-4">
                {initialContacts.map((contact) => (
                    <div
                        key={contact.id}
                        onClick={() => setSelectedContact(contact)}
                        className={`bg-navy-900/50 border rounded-xl p-5 cursor-pointer transition-all ${
                            selectedContact?.id === contact.id
                                ? 'border-teal-500 bg-navy-900/70'
                                : 'border-navy-700 hover:border-navy-600'
                        } backdrop-blur-sm`}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0">
                                        <User className="w-5 h-5 text-teal-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-white truncate">
                                            {contact.name || 'Anonymous'}
                                        </h3>
                                        <div className="flex items-center gap-4 text-sm text-navy-400 mt-1">
                                            {contact.email && (
                                                <span className="flex items-center gap-1">
                                                    <Mail className="w-3.5 h-3.5" />
                                                    {contact.email}
                                                </span>
                                            )}
                                            {contact.phone && (
                                                <span className="flex items-center gap-1">
                                                    <Phone className="w-3.5 h-3.5" />
                                                    {contact.phone}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-navy-300 text-sm line-clamp-2 ml-13">
                                    {contact.message}
                                </p>
                                <div className="flex items-center gap-2 mt-3 ml-13">
                                    <span className="flex items-center gap-1 text-xs text-navy-500">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(contact.created_at).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(contact.id);
                                }}
                                disabled={deletingId === contact.id}
                                className="p-2 text-navy-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition shrink-0"
                                title="Delete"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Detail Sidebar */}
            <div className="lg:col-span-1">
                {selectedContact ? (
                    <div className="bg-navy-900/50 border border-navy-700 rounded-2xl p-6 sticky top-24 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-white">Message Details</h2>
                            <button
                                onClick={() => setSelectedContact(null)}
                                className="text-navy-400 hover:text-white transition"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-navy-400 uppercase tracking-wide mb-1 block">
                                    Name
                                </label>
                                <div className="flex items-center gap-2 text-white">
                                    <User className="w-4 h-4 text-navy-400" />
                                    <span>{selectedContact.name || 'Anonymous'}</span>
                                </div>
                            </div>

                            {selectedContact.email && (
                                <div>
                                    <label className="text-xs text-navy-400 uppercase tracking-wide mb-1 block">
                                        Email
                                    </label>
                                    <div className="flex items-center gap-2 text-white">
                                        <Mail className="w-4 h-4 text-navy-400" />
                                        <a
                                            href={`mailto:${selectedContact.email}`}
                                            className="text-teal-400 hover:text-teal-300 transition"
                                        >
                                            {selectedContact.email}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {selectedContact.phone && (
                                <div>
                                    <label className="text-xs text-navy-400 uppercase tracking-wide mb-1 block">
                                        Phone
                                    </label>
                                    <div className="flex items-center gap-2 text-white">
                                        <Phone className="w-4 h-4 text-navy-400" />
                                        <a
                                            href={`tel:${selectedContact.phone}`}
                                            className="text-teal-400 hover:text-teal-300 transition"
                                        >
                                            {selectedContact.phone}
                                        </a>
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="text-xs text-navy-400 uppercase tracking-wide mb-1 block">
                                    Date
                                </label>
                                <div className="flex items-center gap-2 text-white text-sm">
                                    <Calendar className="w-4 h-4 text-navy-400" />
                                    {new Date(selectedContact.created_at).toLocaleString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-navy-400 uppercase tracking-wide mb-1 block">
                                    Message
                                </label>
                                <div className="bg-navy-950 border border-navy-700 rounded-lg p-4 text-white text-sm leading-relaxed whitespace-pre-wrap">
                                    {selectedContact.message}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-navy-700 flex gap-2">
                                {selectedContact.email && (
                                    <a
                                        href={`mailto:${selectedContact.email}`}
                                        className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition text-center text-sm"
                                    >
                                        Reply via Email
                                    </a>
                                )}
                                {selectedContact.phone && (
                                    <a
                                        href={`tel:${selectedContact.phone}`}
                                        className="flex-1 bg-navy-800 hover:bg-navy-700 text-white font-medium py-2 px-4 rounded-lg transition text-center text-sm"
                                    >
                                        Call
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-navy-900/30 rounded-2xl border border-navy-800 border-dashed p-8 text-center">
                        <MessageSquare className="w-8 h-8 text-navy-500 mx-auto mb-3" />
                        <p className="text-navy-400 text-sm">Select a message to view details</p>
                    </div>
                )}
            </div>
        </div>
    );
}

