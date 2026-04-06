"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Metadata } from "next";

export default function AboutPage() {
  const [isDark, setIsDark] = useState(false);
  const [visitors, setVisitors] = useState(35);

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 flex flex-col font-sans overflow-hidden selection:bg-[#cfb53b]/30 selection:text-[#cfb53b] transition-colors duration-300">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-5 md:px-12 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            HackShare
          </Link>
          <div className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-[#2a2c2e] px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 ml-2 shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="font-medium">visitors: {visitors}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Home</Link>
            <Link href="/kostly-campaign" className="hover:text-gray-900 dark:hover:text-white transition-colors">Campaigns</Link>
          </div>
          
          <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition text-gray-600 dark:text-gray-300">
            {isDark ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            )}
          </button>

          <Link 
            href="/join" 
            className="bg-[#cfb53b] hover:bg-[#b8a134] text-[#111111] px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-semibold text-sm transition-all shadow-[0_0_15px_rgba(207,181,59,0.3)] hover:shadow-[0_0_25px_rgba(207,181,59,0.5)] flex items-center gap-2"
          >
            Get your own page
            <svg className="w-4 h-4 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center p-6 md:p-12 mb-12 relative z-10 w-full max-w-5xl mx-auto mt-4 md:mt-12">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#cfb53b]/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="text-center space-y-8 max-w-3xl mb-20 relative z-20">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 dark:text-white transition-colors duration-300">
            About <span className="text-[#cfb53b]">HackShare</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium transition-colors duration-300">
            Dedicated for any <span className="underline decoration-[#cfb53b]/40 underline-offset-4">team building</span>, to attract interested people in their project. 
            <br className="hidden md:block" />
            Offer an insight to your workflow.
          </p>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
            We strive to have future integration with hackathons where they create invitations for their <span className="text-[#cfb53b]">teams</span> and can track progress in real time. 
            <br className="hidden md:block" />
            Useful for public voting section awards too.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl relative z-20">
            
          <div className="bg-white dark:bg-[#2a2c2e] p-8 md:p-10 rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-xl flex flex-col items-center text-center gap-5 hover:border-[#cfb53b]/40 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-[#cfb53b]/10 flex items-center justify-center text-[#cfb53b] mb-2 shadow-inner">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight transition-colors duration-300">Add info about your projects</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium transition-colors duration-300">Showcase your building process to the world clearly.</p>
          </div>

          <div className="bg-white dark:bg-[#2a2c2e] p-8 md:p-10 rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-xl flex flex-col items-center text-center gap-5 hover:border-[#cfb53b]/40 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-[#cfb53b]/10 flex items-center justify-center text-[#cfb53b] mb-2 shadow-inner">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight transition-colors duration-300">See analytics</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium transition-colors duration-300">Monitor traffic and team interactions powerfully.</p>
          </div>

          <div className="bg-white dark:bg-[#2a2c2e] p-8 md:p-10 rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-xl flex flex-col items-center text-center gap-5 hover:border-[#cfb53b]/40 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-[#cfb53b]/10 flex items-center justify-center text-[#cfb53b] mb-2 shadow-inner">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight transition-colors duration-300">Create hackathon invitation rooms</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium transition-colors duration-300">Scale invitations directly without manual effort.</p>
          </div>

        </div>
      </main>
    </div>
  );
}