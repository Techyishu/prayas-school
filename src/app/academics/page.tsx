
import { GraduationCap, BookOpen, Brain, Trophy } from "lucide-react";
import Image from "next/image";

export default function AcademicsPage() {
    return (
        <div className="pt-24 pb-16">
            {/* Hero Section */}
            <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center bg-navy-950 overflow-hidden">
                <div className="absolute inset-0 bg-navy-900/50 z-10" />
                {/* Placeholder for hero image - you can replace with a real image */}
                <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-teal-900/50 mix-blend-multiply" />

                <div className="container-custom relative z-20 text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Academic Excellence</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Providing a comprehensive learning environment that nurtures intellectual growth and creativity.
                    </p>
                </div>
            </section>

            {/* Curriculum Overview */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-navy-900 mb-6">Curriculum Overview</h2>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Prayas School follows a robust curriculum designed to foster holistic development.
                                Whether adhering to CBSE, ICSE, or State Board standards (customize as per real data),
                                our academic programs are tailored to meet the varying needs of students at different developmental stages.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                We emphasize conceptua learning, critical thinking, and practical application of knowledge,
                                moving beyond rote memorization to true understanding.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-teal-50 p-6 rounded-2xl text-center">
                                <Brain className="h-10 w-10 text-teal-600 mx-auto mb-4" />
                                <h3 className="font-semibold text-navy-900">Holistic Growth</h3>
                            </div>
                            <div className="bg-gold-50 p-6 rounded-2xl text-center">
                                <BookOpen className="h-10 w-10 text-gold-600 mx-auto mb-4" />
                                <h3 className="font-semibold text-navy-900">Expert Faculty</h3>
                            </div>
                            <div className="bg-blue-50 p-6 rounded-2xl text-center">
                                <GraduationCap className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                                <h3 className="font-semibold text-navy-900">Global Standards</h3>
                            </div>
                            <div className="bg-purple-50 p-6 rounded-2xl text-center">
                                <Trophy className="h-10 w-10 text-purple-600 mx-auto mb-4" />
                                <h3 className="font-semibold text-navy-900">Student Success</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Programs */}
            <section className="py-20 bg-gray-50">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold text-navy-900 mb-12 text-center">Our Programs</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Pre-Primary */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                                <span className="text-2xl">🌱</span>
                            </div>
                            <h3 className="text-xl font-bold text-navy-900 mb-3">Pre-Primary</h3>
                            <p className="text-gray-600 mb-4">
                                Play-based learning focusing on sensory development, social skills, and foundational literacy.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>• Playgroup & Nursery</li>
                                <li>• Kindergarten (LKG & UKG)</li>
                                <li>• Activity-based curriculum</li>
                            </ul>
                        </div>

                        {/* Primary & Middle */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                <span className="text-2xl">📚</span>
                            </div>
                            <h3 className="text-xl font-bold text-navy-900 mb-3">Primary & Middle</h3>
                            <p className="text-gray-600 mb-4">
                                Building strong academic foundations with a balanced mix of core subjects and co-curriculars.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>• Class 1 to 8</li>
                                <li>• Project-based learning</li>
                                <li>• Computer education & arts</li>
                            </ul>
                        </div>

                        {/* Senior Secondary */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-gold-100 rounded-xl flex items-center justify-center mb-6">
                                <span className="text-2xl">🎓</span>
                            </div>
                            <h3 className="text-xl font-bold text-navy-900 mb-3">Senior Secondary</h3>
                            <p className="text-gray-600 mb-4">
                                Specialized streams preparing students for board exams and higher education entrance.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>• Science (Medical & Non-Medical)</li>
                                <li>• Commerce & Humanities</li>
                                <li>• Competitive exam prep</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Assessment System */}
            <section className="py-20 bg-white">
                <div className="container-custom text-center max-w-4xl">
                    <h2 className="text-3xl font-bold text-navy-900 mb-8">Assessment & Methodology</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        We employ a continuous and comprehensive evaluation system. Regular assignments, projects,
                        and periodic tests ensure that learning gaps are identified and addressed promptly.
                        Smart classes and modern laboratories support our experiential learning methodology.
                    </p>
                </div>
            </section>
        </div>
    );
}
