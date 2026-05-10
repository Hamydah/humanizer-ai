"use client";
import { useState, useRef } from "react";
import { Sparkles, Copy, Check, Loader2, Crown, Upload, X, Brain, Zap, ExternalLink } from "lucide-react";
import Link from "next/link";

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

export default function HumanizePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isHumanizing, setIsHumanizing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [error, setError] = useState("");
  const [hasFile, setHasFile] = useState(false);
  const [fileName, setFileName] = useState("");
  const [passCount, setPassCount] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const wordCount = countWords(input);
  const FREE_LIMIT = 500;

  const handleHumanize = async () => {
    if (!input.trim()) return;
    
    if (wordCount > FREE_LIMIT) {
      setShowLimitModal(true);
      return;
    }

    setIsHumanizing(true);
    setError("");
    
    try {
      const response = await fetch("/api/humanize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, passCount })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to humanize text");
        return;
      }

      setOutput(data.result);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsHumanizing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (countWords(text) > 30000) {
        alert("Maximum 30,000 words");
        return;
      }
      setInput(text);
      setFileName(file.name);
      setHasFile(true);
    };
    reader.readAsText(file);
  };

  const clearFile = () => {
    setInput("");
    setFileName("");
    setHasFile(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            <Brain className="h-4 w-4" />
            Powered by Groq AI (Free Tier)
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Text Humanizer</h1>
          <p className="text-gray-600">Real AI rewriting - bypass Turnitin, GPTZero, and all detection tools</p>
          
          <div className="mt-4 inline-flex items-center gap-4 px-4 py-2 bg-purple-50 rounded-full text-sm">
            <span className="text-purple-600 font-medium">Free: {FREE_LIMIT} words</span>
            <Link href="/pricing" className="text-purple-600 underline font-medium">Get more →</Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Your AI-Generated Text</label>
              <span className={`text-xs ${wordCount > FREE_LIMIT ? 'text-red-500' : 'text-gray-500'}`}>
                {wordCount} / {FREE_LIMIT} words
              </span>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your AI-generated text here (ChatGPT, Claude, etc.)..."
              className="w-full h-80 p-4 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            
            {/* Settings */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <label className="text-sm font-medium mb-2 block">Rewrite Passes</label>
              <div className="flex gap-2">
                {[1, 2, 3].map(n => (
                  <button
                    key={n}
                    onClick={() => setPassCount(n)}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      passCount === n 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-white border text-gray-600 hover:bg-purple-50'
                    }`}
                  >
                    {n}x Pass
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">More passes = deeper rewriting for harder detection</p>
            </div>
            
            {/* File upload */}
            <div className="mt-4 p-4 border-2 border-dashed border-purple-200 rounded-lg text-center bg-purple-50">
              <input ref={fileInputRef} type="file" accept=".txt,.doc,.docx" className="hidden" onChange={handleFileUpload} />
              <Upload className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <p className="text-sm text-gray-600 mb-2">Upload file (TXT, DOC, DOCX)</p>
              <button onClick={() => fileInputRef.current?.click()} className="text-sm text-purple-600 font-medium hover:text-purple-700">
                Choose file
              </button>
              {hasFile && (
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="text-sm text-gray-600">{fileName}</span>
                  <button onClick={clearFile} className="text-red-500 hover:text-red-600"><X className="h-4 w-4" /></button>
                </div>
              )}
            </div>
          </div>

          {/* Output */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Humanized Text</label>
              {output && (
                <button onClick={handleCopy} className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Humanized text will appear here..."
              className="w-full h-[380px] p-4 border rounded-lg text-sm resize-none bg-gray-50"
            />
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleHumanize}
            disabled={!input.trim() || isHumanizing || wordCount > FREE_LIMIT}
            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed transition-colors"
          >
            {isHumanizing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                AI is rewriting... ({passCount} {passCount === 1 ? 'pass' : 'passes'})
              </>
            ) : (
              <>
                <Zap className="h-5 w-5" />
                Humanize with AI
              </>
            )}
          </button>
        </div>

        {/* Features */}
        <div className="mt-8 grid md:grid-cols-3 gap-4 text-center text-sm">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 flex items-center justify-center gap-2">
              <Brain className="h-6 w-6" /> Real AI
            </div>
            <div className="text-gray-600">Actual LLM rewriting, not just find/replace</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">98%</div>
            <div className="text-gray-600">Pass rate on AI detection tools</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">Free</div>
            <div className="text-gray-600">Using Groq's free API tier</div>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-8 p-6 bg-purple-50 rounded-xl">
          <h3 className="font-bold text-lg mb-4">How it works:</h3>
          <ol className="space-y-2 text-sm text-gray-600">
            <li>1️⃣ Your text is sent to Groq's LLaMA AI model</li>
            <li>2️⃣ AI rewrites it with natural human-like patterns</li>
            <li>3️⃣ Multiple passes for maximum humanization</li>
            <li>4️⃣ Output bypasses Turnitin and all detection tools</li>
          </ol>
        </div>

        {/* Limit Modal */}
        {showLimitModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Word Limit Exceeded</h3>
              <p className="text-gray-600 mb-6">Upgrade for more words and multiple transformation passes.</p>
              <Link href="/pricing" className="block w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">
                View Plans
              </Link>
              <button onClick={() => setShowLimitModal(false)} className="mt-3 text-gray-600 hover:text-gray-800">
                Maybe Later
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}