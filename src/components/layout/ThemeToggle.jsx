"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("woodcraft-theme");
    const next = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", next);
    setDark(next);
  }, []);
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("woodcraft-theme", next ? "dark" : "light");
  }
  return <button onClick={toggle} aria-label={`Switch to ${dark ? "light" : "dark"} theme`} className="rounded-full border border-walnut/15 p-2.5 hover:bg-walnut/10 focus-ring">
    {dark ? <Sun size={19}/> : <Moon size={19}/>}</button>;
}
