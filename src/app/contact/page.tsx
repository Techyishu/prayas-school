"use client"

import { motion } from "framer-motion"
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card"
import { ContactForm } from "@/components/sections/contact-form"
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

const contactInfo = [
    {
        icon: MapPin,
        title: "Head Office - Karnal",
        lines: ["Mugal Canal Rd, near Ladla Bakery Chowk", "Old Char Chaman, Dyal Singh Colony", "Karnal, Haryana 132001"],
        gradient: "from-teal-500 to-emerald-600",
    },
    {
        icon: Phone,
        title: "Phone",
        lines: ["096535 05005 (Front Desk)", "Toll Free Consultation"],
        gradient: "from-blue-500 to-indigo-600",
    },
    {
        icon: Mail,
        title: "Email",
        lines: ["inderdeolseabird@gmail.com"],
        gradient: "from-purple-500 to-pink-600",
    },
    {
        icon: Clock,
        title: "Office Hours",
        lines: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: Closed"],
        gradient: "from-amber-500 to-orange-600",
    },
]

const offices = [
    {
        city: "Karnal (Head Office)",
        address: "Mugal Canal Rd, near Ladla Bakery Chowk, Old Char Chaman, Dyal Singh Colony, Karnal, Haryana 132001",
        phone: "096535 05005",
        email: "inderdeolseabird@gmail.com"
    },
]

const faqs = [
    {
        question: "How long does a free consultation last?",
        answer: "Our free consultation typically lasts 30-45 minutes. During this time, we assess your profile, discuss your goals, and recommend the best study destination and pathway for you."
    },
    {
        question: "When do I need to pay your fees?",
        answer: "We only charge our processing fees AFTER your visa is approved. All payments for UK, Canada, and Australia study visas are made post-visa. No upfront consulting fees!"
    },
    {
        question: "Do you help with accommodation and settling abroad?",
        answer: "Yes! We provide comprehensive support including university accommodation guidance, pre-departure orientation, and connections to student communities abroad."
    },
    {
        question: "Can I study in UK without IELTS?",
        answer: "Yes, there are options to study in the UK without IELTS. We can guide you through MOI (Medium of Instruction) options and universities that accept alternative English proficiency proof."
    },
]

export default function ContactPage() {
    const handleWhatsApp = () => {
        window.open("https://wa.me/919653505005?text=Hi, I'd like to book a free consultation for study abroad", "_blank")
    }

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-navy-gradient" />
                <div className="absolute inset-0 grid-pattern opacity-30" />

                {/* Floating orbs */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-gold-500/15 rounded-full blur-3xl" />

                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-teal-400 text-sm font-semibold uppercase tracking-wide mb-6">
                            We're Here for You
                        </span>
                        <h1 className="heading-xl text-white mb-6">
                            Get in <span className="gradient-text-gold">Touch</span>
                        </h1>
                        <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
                            Have questions about studying abroad? Our certified counsellors are here to help.
                            Free consultation at all our branches!
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="py-16 -mt-16 relative z-20">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => {
                            const Icon = info.icon
                            return (
                                <motion.div
                                    key={info.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <GlassCard glow="teal" className="h-full p-6">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                                            <Icon className="h-7 w-7 text-white" />
                                        </div>
                                        <h3 className="font-bold text-navy-900 mb-3">{info.title}</h3>
                                        <div className="space-y-1">
                                            {info.lines.map((line, i) => (
                                                <p key={i} className="text-gray-600 text-sm">{line}</p>
                                            ))}
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
                <div className="container-custom">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            onClick={handleWhatsApp}
                            className="btn-gold text-lg px-8 py-6 rounded-xl w-full sm:w-auto"
                        >
                            <MessageCircle className="mr-2 h-5 w-5" />
                            WhatsApp: 096535 05005
                        </Button>
                        <a href="tel:+919653505005">
                            <Button
                                variant="outline"
                                className="text-lg px-8 py-6 rounded-xl border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white w-full sm:w-auto"
                            >
                                <Phone className="mr-2 h-5 w-5" />
                                Call Now
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Form & FAQs Section */}
            <section className="py-24">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="mb-8">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-600 text-sm font-semibold uppercase tracking-wide mb-4">
                                    Send a Message
                                </span>
                                <h2 className="heading-md text-navy-900 mb-4">
                                    Contact Us for Expert Guidance
                                </h2>
                                <p className="text-gray-600">
                                    Fill out the form below and our team will get back to you within 24 hours
                                    with personalized guidance and support.
                                </p>
                            </div>
                            <ContactForm />
                        </motion.div>

                        {/* FAQs */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <div>
                                <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-600 text-sm font-semibold uppercase tracking-wide mb-4">
                                    Common Questions
                                </span>
                                <h2 className="heading-md text-navy-900 mb-6">
                                    Frequently Asked Questions
                                </h2>
                            </div>
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <GlassCard key={index} hover={false} className="p-6">
                                        <h4 className="font-semibold text-navy-900 mb-2">{faq.question}</h4>
                                        <p className="text-gray-600 text-sm">{faq.answer}</p>
                                    </GlassCard>
                                ))}
                            </div>

                            {/* Map */}
                            <div>
                                <h3 className="text-lg font-bold text-navy-900 mb-4">Find Us on Map</h3>
                                <GlassCard className="overflow-hidden">
                                    <div className="relative h-64">
                                        <iframe
                                            src="https://www.google.com/maps?q=Mugal+Canal+Rd,+near+Ladla+Bakery+Chowk,+Old+Char+Chaman,+Dyal+Singh+Colony,+Karnal,+Haryana+132001&output=embed"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            className="absolute inset-0"
                                        />
                                    </div>
                                </GlassCard>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* All Offices Section */}
            <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-600 text-sm font-semibold uppercase tracking-wide mb-4">
                            Visit Us
                        </span>
                        <h2 className="heading-lg text-navy-900">Our Office</h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Free consultation available. Walk in during office hours
                            or book an appointment for a dedicated session.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {offices.map((office, index) => (
                            <motion.div
                                key={office.city}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <GlassCard glow="teal" className="h-full p-6">
                                    <h3 className="font-bold text-navy-900 text-lg mb-3">{office.city}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{office.address}</p>
                                    <div className="space-y-2">
                                        <a
                                            href={`tel:${office.phone}`}
                                            className="flex items-center text-teal-600 font-medium hover:text-teal-700 text-sm"
                                        >
                                            <Phone className="h-4 w-4 mr-2" />
                                            {office.phone}
                                        </a>
                                        <a
                                            href={`mailto:${office.email}`}
                                            className="flex items-center text-gray-600 hover:text-teal-600 text-sm"
                                        >
                                            <Mail className="h-4 w-4 mr-2" />
                                            {office.email}
                                        </a>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-navy-gradient relative overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-20" />
                <div className="absolute top-10 left-10 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-gold-500/15 rounded-full blur-3xl" />

                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto"
                    >
                        <h2 className="heading-lg text-white mb-6">
                            Prefer a Direct Conversation?
                        </h2>
                        <p className="text-blue-100/80 text-lg mb-8">
                            Call our front desk or send a WhatsApp message. We're available Mon-Sat, 9 AM to 7 PM.
                            Response within 2 hours guaranteed!
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="tel:+919653505005">
                                <Button className="btn-gold text-lg px-8 py-6 rounded-xl w-full sm:w-auto">
                                    <Phone className="mr-2 h-5 w-5" />
                                    Call 096535 05005
                                </Button>
                            </a>
                            <Button
                                onClick={handleWhatsApp}
                                className="bg-[#25D366] hover:bg-[#20BD5A] text-white text-lg px-8 py-6 rounded-xl w-full sm:w-auto"
                            >
                                <MessageCircle className="mr-2 h-5 w-5" />
                                WhatsApp Us
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
