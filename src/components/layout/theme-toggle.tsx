"use client";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme-provider";
export function ThemeToggle({className}:{className?:string}){const{mounted,theme,toggleTheme}=useTheme();const dark=mounted&&theme==="dark";return <button type="button" onClick={toggleTheme} className={cn("inline-flex size-10 items-center justify-center rounded-lg border border-border/80 bg-background/75 text-foreground transition hover:-translate-y-0.5 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",className)} aria-label={mounted?`Switch to ${dark?"light":"dark"} theme`:"Change color theme"} title={mounted?`Switch to ${dark?"light":"dark"} theme`:"Change color theme"}>{dark?<Sun className="size-4.5" aria-hidden/>:<Moon className="size-4.5" aria-hidden/>}</button>}
