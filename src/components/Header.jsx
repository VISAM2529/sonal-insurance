"use client"
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Sonal
              </span>
              <span className="text-xs text-gray-500 -mt-1 tracking-wider">INSURANCE</span>
            </div>
          </div>

        

          {/* CTA Button */}
         <div className=" ">
  <div className="px-2 pt-2 pb-3 space-y-1">
    <a
      href="mailto:sonalinsurance02@gmail.com?subject=Get%20Quote%20Request&body=Hello%20Sonal%20Insurance%2C%0AI%20would%20like%20to%20get%20a%20quote%20for%20an%20insurance%20plan."
      className="block w-full mt-4 bg-emerald-600 text-white text-center px-6 py-2.5 rounded-full font-semibold"
    >
      Get Quote
    </a>
  </div>

</div>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
 <div className="lg:hidden bg-white border-t">
  <div className="px-2 pt-2 pb-3 space-y-1">
    <a
      href="mailto:sonalinsurance02@gmail.com?subject=Get%20Quote%20Request&body=Hello%20Sonal%20Insurance%2C%0AI%20would%20like%20to%20get%20a%20quote%20for%20an%20insurance%20plan."
      className="block w-full mt-4 bg-emerald-600 text-white text-center px-6 py-2.5 rounded-full font-semibold"
    >
      Get Quote
    </a>
  </div>

</div>

        )}
      </div>
    </header>
  );
};

export default Header;