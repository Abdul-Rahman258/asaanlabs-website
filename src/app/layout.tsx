import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Asaan Labs | Simplifying life with AI",
    template: "%s | Asaan Labs",
  },
  description: "Asaan Labs engineers intelligent, end-to-end AI applications designed to automate workflows, accelerate analytics, and build the future of technology.",
  keywords: [
    "Asaan Labs", 
    "AI Agency", 
    "Artificial Intelligence", 
    "Machine Learning", 
    "Data Analytics", 
    "Workflow Automation", 
    "Software Development",
    "Pakistan AI"
  ],
  authors: [{ name: "Asaan Labs" }],
  creator: "Asaan Labs",
  publisher: "Asaan Labs",
  metadataBase: new URL('https://asaanlabs.tech'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Asaan Labs | Simplifying life with AI",
    description: "Intelligent, end-to-end AI applications designed to automate workflows and accelerate analytics.",
    url: 'https://asaanlabs.tech',
    siteName: 'Asaan Labs',
    images: [
      {
        url: '/Logo.png', 
        width: 1200,
        height: 630,
        alt: 'Asaan Labs Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Asaan Labs | Simplifying life with AI",
    description: "Intelligent, end-to-end AI applications designed to automate workflows.",
    images: ['/Logo.png'], 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/AsaanLabsLogoOnly.svg",
    apple: "/AsaanLabsLogoOnly.svg",
  },
  verification: {
    google: "add-your-google-site-verification-here",
    yandex: "yandex-verification", 
    other: {
      me: ['contact.asaanlabs@gmail.com'],
    },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
