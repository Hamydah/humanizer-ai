import Link from "next/link";
import { Shield, Zap, CheckCircle, ArrowRight, GraduationCap, FileText, Award } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
            <GraduationCap className="h-4 w-4" />
            Built for Students & Researchers
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Make AI Text <span className="text-purple-600">Undetectable</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform AI-generated academic text into natural, human-like writing. 
            Bypass Turnitin, GPTZero, and all AI detection tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/humanize" className="inline-flex items-center justify-center px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Start Humanizing Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center justify-center px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              View Pricing
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">Free 3 uses daily • No credit card required</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">98%</div>
              <div className="text-purple-200">Detection Bypass Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-purple-200">Papers Processed</div>
            </div>
            <div>
              <div className="text-3xl font-bold">4.9/5</div>
              <div className="text-purple-200">Student Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Paste Your Text</h3>
              <p className="text-gray-600 text-sm">Copy your AI-generated essay, research paper, or assignment</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">One Click Transform</h3>
              <p className="text-gray-600 text-sm">Our algorithm rewrites while keeping your meaning intact</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Copy & Submit</h3>
              <p className="text-gray-600 text-sm">Get human-like text that passes AI detection</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Students Choose Us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm">
              <Shield className="h-8 w-8 text-purple-600 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Turnitin Safe</h3>
                <p className="text-gray-600 text-sm">Specifically designed to pass Turnitin and similar AI detection tools</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm">
              <Zap className="h-8 w-8 text-purple-600 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Instant Results</h3>
                <p className="text-gray-600 text-sm">Get your humanized text in seconds, not minutes</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm">
              <FileText className="h-8 w-8 text-purple-600 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Preserves Meaning</h3>
                <p className="text-gray-600 text-sm">Your academic arguments and research remain intact</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm">
              <Award className="h-8 w-8 text-purple-600 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Academic Quality</h3>
                <p className="text-gray-600 text-sm">Maintains proper grammar, citations, and scholarly tone</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Humanize Your Text?</h2>
          <p className="text-gray-600 mb-8">Start with 3 free uses daily. No signup required.</p>
          <Link href="/humanize" className="inline-flex items-center justify-center px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
            Start Free Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}