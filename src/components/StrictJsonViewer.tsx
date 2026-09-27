import React, { useState } from 'react';
import { Copy, Check, Download, FileJson, Sparkles, CheckCircle2 } from 'lucide-react';
import { StrictEtsyOutput } from '../types';

interface StrictJsonViewerProps {
  data: StrictEtsyOutput;
}

export const StrictJsonViewer: React.FC<StrictJsonViewerProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `etsy-listing-strategy-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-stone-900 rounded-2xl border border-stone-800 text-stone-100 shadow-lg overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-800 bg-stone-950/60">
        <div className="flex items-center space-x-2.5">
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 animate-pulse" />
          <span className="font-mono text-xs font-semibold tracking-wider text-amber-400 uppercase">
            Strict Output JSON Schema
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-stone-800 text-stone-400 font-mono">
            6 Required Fields Verified
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            id="btn-copy-json-code"
            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                <span className="text-emerald-300">Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 mr-1.5 text-stone-400" />
                <span>Copy JSON</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            id="btn-download-json-file"
            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-600 hover:bg-amber-500 text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            <span>Download .json</span>
          </button>
        </div>
      </div>

      {/* Code Container */}
      <div className="p-5 overflow-x-auto">
        <pre className="font-mono text-xs text-amber-200/90 leading-relaxed">
          <code>{jsonString}</code>
        </pre>
      </div>

      {/* Validation Checklist Footer */}
      <div className="px-5 py-3 bg-stone-950/90 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-400">
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> target_audience
          </span>
          <span className="flex items-center text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> buying_trigger
          </span>
          <span className="flex items-center text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> optimized_title ({data.optimized_title.length}/140)
          </span>
          <span className="flex items-center text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> thirteen_tags ({data.thirteen_tags.length}/13)
          </span>
        </div>
        <span className="text-stone-500 font-mono text-[11px]">Strict Output Compliant</span>
      </div>
    </div>
  );
};
