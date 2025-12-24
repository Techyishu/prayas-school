
import React from 'react';
import Link from 'next/link';
import LogoutButton from './logout-button';
import LogoutButtonHeader from './logout-button-header';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-navy-950 text-white flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-navy-700 bg-navy-900/50 backdrop-blur-xl p-6 hidden md:block fixed h-full z-50">
                <div className="mb-10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg shadow-teal-500/20">
                        <span className="text-white font-bold text-xl">S</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-teal-400 to-teal-200 bg-clip-text text-transparent">
                        Admin Panel
                    </span>
                </div>

                <nav className="space-y-2">
                    <AdminLink href="/admin" icon="LayoutDashboard" label="Dashboard" />
                    <AdminLink href="/admin/visa" icon="FileCheck" label="Visa" />
                    <AdminLink href="/admin/gallery" icon="Image" label="Gallery" />
                    <AdminLink href="/admin/blog" icon="FileText" label="Blog" />
                    <AdminLink href="/admin/contacts" icon="MessageSquare" label="Messages" />
                </nav>

                <div className="absolute bottom-6 left-6 right-6">
                    <div className="p-4 rounded-xl bg-navy-800/50 border border-navy-700 mb-3">
                        <p className="text-xs text-navy-400 mb-1">Logged in as</p>
                        <p className="text-sm font-medium text-white truncate">Admin</p>
                    </div>
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 md:ml-64 relative">
                <header className="h-16 border-b border-navy-700 bg-navy-900/50 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-40">
                    <h1 className="text-lg font-medium text-white">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <LogoutButtonHeader />
                    </div>
                </header>
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

import { LayoutDashboard, FileText, MessageSquare, FileCheck, Image } from 'lucide-react';

const icons = {
    LayoutDashboard,
    FileText,
    MessageSquare,
    FileCheck,
    Image
};

function AdminLink({ href, icon, label }: { href: string; icon: keyof typeof icons; label: string }) {
    const Icon = icons[icon];
    return (
        <Link href={href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-navy-300 hover:text-white hover:bg-navy-800/50 transition-all duration-200 group">
            <Icon className="w-5 h-5 group-hover:text-teal-400 transition-colors" />
            <span className="font-medium">{label}</span>
        </Link>
    );
}
