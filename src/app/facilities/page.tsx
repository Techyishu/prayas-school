
import { Computer, Beaker, Library, Bus, Utensils, HeartPulse } from "lucide-react";

export default function FacilitiesPage() {
    const facilities = [
        { icon: Computer, title: "Smart Classrooms", desc: "Digital learning enabled classrooms with projector and audio-visual aids." },
        { icon: Library, title: "Library", desc: "Well-stocked library with a vast collection of books, journals, and digital resources." },
        { icon: Beaker, title: "Laboratories", desc: "Modern Science, Computer, and Math labs for practical learning." },
        { icon: Bus, title: "Transportation", desc: "Safe and GPS-enabled bus fleet covering all major routes in Karnal." },
        { icon: HeartPulse, title: "Medical Room", desc: "First-aid assistance with a qualified nurse on campus." },
        { icon: Utensils, title: "Cafeteria", desc: "Hygienic and nutritious meals provided in a clean environment." },
    ];

    return (
        <div className="pt-24 pb-16">
            <section className="bg-gray-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2938&auto=format&fit=crop')] bg-cover bg-center" />
                <div className="container-custom relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">World-Class Facilities</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                        Creating an environment where students can thrive, learn, and grow safely.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {facilities.map((fac, idx) => (
                            <div key={idx} className="p-8 border border-gray-100 rounded-3xl hover:shadow-lg transition-shadow bg-gray-50/50">
                                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-teal-600">
                                    <fac.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-bold text-navy-900 mb-3">{fac.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {fac.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sports Infrastructure Section */}
            <section className="py-20 bg-teal-50">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-navy-900 mb-6">Sports Infrastructure</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                We believe in the power of sports to build character and discipline. Our campus includes extensive facilities for both indoor and outdoor sports.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 font-medium text-navy-800">
                                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span> Football Ground
                                </li>
                                <li className="flex items-center gap-3 font-medium text-navy-800">
                                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span> Cricket Pitch
                                </li>
                                <li className="flex items-center gap-3 font-medium text-navy-800">
                                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span> Basketball Court
                                </li>
                                <li className="flex items-center gap-3 font-medium text-navy-800">
                                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span> Indoor Sports Hall (Table Tennis, Chess)
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 h-80 bg-gray-200 rounded-3xl overflow-hidden relative">
                            {/* Placeholder for sports image */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                                Sports Facility Image
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
