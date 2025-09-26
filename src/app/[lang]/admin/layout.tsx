import type { Locale } from "@/components/local/config";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import "../(client)/globals.css";
import "../(client)/rtl.css";

const inter = Inter({ subsets: ["latin"] });
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
});

export const metadata = {
  title: "Admin Dashboard",
  description: "E-commerce admin dashboard",
};

export default async function AdminRootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;
  const isRTL = lang === "ar";

  return (
    <html lang={lang} dir={isRTL ? "rtl" : "ltr"}>
      <body
        className={`${inter.className} ${
          isRTL ? notoSansArabic.variable : ""
        }`}
      >
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}