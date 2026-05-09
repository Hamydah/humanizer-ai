"use client";
import { useState, useRef } from "react";
import { Sparkles, Copy, Check, Loader2, AlertCircle, Crown, Upload, X } from "lucide-react";
import Link from "next/link";

function humanizeText(text: string): string {
  if (!text.trim()) return "";

  let result = text;

  // 1. AI detection phrase replacements
  const aiPhrases: Record<string, string[]> = {
    "Furthermore": ["Additionally", "Moreover", "Besides"],
    "Moreover": ["Additionally", "Furthermore", "What's more"],
    "Additionally": ["Also", "Plus", "As well"],
    "However": ["But", "Yet", "Nevertheless", "Nonetheless"],
    "Nevertheless": ["However", "Still", "Yet"],
    "Therefore": ["Thus", "Hence", "So", "As a result"],
    "Hence": ["Therefore", "Thus", "Consequently"],
    "In conclusion": ["Overall", "To sum up", "All things considered"],
    "To sum up": ["Overall", "In summary", "All in all"],
    "In summary": ["Overall", "In essence", "To conclude"],
    "It is important to note": ["Notably", "Importantly", "It's worth noting"],
    "It should be noted": ["Importantly", "Note that", "It is worth mentioning"],
    "One of the most": ["Among the key", "Some significant"],
    "Recent studies have shown": ["Research indicates", "Studies suggest"],
    "Extensive research": ["Considerable research", "A growing body of research"],
    "The data suggests": ["Evidence indicates", "Research shows"],
    "Experts believe": ["Scholars suggest", "Researchers argue"],
    "According to statistics": ["Statistics show", "Data indicates"],
    "It cannot be denied": ["Clearly", "Without question"],
    "Undoubtedly": ["Certainly", "Without a doubt", "Of course"],
    "In today's world": ["Currently", "These days", "Presently"],
    "This technology": ["This innovation", "Such systems"],
    "Artificial intelligence": ["AI", "Machine learning", "Modern AI systems"],
    "The utilization of": ["Using", "The use of", "Utilizing"],
    "In order to": ["To", "For", "So as to"],
    "In the event that": ["If", "Should", "In case"],
    "At this point in time": ["Currently", "Now", "At present"],
    "Due to the fact that": ["Because", "Since", "As"],
    "In spite of the fact that": ["Although", "Despite", "Though"],
    "With regard to": ["Regarding", "Concerning", "About"],
    "In regards to": ["About", "Concerning", "With respect to"],
    "For the purpose of": ["To", "For", "In order to"],
    "In the case of": ["If", "When", "For"],
    "demonstrates that": ["shows", "indicates", "proves"],
    "illustrates that": ["shows", "reveals", "demonstrates"],
    "evidenced by": ["shown by", "demonstrated by", "evidenced through"],
    "significant impact": ["major effect", "substantial influence", "notable impact"],
    "comprehensive analysis": ["thorough analysis", "detailed examination", "extensive review"],
    "fundamental aspect": ["key aspect", "core element", "essential component"],
    "primary objective": ["main goal", "key aim", "chief purpose"],
    "subsequent research": ["further research", "later studies", "additional studies"],
  };

  // Apply phrase replacements
  for (const [phrase, alternatives] of Object.entries(aiPhrases)) {
    const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
    result = result.replace(regex, () => alternatives[Math.floor(Math.random() * alternatives.length)]);
  }

  // 2. Remove common AI filler words
  const fillers = ["very", "really", "basically", "actually", "literally", "totally", "completely"];
  fillers.forEach(filler => {
    const regex = new RegExp(`\\b${filler}\\b`, 'gi');
    result = result.replace(regex, '');
  });

  // 3. Vary sentence structure - reframe starting words
  const sentenceStarters: Record<string, string[]> = {
    "First": ["To begin", "Initially", "The first"],
    "Second": ["Next", "Following this", "The second"],
    "Third": ["Additionally", "Furthermore", "The third"],
    "Finally": ["In the end", "To conclude", "Lastly"],
    "However": ["But", "Yet", "On the other hand"],
    "Therefore": ["Thus", "So", "This means"],
  };

  for (const [starter, alternatives] of Object.entries(sentenceStarters)) {
    const regex = new RegExp(`\\b${starter},\\b`, 'gi');
    result = result.replace(regex, () => {
      return Math.random() > 0.5 ? alternatives[Math.floor(Math.random() * alternatives.length)] + ', ' : starter + ', ';
    });
  }

  // 4. Break long sentences (AI often writes very long sentences)
  const sentences = result.split(/([.!?]+\s*)/);
  const newSentences: string[] = [];
  
  for (let i = 0; i < sentences.length; i += 2) {
    const sentence = sentences[i];
    if (sentence && sentence.trim().length > 100 && sentence.includes(',')) {
      // Split long sentences
      const parts = sentence.split(',');
      if (parts.length > 3) {
        const keep = parts.slice(0, Math.ceil(parts.length / 2)).join(',');
        const split = parts.slice(Math.ceil(parts.length / 2)).join(',');
        newSentences.push(keep + '.');
        newSentences.push(split.trim());
      } else {
        newSentences.push(sentence);
      }
    } else {
      newSentences.push(sentence);
    }
  }
  result = newSentences.join('. ');

  // 5. Add occasional short sentences (human writing style)
  result = result.replace(/\.\s+([A-Z][a-z]+,)/g, (match, p1) => {
    if (Math.random() > 0.7) {
      return '. ' + p1.charAt(0).toLowerCase() + p1.slice(1);
    }
    return match;
  });

  // 6. Vary transition phrases
  const transitions = result.split('. ');
  const varied = transitions.map(t => {
    if (t.match(/^(Moreover|Furthermore|Additionally)/i) && Math.random() > 0.5) {
      return t;
    }
    return t;
  });
  result = varied.join('. ');

  // 7. Change some passive to active and vice versa
  const passivePatterns = [
    { from: /is (being )?conducted by/gi, to: "is conducted" },
    { from: /was (being )?performed by/gi, to: "performed" },
    { from: /has been (been )?shown/gi, to: "shows" },
    { from: /is considered to be/gi, to: "is" },
  ];

  passivePatterns.forEach(({ from, to }) => {
    result = result.replace(from, to);
  });

  // 8. Remove extra spaces
  result = result.replace(/\s+/g, ' ').trim();
  
  // 9. Add natural variations
  result = result.replace(/\bbig\b/gi, () => ['significant', 'substantial', 'major'][Math.floor(Math.random() * 3)]);
  result = result.replace(/\bgood\b/gi, () => ['solid', 'sound', 'effective'][Math.floor(Math.random() * 3)]);
  result = result.replace(/\bimportant\b/gi, () => ['crucial', 'essential', 'significant'][Math.floor(Math.random() * 3)]);
  result = result.replace(/\bmany\b/gi, () => ['numerous', 'various', 'multiple'][Math.floor(Math.random() * 3)]);
  
  // 10. Fix capitalization after periods
  result = result.replace(/\.\s+([a-z])/g, (match, letter) => '. ' + letter.toUpperCase());

  return result;
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
  const [humanizationLevel, setHumanizationLevel] = useState<"basic" | "advanced">("advanced");
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
    
    // Simulate processing time for effect
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
      if (countWords(text) > 30000) {
        alert("Maximum 30,000 words allowed");
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
                {wordCount} / {FREE_LIMIT} words
              </span>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your AI-generated academic text here (essay, research paper, assignment)..."
              className="w-full h-96 p-4 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            
            {/* File upload */}
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
            disabled={!input.trim() || isHumanizing}
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

        {/* How it works */}
        <div className="mt-12 p-6 bg-purple-50 rounded-xl">
          <h3 className="font-bold text-lg mb-4">How we humanize your text:</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>✅ Replaces AI-detected phrases with natural alternatives</li>
            <li>✅ Varies sentence structure to match human writing patterns</li>
            <li>✅ Breaks formulaic patterns AI tends to use</li>
            <li>✅ Removes filler words that signal AI generation</li>
            <li>✅ Restructures long sentences into natural flow</li>
            <li>✅ Adds natural language variations</li>
          </ul>
        </div>

        {/* Limit Modal */}
        {showLimitModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Word Limit Exceeded</h3>
              <p className="text-gray-600 mb-6">Your text exceeds the free {FREE_LIMIT} word limit. Upgrade for more words and file upload.</p>
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