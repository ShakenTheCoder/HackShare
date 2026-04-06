"use client";

import { useEffect, useState } from "react";

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
  { id: "12", title: "Setup Project & Repository", status: "DONE" } // from DONE column
];

type Task = {
  id: string;
  title: string;
  status: string;
  subtasks?: Task[];
};

function TaskNode({ task, depth = 0 }: { task: Task; depth?: number }) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "DOING":
        return {
          wrapper: "border-[var(--color-brand)] border-opacity-50",
          badge: "bg-[var(--color-brand)]/10 dark:bg-[var(--color-brand)]/20 text-[var(--color-brand)] border-[var(--color-brand)]/20 dark:border-[var(--color-brand)]/30",
          badgeText: "Active",
          text: "border-l-2 border-[var(--color-brand)] pl-2"
        };
      case "DONE":
        return {
          wrapper: "bg-gray-50 dark:bg-[var(--color-darkCard)]/50 border-gray-100 dark:border-[var(--color-darkBorder)] opacity-70",
          badge: "bg-[var(--color-brand)]/10 dark:bg-[var(--color-brand)]/20 text-[var(--color-brand)] border-[var(--color-brand)]/20 dark:border-[var(--color-brand)]/30",
          badgeText: "Completed",
          text: "line-through text-gray-500"
        };
      default:
        return {
          wrapper: "bg-white dark:bg-[var(--color-darkCard)] border-gray-100 dark:border-[var(--color-darkBorder)]",
          badge: "bg-[var(--color-brand)]/10 dark:bg-[var(--color-brand)]/20 text-[var(--color-brand)] border-[var(--color-brand)]/20 dark:border-[var(--color-brand)]/30",
          badgeText: "TODO",
          text: ""
        };
    }
  };

  const styles = getStatusStyles(task.status);
  const indentClass = depth > 0 ? "ml-4 border-l border-gray-200 dark:border-[var(--color-darkBorder)] pl-4" : "";

  return (
    <div className={`flex flex-col gap-3 ${indentClass} mt-3`}>
      <div className={`task-card p-4 rounded-lg shadow-sm border cursor-pointer flex flex-col gap-3 ${styles.wrapper}`}>
        <div className="flex justify-between items-start">
          <span className={`text-xs px-2 py-1 rounded font-mono border ${styles.badge}`}>
            {styles.badgeText}
          </span>
        </div>
        <p className={`text-sm ${styles.text}`}>{task.title}</p>
      </div>
      {task.subtasks && task.subtasks.map((subtask) => (
        <TaskNode key={subtask.id} task={subtask} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function Home() {
  const [countdown, setCountdown] = useState("00:00:00:00");
  const [isDark, setIsDark] = useState(false);

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

  return (
    <>
      <nav className="border-b border-gray-200 dark:border-[var(--color-darkBorder)] bg-white dark:bg-[var(--color-darkCard)] px-6 py-4 flex justify-between items-center sticky top-0 z-10 font-sans">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold tracking-tight">HackShare</h1>
          <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-gray-500 font-mono border border-gray-200 dark:border-[var(--color-darkBorder)]">
            by <a href="https://kostly.dev" target="_blank" rel="noreferrer" className="hover:text-[var(--color-brand)] transition-colors">kostly.dev</a>
          </span>
        </div>
        <div className="flex items-center gap-6">
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
        <header className="mb-10">
          <h2 className="text-3xl font-semibold mb-2">Local MVP prep Hackathon</h2>
          <p className="text-gray-500 dark:text-gray-400">
            validation campaign for <u>hackshare</u>
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-[var(--color-brand)]"></span>
              <h3 className="font-medium text-sm text-gray-600 dark:text-gray-300">TODO</h3>
              <span className="text-xs bg-[var(--color-brand)]/10 dark:bg-[var(--color-brand)]/20 text-[var(--color-brand)] px-2 py-0.5 rounded-full">
                {todoTasks.length}
              </span>
            </div>
            {todoTasks.map(task => <TaskNode key={task.id} task={task} />)}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-[var(--color-brand)]"></span>
              <h3 className="font-medium text-sm text-gray-600 dark:text-gray-300">DOING</h3>
              <span className="text-xs bg-[var(--color-brand)]/10 dark:bg-[var(--color-brand)]/20 text-[var(--color-brand)] px-2 py-0.5 rounded-full">
                {doingTasks.length}
              </span>
            </div>
            {doingTasks.map(task => <TaskNode key={task.id} task={task} />)}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-[var(--color-brand)] opacity-60"></span>
              <h3 className="font-medium text-sm text-gray-600 dark:text-gray-300">DONE</h3>
              <span className="text-xs bg-[var(--color-brand)]/10 dark:bg-[var(--color-brand)]/20 text-[var(--color-brand)] px-2 py-0.5 rounded-full">
                {doneTasks.length}
              </span>
            </div>
            {doneTasks.map(task => <TaskNode key={task.id} task={task} />)}
          </div>
        </div>
      </main>
    </>
  );
}
