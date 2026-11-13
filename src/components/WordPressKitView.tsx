import React, { useState } from 'react';
import { WORDPRESS_IMPLEMENTATION_DATA } from '../data/wordpressCode';
import { Code, Copy, Check, Terminal, FileCode, CheckCircle2, AlertCircle } from 'lucide-react';

export const WordPressKitView: React.FC = () => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="bg-stone-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-800 font-semibold">
            <Terminal className="w-4 h-4 text-emerald-600" />
            <span>Phase 4 Deliverable · Ready-to-Use WordPress Implementation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
            WordPress Enhancement Code & Administrator Deployment Guide
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
            Practical code snippets and setup steps designed to run directly on Vedha's existing WordPress theme without breaking CMS core files or requiring expensive paid plugins.
          </p>
        </div>

        {/* Administrator Deployment Roadmap */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-lg font-bold font-display text-stone-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Non-Technical Admin Step-by-Step Roadmap</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {WORDPRESS_IMPLEMENTATION_DATA.adminChecklist.map((step, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                <div className="font-bold text-stone-900 text-sm">{step.step}</div>
                <p className="text-stone-600 leading-relaxed">{step.action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Code Block 1: Additional CSS */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
            <div>
              <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <FileCode className="w-4 h-4 text-emerald-700" />
                <span>1. Additional CSS (Custom Theme Styles)</span>
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                Where to paste: <code>WordPress Admin &gt; Appearance &gt; Customize &gt; Additional CSS</code>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(WORDPRESS_IMPLEMENTATION_DATA.customCss, 'css')}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-stone-300 text-stone-700 hover:bg-stone-100 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {copiedType === 'css' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>Copy CSS</span>
                </>
              )}
            </button>
          </div>
          <div className="p-4 bg-stone-950 text-stone-200 text-xs font-mono overflow-x-auto max-h-96">
            <pre>{WORDPRESS_IMPLEMENTATION_DATA.customCss}</pre>
          </div>
        </div>

        {/* Code Block 2: functions.php */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
            <div>
              <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <Code className="w-4 h-4 text-emerald-700" />
                <span>2. Child Theme Snippets (functions.php)</span>
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                Where to paste: <code>wp-content/themes/your-child-theme/functions.php</code> (or via Code Snippets plugin)
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(WORDPRESS_IMPLEMENTATION_DATA.functionsPhp, 'php')}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-stone-300 text-stone-700 hover:bg-stone-100 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {copiedType === 'php' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>Copy PHP</span>
                </>
              )}
            </button>
          </div>
          <div className="p-4 bg-stone-950 text-stone-200 text-xs font-mono overflow-x-auto max-h-96">
            <pre>{WORDPRESS_IMPLEMENTATION_DATA.functionsPhp}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
