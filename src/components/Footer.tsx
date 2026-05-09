import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">Humanizer AI</span>
          </div>
          <div className="flex gap-6">
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-purple-600">Pricing</Link>
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-purple-600">Privacy</Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-purple-600">Terms</Link>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-purple-600">Contact</Link>
          </div>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500" /> for students
          </p>
        </div>
      </div>
    </footer>
  );
}