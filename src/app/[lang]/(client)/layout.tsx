import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import NavbarWithI18n from "@/components/client/NavbarWithI18n";
import Footer from "@/components/client/Footer";
import { ToastContainer } from "react-toastify";
import { ClerkProvider } from "@clerk/nextjs";
import { getDictionary } from "@/components/local/dictionaries";
import { isRTL } from "@/components/local/config";
import type { Locale } from "@/components/local/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: lang === 'ar' ? 'زيارة - متجر الأزياء العصرية' : 'Ziara - Modern Fashion Store',
    description: lang === 'ar'
      ? 'زيارة هو وجهتك المفضلة للأزياء العصرية والملابس الأنيقة'
      : 'Ziara is your destination for modern fashion and stylish clothing',
    icons: {
      icon: '/client/logo.png',
      shortcut: '/client/logo.png',
      apple: '/client/logo.png',
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;
  const isRtl = isRTL(lang);
  const dict = await getDictionary(lang);

  return (
    <ClerkProvider>
      <html lang={lang} dir={isRtl ? 'rtl' : 'ltr'}>
        <body
          className={`
            ${geistSans.variable}
            ${geistMono.variable}
            ${lang === 'ar' ? notoSansArabic.variable : ''}
            ${lang === 'ar' ? 'font-arabic' : 'font-sans'}
            antialiased
          `}
        >
          <div className="mx-auto p-4 sm:px-0 sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl">
            <NavbarWithI18n locale={lang} />
            {children}
            <Footer locale={lang} />
          </div>
          <ToastContainer
            position={isRtl ? "bottom-left" : "bottom-right"}
            rtl={isRtl}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}