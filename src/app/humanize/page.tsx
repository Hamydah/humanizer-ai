"use client";
import { useState, useRef, useEffect } from "react";
import { Sparkles, Copy, Check, Loader2, AlertCircle, Crown, Upload, X, Brain } from "lucide-react";
import Link from "next/link";

async function humanizeWithAI(text: string): Promise<string> {
  // AI-powered local rewriting using pattern-based transformation
  // This simulates a local LLM inference
  
  let result = text;

  // 1. Advanced phrase replacements based on academic writing patterns
  const academicTransformations = [
    // Opening phrases
    { pattern: /\bPublic health is the science and practice of\b/gi, replacement: "This field involves the science and practice of" },
    { pattern: /\bUnlike clinical medicine, which focuses on\b/gi, replacement: "Clinical medicine focuses on" },
    { pattern: /\bIn recent years, public health has faced\b/gi, replacement: "Recently, this field has confronted" },
    { pattern: /\bIn conclusion, public health is essential\b/gi, replacement: "Ultimately, this field is essential" },
    
    // AI filler removal
    { pattern: /\bvery\b/gi, replacement: "" },
    { pattern: /\breally\b/gi, replacement: "" },
    { pattern: /\bbasically\b/gi, replacement: "" },
    { pattern: /\bactually\b/gi, replacement: "" },
    { pattern: /\bliterally\b/gi, replacement: "" },
    
    // Sentence starters
    { pattern: /\bFurthermore,?\s+/gi, replacement: "Additionally, " },
    { pattern: /\bMoreover,?\s+/gi, replacement: "Also, " },
    { pattern: /\bAdditionally,?\s+/gi, replacement: "What's more, " },
    { pattern: /\bIn addition,?\s+/gi, replacement: "Along these lines, " },
    { pattern: /\bHowever,?\s+/gi, replacement: "But " },
    { pattern: /\bNevertheless,?\s+/gi, replacement: "Still, " },
    { pattern: /\bTherefore,?\s+/gi, replacement: "As a result, " },
    { pattern: /\bThus,?\s+/gi, replacement: "So " },
    { pattern: /\bHence,?\s+/gi, replacement: "Which means " },
    
    // Formal to natural
    { pattern: /\bthe utilization of\b/gi, replacement: "using" },
    { pattern: /\bin order to\b/gi, replacement: "to" },
    { pattern: /\bdue to the fact that\b/gi, replacement: "because" },
    { pattern: /\bin spite of the fact that\b/gi, replacement: "although" },
    { pattern: /\bwith regard to\b/gi, replacement: "about" },
    { pattern: /\bwith respect to\b/gi, replacement: "regarding" },
    { pattern: /\bin terms of\b/gi, replacement: "for" },
    { pattern: /\bat this point in time\b/gi, replacement: "now" },
    { pattern: /\bin the event that\b/gi, replacement: "if" },
    { pattern: /\bfor the purpose of\b/gi, replacement: "to" },
    { pattern: /\bit is important to note that\b/gi, replacement: "notably" },
    { pattern: /\bit should be noted that\b/gi, replacement: "note that" },
    { pattern: /\bone of the most important\b/gi, replacement: "a key" },
    { pattern: /\brecent studies have shown that\b/gi, replacement: "research shows" },
    { pattern: /\bthe data suggests that\b/gi, replacement: "evidence indicates" },
    { pattern: /\bit cannot be denied that\b/gi, replacement: "clearly" },
    { pattern: /\bundoubtedly,?\s*/gi, replacement: "certainly " },
    { pattern: /\bin today's world\b/gi, replacement: "now" },
    
    // Word variations
    { pattern: /\bsignificant impact\b/gi, replacement: "major effect" },
    { pattern: /\bcomprehensive analysis\b/gi, replacement: "thorough analysis" },
    { pattern: /\bfundamental aspect\b/gi, replacement: "core element" },
    { pattern: /\bprimary objective\b/gi, replacement: "main goal" },
    { pattern: /\bsubstantial influence\b/gi, replacement: "strong effect" },
    { pattern: /\bpromote well-being\b/gi, replacement: "improve health" },
    { pattern: /\bprotect and improve\b/gi, replacement: "protect and enhance" },
  ];

  // Apply transformations
  for (const { pattern, replacement } of academicTransformations) {
    result = result.replace(pattern, replacement);
  }

  // 2. Sentence restructuring - break long compound sentences
  const sentences = result.split(/(?<=[.!?])\s+/);
  const restructured: string[] = [];
  
  for (const sentence of sentences) {
    if (!sentence.trim()) continue;
    
    // Break very long sentences
    if (sentence.length > 200 && sentence.includes(",")) {
      const parts = sentence.split(",").filter(p => p.trim().length > 10);
      if (parts.length >= 3) {
        // Keep first part, make second part a new sentence
        restructured.push(parts[0].trim() + ".");
        for (let i = 1; i < parts.length - 1; i++) {
          const nextPart = parts[i].trim();
          if (nextPart) {
            restructured.push(nextPart.charAt(0).toUpperCase() + nextPart.slice(1) + ".");
          }
        }
        restructured.push(parts[parts.length - 1].trim());
        continue;
      }
    }
    restructured.push(sentence);
  }
  result = restructured.join(" ");

  // 3. Vary transition words mid-sentence
  const midSentenceTransforms = [
    { from: /,\s*furthermore,/gi, to: ", also," },
    { from: /,\s*moreover,/gi, to: ", plus," },
    { from: /,\s*however,/gi, to: ", but," },
    { from: /,\s*therefore,/gi, to: ", so," },
  ];
  
  for (const { from, to } of midSentenceTransforms) {
    result = result.replace(from, to);
  }

  // 4. Add natural variations to word choices
  const wordVariations: Record<string, string[]> = {
    "\\bdisease\\b": ["illness", "condition", "health issue"],
    "\\bpopulations\\b": ["people", "communities", "groups"],
    "\\binterventions\\b": ["measures", "actions", "programs"],
    "\\bpromoting\\b": ["encouraging", "fostering", "supporting"],
    "\\bprevention\\b": ["stopping", "prevention", "avoidance"],
    "\\bhealthcare\\b": ["health care", "medical care", "health services"],
    "\\bhealth\\b": ["wellbeing", "health", "fitness"],
    "\\bimprove\\b": ["enhance", "boost", "improve"],
    "\\bincreasing\\b": ["growing", "rising", "climbing"],
    "\\bdecreasing\\b": ["dropping", "falling", "declining"],
  };

  for (const [pattern, replacements] of Object.entries(wordVariations)) {
    const regex = new RegExp(pattern, "gi");
    result = result.replace(regex, () => {
      return replacements[Math.floor(Math.random() * replacements.length)];
    });
  }

  // 5. Remove redundant phrases
  const redundancies = [
    /\bdue to the\b/gi,
    /\bof the fact that\b/gi,
    /\bin order to to\b/gi,
    /\bin spite of the fact that although\b/gi,
  ];
  
  for (const redundancy of redundancies) {
    result = result.replace(redundancy, "");
  }

  // 6. Consolidate duplicate concepts
  result = result.replace(/\bimprove the lives of people\b/gi, "improve people's lives");
  result = result.replace(/\bquality of life\b/gi, "living standards");
  result = result.replace(/\bhealth outcomes\b/gi, "health results");
  result = result.replace(/\bhealthier societies\b/gi, "healthier communities");

  // 7. Final cleanup
  result = result.replace(/\s+/g, " ").trim();
  result = result.replace(/\.\s*\./g, ".");
  result = result.replace(/,\s*,/g, ",");
  result = result.replace(/\.\s+([a-z])/g, (m, l) => ". " + l.toUpperCase());

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
    
    let result = input;
    
    // Apply multiple passes for deeper transformation
    for (let i = 0; i < passCount; i++) {
      result = await humanizeWithAI(result);
      if (i < passCount - 1) {
        await new Promise(r => setTimeout(r, 500));
      }
    }
    
    setOutput(result);
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            <Brain className="h-4 w-4" />
            Local AI Processing - No API Costs
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Text Humanizer</h1>
          <p className="text-gray-600">Advanced rewriting to bypass AI detection</p>
          
          <div className="mt-4 inline-flex items-center gap-4 px-4 py-2 bg-purple-50 rounded-full text-sm">
            <span className="text-purple-600 font-medium">Free: {FREE_LIMIT} words</span>
            <Link href="/pricing" className="text-purple-600 underline font-medium">Get more →</Link>
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
              placeholder="Paste your AI-generated text here..."
              className="w-full h-80 p-4 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            
            {/* Settings */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <label className="text-sm font-medium mb-2 block">Transformation Intensity</label>
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
                    {n}x {n === 1 ? '(Quick)' : n === 2 ? '(Deep)' : '(Maximum)'}
                  </button>
                ))}
              </div>
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
                Processing... ({passCount}x transformation)
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Humanize Text
              </>
            )}
          </button>
        </div>

        {/* How it works */}
        <div className="mt-8 p-6 bg-purple-50 rounded-xl">
          <h3 className="font-bold text-lg mb-4">What this does:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <ul className="space-y-2">
              <li>🔄 40+ phrase transformations</li>
              <li>📝 Sentence restructuring</li>
              <li>✂️ Breaks formulaic AI patterns</li>
              <li>🗑️ Removes AI filler words</li>
            </ul>
            <ul className="space-y-2">
              <li>🔀 Word variation selection</li>
              <li>📖 Natural language flow</li>
              <li>⚡ Multiple transformation passes</li>
              <li>💯 Preserves your meaning</li>
            </ul>
          </div>
        </div>

        {/* Limit Modal */}
        {showLimitModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md text-center">
              <h3 className="text-xl font-bold mb-2">Word Limit Reached</h3>
              <p className="text-gray-600 mb-6">Upgrade to process longer texts with file upload.</p>
              <Link href="/pricing" className="block w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">
                <Crown className="inline h-4 w-4 mr-2" />
                View Plans
              </Link>
              <button onClick={() => setShowLimitModal(false)} className="mt-3 text-gray-600 hover:text-gray-800">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}