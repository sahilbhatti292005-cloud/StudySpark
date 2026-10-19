import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface AdSlotProps {
  slotId: string;
  format?: 'banner' | 'in-feed' | 'sidebar' | 'leaderboard';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ slotId, format = 'banner', className = '' }) => {
  // In initial launch & development, display ads are disabled until approved by Google AdSense
  const [showChecklist, setShowChecklist] = useState(false);

  // Height reservation to avoid Cumulative Layout Shift (CLS)
  const getContainerDimensions = () => {
    switch (format) {
      case 'leaderboard':
        return 'min-h-[90px] w-full max-w-4xl';
      case 'sidebar':
        return 'min-h-[250px] w-full max-w-xs';
      case 'in-feed':
        return 'min-h-[120px] w-full';
      case 'banner':
      default:
        return 'min-h-[100px] w-full max-w-3xl';
    }
  };

  return (
    <aside
      aria-label="Advertisement Placement Area"
      className={`relative my-6 mx-auto rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-4 transition-colors ${getContainerDimensions()} ${className}`}
    >
      <div className="flex items-center justify-between text-[11px] font-medium tracking-wider text-slate-400 uppercase">
        <span>Advertisement Placeholder</span>
        <button
          type="button"
          onClick={() => setShowChecklist(true)}
          className="inline-flex items-center gap-1 text-[11px] font-normal text-slate-400 hover:text-indigo-600 transition-colors"
          title="View AdSense launch checklist"
        >
          <HelpCircle className="w-3 h-3" />
          <span>Launch Checklist</span>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-4 text-center">
        <p className="text-xs text-slate-500">
          Reserved ad slot (<span className="font-mono">{slotId}</span>) &middot; Disabled until AdSense approval
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Compliant layout with zero CLS layout shifts. No deceptive click incentives.
        </p>
      </div>

      {/* AdSense Readiness & Policy Checklist Modal */}
      {showChecklist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Google AdSense Launch & Policy Checklist</h3>
                <p className="text-xs text-slate-500 mt-0.5">Requirements for compliant monetization with ₹0 starting budget</p>
              </div>
              <button
                type="button"
                onClick={() => setShowChecklist(false)}
                className="text-slate-400 hover:text-slate-700 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Original, High-Value Educational Content:</strong> All four tools provide functional value without thin scraper pages.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Mandatory Policy Pages:</strong> Accessible Privacy Policy (/privacy), Terms of Use (/terms), About (/about), and Contact (/contact).
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Clear Separation & Zero Deceptive Clicks:</strong> Ad slots are labeled as "Advertisement" and separated from Generate/Copy buttons.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">No Cookie Tracking by Default:</strong> Clean privacy-first design compliant with GDPR/CCPA disclosure norms.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Mobile Responsive & Fast:</strong> Optimized for mobile viewports without blocking learning controls.
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowChecklist(false)}
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800"
              >
                Close Checklist
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
