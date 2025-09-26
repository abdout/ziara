import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Ziara - Modern Fashion Store',
    template: '%s | Ziara'
  },
  description: 'Ziara is your destination for modern fashion and stylish clothing',
  keywords: ['fashion', 'clothing', 'ziara', 'style', 'modern fashion', 'online shopping'],
  authors: [{ name: 'Ziara' }],
  creator: 'Ziara',
  publisher: 'Ziara',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/client/logo.png' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/client/logo.png' },
    ],
    shortcut: ['/client/logo.png'],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    siteName: 'Ziara',
    title: 'Ziara - Modern Fashion Store',
    description: 'Ziara is your destination for modern fashion and stylish clothing',
    images: [
      {
        url: '/client/logo.png',
        width: 1200,
        height: 630,
        alt: 'Ziara Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ziara - Modern Fashion Store',
    description: 'Ziara is your destination for modern fashion and stylish clothing',
    images: ['/client/logo.png'],
    creator: '@ziara',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}