import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex flex-col mb-6">
              <span className="text-2xl font-bold text-emerald-400">Sonal</span>
              <span className="text-sm text-gray-400 -mt-1 tracking-wider">INSURANCE</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Protecting your future with comprehensive insurance solutions and exceptional service. 
              Trusted by over 500,000 families across India.
            </p>
            <div className="flex space-x-4">
            
              <a href="https://www.instagram.com/sonalinsurance/" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Our Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Claims Process</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Customer Support</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Careers</a></li>
            </ul>
          </div>

          {/* Insurance Products */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Insurance Products</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Health Insurance</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Life Insurance</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Motor Insurance</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Home Insurance</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Travel Insurance</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Property Insurance</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Fire Insurance</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Factory Insurance</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>Sonal Insurance Ltd.</p>
                  <p>Audumbar Nivya,Narhe,Pune</p>
                  <p>India</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>+91 96232 55826</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>sonalinsurance02@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Sonal Insurance Company Ltd. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Cookie Policy</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Sitemap</a>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>IRDAI Registration No. 123 | CIN: U66010MH2008PLC123456</p>
            <p>Sonal Insurance is a registered trademark. Insurance is subject to risk assessment and acceptance.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;