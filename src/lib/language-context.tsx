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
        bookCall: "Book a Visit",
        heroTitle: "Nurturing Young Minds for a Brighter Future",
        heroSubtitle: "Prayas School is dedicated to providing quality education and holistic development for students to become responsible citizens and lifelong learners.",
        getStarted: "Enroll Now",
        exploreServices: "Explore Programs",
        ourServices: "Our Programs",
        readMore: "Read More",
        statsVisas: "Students Enrolled",
        statsSuccess: "Pass Rate",
        statsYears: "Years of Excellence",
        testimonials: "Student Success Stories",
        footerAddress: "Karnal, Haryana, India",
        footerQuickLinks: "Quick Links",
        footerFollowUs: "Follow Us",
        formName: "Full Name",
        formEmail: "Email Address",
        formPhone: "Phone Number",
        formVisaType: "Grade Level",
        formMessage: "Message",
        formSubmit: "Send Message",
        selectVisaType: "Select Grade",
        studentVisa: "Primary School",
        workVisa: "Middle School",
        familyVisa: "High School",
        touristVisa: "Pre-School",
    },
    hi: {
        home: "होम",
        services: "सेवाएं",
        visa: "वीज़ा",
        gallery: "गैलरी",
        about: "हमारे बारे में",
        blog: "ब्लॉग",
        contact: "संपर्क करें",
        bookCall: "विजिट बुक करें",
        heroTitle: "उज्ज्वल भविष्य के लिए युवा मनों को विकसित करना",
        heroSubtitle: "प्रयास स्कूल छात्रों को जिम्मेदार नागरिक और आजीवन अध्ययनकर्ता बनने के लिए गुणवत्तापूर्ण शिक्षा और समग्र विकास प्रदान करने के लिए समर्पित है।",
        getStarted: "अभी नामांकित करें",
        exploreServices: "कार्यक्रम देखें",
        ourServices: "हमारे कार्यक्रम",
        readMore: "और पढ़ें",
        statsVisas: "छात्र नामांकित",
        statsSuccess: "पास प्रतिशत",
        statsYears: "उत्कृष्टता के वर्ष",
        testimonials: "छात्र सफलता कहानियां",
        footerAddress: "करनाल, हरियाणा, भारत",
        footerQuickLinks: "त्वरित लिंक",
        footerFollowUs: "हमारा अनुसरण करें",
        formName: "पूरा नाम",
        formEmail: "ईमेल पता",
        formPhone: "फोन नंबर",
        formVisaType: "कक्षा स्तर",
        formMessage: "संदेश",
        formSubmit: "संदेश भेजें",
        selectVisaType: "कक्षा चुनें",
        studentVisa: "प्राथमिक विद्यालय",
        workVisa: "माध्यमिक विद्यालय",
        familyVisa: "उच्च विद्यालय",
        touristVisa: "पूर्व-स्कूल",
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
