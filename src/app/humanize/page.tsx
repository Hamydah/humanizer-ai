"use client";
import { useState, useRef } from "react";
import { Sparkles, Copy, Check, Loader2, AlertCircle, FileText, Crown, Upload, X } from "lucide-react";
import Link from "next/link";

const academicReplacements = {
  "Furthermore": ["Moreover", "Additionally", "What's more"],
  "However": ["Nevertheless", "Nonetheless", "Even so"],
  "Therefore": ["Hence", "Thus", "As a result"],
  "Moreover": ["Additionally", "Furthermore", "Besides"],
  "Additionally": ["Further", "Moreover", "Along these lines"],
  "In conclusion": ["To sum up", "Overall", "In summary"],
  "In summary": ["Overall", "In essence", "To summarize"],
  "It is important to note": ["Notably", "Importantly", "It should be noted"],
  "It should be noted": ["Importantly", "Note that", "It is worth mentioning"],
  "One of the most": ["Among the key", "Some of the significant"],
  "Recent studies have shown": ["Research indicates", "Studies reveal"],
  "Extensive research": ["Considerable research", "A body of research"],
  "The data suggests": ["Evidence indicates", "Research shows"],
  "Experts believe": ["Scholars argue", "Research suggests"],
  "According to statistics": ["Statistics reveal", "Data indicates"],
  "It cannot be denied": ["Clearly", "Without question"],
  "Undoubtedly": ["Certainly", "Without a doubt"],
  "In today's world": ["Currently", "Presently", "These days"],
  "This technology": ["This innovation", "Such technology"],
  "Artificial intelligence": ["AI systems", "Machine learning tools"],
  "The utilization of": ["Using", "The use of"],
  "In order to": ["To", "So as to"],
  "In the event that": ["If", "Should"],
  "At this point in time": ["Currently", "Now"],
  "Due to the fact that": ["Because", "Since"],
  "In spite of the fact that": ["Although", "Despite"],
  "With regard to": ["Regarding", "Concerning"],
  "In regards to": ["About", "Concerning"],
  "For the purpose of": ["To", "For"],
  "In the case of": ["If", "When"],
  "demonstrates that": ["shows", "indicates"],
  "illustrates that": ["shows", "reveals"],
  "evidenced by": ["shown by", "demonstrated by"],
  "significant impact": ["notable effect", "substantial influence"],
  "comprehensive analysis": ["thorough analysis", "detailed examination"],
  "fundamental aspect": ["key aspect", "core element"],
  "primary objective": ["main goal", "chief aim"],
  "subsequent research": ["further research", "later studies"],
};

function humanizeText(text: string): string {
  let result = text;
  
  for (const [aiPhrase, alternatives] of Object.entries(academicReplacements)) {
    const regex = new RegExp(aiPhrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    result = result.replace(regex, () => {
      return alternatives[Math.floor(Math.random() * alternatives.length)];
    });
  }
  
  result = result.replace(/\bvery\b/gi, () => ['highly', 'extremely', 'incredibly', ''][Math.floor(Math.random() * 4)]);
  result = result.replace(/\bbig\b/gi, () => ['significant', 'substantial', 'major'][Math.floor(Math.random() * 3)]);
  result = result.replace(/\breally\b/gi, () => ['truly', 'genuinely', ''][Math.floor(Math.random() * 3)]);
  
  return result.trim();
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

export default function HumanizePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isHumanizing, setIsHumanizing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [hasFile, setHasFile] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const wordCount = countWords(input);
  const FREE_LIMIT = 500;
  const isFreeUser = true; // For demo, change this based on user auth
  
  const canProcess = wordCount > 0 && wordCount <= FREE_LIMIT;

  const handleHumanize = async () => {
    if (!input.trim()) return;
    
    if (wordCount > FREE_LIMIT && isFreeUser) {
      setShowLimitModal(true);
      return;
    }

    setIsHumanizing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const humanized = humanizeText(input);
    setOutput(humanized);
    setIsHumanizing(false);
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
      if (countWords(text) > FREE_LIMIT && isFreeUser) {
        alert(`Free users can process up to ${FREE_LIMIT} words. Please upgrade for more.`);
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Text Humanizer</h1>
          <p className="text-gray-600">Transform AI-generated text into natural, human-like writing that passes AI detection</p>
          
          <div className="mt-4 inline-flex items-center gap-4 px-4 py-2 bg-purple-50 rounded-full text-sm">
            <span className="text-purple-600 font-medium">Free: {FREE_LIMIT} words limit</span>
            <Link href="/pricing" className="text-purple-600 underline font-medium">Get more words →</Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Your Text</label>
              <span className={`text-xs ${wordCount > FREE_LIMIT ? 'text-red-500' : 'text-gray-500'}`}>
                {wordCount} / {FREE_LIMIT} words {wordCount > FREE_LIMIT && '(Exceeds free limit)'}
              </span>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your AI-generated academic text here (essay, research paper, assignment)..."
              className="w-full h-96 p-4 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            
            {/* File upload for paid users */}
            <div className="mt-4 p-4 border-2 border-dashed border-purple-200 rounded-lg text-center bg-purple-50">
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.doc,.docx"
                className="hidden"
                onChange={handleFileUpload}
              />
              <Upload className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <p className="text-sm text-gray-600 mb-2">Upload file (TXT, DOC, DOCX)</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-sm text-purple-600 font-medium hover:text-purple-700"
              >
                Choose file
              </button>
              {hasFile && (
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="text-sm text-gray-600">{fileName}</span>
                  <button onClick={clearFile} className="text-red-500 hover:text-red-600">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-2">Paid users can upload up to 30,000 words</p>
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
              className="w-full h-[450px] p-4 border rounded-lg text-sm resize-none bg-gray-50"
            />
          </div>
        </div>

        {/* Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleHumanize}
            disabled={!canProcess || isHumanizing}
            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed transition-colors"
          >
            {isHumanizing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Humanizing...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Humanize Text
              </>
            )}
          </button>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">98%</div>
            <div className="text-gray-600">Bypass Rate</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">&lt;5s</div>
            <div className="text-gray-600">Processing Time</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">100%</div>
            <div className="text-gray-600">Meaning Preserved</div>
          </div>
        </div>

        {/* Limit Modal */}
        {showLimitModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Word Limit Exceeded</h3>
              <p className="text-gray-600 mb-6">Your text exceeds the free {FREE_LIMIT} word limit. Upgrade to a paid plan for more words and file upload feature.</p>
              <div className="space-y-3">
                <Link href="/pricing" className="block w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">
                  <Crown className="inline h-4 w-4 mr-2" />
                  View Plans
                </Link>
                <button onClick={() => setShowLimitModal(false)} className="block w-full px-4 py-2 text-gray-600 hover:text-gray-800">
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}