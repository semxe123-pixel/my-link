"use client";

import * as React from "react";
import { LinkItem } from "@/data/links";
import { cn } from "@/lib/utils";

export interface LinkItemRowProps {
  link: LinkItem;
  onCopyAction?: (link: LinkItem) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

export const renderLinkIcon = (icon: LinkItem["icon"]) => {
  const commonProps = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24" as const,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "w-[22px] h-[22px] shrink-0",
  };

  switch (icon) {
    case "github":
      return (
        <svg {...commonProps}>
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      );
    case "blog":
      return (
        <svg {...commonProps}>
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M6 6h10" />
          <path d="M6 10h10" />
        </svg>
      );
    case "portfolio":
      return (
        <svg {...commonProps}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...commonProps}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "email":
      return (
        <svg {...commonProps}>
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case "link":
    default:
      return (
        <svg {...commonProps}>
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      );
  }
};

export function LinkItemRow({
  link,
  onCopyAction,
  onDelete,
  className,
}: LinkItemRowProps) {
  const content = (
    <div className="flex items-center gap-3.5 min-w-0 flex-1">
      <div className="flex w-11 h-11 shrink-0 items-center justify-center rounded-[14px] bg-muted text-foreground transition-colors group-hover:bg-toss-grey-200">
        {renderLinkIcon(link.icon)}
      </div>
      <div className="flex flex-col text-left min-w-0">
        <span className="text-[15px] font-bold tracking-tight text-foreground truncate">
          {link.title}
        </span>
        <span className="text-xs font-normal text-muted-foreground truncate">
          {link.subtitle}
        </span>
      </div>
    </div>
  );

  const baseClasses = cn(
    "group relative flex w-full items-center justify-between px-5 py-3.5 transition-all duration-120",
    "hover:bg-toss-grey-50 active:scale-[0.985] active:bg-muted select-none",
    className
  );

  return (
    <div className="relative flex items-center w-full group/row">
      {link.isCopyAction ? (
        <button
          type="button"
          onClick={() => onCopyAction?.(link)}
          className={cn(baseClasses, "cursor-pointer border-none bg-transparent")}
        >
          {content}
          <div className="flex items-center text-toss-grey-400 group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0 ml-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </button>
      ) : (
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
        >
          {content}
          <div className="flex items-center text-toss-grey-400 group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0 ml-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </a>
      )}

      {/* 선택적 삭제 버튼 (호버 또는 클릭 시 노출) */}
      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(link.id);
          }}
          title="링크 삭제"
          className="absolute right-12 z-10 hidden group-hover/row:flex items-center justify-center size-7 rounded-lg bg-red-50 text-destructive hover:bg-destructive hover:text-white transition-all shadow-sm"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}
