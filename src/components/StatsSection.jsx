"use client"
import { TrendingUp, Users, Shield, Clock, BarChart3, ChevronDown, Calendar } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({});
  const [selectedPeriod, setSelectedPeriod] = useState('This Year');
  const [selectedMetric, setSelectedMetric] = useState('Customer Growth');
  const sectionRef = useRef();

  const stats = [
    { icon: Users, number: '500K+', actualNumber: 500000, label: 'Active Policyholders', growth: '+12%' },
    { icon: TrendingUp, number: '99.8%', actualNumber: 99.8, label: 'Claims Processed', growth: '+2.3%' },
    { icon: Shield, number: '₹1000Cr+', actualNumber: 1000, label: 'Coverage Provided', growth: '+28%' },
    { icon: Clock, number: '<3hrs', actualNumber: 3, label: 'Avg Response Time', growth: '-45%' }
  ];

  const growthData = [
    { period: 'Q1 2023', customers: 320000, claims: 12500, satisfaction: 94 },
    { period: 'Q2 2023', customers: 365000, claims: 14200, satisfaction: 95 },
    { period: 'Q3 2023', customers: 410000, claims: 15800, satisfaction: 96 },
    { period: 'Q4 2023', customers: 445000, claims: 16900, satisfaction: 97 },
    { period: 'Q1 2024', customers: 480000, claims: 18200, satisfaction: 98 },
    { period: 'Q2 2024', customers: 500000, claims: 19100, satisfaction: 99 }
  ];

  const satisfactionData = [
    { month: 'Jan', value: 94, target: 95 },
    { month: 'Feb', value: 96, target: 95 },
    { month: 'Mar', value: 97, target: 95 },
    { month: 'Apr', value: 95, target: 95 },
    { month: 'May', value: 98, target: 95 },
    { month: 'Jun', value: 99, target: 95 }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateNumbers();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateNumbers = () => {
    stats.forEach((stat, index) => {
      let start = 0;
      const end = stat.actualNumber;
      const duration = 1800;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        
        setAnimatedNumbers(prev => ({
          ...prev,
          [index]: start
        }));
      }, 16);
    });
  };

  const formatNumber = (num, originalFormat) => {
    if (originalFormat.includes('₹')) return `₹${Math.floor(num)}Cr+`;
    if (originalFormat.includes('%')) return `${num.toFixed(1)}%`;
    if (originalFormat.includes('K')) return `${Math.floor(num / 1000)}K+`;
    if (originalFormat.includes('hrs')) return '<3hrs';
    return Math.floor(num).toString();
  };

  const maxGrowthValue = Math.max(...growthData.map(d => d.customers));
  const maxSatisfactionValue = Math.max(...satisfactionData.map(d => d.value));

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl lg:text-5xl font-light text-gray-500 italic leading-tight mb-2">
              Insurance made
            </h2>
            <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              better for everyone
            </h3>
          </div>
          <div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Streamlined processes, transparent policies, and data-driven insights 
              ensure faster claims, better coverage, and personalized service that 
              adapts to your needs.
            </p>
          </div>
        </div>

        {/* Dashboard Layout */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          
          {/* Main Analytics Chart */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">ANALYTICS</div>
                <h4 className="text-lg font-semibold text-gray-900">Business Growth</h4>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">Customers</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                    <span className="text-gray-600">Claims</span>
                  </div>
                </div>
                <div className="relative">
                  <select 
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="appearance-none bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium pr-8 cursor-pointer"
                  >
                    <option>This Year</option>
                    <option>Last Year</option>
                    <option>All Time</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-white pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Chart Area */}
            <div className="relative h-64">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-6">
                <span>500k</span>
                <span>400k</span>
                <span>300k</span>
                <span>200k</span>
                <span>0</span>
              </div>

              {/* Grid lines */}
              <div className="absolute inset-0 ml-4">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute w-full border-t border-gray-100"
                    style={{ top: `${i * 25}%` }}
                  ></div>
                ))}
              </div>

              {/* Data visualization */}
              <div className="relative h-full ml-4 flex items-end justify-between">
                {growthData.map((point, index) => {
                  const customerHeight = (point.customers / maxGrowthValue) * 85;
                  const claimHeight = (point.claims / 20000) * 85;
                  
                  return (
                    <div key={index} className="flex flex-col items-center group relative">
                      
                      {/* Customer growth line point */}
                      <div 
                        className="w-3 h-3 bg-emerald-500 border-2 border-white rounded-full shadow-sm relative z-10"
                        style={{ 
                          marginBottom: `${customerHeight}%`,
                          transition: `all 0.8s ease-out ${index * 0.1}s`
                        }}
                      >
                        {index === growthData.length - 1 && (
                          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                            {(point.customers / 1000).toFixed(0)}k customers
                          </div>
                        )}
                      </div>
                      
                      {/* Claims line point */}
                      <div 
                        className="w-3 h-3 bg-blue-400 border-2 border-white rounded-full shadow-sm absolute z-10"
                        style={{ 
                          bottom: `${claimHeight}%`,
                          transition: `all 0.8s ease-out ${index * 0.1 + 0.2}s`
                        }}
                      ></div>
                      
                      {/* Period label */}
                      <div className="text-xs text-gray-500 mt-4 transform -rotate-12">{point.period}</div>
                    </div>
                  );
                })}
              </div>

              {/* Connecting lines */}
              <svg className="absolute inset-0 ml-4 w-full h-full pointer-events-none overflow-visible">
                {/* Customer growth line */}
                <polyline
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  points={growthData.map((point, index) => {
                    const x = (index / (growthData.length - 1)) * 100;
                    const y = 100 - (point.customers / maxGrowthValue) * 85;
                    return `${x}%,${y}%`;
                  }).join(' ')}
                />
                
                {/* Claims line */}
                <polyline
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="2"
                  points={growthData.map((point, index) => {
                    const x = (index / (growthData.length - 1)) * 100;
                    const y = 100 - (point.claims / 20000) * 85;
                    return `${x}%,${y}%`;
                  }).join(' ')}
                />
              </svg>
            </div>
          </div>

          {/* Satisfaction Progress */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">PERFORMANCE</div>
                <h4 className="text-lg font-semibold text-gray-900">Satisfaction Rate</h4>
              </div>
              <div className="relative">
                <select className="appearance-none border border-gray-200 rounded px-3 py-1 text-sm bg-white">
                  <option>6 Months</option>
                  <option>1 Year</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Large metric */}
            <div className="text-4xl font-bold text-gray-900 mb-6">
              {isVisible ? '99%' : '0%'}
            </div>

            {/* Progress visualization */}
            <div className="relative h-32 mb-4">
              <div className="absolute right-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                <span>100</span>
                <span>95</span>
                <span>90</span>
              </div>
              
              <div className="h-full mr-8 relative bg-gray-50 rounded-lg overflow-hidden">
                {/* Gradient fill */}
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-400 to-emerald-200 rounded-lg transition-all duration-1000"
                  style={{ height: isVisible ? '90%' : '0%' }}
                ></div>
                
                {/* Value indicator */}
                <div className="absolute top-4 right-4 bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium">
                  99.2%
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex justify-between text-xs text-gray-500">
              <span>Jan-Feb</span>
              <span>Mar-Apr</span>
              <span>May-Jun</span>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <stat.icon className="h-5 w-5 text-gray-600" />
                </div>
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.growth.startsWith('+') 
                    ? 'text-emerald-700 bg-emerald-100' 
                    : 'text-red-700 bg-red-100'
                }`}>
                  {stat.growth}
                </div>
              </div>

              <div className="text-2xl font-bold text-gray-900 mb-1">
                {isVisible && animatedNumbers[index] !== undefined 
                  ? formatNumber(animatedNumbers[index], stat.number)
                  : stat.number
                }
              </div>

              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;