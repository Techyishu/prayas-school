
import { createClient } from '@/lib/supabase-server';
import TopperList from './topper-list';
import TopperForm from './topper-form';

export const revalidate = 0;

export default async function ToppersAdminPage() {
    const supabase = await createClient();
    const { data: toppers } = await supabase
        .from('toppers')
        .select('*')
        .order('year', { ascending: false })
        .order('rank', { ascending: true });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Manage Toppers</h1>
                    <p className="text-navy-400 text-sm mt-1">
                        {toppers?.length || 0} topper{toppers?.length !== 1 ? 's' : ''} listed
                    </p>
                </div>
            </div>

            <TopperForm />
            <TopperList initialToppers={toppers || []} />
        </div>
    );
}

