
import { createClient } from '@/lib/supabase-server';
import FacultyList from './faculty-list';
import FacultyForm from './faculty-form';

export const revalidate = 0;

export default async function FacultyAdminPage() {
    const supabase = await createClient();
    const { data: faculty } = await supabase
        .from('faculty')
        .select('*')
        .order('created_at', { ascending: true });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Manage Faculty</h1>
                    <p className="text-navy-400 text-sm mt-1">
                        {faculty?.length || 0} faculty member{faculty?.length !== 1 ? 's' : ''} listed
                    </p>
                </div>
            </div>

            <FacultyForm />
            <FacultyList initialFaculty={faculty || []} />
        </div>
    );
}

