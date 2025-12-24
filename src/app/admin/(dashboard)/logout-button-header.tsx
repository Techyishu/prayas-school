'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutButtonHeader() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);

    async function handleLogout() {
        setLoading(true);
        await supabase.auth.signOut();
        router.push('/admin/login');
        router.refresh();
    }

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-navy-800 border border-navy-700 hover:bg-red-500/10 hover:border-red-500/50 text-navy-300 hover:text-red-400 transition-all duration-200"
            title="Logout"
        >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">{loading ? 'Logging out...' : 'Logout'}</span>
        </button>
    );
}

