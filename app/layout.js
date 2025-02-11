import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import Footer from "./_components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const pixelFont = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-pixel",
  weight: ["400"],
  display: "swap",
});

export const viewport = {
  themeColor: "#ffde59",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: "Schulte Table - Improve Reading Speed & Focus Training",
  description:
    "Train your brain with Schulte Tables - a scientifically proven method to enhance peripheral vision, reading speed, and concentration. Free online tool for visual perception training and cognitive development.",
  keywords: [
    "schulte table",
    "brain training",
    "speed reading",
    "cognitive training",
    "focus improvement",
    "concentration exercises",
    "peripheral vision",
    "mental training",
    "attention training",
    "eye movement training",
    "schulte table game",
    "schulte table colour",
    "schulte-table",
    "tablica schulte",
    "schulte tables",
    "brain game schulte table",
    "schulte table brain game",
    "table schulte",
    "shulte table",
    "schultetable",
    "schulte game",
    "tabla de schulte",
    "schule table",
    "schutle table",
    "the schulte table",
    "schulte table brain exercise",
    "schulte grid",
    "schult table",
    "shuttle table brain game",
    "schulte table games",
    "shult table",
    "tablas schulte",
    "tabelul lui schulte",
    "mesa de schulte",
    "tablas de schulte",
    "schultz tables",
    "brain exercise schulte table",
  ],
  authors: [{ name: "SchulteTable.com" }],
  creator: "SchulteTable.com",
  publisher: "SchulteTable.com",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://schultetable.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Schulte Table - Improve Reading Speed & Focus Training",
    description:
      "Train your brain with Schulte Tables - a scientifically proven method to enhance peripheral vision, reading speed, and concentration. Free online tool for visual perception training.",
    url: "https://schultetable.com",
    siteName: "Schulte Table Training",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Schulte Table Training Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Schulte Table - Speed Reading & Focus Training",
    description:
      "Improve your reading speed and concentration with scientifically proven Schulte Table exercises. Free brain training tool.",
    images: ["/twitter-image.png"],
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
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
    bing: "your-bing-verification",
  },
  category: "Educational Tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics gaId="G-66EJ7VMS98" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${pixelFont.className} antialiased bg-[#ffffff]`}
        style={{ fontFamily: "var(--font-pixel), 'Courier New', monospace" }}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
