'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-navy-300 hover:text-white hover:bg-red-500/10 border border-navy-700 hover:border-red-500/50 transition-all duration-200 group"
        >
            <LogOut className="w-5 h-5 group-hover:text-red-400 transition-colors" />
            <span className="font-medium">{loading ? 'Logging out...' : 'Logout'}</span>
        </button>
    );
}

