"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone, Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"
import { ScrollProgress } from "@/components/ui/scroll-progress"

export function Navbar() {
    const { t, language, setLanguage } = useLanguage()
    const pathname = usePathname()
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { href: "/", label: t("home") },
        { href: "/about", label: t("about") },
        { href: "/academics", label: "Academics" },
        { href: "/admissions", label: "Admissions" },
        { href: "/faculty", label: "Faculty" },
        { href: "/facilities", label: "Facilities" },
        { href: "/gallery", label: "Gallery" },
        { href: "/contact", label: t("contact") },
    ]

    const handleWhatsApp = () => {
        window.open("https://wa.me/919812026095?text=Hi, I'd like to book a free consultation", "_blank")
    }

    return (
        <>
            <ScrollProgress />
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                    "bg-white shadow-lg shadow-navy-950/5"
                )}
            >
                {/* Glow effect on scroll */}
                {isScrolled && (
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-transparent to-gold-500/5 pointer-events-none" />
                )}

                <nav className="container-custom py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center"
                        >
                            <Image
                                src="/WhatsApp_Image_2025-12-26_at_10.51.54-removebg-preview.png"
                                alt="Prayas School Logo"
                                width={150}
                                height={60}
                                className="h-12 w-auto object-contain"
                                priority
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "relative font-medium text-sm transition-colors py-2",
                                        pathname === link.href
                                            ? "text-teal-600"
                                            : "text-gray-600 hover:text-teal-600"
                                    )}
                                >
                                    {link.label}
                                    {pathname === link.href && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-400 rounded-full"
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Right Side */}
                        <div className="hidden lg:flex items-center gap-4">
                            {/* Language Toggle */}
                            <button
                                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors text-gray-600 hover:bg-gray-100"
                            >
                                <Globe className="h-4 w-4" />
                                {language === "en" ? "हिंदी" : "EN"}
                            </button>

                            {/* CTA Button */}
                            <Button
                                onClick={handleWhatsApp}
                                className="rounded-xl font-semibold transition-all btn-gold"
                            >
                                <Phone className="mr-2 h-4 w-4" />
                                Admissions Open
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-lg transition-colors text-navy-900 hover:bg-gray-100"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden bg-white border-t overflow-hidden"
                        >
                            <div className="container-custom py-6 space-y-4">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={cn(
                                                "block py-3 text-lg font-medium transition-colors",
                                                pathname === link.href
                                                    ? "text-teal-600"
                                                    : "text-gray-600 hover:text-teal-600"
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: navLinks.length * 0.05 }}
                                    className="pt-4"
                                >
                                    <Button
                                        onClick={handleWhatsApp}
                                        className="w-full btn-gold rounded-xl py-6"
                                    >
                                        <Phone className="mr-2 h-5 w-5" />
                                        Call 9812026095
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </>
    )
}
