import Link from "next/link";

export default function JoinPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-white dark:bg-[#1c1c1c] font-sans text-center">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          We are so happy you want to get involved!
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          That's the type of people we want to see in the <span className="font-semibold text-[var(--color-brand)]">hackshare</span> community.
        </p>
        
        <div className="pt-8">
          <a
            href="https://www.linkedin.com/in/tudor-andrei-ioan/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[var(--color-brand)] hover:bg-[#b59e33] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-transform hover:scale-105 shadow-md"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Message us to join
          </a>
        </div>

        <div className="pt-4">
          <Link href="/kostly-campaign" className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 underline text-sm transition-colors">
            Return to campaign
          </Link>
        </div>
      </div>
    </main>
  );
}