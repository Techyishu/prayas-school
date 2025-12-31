import type { Metadata } from "next";
import { Inter, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { ConditionalLayout } from "@/components/layout/conditional-layout";

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
  title: "Prayas School | Nurturing Young Minds for a Brighter Future",
  description:
    "Prayas School is dedicated to providing quality education and nurturing young minds to become responsible citizens and lifelong learners. Located in Karnal, Haryana.",
  keywords: [
    "Prayas School",
    "school education",
    "Karnal school",
    "Haryana education",
    "primary education",
    "middle school",
    "high school",
    "quality education",
    "co-curricular activities",
    "sports education",
  ],
  authors: [{ name: "Prayas School" }],
  openGraph: {
    title: "Prayas School | Nurturing Young Minds for a Brighter Future",
    description:
      "Excellence in education with focus on holistic development of students. State-of-the-art facilities and experienced faculty.",
    type: "website",
    locale: "en_IN",
    siteName: "Prayas School",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prayas School | Excellence in Education",
    description: "Your trusted partner for quality education. Nurturing students for success.",
  },
  icons: {
    icon: '/WhatsApp_Image_2025-12-26_at_10.51.54-removebg-preview.png',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "Prayas School",
      url: "https://prayasschool.com",
      logo: "https://prayasschool.com/WhatsApp_Image_2025-12-26_at_10.51.54-removebg-preview.png",
      description: "Leading educational institution in Haryana dedicated to nurturing young minds",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kunjpura",
        addressRegion: "Haryana",
        addressCountry: "IN",
        streetAddress: "Opposite Batra Filling Station, Karnal Road, Kunjpura"
      },
      telephone: "+91-9812026095",
      email: "prayasskool@gmail.com",
      sameAs: [
        "https://www.facebook.com/prayasschool",
        "https://www.instagram.com/prayasschool",
        "https://www.youtube.com/prayasschool"
      ],
      areaServed: ["India", "Haryana", "Karnal"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Educational Programs",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Primary Education",
              description: "Comprehensive primary school program for young learners"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Middle School",
              description: "Strong academic foundation for middle school students"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "High School",
              description: "Advanced curriculum preparing students for higher education"
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
          <ConditionalLayout>{children}</ConditionalLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
