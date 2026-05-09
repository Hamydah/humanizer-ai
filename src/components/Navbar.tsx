import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold">Humanizer AI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/humanize" className="text-sm font-medium text-gray-600 hover:text-purple-600">Humanize</Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-purple-600">Pricing</Link>
            <Link href="/faq" className="text-sm font-medium text-gray-600 hover:text-purple-600">FAQ</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-purple-600 hidden md:block">Sign In</Link>
            <Link href="/humanize" className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700">
              Try Free
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}