"use client"

import React, { createContext, useContext, useState } from "react"

type Language = "en" | "hi"

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const translations = {
    en: {
        home: "Home",
        services: "Services",
        visa: "Visa",
        gallery: "Gallery",
        about: "About Us",
        blog: "Blog",
        contact: "Contact",
        bookCall: "Book Free Call",
        heroTitle: "Expert Visa Guidance for USA, Canada & Australia",
        heroSubtitle: "Your trusted partner for specialized visa guidance. We make your immigration journey smooth and successful.",
        getStarted: "Get Started",
        exploreServices: "Explore Services",
        ourServices: "Our Services",
        readMore: "Read More",
        statsVisas: "Visas Approved",
        statsSuccess: "Success Rate",
        statsYears: "Years Experience",
        testimonials: "Client Stories",
        footerAddress: "Karnal, Haryana, India",
        footerQuickLinks: "Quick Links",
        footerFollowUs: "Follow Us",
        formName: "Full Name",
        formEmail: "Email Address",
        formPhone: "Phone Number",
        formVisaType: "Visa Type",
        formMessage: "Message",
        formSubmit: "Send Message",
        selectVisaType: "Select Visa Type",
        studentVisa: "Student Visa",
        workVisa: "Work Visa",
        familyVisa: "Family Visa",
        touristVisa: "Tourist Visa",
    },
    hi: {
        home: "होम",
        services: "सेवाएं",
        visa: "वीज़ा",
        gallery: "गैलरी",
        about: "हमारे बारे में",
        blog: "ब्लॉग",
        contact: "संपर्क करें",
        bookCall: "मुफ्त कॉल बुक करें",
        heroTitle: "अमेरिका, कनाडा और ऑस्ट्रेलिया के लिए विशेषज्ञ वीज़ा मार्गदर्शन",
        heroSubtitle: "विशेष वीज़ा मार्गदर्शन के लिए आपका विश्वसनीय साथी। हम आपकी आव्रजन यात्रा को सुगम और सफल बनाते हैं।",
        getStarted: "शुरू करें",
        exploreServices: "सेवाएं देखें",
        ourServices: "हमारी सेवाएं",
        readMore: "और पढ़ें",
        statsVisas: "वीज़ा स्वीकृत",
        statsSuccess: "सफलता दर",
        statsYears: "वर्षों का अनुभव",
        testimonials: "ग्राहकों की कहानियां",
        footerAddress: "करनाल, हरियाणा, भारत",
        footerQuickLinks: "त्वरित लिंक",
        footerFollowUs: "हमारा अनुसरण करें",
        formName: "पूरा नाम",
        formEmail: "ईमेल पता",
        formPhone: "फोन नंबर",
        formVisaType: "वीज़ा प्रकार",
        formMessage: "संदेश",
        formSubmit: "संदेश भेजें",
        selectVisaType: "वीज़ा प्रकार चुनें",
        studentVisa: "छात्र वीज़ा",
        workVisa: "कार्य वीज़ा",
        familyVisa: "परिवार वीज़ा",
        touristVisa: "पर्यटक वीज़ा",
    }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("en")

    const t = (key: string) => {
        // @ts-ignore
        return translations[language][key] || key
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
