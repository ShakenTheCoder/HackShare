"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// The parsed task tree from Strict Deadline Local Demo.md
const TASK_TREE = [
  { id: "1", title: "Structure 3 tiers plan for usage", status: "TODO" },
  { id: "2", title: "clear session structure by headers and tagging", status: "TODO" },
  { id: "3", title: "budget alert", status: "TODO" },
  { id: "4", title: "alert dismiss", status: "TODO" },
  { id: "5", title: "Construct templates", status: "DOING" }, // originally TODO, but changed for demo
  {
    id: "6", title: "Cherry MLP v1", status: "DOING", // active
    subtasks: [
      { id: "6-1", title: "Normalize", status: "TODO" },
      { id: "6-2", title: "Classify", status: "TODO" },
      { id: "6-3", title: "Use template", status: "TODO" },
      { id: "6-4", title: "ML Route", status: "TODO" },
      { id: "6-5", title: "Output", status: "TODO" },
    ]
  },
  {
    id: "7", title: "Cherry Complex", status: "TODO",
    subtasks: [
      {
        id: "7-1", title: "Cherry Layer 1", status: "TODO",
        subtasks: [
          { id: "7-1-1", title: "task normalization cleaner", status: "TODO" }
        ]
      },
      {
        id: "7-2", title: "Cherry Layer 2", status: "TODO",
        subtasks: [
          {
            id: "7-2-1", title: "task classifier", status: "TODO",
            subtasks: [
              {
                id: "7-2-1-a", title: "Cherry Layer 2 A (choice: simple)", status: "TODO",
                subtasks: [
                  {
                    id: "7-2-1-a-1", title: "use of no ML", status: "TODO",
                    subtasks: [
                      { id: "7-2-1-a-1-1", title: "use of predefined llm templates", status: "TODO" }
                    ]
                  }
                ]
              },
              {
                id: "7-2-1-b", title: "Cherry Layer 2 B", status: "TODO",
                subtasks: [
                  { id: "7-2-1-b-1", title: "no micro tasking", status: "TODO" }
                ]
              },
              {
                id: "7-2-1-c", title: "Cherry Layer 2 C (choice: complex)", status: "TODO",
                subtasks: [
                  {
                    id: "7-2-1-c-1", title: "Cherry Layer 3", status: "TODO",
                    subtasks: [
                      {
                        id: "7-2-1-c-1-1", title: "reconstruct micro tasks", status: "TODO",
                        subtasks: [
                          { id: "7-2-1-c-1-1-1", title: "assign excluded sources", status: "TODO" }
                        ]
                      },
                      { id: "7-2-1-c-1-2", title: "model for micro tasking", status: "TODO" },
                      { id: "7-2-1-c-1-3", title: "route each micro task", status: "TODO" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "7-4", title: "Cherry Layer 4", status: "TODO",
        subtasks: [
          { id: "7-4-1", title: "reconstruct final output", status: "TODO" }
        ]
      }
    ]
  },
  { id: "8", title: "analyze 500 + models", status: "TODO" },
  { id: "9", title: "get llms’ capabilities", status: "TODO" },
  { id: "10", title: "build industry level agent", status: "TODO" },
  { id: "11", title: "Implement checkout", status: "TODO" },
  { id: "12", title: "Finish development env setup", status: "DONE" } // from DONE column
];

type Task = {
  id: string;
  title: string;
  status: string;
  subtasks?: Task[];
};

function TaskNode({ task, depth = 0, isBlurred = false }: { task: Task; depth?: number; isBlurred?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const blurNext = Boolean(isBlurred || task.title.match(/Cherry Layer [1234]/i) || task.title.match(/Cherry MLP v1/i));

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "DOING":
        return {
          wrapper: "border-[var(--color-brand)] border-opacity-50",
          text: "border-l-2 border-[var(--color-brand)] pl-2"
        };
      case "DONE":
        return {
          wrapper: "bg-gray-50 dark:bg-[#1c1c1c]/50 border-gray-100 dark:border-[#2a2c2e] opacity-70",
          text: "line-through text-gray-500"
        };
      default:
        return {
          wrapper: "bg-white dark:bg-[#1c1c1c] border-gray-100 dark:border-[#2a2c2e]",
          text: ""
        };
    }
  };

  const styles = getStatusStyles(task.status);
  const indentClass = depth > 0 ? "ml-4 border-l border-gray-200 dark:border-[#2a2c2e] pl-4" : "";

  return (
    <div className={`flex flex-col gap-2 ${indentClass} mt-2`}>
      <div 
        className={`task-card p-4 rounded-lg shadow-sm border cursor-pointer flex flex-col gap-2 ${styles.wrapper}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <p className={`text-sm ${styles.text} ${isBlurred ? 'blur-md select-none opacity-80' : ''}`}>
          {isBlurred ? task.title.replace(/[^\s]/g, '█') : task.title}
        </p>
        {task.subtasks && task.subtasks.length > 0 && (
          <button
            onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
            className="text-xs text-gray-500 dark:text-gray-400 self-start mt-1 underline hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            {isExpanded ? "show less" : "show more"}
          </button>
        )}
      </div>
      {isExpanded && task.subtasks && task.subtasks.map((subtask) => (
        <TaskNode key={subtask.id} task={subtask} depth={depth + 1} isBlurred={blurNext} />
      ))}
    </div>
  );
}

export default function Home() {
  const [countdown, setCountdown] = useState("00:00:00:00");
  const [isDark, setIsDark] = useState(false);
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    // Fetch unique campaign page visitors (pageId: 2)
    fetch('/api/visitors', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pageId: 2 })
    })
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
    if (isSystemDark) {
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

  useEffect(() => {
    const deadline = new Date("2026-04-08T23:59:59").getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = deadline - now;
      if (distance < 0) {
        setCountdown("EXPIRED");
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      const format = (n: number) => n.toString().padStart(2, '0');
      setCountdown(`${format(days)}d ${format(hours)}h ${format(minutes)}m ${format(seconds)}s`);
    };
    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();
    return () => clearInterval(interval);
  }, []);

  const todoTasks = TASK_TREE.filter(t => t.status === "TODO");
  const doingTasks = TASK_TREE.filter(t => t.status === "DOING");
  const doneTasks = TASK_TREE.filter(t => t.status === "DONE");

  const countAllTasks = (tasks: Task[]): number => {
    return tasks.reduce((acc, task) => acc + 1 + (task.subtasks ? countAllTasks(task.subtasks) : 0), 0);
  };

  const totalTasksCount = countAllTasks(todoTasks) + countAllTasks(doingTasks) + countAllTasks(doneTasks);
  const doneTasksCount = countAllTasks(doneTasks);
  const progressPercent = totalTasksCount > 0 ? Math.round((doneTasksCount / totalTasksCount) * 100) : 0;

  return (
    <>
      <nav className="border-b border-gray-200 dark:border-[#2a2c2e] bg-white dark:bg-[#1c1c1c] px-6 py-4 flex justify-between items-center sticky top-0 z-10 font-sans">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-semibold tracking-tight hover:text-[var(--color-brand)] transition-colors">
            HackShare
          </Link>
          <span className="text-xs bg-[#cfb53b]/20 dark:bg-[#cfb53b]/30 text-[#cfb53b] px-2 py-1 rounded-md font-mono border border-[#cfb53b]/30 hidden sm:inline-block">
            by <a href="https://kostly.dev" target="_blank" rel="noreferrer" className="hover:text-[var(--color-brand)] transition-colors">kostly.dev</a>
          </span>
          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 ml-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="font-medium">visitors: {visitors}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link 
            href="/" 
            className="hidden sm:flex bg-[var(--color-brand)] hover:bg-[#b59e33] text-white px-4 py-2 rounded-md font-semibold text-sm transition shadow-sm items-center justify-center"
          >
            get your own page
          </Link>
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Hackathon Deadline</span>
            <span className="font-mono text-[var(--color-brand)] font-medium">{countdown}</span>
          </div>
          <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition text-[var(--color-foreground)]">
            {isDark ? (
              <svg className="w-5 h-5 text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            )}
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10 font-sans">
        <header className="mb-10 flex flex-col sm:flex-row justify-between sm:items-start gap-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Local MVP prep Hackathon</h2>
            <div className="flex flex-wrap items-center gap-4 mt-3">
              <p className="inline-block px-3 py-1.5 rounded-md border-2 border-[var(--color-brand)] bg-[var(--color-brand)]/10 text-gray-700 dark:text-gray-300 shadow-sm">
                validation campaign for <Link href="/" className="hover:text-[var(--color-brand)] transition-colors"><u>hackshare</u></Link>
              </p>
              <div className="flex items-center gap-3 bg-white dark:bg-[#1c1c1c] px-4 py-2 rounded-md border border-gray-200 dark:border-[#2a2c2e] shadow-sm">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Progress</span>
                <div className="w-32 sm:w-48 h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner flex">
                  <div 
                    className="bg-[var(--color-brand)] h-full transition-all duration-700 ease-out" 
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <span className="text-sm font-mono font-semibold text-[var(--color-brand)]">
                  {progressPercent}%
                </span>
              </div>
            </div>
          </div>
          <a 
            href="/join" 
            target="_blank" 
            rel="noreferrer"
            className="flex-shrink-0 whitespace-nowrap bg-[var(--color-brand)] hover:bg-[#b59e33] text-white px-5 py-2.5 rounded-md font-semibold transition shadow flex items-center justify-center -mt-1 sm:mt-0"
          >
            join to help
          </a>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-[var(--color-brand)]"></span>
              <h3 className="font-medium text-sm text-gray-600 dark:text-gray-300">TODO</h3>
              <span className="text-xs bg-[var(--color-brand)]/10 dark:bg-[var(--color-brand)]/20 text-[var(--color-brand)] px-2 py-0.5 rounded-full">
                {countAllTasks(todoTasks)}
              </span>
            </div>
            {todoTasks.map(task => <TaskNode key={task.id} task={task} />)}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-[var(--color-brand)]"></span>
              <h3 className="font-medium text-sm text-gray-600 dark:text-gray-300">DOING</h3>
              <span className="text-xs bg-[var(--color-brand)]/10 dark:bg-[var(--color-brand)]/20 text-[var(--color-brand)] px-2 py-0.5 rounded-full">
                {countAllTasks(doingTasks)}
              </span>
            </div>
            {doingTasks.map(task => <TaskNode key={task.id} task={task} />)}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-[var(--color-brand)] opacity-60"></span>
              <h3 className="font-medium text-sm text-gray-600 dark:text-gray-300">DONE</h3>
              <span className="text-xs bg-[var(--color-brand)]/10 dark:bg-[var(--color-brand)]/20 text-[var(--color-brand)] px-2 py-0.5 rounded-full">
                {countAllTasks(doneTasks)}
              </span>
            </div>
            {doneTasks.map(task => <TaskNode key={task.id} task={task} />)}
          </div>
        </div>
      </main>
    </>
  );
}
