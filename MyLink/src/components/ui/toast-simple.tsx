"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToastSimpleProps {
  message: string | null;
  className?: string;
}

export function ToastSimple({ message, className }: ToastSimpleProps) {
  if (!message) return null;

  return (
    <aside
      role="status"
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-3",
        "bg-toss-grey-900 text-white text-sm font-semibold rounded-[14px] shadow-toast",
        "select-none pointer-events-none transition-all duration-200",
        className
      )}
    >
      <span className="flex w-[18px] h-[18px] items-center justify-center rounded-full bg-toss-green-500 text-white text-[11px] font-black shrink-0">
        ✓
      </span>
      <span>{message}</span>
    </aside>
  );
}
