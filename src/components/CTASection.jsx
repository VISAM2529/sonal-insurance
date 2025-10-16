import { ArrowRight, Phone } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to get started with Sonal?
        </h2>
        <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
          Join over 500,000 satisfied customers who trust Sonal Insurance for their protection needs. 
          Get your personalized quote in just 2 minutes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a  href="mailto:sonalinsurance02@gmail.com?subject=Get%20Quote%20Request&body=Hello%20Sonal%20Insurance%2C%0AI%20would%20like%20to%20get%20a%20quote%20for%20an%20insurance%20plan." className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center cursor-pointer">
            Get Free Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-emerald-600 transition-all duration-200 flex items-center">
            <Phone className="mr-2 h-5 w-5" />
            Call: +91 96232 55826
          </button>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 text-emerald-100">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-emerald-300 rounded-full mr-2"></div>
            No Hidden Charges
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-emerald-300 rounded-full mr-2"></div>
            Quick Approval
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-emerald-300 rounded-full mr-2"></div>
            24/7 Support
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;