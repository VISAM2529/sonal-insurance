"use client"
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      question: 'Will claims on my policy impact my premium?',
      answer: 'Generally, making claims can affect your premium renewal rates. However, our No Claim Bonus (NCB) system rewards claim-free years with discounts. We also offer protection covers that minimize premium impact for certain types of claims.'
    },
    {
      question: 'What documents are required for claim settlement?',
      answer: 'Required documents vary by insurance type but typically include policy documents, claim form, identity proof, medical reports (for health insurance), police FIR (for theft/accident), and relevant bills/receipts. Our claims team will guide you through the specific requirements.'
    },
    {
      question: 'How quickly can I get my insurance policy activated?',
      answer: 'Most policies can be activated within 24-48 hours of application approval. Health insurance policies may have a waiting period of 30 days for certain conditions, while motor and home insurance typically become effective immediately after payment confirmation.'
    },
    {
      question: 'Can I modify my policy after purchase?',
      answer: 'Yes, you can modify certain aspects of your policy such as coverage amount, add-ons, and beneficiary details. Some modifications may require additional premium payment or policy endorsement. Contact our customer service team for specific modification requests.'
    },
    {
      question: 'What is the process for renewing my insurance policy?',
      answer: 'We send renewal reminders 45 days before expiry via email and SMS. You can renew online through our website or mobile app, or contact our customer service. We also offer auto-renewal options for hassle-free continuous coverage.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            FAQs
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to commonly asked questions about our insurance policies and services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
                {openFAQ === index ? (
                  <ChevronUp className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-colors duration-200">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};
export default FAQSection;