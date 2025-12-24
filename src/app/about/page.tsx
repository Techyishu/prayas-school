"use client"

import { motion } from "framer-motion"
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card"
import { Users, Target, Eye, Award, CheckCircle2, Linkedin, Building2, ArrowRight, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const values = [
    {
        icon: Target,
        title: "Expertise",
        description: "Decades of experience in immigration services with a 100% success ratio for student visas.",
        gradient: "from-teal-500 to-emerald-600",
    },
    {
        icon: Globe,
        title: "Global Reach",
        description: "International branches in UK and Australia, with office in Karnal, Haryana for seamless processes.",
        gradient: "from-blue-500 to-indigo-600",
    },
    {
        icon: Eye,
        title: "Transparency",
        description: "We only charge processing fees after visa approval. No hidden fees, no false promises.",
        gradient: "from-gold-500 to-amber-600",
    },
    {
        icon: Award,
        title: "Certified Counsellors",
        description: "QUEAC, British Council, and Canada certified professionals guiding your journey.",
        gradient: "from-purple-500 to-pink-600",
    },
]

const stats = [
    { value: "18+", label: "Years of Experience", description: "Established in 2007" },
    { value: "18,000+", label: "Visas Processed", description: "Success stories created" },
    { value: "70+", label: "Team Members", description: "Expert counsellors" },
    { value: "5+", label: "Countries Served", description: "USA, UK, Canada, Australia, NZ" },
    { value: "1", label: "Office", description: "Located in Karnal, Haryana" },
    { value: "100%", label: "Success Rate", description: "For student visas" },
]

const certifications = [
    "QUEAC (Qualified Education Agent Counsellor) - Australia",
    "British Council Certified - UK",
    "Canada Course Graduate Certified",
    "Education New Zealand Trained Agent",
    "Qualified Professional Development in UK Education",
]

const offices = [
    { city: "Karnal (Head Office)", address: "Mugal Canal Rd, near Ladla Bakery Chowk, Old Char Chaman, Dyal Singh Colony, Karnal, Haryana 132001", phone: "096535 05005" },
]

const milestones = [
    { year: "2007", event: "Founded with a vision to democratize international education" },
    { year: "2012", event: "Established strong presence in education consultancy" },
    { year: "2017", event: "Reached 5,000+ successful visa applications milestone" },
    { year: "2020", event: "Established international branches in UK and Australia" },
    { year: "2024", event: "Crossed 18,000+ visas processed with 100% student visa success rate" },
]

export default function AboutPage() {
    const handleWhatsApp = () => {
        window.open("https://wa.me/919653505005?text=Hi, I'd like to learn more about Seabird Education", "_blank")
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
                            Established 2007
                        </span>
                        <h1 className="heading-xl text-white mb-6">
                            About <span className="gradient-text-gold">Seabird International</span>
                        </h1>
                        <p className="text-xl text-blue-100/80 leading-relaxed">
                            With a commitment to excellence, Seabird helps you navigate the complexities of
                            immigration processes, ensuring a smooth and successful journey to your dream destination.
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
                                src="/office-building.jpg"
                                alt="Seabird Education Office"
                                className="relative rounded-2xl shadow-2xl w-full object-contain aspect-[4/3] bg-gray-100"
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
                                    Unlocking <span className="gradient-text">Global Opportunities</span>
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                    Seabird International, headquartered in Karnal, Haryana, has been a leading force
                                    in revolutionizing international education and immigration since 2007. With over 70 employees
                                    and a dedicated team, we serve as Haryana's premier education specialist.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Our organization's mission is to help students realize their dreams of studying at
                                    international universities. We strive to overcome any obstacles by bringing in qualified
                                    experts with international certifications.
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
                            Why Choose Seabird
                        </span>
                        <h2 className="heading-lg text-navy-900">The Seabird Advantage</h2>
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
                        <h2 className="heading-lg text-navy-900">18 Years of Excellence</h2>
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
                        <h2 className="heading-lg text-navy-900">Our Office</h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Located in Karnal, Haryana, with international offices in UK & Australia,
                            we're always close to you.
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
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-blue-100/80 text-lg mb-8">
                            Join 18,000+ students who trusted Seabird to achieve their study abroad dreams.
                            Free consultation available at all our branches.
                        </p>
                        <Button onClick={handleWhatsApp} className="btn-gold text-lg px-8 py-6 rounded-xl">
                            Get Free Consultation
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
