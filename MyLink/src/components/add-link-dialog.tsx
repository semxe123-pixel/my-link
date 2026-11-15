"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

// ============================================================================
// 1. Zod 스키마 정의 (Schema & Validation Rules)
// ============================================================================
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/;

const linkFormSchema = z
  .object({
    icon: z.enum(["link", "github", "blog", "portfolio", "linkedin", "email"]),
    title: z
      .string()
      .trim()
      .min(1, { message: "링크 제목을 입력해 주세요" })
      .max(30, { message: "제목은 최대 30자까지 입력할 수 있어요" }),
    subtitle: z
      .string()
      .trim()
      .max(60, { message: "한 줄 설명은 최대 60자까지 입력할 수 있어요" })
      .optional()
      .or(z.literal("")),
    url: z
      .string()
      .trim()
      .min(1, { message: "연결 주소(URL)를 입력해 주세요" }),
  })
  .superRefine((data, ctx) => {
    const url = data.url.trim();
    if (!url) return;

    if (data.icon === "email") {
      if (!EMAIL_REGEX.test(url)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["url"],
          message: "올바른 이메일 형식(예: contact@example.com)을 입력해 주세요",
        });
      }
    } else {
      if (!URL_REGEX.test(url)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["url"],
          message: "올바른 웹 주소(예: https://example.com 또는 github.com)를 입력해 주세요",
        });
      }
    }
  });

export type LinkFormValues = z.infer<typeof linkFormSchema>;

// ============================================================================
// 2. 컴포넌트 Props & 아이콘 옵션
// ============================================================================
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
  // ==========================================================================
  // 3. React Hook Form (RHF) + Zod Resolver 설정
  // ==========================================================================
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<LinkFormValues>({
    resolver: zodResolver(linkFormSchema),
    defaultValues: {
      icon: "link",
      title: "",
      subtitle: "",
      url: "",
    },
    mode: "all",
    criteriaMode: "all",
  });

  const selectedIcon = watch("icon");
  const titleValue = watch("title") || "";
  const subtitleValue = watch("subtitle") || "";

  // 다이얼로그 열림/닫힘 시 폼 상태 리셋
  React.useEffect(() => {
    if (!open) {
      reset({
        icon: "link",
        title: "",
        subtitle: "",
        url: "",
      });
    }
  }, [open, reset]);

  // 아이콘 선택 처리 및 URL 필드 실시간 재검증
  const handleIconSelect = (iconType: LinkItem["icon"]) => {
    setValue("icon", iconType, { shouldValidate: true });
    // URL 필드가 입력되어 있다면 변경된 아이콘 규칙(이메일 <-> 웹)에 맞춰 즉시 재검증
    trigger("url");
  };

  // 폼 제출 핸들러
  const onSubmit = (data: LinkFormValues) => {
    const trimmedUrl = data.url.trim();
    const isCopyAction =
      data.icon === "email" ||
      (trimmedUrl.includes("@") && !trimmedUrl.startsWith("http"));

    // 일반 웹 링크인데 프로토콜이 생략된 경우 https:// 자동 보정
    let formattedUrl = trimmedUrl;
    if (
      !isCopyAction &&
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://")
    ) {
      formattedUrl = `https://${formattedUrl}`;
    }

    onAddLink({
      title: data.title.trim(),
      subtitle:
        (data.subtitle && data.subtitle.trim()) ||
        (isCopyAction ? formattedUrl : "바로가기 링크예요"),
      url: formattedUrl,
      icon: data.icon,
      isCopyAction,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[420px]">
        <DialogHeader>
          <DialogTitle>새로운 링크 추가</DialogTitle>
          <DialogDescription>
            React Hook Form과 Zod 스키마로 안전하게 검증돼요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4 py-1">
          {/* 1. 아이콘 선택 영역 */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-foreground">
              아이콘 선택
            </label>
            <div className="grid grid-cols-3 gap-2">
              {ICON_OPTIONS.map((item) => {
                const isSelected = selectedIcon === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => handleIconSelect(item.type)}
                    className={cn(
                      "flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all",
                      isSelected
                        ? "border-primary bg-secondary text-primary font-bold shadow-sm ring-1 ring-primary/20"
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

          {/* 2. 링크 제목 입력 (Zod min 1, max 30) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground">
                링크 제목 <span className="text-destructive">*</span>
              </label>
              <span
                className={cn(
                  "text-[11px] font-medium transition-colors",
                  titleValue.length > 30
                    ? "text-destructive font-bold"
                    : "text-muted-foreground"
                )}
              >
                {titleValue.length}/30
              </span>
            </div>
            <Input
              {...register("title")}
              isError={!!errors.title}
              placeholder="예: Kaggle 데이터 분석 포트폴리오"
              autoFocus
            />
            {errors.title && (
              <p className="text-[12px] font-medium text-destructive flex items-center gap-1 animate-in fade-in duration-150">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{errors.title.message}</span>
              </p>
            )}
          </div>

          {/* 3. 한 줄 설명 (Zod max 60) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground">
                한 줄 설명 <span className="text-xs font-normal text-muted-foreground">(선택)</span>
              </label>
              <span
                className={cn(
                  "text-[11px] font-medium transition-colors",
                  subtitleValue.length > 60
                    ? "text-destructive font-bold"
                    : "text-muted-foreground"
                )}
              >
                {subtitleValue.length}/60
              </span>
            </div>
            <Input
              {...register("subtitle")}
              isError={!!errors.subtitle}
              placeholder="예: 머신러닝 대회 수상 솔루션 모음이에요"
            />
            {errors.subtitle && (
              <p className="text-[12px] font-medium text-destructive flex items-center gap-1 animate-in fade-in duration-150">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{errors.subtitle.message}</span>
              </p>
            )}
          </div>

          {/* 4. 연결 주소 URL (Zod URL/Email 정규식 검증) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-foreground">
              {selectedIcon === "email" ? "이메일 주소" : "연결 주소 (URL)"} <span className="text-destructive">*</span>
            </label>
            <Input
              {...register("url")}
              isError={!!errors.url}
              placeholder={
                selectedIcon === "email"
                  ? "contact@example.com"
                  : "https://kaggle.com/demo"
              }
            />
            {errors.url ? (
              <p className="text-[12px] font-medium text-destructive flex items-center gap-1 animate-in fade-in duration-150">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{errors.url.message}</span>
              </p>
            ) : (
              <p className="text-[11px] text-muted-foreground">
                {selectedIcon === "email"
                  ? "클릭 시 클립보드에 이메일 주소가 바로 복사돼요"
                  : "https://를 생략해도 자동으로 연결 주소를 완성해요"}
              </p>
            )}
          </div>

          <DialogFooter className="pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-12 flex-1 rounded-xl font-semibold border-border hover:bg-muted"
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 flex-1 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 active:scale-[0.985] shadow-[0_4px_12px_rgba(49,130,246,0.25)]"
            >
              추가하기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
