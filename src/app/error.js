'use client';

/**
 * Error Boundary — Catches client-side errors gracefully
 * Displays user-friendly error UI with recovery option.
 */

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error to monitoring service (Sentry, LogRocket, etc.)
    console.error('Application error:', error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-deep rounded-3xl p-12 text-center max-w-lg">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Something went wrong
        </h2>
        
        <p className="text-slate-600 mb-8">
          We encountered an error while loading this calculator. Please try again or return to the homepage.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="glass-button-primary"
          >
            Try Again
          </button>
          <Link 
            href="/" 
            className="glass-button inline-block no-underline text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}