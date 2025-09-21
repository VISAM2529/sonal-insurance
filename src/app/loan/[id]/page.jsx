"use client"
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Home, Car, GraduationCap, Building2, Clock, TrendingDown, FileText, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const iconMap = {
  Home: Home,
  Car: Car,
  GraduationCap: GraduationCap,
  Building2: Building2,
  Clock: Clock,
  TrendingDown: TrendingDown,
  FileText: FileText
};

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


const LoanDetail = () => {
  const { id } = useParams();
  const [loanData, setLoanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      if (!id) return;
      try {
        const response = await fetch(`/api/admin/loan-products/${id}`);
        const data = await response.json();
        if (data.success) {
          setLoanData(data.data);
        } else {
          setError('Failed to load loan details');
        }
      } catch (err) {
        setError('Error fetching loan details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanDetails();
  }, [id]);

  if (loading) return <SkeletonLoader />;

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-medium text-red-600">{error}</div>
      </div>
    );
  }

  if (!loanData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-medium text-gray-600">Loan not found</div>
      </div>
    );
  }

  const loan = loanData;
  const IconComponent = iconMap[loan.categoryId?.icon] || Home;

  // Conditional rendering checks
  const hasFeatures = loan.features && loan.features.some(feature => feature.trim() !== '');
  const hasEligibility = loan.eligibility && loan.eligibility.some(item => item.trim() !== '');
  const hasDocuments = loan.documents && loan.documents.some(doc => doc.name.trim() !== '' || doc.description.trim() !== '');
  const hasBenefits = loan.benefits && loan.benefits.some(benefit => benefit.title.trim() !== '' || benefit.description.trim() !== '');
  const hasProcessSteps = loan.processSteps && loan.processSteps.some(step => step.title.trim() !== '' || step.description.trim() !== '');
  const hasFaqs = loan.faqs && loan.faqs.some(faq => faq.question.trim() !== '' || faq.answer.trim() !== '');

  return (
    <>
      <Head>
        <title>{loan.title || 'Loan Product'} | Sonal Insurance</title>
        <meta name="description" content={loan.description || `Explore ${loan.title} for flexible financing options.`} />
      </Head>

    <Header/>

      {/* Main Content */}
      <main className="min-h-screen bg-gray-50 py-20">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-50 text-emerald-800 rounded-full text-sm font-medium mb-6">
              {loan.categoryId?.name || 'Loan'}
            </div>
            <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
              {loan.title || 'Untitled Loan'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">{loan.description || 'No description available'}</p>
          </div>

          {/* Hero Image and Overview */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-lg">
              <Image
                src={loan.image || '/assets/insurance/placeholder.png'}
                alt={loan.title || 'Loan'}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">{loan.description || 'No description available'}</p>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Interest Rate</span>
                  <span className="font-semibold text-gray-900">{loan.interestRate?.display || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Max Amount</span>
                  <span className="font-semibold text-gray-900">{loan.loanAmount?.display || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Max Tenure</span>
                  <span className="font-semibold text-gray-900">{loan.tenure?.display || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="font-semibold text-gray-900">{loan.processingFee || 'As per bank norms'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Prepayment Charges</span>
                  <span className="font-semibold text-gray-900">{loan.prepaymentCharges || 'Nil'}</span>
                </div>
              </div>
              
            </div>
          </div>

          {hasFeatures && (
            <div className="mb-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {loan.features.map((feature, idx) => (
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
                {loan.benefits.map((benefit, idx) => {
                  const BenefitIcon = iconMap[benefit.icon] || Home;
                  return (
                    <div key={benefit._id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${loan.categoryId?.bgColor || 'bg-gray-50'} mr-4`}>
                          <BenefitIcon className={`h-6 w-6 ${loan.categoryId?.color || 'text-gray-600'}`} />
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
                {loan.eligibility.map((item, idx) => (
                  <li key={idx} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
          )}

          {hasDocuments && (
            <div className="mb-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Required Documents</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {loan.documents.map((doc, idx) => (
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
                {loan.processSteps.map((step, idx) => {
                  const StepIcon = iconMap[step.icon] || Home;
                  return (
                    <div key={step._id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${loan.categoryId?.bgColor || 'bg-gray-50'} mr-4`}>
                          <StepIcon className={`h-6 w-6 ${loan.categoryId?.color || 'text-gray-600'}`} />
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

          {hasFaqs && (
            <div className="mb-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {loan.faqs.map((faq, idx) => (
                  <div key={faq._id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-base font-medium text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

   <Footer/>
    </>
  );
};

export default LoanDetail;