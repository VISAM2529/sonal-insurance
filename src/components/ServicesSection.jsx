import { Heart, Car, Home, ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';

const ServicesSection = () => {
  const services = [
    {
      icon: Heart,
      title: 'Medical Insurance',
      description: 'Comprehensive health coverage with cashless treatment at 10,000+ hospitals nationwide.',
      features: ['Cashless Treatment', 'Pre & Post Hospitalization', 'Critical Illness Cover'],
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50',
      rating: '4.8',
      image: '/assets/insurance/medical.png', // sample image path
    },
    {
      icon: Car,
      title: 'Travel Insurance',
      description: 'Complete protection for your domestic and international travel with instant claim processing.',
      features: ['Trip Cancellation', 'Medical Emergency', 'Baggage Protection'],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      rating: '4.9',
      image: '/assets/insurance/travel.png',
    },
    {
      icon: Home,
      title: 'Life Insurance',
      description: "Secure your family's financial future with comprehensive life insurance plans.",
      features: ['Term Life Coverage', 'Investment Plans', 'Pension Solutions'],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      rating: '4.7',
      image: '/assets/insurance/life.png',
    },
    {
      icon: Home,
      title: 'Home Insurance',
      description: 'Protect your home and belongings from natural disasters, theft, and accidents.',
      features: ['Structure Coverage', 'Contents Protection', 'Liability Cover'],
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'bg-orange-50',
      rating: '4.8',
      image: '/assets/insurance/home.png',
    },
    {
      icon: Car,
      title: 'Car Insurance',
      description: 'Comprehensive vehicle protection with instant claim processing and nationwide coverage.',
      features: ['Comprehensive Coverage', 'Third Party Liability', 'Add-on Covers'],
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50',
      rating: '4.9',
      image: '/assets/insurance/car.png',
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
            Solutions That Work for You
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Made Easy to Invest
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of insurance products designed 
            to protect what matters most to you and your family.
          </p>
        </div>

        <div className="space-y-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex lg:items-center bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden`}
            >
              {/* Content Side */}
              <div className="flex-1 p-8 lg:p-12">
                <div className="flex items-center mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r ${service.color} mr-4`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium text-gray-600">{service.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 transition-all duration-200 hover:shadow-lg group-hover:scale-105">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>

              {/* Image Side */}
              <div className="flex-1 relative min-h-[300px] lg:min-h-[400px]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
