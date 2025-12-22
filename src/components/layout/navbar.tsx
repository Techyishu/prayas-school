"use client"

import * as React from "react"
import Link from "next/link"
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
        { href: "/services", label: t("services") },
        { href: "/about", label: t("about") },
        { href: "/blog", label: t("blog") },
        { href: "/contact", label: t("contact") },
    ]

    const handleWhatsApp = () => {
        window.open("https://wa.me/917870478704?text=Hi, I'd like to book a free consultation", "_blank")
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
                    isScrolled
                        ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-navy-950/5"
                        : "bg-transparent"
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
                            className={cn(
                                "font-bold text-2xl tracking-tight transition-colors",
                                isScrolled ? "text-navy-900" : "text-white"
                            )}
                        >
                            Seabird<span className="text-teal-500">.</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "relative font-medium text-sm transition-colors py-2",
                                        isScrolled
                                            ? pathname === link.href
                                                ? "text-teal-600"
                                                : "text-gray-600 hover:text-teal-600"
                                            : pathname === link.href
                                                ? "text-white"
                                                : "text-blue-100/80 hover:text-white"
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
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                                    isScrolled
                                        ? "text-gray-600 hover:bg-gray-100"
                                        : "text-blue-100/80 hover:text-white hover:bg-white/10"
                                )}
                            >
                                <Globe className="h-4 w-4" />
                                {language === "en" ? "हिंदी" : "EN"}
                            </button>

                            {/* CTA Button */}
                            <Button
                                onClick={handleWhatsApp}
                                className={cn(
                                    "rounded-xl font-semibold transition-all",
                                    isScrolled
                                        ? "btn-gold"
                                        : "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
                                )}
                            >
                                <Phone className="mr-2 h-4 w-4" />
                                078704 78704
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={cn(
                                "lg:hidden p-2 rounded-lg transition-colors",
                                isScrolled
                                    ? "text-navy-900 hover:bg-gray-100"
                                    : "text-white hover:bg-white/10"
                            )}
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
                                        Call 078704 78704
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
