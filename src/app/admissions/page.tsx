
"use client";

import { FileText, Calendar, CreditCard, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdmissionsPage() {
    return (
        <div className="pt-24 pb-16">
            {/* Hero */}
            <section className="bg-teal-900 py-20 text-white">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Family</h1>
                    <p className="text-xl text-teal-100 max-w-2xl mx-auto">
                        Admission process for the academic year 2025-26 is now open.
                    </p>
                </div>
            </section>

            {/* Admission Process Steps */}
            <section className="py-20">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold text-navy-900 text-center mb-16">Admission Process</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { icon: FileText, title: "1. Registration", desc: "Fill the online enquiry form or visit the school office." },
                            { icon: Calendar, title: "2. Interaction", desc: "Schedule a visit and interaction with faculty." },
                            { icon: CheckCircle, title: "3. Verification", desc: "Document verification and eligibility check." },
                            { icon: CreditCard, title: "4. Confirmation", desc: "Pay the fee to secure the seat." }
                        ].map((step, idx) => (
                            <div key={idx} className="text-center relative">
                                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600">
                                    <step.icon className="h-8 w-8" />
                                </div>
                                <h3 className="font-bold text-lg text-navy-900 mb-2">{step.title}</h3>
                                <p className="text-sm text-gray-600">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Criteria & Documents */}
            <section className="py-20 bg-gray-50">
                <div className="container-custom grid md:grid-cols-2 gap-12">
                    {/* Eligibility */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                        <h3 className="text-2xl font-bold text-navy-900 mb-6">Eligibility Criteria</h3>
                        <ul className="space-y-4 text-gray-600">
                            <li className="flex items-start gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-teal-500 shrink-0" />
                                <span><strong>Pre-Nursery:</strong> Age 2.5+ years as of March 31st.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-teal-500 shrink-0" />
                                <span><strong>Nursery:</strong> Age 3.5+ years as of March 31st.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-teal-500 shrink-0" />
                                <span><strong>Class 1 onwards:</strong> Based on previous academic records and interaction.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Documents */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                        <h3 className="text-2xl font-bold text-navy-900 mb-6">Required Documents</h3>
                        <ul className="space-y-4 text-gray-600">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-teal-500 shrink-0" />
                                <span>Birth Certificate (Original & Photocopy)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-teal-500 shrink-0" />
                                <span>Passport size photographs of student & parents</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-teal-500 shrink-0" />
                                <span>Transfer Certificate (for Class 2 onwards)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-teal-500 shrink-0" />
                                <span>AADHAR Card copy</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Inquiry Form */}
            <section className="py-20">
                <div className="container-custom max-w-2xl">
                    <div className="bg-navy-950 text-white p-8 rounded-3xl shadow-xl">
                        <h2 className="text-3xl font-bold mb-6 text-center">Admission Inquiry</h2>
                        <form className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Parent's Name</label>
                                    <input type="text" className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-gold-500" placeholder="Your Name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                                    <input type="tel" className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-gold-500" placeholder="Mobile Number" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email Address</label>
                                <input type="email" className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-gold-500" placeholder="email@example.com" />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Student's Name</label>
                                    <input type="text" className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-gold-500" placeholder="Child's Name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Grade Applying For</label>
                                    <select className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-gold-500 [&>option]:text-black">
                                        <option>Select Grade</option>
                                        <option>Pre-Nursery</option>
                                        <option>Nursery</option>
                                        <option>KG</option>
                                        <option>Class 1-5</option>
                                        <option>Class 6-10</option>
                                        <option>Class 11-12</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Message</label>
                                <textarea rows={3} className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-gold-500" placeholder="Any specific requirements or questions?"></textarea>
                            </div>
                            <Button className="w-full btn-gold py-6 text-lg font-bold mt-4">Submit Inquiry</Button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
