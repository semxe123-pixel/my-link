"use client";

import * as React from "react";
import { LinkItem } from "@/data/links";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { renderLinkIcon } from "@/components/ui/link-item-row";
import { cn } from "@/lib/utils";

interface AddLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddLink: (link: Omit<LinkItem, "id">) => void;
}

const ICON_OPTIONS: { type: LinkItem["icon"]; label: string }[] = [
  { type: "link", label: "일반 링크" },
  { type: "github", label: "GitHub" },
  { type: "blog", label: "블로그" },
  { type: "portfolio", label: "포트폴리오" },
  { type: "linkedin", label: "LinkedIn" },
  { type: "email", label: "이메일 복사" },
];

export function AddLinkDialog({ open, onOpenChange, onAddLink }: AddLinkDialogProps) {
  const [title, setTitle] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [icon, setIcon] = React.useState<LinkItem["icon"]>("link");
  const [error, setError] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("링크 제목을 입력해 주세요");
      return;
    }
    if (!url.trim()) {
      setError("연결 주소(URL)를 입력해 주세요");
      return;
    }

    const isCopyAction = icon === "email" || url.includes("@") && !url.startsWith("http");

    onAddLink({
      title: title.trim(),
      subtitle: subtitle.trim() || (isCopyAction ? url.trim() : "바로가기 링크예요"),
      url: url.trim(),
      icon,
      isCopyAction,
    });

    // 폼 초기화 및 닫기
    setTitle("");
    setSubtitle("");
    setUrl("");
    setIcon("link");
    setError("");
    onOpenChange(false);
  };

  const handleClose = () => {
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[420px]">
        <DialogHeader>
          <DialogTitle>새로운 링크 추가</DialogTitle>
          <DialogDescription>
            프로필 바로가기 목록에 표시될 링크를 입력해 주세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-2">
          {/* 아이콘 선택 영역 */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-foreground">
              아이콘 선택
            </label>
            <div className="grid grid-cols-3 gap-2">
              {ICON_OPTIONS.map((item) => {
                const selected = icon === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setIcon(item.type)}
                    className={cn(
                      "flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all",
                      selected
                        ? "border-primary bg-secondary text-primary font-bold shadow-sm"
                        : "border-border bg-white text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <div className="scale-75 shrink-0">
                      {renderLinkIcon(item.type)}
                    </div>
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 제목 입력 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-foreground">
              링크 제목 <span className="text-destructive">*</span>
            </label>
            <Input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError("");
              }}
              placeholder="예: Kaggle 데이터 분석 프로젝트"
              autoFocus
            />
          </div>

          {/* 한 줄 설명 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-foreground">
              한 줄 설명 <span className="text-xs font-normal text-muted-foreground">(선택)</span>
            </label>
            <Input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="예: 머신러닝 모델링 대회 솔루션 모음"
            />
          </div>

          {/* 연결 주소 URL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-foreground">
              연결 주소 (URL) <span className="text-destructive">*</span>
            </label>
            <Input
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError("");
              }}
              placeholder={icon === "email" ? "contact@example.com" : "https://kaggle.com/..."}
            />
          </div>

          {/* 에러 메시지 */}
          {error && (
            <p className="text-xs font-semibold text-destructive animate-in fade-in">
              {error}
            </p>
          )}

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="h-12 flex-1 rounded-xl font-semibold border-border"
            >
              취소
            </Button>
            <Button
              type="submit"
              className="h-12 flex-1 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 active:scale-[0.985]"
            >
              추가하기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
