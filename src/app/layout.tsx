import type { Metadata } from "next";
import { Inter, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CursorGlow } from "@/components/ui/cursor-glow";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Seabird Education | UK, Canada & Australia Study Visa Consultants",
  description:
    "Get your UK, Canada & Australia Study Visa with expert guidance from Seabird Education. 18+ years experience, 18000+ visas processed. QUEAC, British Council & Canada certified. Offices across Punjab.",
  keywords: [
    "study abroad",
    "UK study visa",
    "Canada study visa",
    "Australia study visa",
    "student visa",
    "Mohali",
    "Punjab",
    "education consultant",
    "IELTS",
    "UK without IELTS",
    "immigration consultant",
    "Seabird Education",
  ],
  authors: [{ name: "Seabird Education" }],
  openGraph: {
    title: "Seabird Education | UK, Canada & Australia Study Visa Consultants",
    description:
      "Expert study abroad guidance since 2007. 18000+ visas processed with 100% student visa success rate. Free consultation available.",
    type: "website",
    locale: "en_IN",
    siteName: "Seabird Education",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seabird Education | Study Abroad Experts",
    description: "Your trusted partner for UK, Canada & Australia study visas. 18+ years of experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "Seabird Education",
      alternateName: "Seabird International",
      url: "https://seabirdeducation.com",
      logo: "https://seabirdeducation.com/logo.png",
      description: "Leading immigration and study abroad consultant in Punjab with 18+ years of experience",
      foundingDate: "2007",
      address: {
        "@type": "PostalAddress",
        streetAddress: "SCF- 75 & 76, Phase 10, near Sarao Hotels",
        addressLocality: "Mohali",
        addressRegion: "Punjab",
        postalCode: "160062",
        addressCountry: "IN"
      },
      telephone: "+91-7870478704",
      email: "info@seabirdeducation.com",
      sameAs: [
        "https://www.facebook.com/SeabirdGroup/",
        "https://www.instagram.com/seabirdeducation/",
        "https://www.youtube.com/@SeabirdIndia"
      ],
      areaServed: ["India", "Punjab", "Mohali", "Chandigarh", "Gurdaspur", "Bathinda", "Ludhiana"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Study Abroad Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "UK Study Visa",
              description: "Expert guidance for UK student visa applications"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Canada Study Visa",
              description: "Complete support for Canadian study permits"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Australia Study Visa",
              description: "QEAC certified Australia visa consultancy"
            }
          }
        ]
      }
    })
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} ${plusJakarta.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          <CursorGlow />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
