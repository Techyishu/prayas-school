
import { createClient } from '@/lib/supabase-server';
import VisaPhotosList from './visa-photos-list';
import UploadVisaPhoto from './upload-visa-photo';

export const revalidate = 0;

export default async function VisaPage() {
    const supabase = await createClient();
    const { data: visaPhotos } = await supabase.from('visa_photos').select('*').order('created_at', { ascending: false });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Verified Visa Photos</h1>
            </div>

            {/* Visa Photos Section */}
            <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Upload Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-navy-900/50 border border-navy-700 rounded-2xl p-6 sticky top-24 backdrop-blur-sm">
                            <h3 className="text-lg font-semibold text-white mb-4">Upload Visa Photo</h3>
                            <UploadVisaPhoto />
                        </div>
                    </div>

                    {/* Photos List Section */}
                    <div className="lg:col-span-2">
                        <VisaPhotosList initialPhotos={visaPhotos || []} />
                    </div>
                </div>
            </div>
        </div>
    );
}

