
import { createClient } from '@/lib/supabase-server';
import Link from 'next/link';

export const revalidate = 0;

async function getStats() {
    const supabase = await createClient();
    const { count: messagesCount } = await supabase.from('contact_submissions').select('*', { count: 'exact', head: true });
    const { count: admissionsCount } = await supabase.from('admission_submissions').select('*', { count: 'exact', head: true });
    const { count: toppersCount } = await supabase.from('toppers').select('*', { count: 'exact', head: true });
    const { count: facultyCount } = await supabase.from('faculty').select('*', { count: 'exact', head: true });

    return {
        messages: messagesCount || 0,
        admissions: admissionsCount || 0,
        toppers: toppersCount || 0,
        faculty: facultyCount || 0,
    };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
                <p className="text-navy-300">Welcome back, here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Contact Messages" value={stats.messages} change="Needs attention" color="teal" href="/admin/contacts" />
                <StatCard title="Admission Inquiries" value={stats.admissions} change="New submissions" color="gold" href="/admin/admissions" />
                <StatCard title="Toppers Listed" value={stats.toppers} change="Academic excellence" color="amber" href="/admin/toppers" />
                <StatCard title="Faculty Members" value={stats.faculty} change="Teaching staff" color="emerald" href="/admin/faculty" />
            </div>

            <div className="p-6 rounded-2xl bg-navy-900/50 border border-navy-700/50 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <QuickActionCard href="/admin/admissions" label="View Admissions" />
                    <QuickActionCard href="/admin/toppers" label="Add Toppers" />
                    <QuickActionCard href="/admin/faculty" label="Manage Faculty" />
                    <QuickActionCard href="/admin/gallery" label="Update Gallery" />
                    <QuickActionCard href="/admin/slc" label="Manage SLC" />
                    <QuickActionCard href="/admin/contacts" label="View Messages" />
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, change, color, href }: { title: string, value: number, change: string, color: string, href?: string }) {
    const gradients = {
        teal: 'from-teal-500 to-emerald-500',
        gold: 'from-amber-500 to-orange-500',
        indigo: 'from-indigo-500 to-purple-500',
        purple: 'from-purple-500 to-pink-500',
        amber: 'from-amber-500 to-yellow-500',
        emerald: 'from-emerald-500 to-teal-500',
    };

    const card = (
        <div className="relative overflow-hidden rounded-2xl bg-navy-900 border border-navy-700 p-6 group hover:border-navy-600 transition duration-300 cursor-pointer">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradients[color as keyof typeof gradients]} opacity-10 blur-3xl rounded-full transform translate-x-10 -translate-y-10 transition duration-500 group-hover:opacity-20`}></div>

            <p className="text-navy-400 font-medium mb-1">{title}</p>
            <div className="flex items-end justify-between">
                <h3 className="text-4xl font-bold text-white">{value}</h3>
            </div>
            <div className="mt-4 flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full bg-${color}-500/10 text-${color}-400 border border-${color}-500/20`}>
                    {change}
                </span>
            </div>
        </div>
    );

    return href ? <Link href={href}>{card}</Link> : card;
}

function QuickActionCard({ href, label }: { href: string, label: string }) {
    return (
        <Link href={href}>
            <div className="h-32 rounded-xl bg-navy-800/30 border border-navy-700/50 flex items-center justify-center text-navy-400 hover:border-teal-500/50 hover:bg-navy-800/50 transition cursor-pointer text-center p-4">
                {label}
            </div>
        </Link>
    );
}
