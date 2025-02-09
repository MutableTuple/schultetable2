import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pixelFont = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-pixel",
  weight: ["400"], // Only 400 is available for this font
});

export const metadata = {
  title: "Schulte Table - Train Your Brain",
  description: "Sharpen your focus with Schulte Table exercises.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${pixelFont.className} antialiased bg-[#ffffff]`}>
        {children}
      </body>
    </html>
  );
}
