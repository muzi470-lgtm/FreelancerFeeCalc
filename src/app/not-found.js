import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-deep rounded-3xl p-12 text-center max-w-lg">
        <h1 className="text-6xl font-bold text-brand-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-slate-600 mb-8">
          The calculator page you are looking for does not exist. 
          Check your URL or browse our available platforms and countries.
        </p>
        <Link 
          href="/" 
          className="glass-button-primary inline-block no-underline"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}