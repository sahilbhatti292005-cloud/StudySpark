import React from 'react';
import { ShieldCheck, Lock, EyeOff, Server, Database } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 space-y-10 animate-in fade-in duration-200">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Transparent Data Governance</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500">
          Last Updated: October 16, 2026 &middot; Version 1.0
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs space-y-8 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-600" />
            1. Our Privacy Philosophy
          </h2>
          <p>
            StudySpark AI (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;the Service&rdquo;) is built for students and lifelong learners. We believe academic productivity tools should not require surrendering personal data. We do not require registration, passwords, phone numbers, or credit cards for core study tooling.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-600" />
            2. What We Collect and Process
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Submitted Study Notes & Queries:</strong> When you input notes or topics to generate summaries, flashcards, or quizzes, this content is transmitted securely (via HTTPS/TLS) to our backend server. Our server processes this content in-flight to formulate prompts for the Google Gemini API. <strong>We do not save your study notes or generated responses to a persistent user database.</strong> Once your browser receives the response, the server discards the session payload.
            </li>
            <li>
              <strong>Technical Logs & Rate Limiting:</strong> To safeguard the service against denial-of-service abuse and ensure fair resource allocation under our free budget, our server maintains short-lived, in-memory rate-limiting counters mapped to masked IP addresses. These records expire automatically within 15 minutes.
            </li>
            <li>
              <strong>Contact Inquiries:</strong> If you voluntarily reach out via our contact page, we collect your name, email address, and message solely to answer your questions.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Server className="w-4 h-4 text-indigo-600" />
            3. Third-Party AI Sub-Processors
          </h2>
          <p>
            Our backend communicates with the <strong>Google Gemini API</strong> (Google LLC) to execute natural language synthesis, flashcard structuring, and question generation. All communications occur through authenticated server-side API calls. Your text is processed according to Google Cloud data privacy standards. Google does not use customer data submitted through the Gemini API to train base foundational models when operated under enterprise terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-indigo-600" />
            4. Cookies and Advertising Disclosures
          </h2>
          <p>
            In its current version, StudySpark AI does not place tracking cookies or invasive third-party fingerprinting scripts on your device.
          </p>
          <p>
            To support ongoing free hosting and API compute, we prepare the site for future contextual display advertising via Google AdSense. Any advertising partners will adhere to standard Google ad policies, providing transparent privacy notices and user consent mechanisms where required by applicable local regulations (e.g., GDPR, UK GDPR, and CCPA).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">
            5. Your Data Rights
          </h2>
          <p>
            Because we do not maintain persistent accounts or user document storage, we generally do not hold personal data linked to your identity. If you have submitted a contact form and wish to have your message deleted from our email records, please submit a request via our Contact page.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">
            6. Contact for Privacy Matters
          </h2>
          <p>
            If you have questions or concerns regarding our privacy practices, contact our team directly through our <a href="/contact" className="text-indigo-600 underline font-medium">Contact Form</a>.
          </p>
        </section>
      </div>
    </div>
  );
};
