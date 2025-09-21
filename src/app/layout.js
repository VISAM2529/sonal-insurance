import { Geist, Geist_Mono } from "next/font/google";
import { Montserrat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Sonal Insurance | Insurance & Loan Services",
  description:
    "Sonal Insurance provides reliable insurance and loan solutions. Secure your future with our wide range of health, life, vehicle, and business insurance plans, along with easy loan options.",
  keywords: [
    "Sonal Insurance",
    "Insurance",
    "Loans",
    "Health Insurance",
    "Life Insurance",
    "Vehicle Insurance",
    "Business Insurance",
    "Financial Services",
  ],
  openGraph: {
    title: "Sonal Insurance | Trusted Insurance & Loan Services",
    description:
      "Get the best insurance and loan services with Sonal Insurance. We offer health, life, vehicle, and business insurance plans with flexible loan options.",
    url: "https://sonalinsurance.com", // replace with your actual domain
    siteName: "Sonal Insurance",
    images: [
      {
        url: "https://sonalinsurance.com/og-image.jpg", // replace with your logo/banner
        width: 1200,
        height: 630,
        alt: "Sonal Insurance - Insurance & Loan Services",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sonal Insurance | Insurance & Loan Services",
    description:
      "Secure your life, health, vehicle, and business with Sonal Insurance. Explore easy loan solutions today.",
    images: ["https://sonalinsurance.com/twitter-image.jpg"], // replace with your logo/banner
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
