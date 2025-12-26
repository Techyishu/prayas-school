"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"

export function Footer() {
    const { t } = useLanguage()
    const currentYear = new Date().getFullYear()

    const handleWhatsApp = () => {
        window.open("https://wa.me/919653505005?text=Hi, I'd like to know more about your services", "_blank")
    }

    const footerLinks = {
        academics: [
            { label: "Pre-Primary", href: "/academics" },
            { label: "Primary School", href: "/academics" },
            { label: "Middle School", href: "/academics" },
            { label: "Senior Secondary", href: "/academics" },
            { label: "Co-curricular", href: "/facilities" },
        ],
        quickLinks: [
            { label: "Admissions Process", href: "/admissions" },
            { label: "Fee Structure", href: "/admissions" },
            { label: "Faculty", href: "/faculty" },
            { label: "Transport & Safety", href: "/facilities" },
            { label: "Gallery", href: "/gallery" },
        ],
        contact: [
            { label: "About Us", href: "/about" },
            { label: "Contact Us", href: "/contact" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
        ],
    }

    const offices = [
        { city: "Karnal (Head Office)", phone: "096535 05005" },
    ]

    const socialLinks = [
        { icon: Facebook, href: "https://www.facebook.com/prayasschool", label: "Facebook", hoverColor: "hover:bg-[#1877F2]" },
        { icon: Instagram, href: "https://www.instagram.com/prayasschool", label: "Instagram", hoverColor: "hover:bg-[#E4405F]" },
        { icon: Youtube, href: "https://www.youtube.com/prayasschool", label: "YouTube", hoverColor: "hover:bg-[#FF0000]" },
    ]

    return (
        <footer className="relative bg-navy-950 text-white overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

            {/* Newsletter Section */}
            <div className="border-b border-white/10">
                <div className="container-custom py-16">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left max-w-lg">
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">
                                Stay Updated with Prayas School
                            </h3>
                            <p className="text-blue-200/70">
                                Get the latest school updates, announcements, and educational news.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-blue-200/50 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 min-w-[280px]"
                            />
                            <Button className="btn-gold px-8 py-4 rounded-xl whitespace-nowrap">
                                Subscribe
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container-custom py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/WhatsApp_Image_2025-12-26_at_10.51.54-removebg-preview.png"
                                alt="Prayas School Logo"
                                width={180}
                                height={72}
                                className="h-14 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-blue-200/70 max-w-sm leading-relaxed">
                            Prayas School is dedicated to providing quality education and nurturing young minds to become
                            responsible citizens and lifelong learners.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-4 pt-4">
                            <div className="flex items-start gap-3 text-blue-100/80">
                                <MapPin className="h-5 w-5 text-teal-400 shrink-0 mt-1" />
                                <span>Opposite Batra Filling Station,<br />Karnal Kunjpura Road, Kunjpura</span>
                            </div>
                            <div className="flex items-center gap-3 text-blue-100/80">
                                <Phone className="h-5 w-5 text-teal-400 shrink-0" />
                                <span>+91 9812026095, +91 9050002491</span>
                            </div>
                            <a href="mailto:info@prayasschool.com" className="flex items-center gap-3 text-blue-200/80 hover:text-teal-400 transition-colors">
                                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <span>info@prayasschool.com</span>
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3 pt-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white transition-all duration-300 ${social.hoverColor} hover:scale-110`}
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Academics Column */}
                    <div>
                        <h4 className="font-semibold text-lg mb-6">Academics</h4>
                        <ul className="space-y-3">
                            {footerLinks.academics.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-blue-200/70 hover:text-teal-400 transition-colors inline-flex items-center gap-1 group"
                                    >
                                        <span>{link.label}</span>
                                        <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {footerLinks.quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-blue-200/70 hover:text-teal-400 transition-colors inline-flex items-center gap-1 group"
                                    >
                                        <span>{link.label}</span>
                                        <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="font-semibold text-lg mb-6">Information</h4>
                        <ul className="space-y-3">
                            {footerLinks.contact.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-blue-200/70 hover:text-teal-400 transition-colors inline-flex items-center gap-1 group"
                                    >
                                        <span>{link.label}</span>
                                        <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Offices */}
                <div className="mt-16 pt-8 border-t border-white/10">
                    <h4 className="font-semibold text-lg mb-6 text-center">Our Office</h4>
                    <div className="flex flex-wrap justify-center gap-6">
                        {offices.map((office) => (
                            <a
                                key={office.city}
                                href={`tel:${office.phone}`}
                                className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 hover:border-teal-500/50 hover:bg-white/10 transition-all text-center"
                            >
                                <div className="text-sm font-medium text-white">{office.city}</div>
                                <div className="text-xs text-blue-200/60">{office.phone}</div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container-custom py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-blue-200/60">
                        <p>© {currentYear} Prayas School. All rights reserved.</p>
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            <Link href="/privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-teal-400 transition-colors">Terms & Conditions</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
