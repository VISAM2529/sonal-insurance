import Image from "next/image";
import Head from "next/head";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
export default function Home() {
  return (
   <>
   <Head>
        <title>Sonal Insurance - Drive Financial Strength with Insurance</title>
        <meta name="description" content="Comprehensive insurance solutions for health, life, motor, home, and travel. Trusted by 500K+ customers with 99.8% claim settlement ratio." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sonalinsurance.com/" />
        <meta property="og:title" content="Sonal Insurance - Drive Financial Strength with Insurance" />
        <meta property="og:description" content="Comprehensive insurance solutions for health, life, motor, home, and travel. Trusted by 500K+ customers." />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://sonalinsurance.com/" />
        <meta property="twitter:title" content="Sonal Insurance - Drive Financial Strength with Insurance" />
        <meta property="twitter:description" content="Comprehensive insurance solutions for health, life, motor, home, and travel." />
        <meta property="twitter:image" content="/twitter-image.jpg" />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <HeroSection />
          <StatsSection />
          <ServicesSection />
          <WhyChooseUs />
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div></>
  );
}
