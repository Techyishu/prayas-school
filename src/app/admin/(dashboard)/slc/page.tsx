import { createClient } from '@/lib/supabase-server';
import SLCForm from './slc-form';
import SLCList from './slc-list';

export const revalidate = 0;

export default async function SLCPage() {
    const supabase = await createClient();
    const { data: slcRecords } = await supabase.from('slc').select('*').order('created_at', { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Manage School Leaving Certificates</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-navy-900/50 border border-navy-700 rounded-2xl p-6 sticky top-24 backdrop-blur-sm">
                        <h2 className="text-lg font-semibold text-white mb-4">Add New SLC</h2>
                        <SLCForm />
                    </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2">
                    <SLCList initialRecords={slcRecords || []} />
                </div>
            </div>
        </div>
    );
}

