"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, MessageCircle, CheckCircle } from "lucide-react"

const features = [
    "Pay only after visa approval",
    "Free consultation at all branches",
    "18+ years of experience",
    "100% student visa success rate",
]

export function CtaSection() {
    const handleWhatsApp = () => {
        window.open("https://wa.me/919653505005?text=Hi, I'd like to book a free consultation for study abroad", "_blank")
    }

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-navy-gradient" />

            {/* Animated gradient */}
            <motion.div
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(45deg, rgba(13, 148, 136, 0.2), rgba(245, 158, 11, 0.15), rgba(13, 148, 136, 0.2))",
                    backgroundSize: "200% 200%",
                }}
            />

            {/* Grid pattern */}
            <div className="absolute inset-0 grid-pattern opacity-20" />

            {/* Floating orbs */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-10 left-[5%] w-48 h-48 bg-teal-500/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    y: [0, 20, 0],
                    x: [0, -10, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 right-[10%] w-64 h-64 bg-gold-500/15 rounded-full blur-3xl"
            />

            {/* Geometric shapes */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute top-20 right-[20%] w-24 h-24 border-2 border-white/10 rounded-full"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-32 left-[15%] w-16 h-16 border-2 border-white/10 rotate-45"
            />

            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
                    >
                        <span className="text-sm text-blue-100 font-medium">
                            🎓 Want to Study in UK Without IELTS? Ask Us How!
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="heading-lg text-white mb-6"
                    >
                        Ready to Start Your{" "}
                        <span className="gradient-text-gold">Study Abroad</span>{" "}
                        Journey?
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-blue-100/80 mb-8 max-w-2xl mx-auto"
                    >
                        Join 18,000+ students who trusted Seabird Education to achieve their dreams.
                        Book a free consultation with our certified counsellors today!
                    </motion.p>

                    {/* Features */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-4 mb-10"
                    >
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm"
                            >
                                <CheckCircle className="h-4 w-4 text-teal-400" />
                                <span className="text-sm text-blue-100">{feature}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Button
                            onClick={handleWhatsApp}
                            className="btn-gold text-lg px-8 py-7 rounded-xl group"
                        >
                            <MessageCircle className="mr-2 h-5 w-5" />
                            WhatsApp: 096535 05005
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <a href="tel:+919653505005">
                            <Button
                                variant="outline"
                                className="btn-glass text-lg px-8 py-7 rounded-xl group"
                            >
                                <Phone className="mr-2 h-5 w-5" />
                                Call Now
                            </Button>
                        </a>
                    </motion.div>

                    {/* Trust indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 flex flex-wrap items-center justify-center gap-8 text-blue-200/60 text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <span>✓</span>
                            <span>British Council Certified</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>✓</span>
                            <span>QEAC Certified</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>✓</span>
                            <span>Since 2007</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>✓</span>
                            <span>5 Offices in Punjab</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
