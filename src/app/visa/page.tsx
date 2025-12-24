import { createClient } from '@/lib/supabase-server';
import VisaClient from './visa-client';

export const revalidate = 60;

export default async function VisaPage() {
    const supabase = await createClient();
    const { data: visaTypes } = await supabase.from('visa_types').select('*').order('created_at', { ascending: false });
    const { data: visaPhotos } = await supabase.from('visa_photos').select('*').order('created_at', { ascending: false });

    return <VisaClient visaTypes={visaTypes || []} visaPhotos={visaPhotos || []} />;
}
