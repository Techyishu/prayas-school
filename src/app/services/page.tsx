
import { supabase } from '@/lib/supabase';
import ServicesClient from './services-client';
import { GraduationCap, Globe, Users, Plane } from "lucide-react";

// Fallback data if DB is empty
const defaultServices = [
    {
        id: "uk",
        title: "Study in United Kingdom",
        icon: "GraduationCap",
        gradient: "from-blue-500 to-indigo-600",
        description: "Now is the opportune moment to transform your aspirations into actuality. Pursue education in the UK with world-class universities and post-study work rights.",
        // Map these to the 'details' JSON structure
        countries: ["🏛️ London", "🏛️ Birmingham", "🏛️ Leeds", "🏛️ Manchester"],
        features: ["UK Without IELTS Options", "1 Year MBA Programs", "Spouse Visa Available", "Post-Study Work Visa"],
        accordion: [
            {
                title: "Why Study in UK?",
                content: "World-renowned universities with global recognition. 1-year Master's programs (save time and money). 2-year post-study work visa (Graduate Route). Options available without IELTS."
            },
            {
                title: "Eligibility & Requirements",
                content: "Academic qualification (12th/Graduation), English proficiency (IELTS/PTE/MOI), Financial documents, Statement of Purpose, Passport with minimum 6 months validity."
            },
            {
                title: "Our UK Success",
                content: "Seabird has successfully facilitated 300+ UK study visas. We are British Council certified and have extensive partnerships with top UK universities."
            }
        ]
    },
    // ... keep minimal defaults or load all original ones if needed, 
    // but for brevity I'm implementing the fetching logic now.
];

export const revalidate = 60; // Revalidate every minute

export default async function ServicesPage() {
    const { data: services } = await supabase.from('services').select('*').order('order_index', { ascending: true });

    // If no services in DB, use default (or we could seed DB)
    // For now, let's just pass dynamic services if they exist, else empty array which the client will handle or show defaults
    // Actually, to preserve the site look, if DB is empty, let's pass null so the client can render the hardcoded list.

    const hasServices = services && services.length > 0;

    return <ServicesClient services={hasServices ? services : null} />;
}
