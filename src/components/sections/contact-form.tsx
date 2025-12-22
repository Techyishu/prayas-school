"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { GlassCard } from "@/components/ui/glass-card"
import { useLanguage } from "@/lib/language-context"
import { Loader2, CheckCircle2, Send, User, Mail, Phone, MessageSquare, ChevronDown } from "lucide-react"

export function ContactForm() {
    const { t } = useLanguage()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        console.log("Form Submitted")
        setLoading(false)
        setSuccess(true)
    }

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                <GlassCard className="p-12 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-lg"
                    >
                        <CheckCircle2 className="h-10 w-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-navy-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                        Thank you for contacting us. Our team will get back to you within 24 hours.
                    </p>
                    <Button
                        onClick={() => setSuccess(false)}
                        variant="outline"
                        className="rounded-xl border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white px-8 py-3"
                    >
                        Send Another Message
                    </Button>
                </GlassCard>
            </motion.div>
        )
    }

    return (
        <GlassCard className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-navy-900 font-medium flex items-center gap-2">
                        <User className="h-4 w-4 text-teal-500" />
                        {t("formName")}
                    </Label>
                    <Input
                        id="name"
                        required
                        placeholder="John Doe"
                        className="h-12 rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500/20"
                    />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-navy-900 font-medium flex items-center gap-2">
                            <Mail className="h-4 w-4 text-teal-500" />
                            {t("formEmail")}
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            placeholder="john@example.com"
                            className="h-12 rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500/20"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-navy-900 font-medium flex items-center gap-2">
                            <Phone className="h-4 w-4 text-teal-500" />
                            {t("formPhone")}
                        </Label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            className="h-12 rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500/20"
                        />
                    </div>
                </div>

                {/* Visa Type */}
                <div className="space-y-2">
                    <Label htmlFor="visa-type" className="text-navy-900 font-medium">
                        {t("formVisaType")}
                    </Label>
                    <div className="relative">
                        <select
                            id="visa-type"
                            className="w-full h-12 rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                        >
                            <option value="">{t("selectVisaType")}</option>
                            <option value="student">{t("studentVisa")}</option>
                            <option value="work">{t("workVisa")}</option>
                            <option value="family">{t("familyVisa")}</option>
                            <option value="tourist">{t("touristVisa")}</option>
                            <option value="pr">PR / Immigration</option>
                            <option value="other">Other</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                    <Label htmlFor="message" className="text-navy-900 font-medium flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-teal-500" />
                        {t("formMessage")}
                    </Label>
                    <Textarea
                        id="message"
                        rows={5}
                        placeholder="Tell us about your requirements..."
                        className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 resize-none"
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full h-14 text-lg rounded-xl btn-gold"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send className="mr-2 h-5 w-5" />
                            {t("formSubmit")}
                        </>
                    )}
                </Button>

                {/* Privacy Note */}
                <p className="text-center text-sm text-gray-500">
                    By submitting this form, you agree to our{" "}
                    <a href="/privacy" className="text-teal-600 hover:underline">Privacy Policy</a>.
                </p>
            </form>
        </GlassCard>
    )
}
