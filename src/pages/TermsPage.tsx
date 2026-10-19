import React from 'react';
import { Scale, BookOpen, AlertCircle, ShieldAlert } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 space-y-10 animate-in fade-in duration-200">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          <Scale className="w-3.5 h-3.5" />
          <span>User Agreement</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Terms of Use
        </h1>
        <p className="text-xs text-slate-500">
          Last Updated: October 16, 2026
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs space-y-8 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or utilizing StudySpark AI, you agree to comply with and be bound by these Terms of Use. If you do not accept these terms, you should refrain from using the tools.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">2. Academic Integrity & Responsible Student Use</h2>
          <p>
            StudySpark AI is designed strictly as a pedagogical revision and study aid. You agree to use the service in full compliance with your academic institution&apos;s code of conduct and honor policies.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            <li>You may not use StudySpark AI to engage in automated cheating or unauthorized assistance during live, proctored examinations.</li>
            <li>You are solely responsible for verifying the accuracy of any generated summary, flashcard, or quiz before relying upon it for academic coursework or assessments.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">3. Acceptable Use and Rate Limits</h2>
          <p>
            To ensure reliable free access for all students globally, we enforce fair-use limits:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            <li>Users must not attempt to reverse-engineer, scrape, flood, or launch denial-of-service attacks against our API endpoints.</li>
            <li>Submissions must not contain malicious code, illegal materials, or harmful prompt injection attacks.</li>
            <li>We reserve the right to temporarily rate-limit or restrict access to any IP address exceeding acceptable consumption thresholds.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">4. Disclaimer of Warranties</h2>
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 text-xs text-amber-900 leading-relaxed">
            <strong>Educational Material As-Is:</strong> StudySpark AI and all synthesized materials are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. We make no representations or warranties regarding specific examination grades, course completion outcomes, or continuous error-free operation. AI models may occasionally generate plausible inaccuracies.
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">5. Limitation of Liability</h2>
          <p>
            In no event shall StudySpark AI or its contributors be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the service, including test results or reliance on AI-generated materials.
          </p>
        </section>
      </div>
    </div>
  );
};
