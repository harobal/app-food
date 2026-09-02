"use client";
import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";
type Theme = "light" | "dark";
const EVENT = "harobal-theme-change";
const Context = createContext<{mounted:boolean;theme:Theme;toggleTheme:()=>void}|null>(null);
const read=():Theme=>document.documentElement.classList.contains("dark")?"dark":"light";
const apply=(theme:Theme)=>{document.documentElement.classList.toggle("dark",theme==="dark");document.documentElement.dataset.theme=theme};
function subscribe(listener:()=>void){const media=matchMedia("(prefers-color-scheme: dark)");const change=(event:MediaQueryListEvent)=>{if(localStorage.getItem(THEME_STORAGE_KEY))return;apply(event.matches?"dark":"light");listener()};addEventListener(EVENT,listener);media.addEventListener("change",change);return()=>{removeEventListener(EVENT,listener);media.removeEventListener("change",change)}}
export function ThemeProvider({children}:{children:ReactNode}){const mounted=useSyncExternalStore(()=>()=>undefined,()=>true,()=>false);const theme=useSyncExternalStore(subscribe,read,()=>"light" as Theme);const toggleTheme=useCallback(()=>{const next=theme==="dark"?"light":"dark";apply(next);localStorage.setItem(THEME_STORAGE_KEY,next);dispatchEvent(new Event(EVENT))},[theme]);const value=useMemo(()=>({mounted,theme,toggleTheme}),[mounted,theme,toggleTheme]);return <Context.Provider value={value}>{children}</Context.Provider>}
export function useTheme(){const value=useContext(Context);if(!value)throw new Error("useTheme must be used within ThemeProvider");return value}
