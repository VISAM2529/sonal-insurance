"use client"
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Heart, Car, Home, Shield, Users, Building, Plane, Briefcase, CreditCard, FileText, Upload, CheckCircle, Search, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
const iconMap = {
  Heart: Heart,
  Car: Car,
  Home: Home,
  Shield: Shield,
  Users: Users,
  Building: Building,
  Plane: Plane,
  Briefcase: Briefcase,
  CreditCard: CreditCard,
  FileText: FileText,
  Upload: Upload,
  CheckCircle: CheckCircle,
  Search: Search
};

const ServiceDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      if (!id) return;
      try {
        const response = await fetch(`/api/public/services/${id}`);
        const data = await response.json();
        if (data.success) {
          setServiceData(data.data);
        } else {
          setError('Failed to load service details');
        }
      } catch (err) {
        setError('Error fetching service details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);
  const SkeletonLoader = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-16">
        <div className="h-8 w-40 bg-gray-200 rounded-full mb-6 animate-pulse"></div>
        <div className="h-10 w-3/4 bg-gray-200 rounded mb-4 animate-pulse"></div>
        <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div className="h-[400px] bg-gray-200 rounded-3xl animate-pulse"></div>
        <div>
          <div className="h-6 w-1/4 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className="space-y-16">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index}>
            <div className="h-6 w-1/4 bg-gray-200 rounded mb-6 animate-pulse"></div>
            <div className="grid md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-100 animate-pulse">
                  <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
  if (loading) {
    return (
     
        <SkeletonLoader />
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-medium text-red-600">{error}</div>
      </div>
    );
  }

  if (!serviceData || !serviceData.service) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-medium text-gray-600">Service not found</div>
      </div>
    );
  }

  const { service, plans } = serviceData;
  const IconComponent = iconMap[service.categoryId?.icon] || Shield;

  // Check if array fields have meaningful data
  const hasKeyFeatures = service.keyFeatures && service.keyFeatures.some(feature => feature.trim() !== '');
  const hasBenefits = service.benefits && service.benefits.some(benefit => benefit.title.trim() !== '' || benefit.description.trim() !== '');
  const hasEligibility = service.eligibility && service.eligibility.some(item => item.trim() !== '');
  const hasDocuments = service.documents && service.documents.some(doc => doc.name.trim() !== '' || doc.description.trim() !== '');
  const hasFaqs = service.faqs && service.faqs.some(faq => faq.question.trim() !== '' || faq.answer.trim() !== '');
  const hasStats = service.stats && service.stats.some(stat => stat.label.trim() !== '' || stat.value.trim() !== '');
  const hasProcessSteps = service.processSteps && service.processSteps.some(step => step.title.trim() !== '' || step.description.trim() !== '');
  const hasPlans = plans && plans.length > 0;

  return (
    <>
      <Head>
        <title>{service.metaTitle || `${service.title} | Sonal Insurance`}</title>
        <meta name="description" content={service.metaDescription || `Explore ${service.title} for comprehensive insurance coverage.`} />
      </Head>

      {/* Header */}
        <Header />

      {/* Main Content */}
      <main className="min-h-screen bg-gray-50 py-20">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-50 text-emerald-800 rounded-full text-sm font-medium mb-6">
              {service.categoryId?.name}
            </div>
            <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
              {service.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">{service.subtitle}</p>
          </div>

          {/* Hero Image and Overview */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-lg">
              <Image
                src={service.heroImage || '/assets/insurance/placeholder.png'}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              {service.rating > 0 && (
                <div className="flex items-center mb-6">
                  <Star className="h-5 w-5 text-yellow-400 fill-current mr-2" />
                  <span className="text-lg font-medium text-gray-900">{service.rating}</span>
                  <span className="text-sm text-gray-500 ml-2">({service.reviewCount} reviews)</span>
                </div>
              )}
             
            </div>
          </div>

          {hasKeyFeatures && (
            <div className="mb-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {service.keyFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasBenefits && (
            <div className="mb-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Benefits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {service.benefits.map((benefit, idx) => {
                  const BenefitIcon = iconMap[benefit.icon] || Shield;
                  return (
                    <div key={benefit._id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${service.categoryId?.bgGradient || 'from-gray-50 to-gray-100'} mr-4`}>
                          <BenefitIcon className="h-6 w-6 text-gray-800" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">{benefit.title}</h3>
                      </div>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {hasEligibility && (
            <div className="mb-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Eligibility</h2>
              <ul className="list-disc pl-6 space-y-2">
                {service.eligibility.map((item, idx) => (
                  <li key={idx} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
          )}

          {hasDocuments && (
            <div className="mb-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Required Documents</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {service.documents.map((doc, idx) => (
                  <div key={doc._id} className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                    <div>
                      <span className="text-gray-700 font-medium">{doc.name}</span>
                      <p className="text-sm text-gray-500">{doc.description} {doc.required && '(Required)'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasProcessSteps && (
            <div className="mb-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">How to Apply</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {service.processSteps.map((step, idx) => {
                  const StepIcon = iconMap[step.icon] || Shield;
                  return (
                    <div key={step._id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${service.categoryId?.bgGradient || 'from-gray-50 to-gray-100'} mr-4`}>
                          <StepIcon className="h-6 w-6 text-gray-800" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Step {step.step}</h3>
                      </div>
                      <h4 className="text-base font-medium text-gray-900 mb-2">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {hasPlans && (
            <div className="mb-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Available Plans</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan, idx) => (
                  <div key={plan._id} className={`bg-white rounded-xl p-6 shadow-lg border ${plan.isPopular ? 'border-emerald-500 shadow-xl' : 'border-gray-100'}`}>
                    {plan.isPopular && (
                      <div className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-medium mb-4">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-2xl font-bold text-gray-900 mb-2">{plan.premium}</p>
                    <p className="text-sm text-gray-600 mb-4">Coverage: {plan.coverage}</p>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="#apply"
                      className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-full text-sm font-medium hover:bg-emerald-700 transition-all duration-200 hover:shadow-lg"
                    >
                      Choose Plan
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasFaqs && (
            <div className="mb-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {service.faqs.map((faq, idx) => (
                  <div key={faq._id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-base font-medium text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasStats && (
            <div className="mb-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Achievements</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {service.stats.map((stat, idx) => (
                  <div key={stat._id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    {stat.growth && (
                      <p className="text-xs text-emerald-600">{stat.growth} growth</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
   <Footer />
    </>
  );
};

export default ServiceDetail;