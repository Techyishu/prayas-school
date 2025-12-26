
import Image from "next/image";

const faculty = [
    { name: "Mrs. Sharma", role: "Principal", subject: "Administration", exp: "20+ Years" },
    { name: "Mr. Verma", role: "Vice Principal", subject: "Mathematics", exp: "15+ Years" },
    { name: "Mrs. Gupta", role: "Senior Teacher", subject: "English", exp: "12+ Years" },
    { name: "Mr. Singh", role: "Science HOD", subject: "Physics", exp: "10+ Years" },
    { name: "Ms. Kaur", role: "Coordinator", subject: "Social Studies", exp: "8+ Years" },
    { name: "Mr. Reddy", role: "Sports Director", subject: "Physical Education", exp: "10+ Years" },
];

export default function FacultyPage() {
    return (
        <div className="pt-24 pb-16">
            <section className="bg-navy-50 py-16">
                <div className="container-custom text-center">
                    <h1 className="text-4xl font-bold text-navy-900 mb-4">Our Faculty</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Our team of dedicated educators is the backbone of Prayas School.
                        Qualified, experienced, and passionate about shaping the future leaders of tomorrow.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {faculty.map((member, idx) => (
                            <div key={idx} className="bg-white border hover:border-teal-500 transition-colors p-6 rounded-2xl shadow-sm text-center group">
                                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden relative">
                                    {/* Placeholder generic avatar */}
                                    <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-400">
                                        👤
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-navy-900">{member.name}</h3>
                                <p className="text-teal-600 font-medium mb-2">{member.role}</p>
                                <hr className="w-12 border-teal-200 mx-auto my-3" />
                                <div className="text-sm text-gray-500 space-y-1">
                                    <p><strong>Subject:</strong> {member.subject}</p>
                                    <p><strong>Experience:</strong> {member.exp}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-teal-900 text-white py-16 mt-12">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
                    <p className="mb-8 text-teal-100">We are always looking for passionate educators to join us.</p>
                    <button className="px-8 py-3 bg-white text-teal-900 rounded-xl font-bold hover:bg-teal-50 transition-colors">Career Opportunities</button>
                </div>
            </section>
        </div>
    );
}
