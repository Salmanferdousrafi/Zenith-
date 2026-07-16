import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Zenith AI — Multi-Agent Intelligence Platform",
    template: "%s | Zenith AI",
  },
  description:
    "Orchestrate multiple AI agents with RAG-powered knowledge retrieval. Built for teams that think beyond chatbots.",
  keywords: [
    "AI",
    "multi-agent",
    "RAG",
    "chatbot",
    "LLM",
    "OpenAI",
    "knowledge base",
    "enterprise AI",
  ],
  authors: [{ name: "Zenith AI" }],
  creator: "Zenith AI",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Zenith AI",
    title: "Zenith AI — Multi-Agent Intelligence Platform",
    description: "Orchestrate multiple AI agents with RAG-powered knowledge retrieval.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zenith AI Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenith AI — Multi-Agent Intelligence Platform",
    description: "Orchestrate multiple AI agents with RAG-powered knowledge retrieval.",
    images: ["/og-image.png"],
    creator: "@zenithai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0F" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-cosmic-black font-sans antialiased">
        <Providers>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#1a1640",
                border: "1px solid rgba(108, 93, 211, 0.2)",
                color: "#E0E7FF",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
