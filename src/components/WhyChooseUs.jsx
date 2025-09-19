import { CheckCircle, Clock, Shield, HeartHandshake } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: CheckCircle,
      title: 'Quick Processing',
      description: 'Get your policy processed and approved within 24 hours with our streamlined digital process.'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Bank-grade security with 256-bit SSL encryption to protect your personal and financial information.'
    },
    {
      icon: Clock,
      title: 'Expert Help',
      description: 'Get guidance from our certified insurance advisors available 24/7 to help you make informed decisions.'
    }
  ];

  return (
    <section className="py-20 bg-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Why trust us for your insurance solutions?
          </h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            We combine cutting-edge technology with personalized service to deliver 
            the best insurance experience in India.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6">
                <reason.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{reason.title}</h3>
              <p className="text-emerald-100">{reason.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all duration-200 hover:scale-105">
            Start Your Application
          </button>
        </div>
      </div>
    </section>
  );
};


export default WhyChooseUs;