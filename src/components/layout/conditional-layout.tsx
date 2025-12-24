'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { CursorGlow } from '@/components/ui/cursor-glow';
import { WhatsAppButton } from '@/components/ui/whatsapp-button';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin');

    return (
        <>
            {!isAdminRoute && (
                <>
                    <CursorGlow />
                    <Navbar />
                    <WhatsAppButton />
                </>
            )}
            <main>{children}</main>
            {!isAdminRoute && <Footer />}
        </>
    );
}

