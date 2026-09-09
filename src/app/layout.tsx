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
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      { url: '/AsaanLabsLogoOnly.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  verification: {
    google: "add-your-google-site-verification-here",
    yandex: "yandex-verification", 
    other: {
      me: ['info.asaanlabs@gmail.com'],
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
