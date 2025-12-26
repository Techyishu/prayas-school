"use client"

import { motion } from "framer-motion"
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card"
import { Users, Target, Eye, Award, CheckCircle2, Linkedin, Building2, ArrowRight, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const values = [
    {
        icon: Target,
        title: "Academic Excellence",
        description: "Committed to providing quality education with experienced teachers and modern teaching methods.",
        gradient: "from-teal-500 to-emerald-600",
    },
    {
        icon: Globe,
        title: "Holistic Development",
        description: "Focus on overall growth including academics, sports, arts, and character building.",
        gradient: "from-blue-500 to-indigo-600",
    },
    {
        icon: Eye,
        title: "Integrity & Values",
        description: "Building strong moral foundations and ethical values in every student.",
        gradient: "from-gold-500 to-amber-600",
    },
    {
        icon: Award,
        title: "Modern Infrastructure",
        description: "State-of-the-art facilities including smart classrooms, labs, and sports grounds.",
        gradient: "from-purple-500 to-pink-600",
    },
]

const stats = [
    { value: "20+", label: "Years of Excellence", description: "Since inception" },
    { value: "1000+", label: "Students Enrolled", description: "Nurturing young minds" },
    { value: "50+", label: "Expert Teachers", description: "Highly qualified faculty" },
    { value: "95%", label: "Board Results", description: "Consistent high performance" },
    { value: "2", label: "Campuses", description: "In Karnal region" },
    { value: "100%", label: "Success Rate", description: "In student development" },
]

const certifications = [
    "CBSE Affiliated School",
    "ISO 9001:2015 Certified",
    "Government Recognized Institution",
    "State-of-the-Art Smart Classrooms",
    "Qualified & Experienced Teaching Staff",
]

const offices = [
    { city: "Main Campus", address: "Opposite Batra Filling Station, Karnal Kunjpura Road, Kunjpura", phone: "9812026095" },
]

const milestones = [
    { year: "2000", event: "Founded with a vision to provide quality education" },
    { year: "2005", event: "Expanded to include middle school program" },
    { year: "2010", event: "Added high school with science, commerce, and arts" },
    { year: "2015", event: "Inaugurated new campus with modern facilities" },
    { year: "2024", event: "Celebrating 20+ years of academic excellence with 1000+ students" },
]

export default function AboutPage() {
    const handleWhatsApp = () => {
        window.open("https://wa.me/919812026095?text=Hi, I'd like to learn more about Prayas School", "_blank")
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

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-teal-400 text-sm font-semibold uppercase tracking-wide mb-6">
                            Established 2000
                        </span>
                        <h1 className="heading-xl text-white mb-6">
                            About <span className="gradient-text-gold">Prayas School</span>
                        </h1>
                        <p className="text-xl text-blue-100/80 leading-relaxed">
                            With a commitment to excellence, Prayas School nurtures young minds to become
                            responsible citizens and lifelong learners through quality education and holistic development.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 -mt-16 relative z-20">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <GlassCard className="h-full p-6 text-center">
                                    <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                                    <div className="text-sm font-semibold text-navy-900">{stat.label}</div>
                                    <div className="text-xs text-gray-500 mt-1">{stat.description}</div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-br from-teal-500/20 to-gold-500/20 rounded-3xl blur-2xl" />
                            <img
                                src="/school-1.jpeg"
                                alt="Prayas School Campus"
                                className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/3] bg-gray-100"
                            />
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <div>
                                <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-600 text-sm font-semibold uppercase tracking-wide mb-4">
                                    Our Story
                                </span>
                                <h2 className="heading-lg text-navy-900 mb-6">
                                    Nurturing <span className="gradient-text">Young Minds</span>
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                    Prayas School, located in Karnal, Haryana, has been a beacon of
                                    quality education for over two decades. With experienced teachers and modern infrastructure,
                                    we serve as one of Haryana's premier educational institutions.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Our school's mission is to provide holistic education that develops academic excellence,
                                    moral values, and life skills. We strive to prepare students to become
                                    responsible citizens and lifelong learners.
                                </p>
                            </div>

                            {/* Certifications */}
                            <div className="space-y-3">
                                <h4 className="font-semibold text-navy-900">Our Certifications:</h4>
                                {certifications.slice(0, 3).map((cert, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-teal-500/10 flex items-center justify-center">
                                            <CheckCircle2 className="h-4 w-4 text-teal-600" />
                                        </div>
                                        <span className="text-gray-700 text-sm">{cert}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Director's Message Section */}
            <section className="py-24 bg-aliceblue">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative lg:order-last"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-br from-gold-500/20 to-teal-500/20 rounded-3xl blur-2xl" />
                            <img
                                src="/md-photo.jpeg"
                                alt="Managing Director"
                                className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[3/4]"
                            />
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 text-gold-600 text-sm font-semibold uppercase tracking-wide">
                                Leadership
                            </span>
                            <h2 className="heading-lg text-navy-900">
                                Message from the <span className="gradient-text">Managing Director</span>
                            </h2>
                            <blockquote className="text-xl italic text-navy-800 border-l-4 border-gold-500 pl-6 my-6">
                                "Education is not just about academic excellence, but about character building and holistic development."
                            </blockquote>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                At Prayas School, we believe in nurturing every child's potential. Our goal is to create an environment where students feel safe, valued, and inspired to learn. We are committed to providing the best facilities and faculty to ensure our students succeed in all walks of life.
                            </p>
                            <div className="pt-4">
                                <p className="font-bold text-navy-900 text-lg">Managing Director</p>
                                <p className="text-teal-600">Prayas School</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-600 text-sm font-semibold uppercase tracking-wide mb-4">
                            Why Choose Prayas
                        </span>
                        <h2 className="heading-lg text-navy-900">The Prayas Advantage</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => {
                            const Icon = value.icon
                            return (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <GlassCard glow="teal" className="h-full p-8 text-center">
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                                            <Icon className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-navy-900 mb-3">{value.title}</h3>
                                        <p className="text-gray-600">{value.description}</p>
                                    </GlassCard>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-24">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-600 text-sm font-semibold uppercase tracking-wide mb-4">
                            Our Journey
                        </span>
                        <h2 className="heading-lg text-navy-900">20+ Years of Excellence</h2>
                    </motion.div>

                    <div className="max-w-3xl mx-auto">
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 to-gold-500" />

                            {milestones.map((milestone, index) => (
                                <motion.div
                                    key={milestone.year}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative flex items-center gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} ml-12 md:ml-0`}>
                                        <div className="inline-block px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 text-sm font-bold mb-2">
                                            {milestone.year}
                                        </div>
                                        <p className="text-gray-700">{milestone.event}</p>
                                    </div>
                                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-teal-500 transform -translate-x-1/2" />
                                    <div className="flex-1 hidden md:block" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Offices Section */}
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
                        <h2 className="heading-lg text-navy-900">Our Campus</h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Located in Karnal, Haryana, with modern infrastructure and facilities,
                            we provide the best learning environment for students.
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
                                    <h3 className="font-bold text-navy-900 text-lg mb-2">{office.city}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{office.address}</p>
                                    <a
                                        href={`tel:${office.phone}`}
                                        className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700"
                                    >
                                        📞 {office.phone}
                                    </a>
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
                            Ready to Join Prayas School?
                        </h2>
                        <p className="text-blue-100/80 text-lg mb-8">
                            Join 1000+ students who are part of our educational family.
                            Schedule a school visit and experience our learning environment.
                        </p>
                        <Button onClick={handleWhatsApp} className="btn-gold text-lg px-8 py-6 rounded-xl">
                            Book a School Visit
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
