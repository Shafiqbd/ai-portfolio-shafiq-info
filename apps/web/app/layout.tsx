import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@shafiq-info/config";
import { ToastProvider } from "@shafiq-info/ui";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AskShafiqPanel } from "@/components/ai/ask-shafiq-panel";
import { JsonLd } from "@/components/common/json-ld";
import { getProfile } from "@/services/profile.service";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";
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
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const profile = await getProfile();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={personJsonLd(profile)} />
        <JsonLd data={websiteJsonLd()} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <AskShafiqPanel />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
