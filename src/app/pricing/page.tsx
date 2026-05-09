import Link from "next/link";
import { Check, Crown, Zap, Shield, Upload, FileText } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    words: "500",
    features: [
      { text: "500 words per text", icon: FileText },
      { text: "Paste text only", icon: FileText },
      { text: "Basic humanizing", icon: Zap },
      { text: "1 use per hour", icon: Shield },
    ],
    cta: "Get Started",
    href: "/humanize",
    popular: false,
  },
  {
    name: "Starter",
    price: "$5",
    words: "10,000",
    period: "one-time",
    features: [
      { text: "10,000 words per text", icon: FileText },
      { text: "File upload (TXT, DOC)", icon: Upload },
      { text: "Advanced humanizing", icon: Zap },
      { text: "Priority processing", icon: Zap },
      { text: "Bypass Turnitin guarantee", icon: Shield },
    ],
    cta: "Buy Now",
    href: "/checkout?plan=starter",
    popular: true,
  },
  {
    name: "Pro",
    price: "$15",
    words: "30,000",
    period: "one-time",
    features: [
      { text: "30,000 words per text", icon: FileText },
      { text: "File upload (all formats)", icon: Upload },
      { text: "Premium humanizing", icon: Zap },
      { text: "Instant processing", icon: Zap },
      { text: "Bypass all AI detectors", icon: Shield },
      { text: "Email support", icon: Shield },
    ],
    cta: "Buy Now",
    href: "/checkout?plan=pro",
    popular: false,
  },
];

const features = [
  { icon: Shield, title: "Turnitin Safe", desc: "Our algorithm is specifically designed to pass Turnitin and all major AI detection tools." },
  { icon: Zap, title: "Instant Results", desc: "Get your humanized text in seconds. No waiting, no queues." },
  { icon: FileText, title: "Preserves Meaning", desc: "Your academic arguments and research remain fully intact." },
];

export default function PricingPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-gray-600 text-lg">Choose the plan that fits your needs. Pay once, use forever.</p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 ${plan.popular ? 'bg-purple-600 text-white ring-4 ring-purple-300' : 'bg-white border'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                    <Crown className="h-3 w-3" /> Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className={`text-sm ${plan.popular ? 'text-purple-200' : 'text-gray-500'}`}>/ {plan.period}</span>}
                </div>
                <p className={`text-sm mt-1 ${plan.popular ? 'text-purple-200' : 'text-gray-500'}`}>
                  {plan.words} words per text
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <feature.icon className={`h-4 w-4 ${plan.popular ? 'text-purple-200' : 'text-purple-600'}`} />
                    {feature.text}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block w-full py-3 rounded-lg font-semibold text-center transition-colors ${
                  plan.popular
                    ? 'bg-white text-purple-600 hover:bg-purple-50'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-xl text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <f.icon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="p-6 bg-white border rounded-xl">
              <h3 className="font-semibold mb-2">How does word counting work?</h3>
              <p className="text-gray-600 text-sm">We count words in your input text. Your processed text can have more or fewer words depending on the humanizing process.</p>
            </div>
            <div className="p-6 bg-white border rounded-xl">
              <h3 className="font-semibold mb-2">Can I use my credits later?</h3>
              <p className="text-gray-600 text-sm">Yes! Paid plans give you permanent credits that don't expire. Use them whenever you need.</p>
            </div>
            <div className="p-6 bg-white border rounded-xl">
              <h3 className="font-semibold mb-2">Is there a guarantee?</h3>
              <p className="text-gray-600 text-sm">We guarantee your text will pass AI detection tools. If it doesn't, contact us for a refund.</p>
            </div>
            <div className="p-6 bg-white border rounded-xl">
              <h3 className="font-semibold mb-2">What file formats are supported?</h3>
              <p className="text-gray-600 text-sm">Pro users can upload TXT, DOC, DOCX, and PDF files. Free users can only paste text directly.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">Have questions? Contact us anytime.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}