
import { createClient } from '@/lib/supabase-server';
import AdmissionList from './admission-list';

export const revalidate = 0;

export default async function AdmissionsAdminPage() {
    const supabase = await createClient();
    const { data: admissions } = await supabase
        .from('admission_submissions')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Admission Inquiries</h1>
                    <p className="text-navy-400 text-sm mt-1">
                        {admissions?.length || 0} total submission{admissions?.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>

            <AdmissionList initialAdmissions={admissions || []} />
        </div>
    );
}

