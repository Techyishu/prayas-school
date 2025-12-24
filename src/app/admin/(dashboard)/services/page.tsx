
import { createClient } from '@/lib/supabase-server';
import AddServiceForm from './add-service-form';
import ServiceList from './service-list';

export const revalidate = 0;

export default async function ServicesPage() {
    const supabase = await createClient();
    const { data: services } = await supabase.from('services').select('*').order('order_index', { ascending: true });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Manage Services</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-navy-900/50 border border-navy-700 rounded-2xl p-6 sticky top-24 backdrop-blur-sm">
                        <h2 className="text-lg font-semibold text-white mb-4">Add New Service</h2>
                        <AddServiceForm />
                    </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2">
                    <ServiceList initialServices={services || []} />
                </div>
            </div>
        </div>
    );
}
