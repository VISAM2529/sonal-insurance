import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gray-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-48 h-48 bg-emerald-50 rounded-full opacity-40 blur-2xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <div className="text-left max-w-xl">
            {/* Trust Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-sm font-medium mb-8 text-emerald-700">
              <CheckCircle className="h-4 w-4 mr-2 text-emerald-600" />
              Secure lives with smart finance
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-8">
              <span className="text-gray-900 italic">Drive Financial</span>
              <br />
              <span className="text-gray-600 font-normal">Strength with</span>
              <br />
              <span className="text-gray-600 font-normal">Insurance</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Drive your life financially strong by taking control, staying disciplined, and building a secure future with confidence.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-6">
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-700 transition-all duration-200 hover:shadow-lg">
                Get Started
              </button>
              <button className="flex items-center text-gray-700 font-medium hover:text-emerald-600 transition-colors duration-200">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3 hover:bg-emerald-100 transition-colors duration-200">
                  <Play className="h-4 w-4 ml-0.5" />
                </div>
                Play Video
              </button>
            </div>
          </div>

          {/* Right Content - Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-3 gap-4 h-[600px]">
              
              {/* Left Column */}
              <div className="space-y-4">
                {/* Happy family */}
                <div className="h-48 rounded-2xl overflow-hidden relative">
                  <Image
                    src="/assets/hero-section/happy-family.png"
                    alt="Happy Family"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Senior Care */}
                <div className="h-44 rounded-2xl overflow-hidden relative">
                  <Image
                    src="/assets/hero-section/senior.png"
                    alt="Senior Care"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Middle Column */}
              <div className="space-y-4">
                {/* Mother with baby */}
                <div className="h-32 rounded-2xl overflow-hidden relative">
                  <Image
                    src="/assets/hero-section/mother.png"
                    alt="Family Care"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Happy Customers */}
                <div className="h-40 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl overflow-hidden relative p-6 flex flex-col justify-center">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">Happy</h3>
                    <h3 className="text-2xl font-bold mb-3">customers</h3>
                    <div className="flex items-center">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 bg-white/30 rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-white/30 rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-white/30 rounded-full border-2 border-white"></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">+124</span>
                    </div>
                  </div>
                </div>
                
                {/* Young professional */}
                <div className="h-36 rounded-2xl overflow-hidden relative">
                  <Image
                    src="/assets/hero-section/professional.png"
                    alt="Professional"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Couple */}
                <div className="h-36 rounded-2xl overflow-hidden relative">
                  <Image
                    src="/assets/hero-section/couple-goals.png"
                    alt="Couple Goals"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Elderly Couple */}
                <div className="h-32 rounded-2xl overflow-hidden relative">
                  <Image
                    src="/assets/hero-section/couple.png"
                    alt="Golden Years"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Community */}
                <div className="h-64 rounded-2xl overflow-hidden relative">
                  <Image
                    src="/assets/hero-section/happy-customers.png"
                    alt="Community"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Individual */}
               
              </div>
            </div>

            {/* Decorative dots */}
            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
              <div className="grid grid-cols-3 gap-2">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-gray-200 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
