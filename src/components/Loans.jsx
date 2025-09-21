"use client"
import { Home, Car, GraduationCap, Building2, TrendingUp, Calculator, Clock, CheckCircle, ArrowRight, ChevronDown, Users } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const LoansSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loanProducts, setLoanProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef();

  // Fetch loan products from API
  useEffect(() => {
    const fetchLoanProducts = async () => {
      try {
        const response = await fetch('/api/public/loan-products');
        const data = await response.json();
        
        if (data.success) {
          setLoanProducts(data.data);
        } else {
          setError('Failed to fetch loan products');
        }
      } catch (err) {
        setError('Error fetching loan products');
        console.error('Error fetching loan products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanProducts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Map API icon strings to actual icon components
  const getIconComponent = (iconName) => {
    const iconMap = {
      Home: Home,
      Car: Car,
      GraduationCap: GraduationCap,
      Building2: Building2,
      Users: Users
    };
    
    return iconMap[iconName] || Home; // Default to Home icon if not found
  };

  // Static data for stats and monthly data (as these weren't in the API response)
  const loanStats = [
    { label: 'Loans Disbursed', value: '₹2,500Cr+', growth: '+35%' },
    { label: 'Active Borrowers', value: '1.2L+', growth: '+28%' },
    { label: 'Approval Rate', value: '96%', growth: '+8%' },
    { label: 'Avg Processing Time', value: '48hrs', growth: '-40%' }
  ];

  const monthlyData = [
    { month: 'Jan', disbursed: 180, approved: 220 },
    { month: 'Feb', disbursed: 210, approved: 250 },
    { month: 'Mar', disbursed: 195, approved: 235 },
    { month: 'Apr', disbursed: 240, approved: 280 },
    { month: 'May', disbursed: 275, approved: 310 },
    { month: 'Jun', disbursed: 320, approved: 350 }
  ];
  
  if (loading) {
    return (
      <section ref={sectionRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading loan products...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section ref={sectionRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Loan Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {loanStats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-gray-600" />
                </div>
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.growth.startsWith('+') 
                    ? 'text-emerald-700 bg-emerald-100' 
                    : 'text-red-700 bg-red-100'
                }`}>
                  {stat.growth}
                </div>
              </div>

              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Loan Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loanProducts.map((loan, index) => {
            const IconComponent = getIconComponent(loan.categoryId.icon);
            
            return (
              <div 
                key={loan._id} 
                className={`${loan.categoryId.bgColor} rounded-2xl p-6 border border-white/50 hover:shadow-lg transition-all duration-300 group relative overflow-hidden`}
                style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isVisible ? 1 : 0,
                  transition: `all 0.6s ease-out ${index * 0.1}s`
                }}
              >
                {/* Background pattern */}
                <div className="absolute top-4 right-4 w-12 h-12 border border-current opacity-5 rounded-full"></div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 ${loan.categoryId.iconBg} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`h-7 w-7 text-${loan.categoryId.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{loan.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{loan.description}</p>

                {/* Key metrics */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Interest Rate</span>
                    <span className="font-semibold text-gray-900">{loan.interestRate.display}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Max Amount</span>
                    <span className="font-semibold text-gray-900">{loan.loanAmount.display}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Max Tenure</span>
                    <span className="font-semibold text-gray-900">{loan.tenure.display}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-1 mb-6">
                  {loan.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <CheckCircle className="h-3 w-3 text-emerald-600 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link href={`/loan/${loan._id}`} className="w-full bg-white text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LoansSection;