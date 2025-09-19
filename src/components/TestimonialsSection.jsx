"use client"
import { Star, Quote } from 'lucide-react';
import { useState } from 'react';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Homeowner, Mumbai',
      image: 'PS',
      rating: 5,
      text: 'Sonal Insurance made the entire process seamless. When my home was damaged in the monsoon, they settled my claim within 3 days. The customer service team was incredibly supportive throughout.',
      company: 'Verified Customer'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Business Owner, Delhi',
      image: 'RK',
      rating: 5,
      text: 'As a business owner, I need reliable insurance partners. Sonal has been with us for 5 years, providing comprehensive coverage and the fastest claim settlements I have ever experienced.',
      company: 'Verified Customer'
    },
    {
      name: 'Anita Patel',
      role: 'Teacher, Pune',
      image: 'AP',
      rating: 5,
      text: 'Their health insurance coverage saved my family during a medical emergency. The cashless treatment facility and wide hospital network made my surgery completely stress-free.',
      company: 'Verified Customer'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Outstanding Success Stories from Our Valued Clients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about their experience with Sonal Insurance.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-3xl p-8 lg:p-12 relative">
            <Quote className="absolute top-8 left-8 h-12 w-12 text-emerald-200" />
            
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Avatar and Info */}
              <div className="flex-shrink-0 text-center lg:text-left">
                <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto lg:mx-0">
                  {testimonials[activeTestimonial].image}
                </div>
                <div className="flex justify-center lg:justify-start mb-2">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <h4 className="font-bold text-gray-900">{testimonials[activeTestimonial].name}</h4>
                <p className="text-gray-600 text-sm">{testimonials[activeTestimonial].role}</p>
                <p className="text-emerald-600 text-xs font-medium">{testimonials[activeTestimonial].company}</p>
              </div>

              {/* Testimonial Content */}
              <div className="flex-1">
                <p className="text-lg lg:text-xl text-gray-700 leading-relaxed italic">
                  "{testimonials[activeTestimonial].text}"
                </p>
              </div>
            </div>
            
            {/* Navigation dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === activeTestimonial ? 'bg-emerald-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Customer logos */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-8">Trusted by leading companies and individuals across India</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {/* Placeholder for customer logos */}
              <div className="w-24 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-500">Company</span>
              </div>
              <div className="w-24 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-500">Business</span>
              </div>
              <div className="w-24 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-500">Enterprise</span>
              </div>
              <div className="w-24 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-500">Startup</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default TestimonialsSection;