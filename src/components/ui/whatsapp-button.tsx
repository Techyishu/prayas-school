"use client"

import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function WhatsAppButton() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Show button after scrolling down a bit
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleWhatsApp = () => {
        window.open("https://wa.me/919812026095?text=Hi, I have a query regarding admissions", "_blank")
    }

    return (
        <motion.button
            onClick={handleWhatsApp}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
                scale: isVisible ? 1 : 0,
                opacity: isVisible ? 1 : 0
            }}
            transition={{ duration: 0.3, type: "spring" }}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg shadow-[#25D366]/50 hover:shadow-xl hover:shadow-[#25D366]/60 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            aria-label="Contact us on WhatsApp"
        >
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        </motion.button>
    )
}
