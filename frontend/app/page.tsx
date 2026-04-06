"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [visitors, setVisitors] = useState(35);

  useEffect(() => {
    // Only fetch on mounted client
    fetch('/api/visitors', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.count) {
          setVisitors(data.count);
        }
      })
      .catch(err => console.error("Error fetching visitors", err));
  }, []);

  useEffect(() => {
    const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const html = document.documentElement;
    if (isSystemDark || html.classList.contains('dark')) {
      html.classList.add('dark');
      html.classList.remove('light');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    html.classList.toggle('light');
    setIsDark(!isDark);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        const response = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        if (response.ok) {
          setSubmitted(true);
        } else {
          console.error('Failed to submit email');
        }
      } catch (err) {
        console.error('Error submitting email', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 flex flex-col font-sans overflow-hidden selection:bg-[#cfb53b]/30 selection:text-[#cfb53b] transition-colors duration-300">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-5 md:px-12 w-full max-w-7xl mx-auto relative z-20">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            HackShare
          </Link>
          <div className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-[#151821] px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700/50 shadow-sm ml-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="font-medium">visitors: {visitors}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
            <Link href="/kostly-campaign" className="hover:text-gray-900 dark:hover:text-white transition-colors">Campaigns</Link>
            <Link href="/about" className="hover:text-gray-900 dark:hover:text-white transition-colors">About</Link>
          </div>
          
          <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-[#2a2c2e] transition text-gray-600 dark:text-gray-300">
            {isDark ? (
               <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
               </svg>
            ) : (
               <svg className="w-5 h-5 flex-shrink-0 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
               </svg>
            )}
          </button>

          <Link 
            href="/join" 
            className="bg-[#cfb53b] hover:bg-[#b8a134] text-[#111111] px-5 py-2.5 rounded-full font-semibold text-sm transition-all shadow-[0_0_15px_rgba(207,181,59,0.3)] hover:shadow-[0_0_25px_rgba(207,181,59,0.5)] flex items-center gap-2"
          >
            Get your own page
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 mb-12 relative z-10 w-full max-w-5xl mx-auto">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#cfb53b]/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="text-center space-y-6 max-w-4xl">
          <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-gray-900 dark:text-white leading-tight transition-colors duration-300">
            HackShare
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium max-w-3xl mx-auto transition-colors duration-300">
            The platform for all <span className="text-[#cfb53b]">builders</span>, hackathons and <span className="text-[#cfb53b]">startups</span>. 
            <br className="hidden md:block"/>
            Show the team’s progress in <span className="underline decoration-[#cfb53b]/40 underline-offset-4">real time</span>, 
            gain traction on your page and attract people who are truly <span className="underline decoration-[#cfb53b]/40 underline-offset-4">interested</span>.
          </p>
        </div>

        {/* Email Collection Card */}
        <div className="mt-16 w-full max-w-[42rem]">
          <div className="bg-white dark:bg-[#2a2c2e] rounded-2xl border border-gray-200 dark:border-gray-700/50 p-8 md:p-12 shadow-2xl shadow-black/10 dark:shadow-black/50 backdrop-blur-sm transition-colors duration-300">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-2 tracking-tight transition-colors duration-300">
                Do you want your own hackshare page?
              </h2>
              <p className="text-2xl md:text-3xl font-semibold text-[#cfb53b]">
                Leave us your email address
              </p>
            </div>

            {submitted ? (
              <div className="text-[#cfb53b] font-medium text-lg md:text-xl py-6 border border-[#cfb53b]/30 bg-[#cfb53b]/10 rounded-xl text-center">
                Thanks! We will contact you when we launch.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600/50 bg-gray-50 dark:bg-[#151821] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-[#cfb53b] dark:focus:border-[#cfb53b]/50 focus:ring-2 focus:ring-[#cfb53b]/30 transition-all text-lg shadow-inner"
                />
                <button
                  type="submit"
                  className="bg-[#cfb53b] hover:bg-[#b8a134] text-[#1a1a1a] px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_15px_rgba(207,181,59,0.2)] hover:shadow-[0_0_20px_rgba(207,181,59,0.4)] flex-shrink-0"
                >
                  Submit
                </button>
              </form>
            )}

            {!submitted && (
              <p className="mt-6 text-sm text-gray-400 text-center font-medium">
                We will contact you when we launch
              </p>
            )}
          </div>
        </div>

        <div className="pt-16 flex flex-col items-center gap-6">
          <Link 
            href="/kostly-campaign" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-medium text-sm tracking-wide"
          >
            View our demo campaign page
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          
          <p className="text-sm text-gray-500 font-medium">
            powered by the <a href="https://kostly.dev" target="_blank" rel="noreferrer" className="text-[#cfb53b] hover:text-[#b8a134] transition-colors underline decoration-[#cfb53b]/30 underline-offset-4">kostly.dev team</a>
          </p>
        </div>
      </main>
    </div>
  );
}
