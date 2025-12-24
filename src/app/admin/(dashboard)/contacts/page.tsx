
import { createClient } from '@/lib/supabase-server';
import ContactList from './contact-list';

export const revalidate = 0;

export default async function ContactsPage() {
    const supabase = await createClient();
    const { data: contacts } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Contact Messages</h1>
                    <p className="text-navy-400 text-sm mt-1">
                        {contacts?.length || 0} total message{contacts?.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>

            <ContactList initialContacts={contacts || []} />
        </div>
    );
}

