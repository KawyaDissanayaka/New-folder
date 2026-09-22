import { Link } from 'react-router-dom';
import { Check, HelpCircle } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free Trial',
      subtitle: '7-day free trial to get started with custom agents.',
      price: 'Rs 0',
      period: '/ 7 days',
      channels: '1 Channel',
      badge: 'Trial',
      badgeBg: 'bg-slate-100 text-slate-700 border border-slate-200',
      titleGradient: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent',
      features: [
        '1 AI Agent',
        'Web URL Knowledge Base',
        '1,000 Monthly Messages',
        'Digital Knowledge Base',
        'Basic Form Builder',
        'API Access',
        'WhatsApp, Messenger, Web',
        'Basic Channel Support',
        'Manage Customers',
      ],
    },
    {
      name: 'Starter',
      subtitle: '7-day plan for team testing with multiple agents.',
      price: 'Rs 190',
      period: '/ 7 days',
      channels: '3 Channels',
      badge: 'Popular',
      badgeBg: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
      featured: true,
      titleGradient: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent',
      features: [
        '3 AI Agents',
        'Web URL Knowledge Data',
        '5,000 Monthly Messages',
        'Digital Knowledge Base',
        'Advanced Form Builder',
        'API Access',
        'OneDrive & SharePoint Knowledge',
        'Small Team Workspace Role',
        'Manage Customers',
      ],
    },
    {
      name: 'Business',
      subtitle: '30-day plan for established businesses.',
      price: 'Rs 4900',
      period: '/ 30 days',
      channels: '5 Channels',
      badge: 'Best Value',
      badgeBg: 'bg-purple-50 text-purple-700 border border-purple-200',
      titleGradient: 'bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent',
      features: [
        '10 AI Agents',
        'Document Files & URL Knowledge',
        '50,000 Monthly Messages',
        'Advanced Form Builder',
        'Full API Access',
        'OneDrive & SharePoint Knowledge',
        'Customer Management Dashboard',
        'WhatsApp, Messenger, SMS, Web, Email',
        'Custom Workspace Branding',
        'AI Agent Analytics & Reports',
      ],
    },
    {
      name: 'Enterprise',
      subtitle: '30-day full access package for enterprise teams.',
      price: 'Rs 10490',
      period: '/ 30 days',
      channels: 'Unlimited',
      badge: 'Unlimited',
      badgeBg: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      titleGradient: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent',
      features: [
        'Unlimited AI Agents',
        'Unlimited Knowledge Base',
        'Unlimited Monthly Messages',
        'Advanced Form Builder',
        'Enterprise API Access',
        'Database & Custom Integrations',
        'Customer Management Suite',
        'All Omnichannel Channels Supported',
        'Dedicated Support Manager',
        'Custom AI Agent Configuration',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Choose Your{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Workspace Plan
          </span>
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed font-semibold">
          Flexible pricing designed to empower any team to launch, scale, and automate customer support with Omni AI Agents.
        </p>
      </div>

      {/* 4 Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-12">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white/95 backdrop-blur-xl text-slate-900 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden transition-all duration-300 border ${
              plan.featured
                ? 'border-indigo-500 shadow-indigo-200 ring-2 ring-indigo-500/20'
                : 'border-slate-200 hover:border-indigo-300'
            }`}
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full ${plan.badgeBg}`}>
                {plan.badge}
              </span>
              <span className="text-[11px] font-extrabold text-slate-500">
                {plan.channels}
              </span>
            </div>

            {/* Plan Info */}
            <div>
              <h3 className={`text-xl font-black mb-1 ${plan.titleGradient}`}>{plan.name}</h3>
              <p className="text-[11px] text-slate-500 font-semibold mb-6 leading-tight min-h-[28px]">
                {plan.subtitle}
              </p>

              {/* Price Tag */}
              <div className="mb-6 pb-6 border-b border-slate-200">
                <div className="flex items-baseline gap-1">
                  <span className={`text-3xl font-black ${plan.titleGradient}`}>{plan.price}</span>
                  <span className="text-xs text-slate-500 font-semibold">{plan.period}</span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-2.5 mb-8">
                <span className="text-[11px] font-extrabold text-indigo-600 uppercase tracking-wider block">
                  Features Included:
                </span>
                {plan.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-semibold">
                    <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                    <span className="leading-tight">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA Button */}
            <Link
              to="/register"
              className={`w-full py-3 rounded-2xl text-xs font-black text-center transition-all cursor-pointer ${
                plan.featured
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-90 text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
              }`}
            >
              Get Started
            </Link>
          </div>
        ))}
      </div>

      {/* FAQ CTA Link Button */}
      <div className="flex justify-center">
        <Link
          to="/faq"
          className="px-8 py-3.5 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200 text-slate-800 text-xs font-bold shadow-lg hover:border-indigo-300 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          <span>Frequently Asked Questions</span>
        </Link>
      </div>
    </div>
  );
}
