"use client"
import { useState, useEffect } from 'react';
import { Heart, Car, Home, ArrowRight, Star, Shield, Users, Building, Plane, Briefcase } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const iconMap = {
  Heart: Heart,
  Car: Car,
  Home: Home,
  Shield: Shield,
  Users: Users,
  Building: Building,
  Plane: Plane,
  Briefcase: Briefcase
};

const SkeletonCard = () => (
  <div className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
    <div className="flex-1 p-8 lg:p-12 space-y-4">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gray-200 mr-4"></div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-200 rounded-full mr-1"></div>
          <div className="h-4 w-12 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
      <div className="h-6 w-full bg-gray-200 rounded"></div>
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-gray-200 rounded-full mr-3"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-gray-200 rounded-full mr-3"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-gray-200 rounded-full mr-3"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="h-10 w-32 bg-gray-200 rounded-full"></div>
    </div>
    <div className="flex-1 relative min-h-[300px] lg:min-h-[400px] bg-gray-200"></div>
  </div>
);

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/public/service-categories');
        const data = await response.json();
        if (data.success) {
          setServices(data.data);
        } else {
          setError('Failed to load service categories');
        }
      } catch (err) {
        setError('Error fetching service categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gray-200 rounded-full text-sm font-medium mb-6 h-8 w-40 animate-pulse"></div>
            <div className="h-10 w-3/4 mx-auto bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-1/2 mx-auto bg-gray-200 rounded mt-4 animate-pulse"></div>
          </div>
          <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg font-medium text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-50 text-emerald-800 rounded-full text-sm font-medium mb-6">
            Solutions That Work for You
          </div>
          <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
            Made Easy to Invest
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of insurance products designed 
            to protect what matters most to you and your family.
          </p>
        </div>

        <div className="space-y-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Shield;
            return (
              <Link
                key={service._id}
                href={`/services/${service._id}`}
                className={`group ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex lg:items-center bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden no-underline`}
              >
                {/* Content Side */}
                <div className="flex-1 p-8 lg:p-12">
                  <div className="flex items-center mb-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r ${service.bgGradient || 'from-gray-50 to-gray-100'} mr-4`}>
                      <IconComponent className="h-6 w-6 text-gray-800" />
                    </div>
                    {service.rating && (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-medium text-gray-600">{service.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-3xl font-semibold text-gray-900 mb-4">
                    {service.name}
                  </h3>
                  
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {(service.keyFeatures || []).slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-full text-sm font-medium hover:bg-emerald-700 transition-all duration-200 hover:shadow-lg group-hover:scale-105">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>

                {/* Image Side */}
                <div className="flex-1 relative min-h-[300px] lg:min-h-[400px]">
                  <Image
                    src={service.image || '/assets/insurance/placeholder.png'}
                    alt={service.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;