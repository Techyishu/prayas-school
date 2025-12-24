
import { createClient } from '@/lib/supabase-server';

export const revalidate = 0;

async function getStats() {
    const supabase = await createClient();
    const { count: blogsCount } = await supabase.from('blogs').select('*', { count: 'exact', head: true });
    const { count: servicesCount } = await supabase.from('services').select('*', { count: 'exact', head: true });
    const { count: messagesCount } = await supabase.from('contact_submissions').select('*', { count: 'exact', head: true });

    return {
        blogs: blogsCount || 0,
        services: servicesCount || 0,
        messages: messagesCount || 0
    };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Detailed Overview</h2>
                <p className="text-navy-300">Welcome back, here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Blogs" value={stats.blogs} change="+2 this week" color="teal" />
                <StatCard title="Active Services" value={stats.services} change="All systems operational" color="gold" />
                <StatCard title="New Messages" value={stats.messages} change="Needs attention" color="indigo" />
            </div>

            <div className="p-6 rounded-2xl bg-navy-900/50 border border-navy-700/50 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Placeholder for quick actions */}
                    <div className="h-32 rounded-xl bg-navy-800/30 border border-navy-700/50 flex items-center justify-center text-navy-400 hover:border-teal-500/50 hover:bg-navy-800/50 transition cursor-pointer">
                        Add New Blog
                    </div>
                    <div className="h-32 rounded-xl bg-navy-800/30 border border-navy-700/50 flex items-center justify-center text-navy-400 hover:border-teal-500/50 hover:bg-navy-800/50 transition cursor-pointer">
                        Update Services
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, change, color }: { title: string, value: number, change: string, color: string }) {
    const gradients = {
        teal: 'from-teal-500 to-emerald-500',
        gold: 'from-amber-500 to-orange-500',
        indigo: 'from-indigo-500 to-purple-500'
    };

    return (
        <div className="relative overflow-hidden rounded-2xl bg-navy-900 border border-navy-700 p-6 group hover:border-navy-600 transition duration-300">
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
}
