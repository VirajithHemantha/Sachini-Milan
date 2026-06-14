import React, { useState } from 'react';
import { Copy, Link as LinkIcon, CheckCircle2 } from 'lucide-react';

const PREFIXES = [
  "Mr. & Mrs.",
  "Mr.",
  "Mrs.",
  "Ms.",
  "Dr.",
  "Dr. & Mrs.",
  "Dr. & Mr.",
  "Prof.",
  "Rev."
];

export default function Admin() {
  const [prefix, setPrefix] = useState(PREFIXES[0]);
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!guestName.trim()) return;
    
    // Get the base URL (current origin without any query parameters or paths)
    const baseUrl = window.location.origin;
    
    // Construct the URL with encoded parameters
    const url = new URL(baseUrl);
    url.searchParams.set('prefix', prefix);
    url.searchParams.set('name', guestName.trim());
    
    setGeneratedLink(url.toString());
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#000f29] text-white flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Background decorations matching the theme */}
      <div className="absolute inset-0 opacity-10 paper-grain pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-theme-600 blur-[120px] rounded-full opacity-20 pointer-events-none" />

      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-cinzel font-bold mb-2 tracking-wider">Admin Dashboard</h1>
          <p className="text-theme-200 text-sm tracking-widest uppercase">Invitation Link Generator</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-theme-100 uppercase tracking-wider">
              Title / Prefix
            </label>
            <select
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-theme-300 transition-colors appearance-none"
            >
              {PREFIXES.map((p) => (
                <option key={p} value={p} className="bg-[#000f29] text-white">
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-theme-100 uppercase tracking-wider">
              Guest Name
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-theme-300 transition-colors"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!guestName.trim()}
            className="w-full bg-white text-[#000f29] font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-theme-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <LinkIcon className="w-4 h-4" />
            Generate Link
          </button>

          {generatedLink && (
            <div className="mt-8 pt-6 border-t border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <label className="block text-sm font-medium text-theme-100 uppercase tracking-wider mb-2">
                Your Generated Link
              </label>
              <div className="bg-black/40 rounded-xl p-4 break-all text-sm text-theme-200 font-mono mb-4 border border-white/10">
                {generatedLink}
              </div>
              <button
                onClick={handleCopy}
                className={`w-full font-bold uppercase tracking-widest py-3 rounded-xl transition-all flex items-center justify-center gap-2 border ${
                  copied 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                    : 'bg-transparent text-white border-white/30 hover:bg-white/10'
                }`}
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
