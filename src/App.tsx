import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ToolPage } from './pages/ToolPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { PrivacyPage } from './pages/PrivacyPage.tsx';
import { TermsPage } from './pages/TermsPage.tsx';
import { AiAccuracyPage } from './pages/AiAccuracyPage.tsx';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }
  };

  const renderCurrentView = () => {
    // Normalise path (remove trailing slashes if any)
    const normalized = currentPath.length > 1 && currentPath.endsWith('/')
      ? currentPath.slice(0, -1)
      : currentPath;

    switch (normalized) {
      case '/':
        return <HomePage onNavigate={navigateTo} />;
      case '/tools/ai-text-summarizer':
        return <ToolPage toolType="summarizer" onNavigate={navigateTo} />;
      case '/tools/flashcard-maker':
        return <ToolPage toolType="flashcards" onNavigate={navigateTo} />;
      case '/tools/quiz-generator':
        return <ToolPage toolType="quiz" onNavigate={navigateTo} />;
      case '/tools/explain-a-topic':
        return <ToolPage toolType="explainer" onNavigate={navigateTo} />;
      case '/about':
        return <AboutPage onNavigate={navigateTo} />;
      case '/contact':
        return <ContactPage />;
      case '/privacy':
        return <PrivacyPage />;
      case '/terms':
        return <TermsPage />;
      case '/ai-accuracy':
        return <AiAccuracyPage />;
      default:
        // Default fallback to HomePage if unknown URL
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar currentPath={currentPath} onNavigate={navigateTo} />
      <main className="flex-1 w-full">
        {renderCurrentView()}
      </main>
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
