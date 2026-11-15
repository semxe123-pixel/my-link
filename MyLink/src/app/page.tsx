"use client";

import { useState } from "react";
import { LinkItem } from "@/data/links";
import { useProfile } from "@/hooks/use-profile";
import { ProfileCard } from "@/components/ui/profile-card";
import { LinkItemRow } from "@/components/ui/link-item-row";
import { ToastSimple } from "@/components/ui/toast-simple";
import { AddLinkDialog } from "@/components/add-link-dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { profile, addLink, deleteLink, resetToDefault } = useProfile();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleCopyAction = (link: LinkItem) => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(link.url);
      showToast("이메일 주소를 복사했어요");
    } else {
      window.location.href = `mailto:${link.url}`;
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.share) {
      navigator.share({
        title: `${profile.avatarText}의 프로필 | 마이링크`,
        text: profile.bioText,
        url: window.location.href,
      }).catch(() => {});
    } else if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("프로필 링크를 복사했어요");
    }
  };

  const handleAddLinkSubmit = (newLink: Omit<LinkItem, "id">) => {
    addLink(newLink);
    showToast("새로운 링크를 추가했어요");
  };

  const handleDeleteLink = (linkId: string) => {
    deleteLink(linkId);
    showToast("링크를 삭제했어요");
  };

  const handleReset = () => {
    if (confirm("초기 기본값으로 복원할까요?")) {
      resetToDefault();
      showToast("기본값으로 초기화했어요");
    }
  };

  return (
    <div className="min-h-screen bg-background flex justify-center items-start px-4 pt-6 pb-32">
      {/* 토스 피드백 토스트 */}
      <ToastSimple message={toastMessage} />

      {/* 링크 추가 다이얼로그 모달 */}
      <AddLinkDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddLink={handleAddLinkSubmit}
      />

      <main className="w-full max-w-[440px] flex flex-col gap-4">
        {/* 상단 앱바 (TopBar) */}
        <header className="flex h-[52px] items-center justify-between px-1">
          <div className="flex items-center gap-2 text-[17px] font-bold text-foreground">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-primary shrink-0"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>프로필</span>
          </div>

          <div className="flex items-center gap-1">
            {/* 기본값 초기화 버튼 */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleReset}
              title="데모 데이터 기본값으로 초기화"
              className="h-9 px-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg"
            >
              초기화
            </Button>

            {/* 공유 버튼 */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="h-9 px-2.5 gap-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95 rounded-lg"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 shrink-0"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              <span>공유</span>
            </Button>
          </div>
        </header>

        {/* 메인 프로필 카드 */}
        <ProfileCard profile={profile} />

        {/* 바로가기 링크 목록 섹션 */}
        <section aria-label="바로가기 링크 목록">
          <Card className="p-0 overflow-hidden bg-card shadow-card border border-black/[0.03]">
            {/* 섹션 헤더 & 링크 추가 CTA */}
            <div className="flex items-center justify-between px-5 pt-4 pb-2">
              <span className="text-sm font-bold text-foreground">
                바로가기 <span className="text-xs font-normal text-muted-foreground">({profile.links.length})</span>
              </span>

              {/* 링크 추가 다이얼로그 트리거 버튼 */}
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setIsAddDialogOpen(true)}
                className="h-8 px-3 gap-1 rounded-full text-xs font-bold bg-secondary text-primary hover:bg-secondary/80 active:scale-95"
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
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span>링크 추가</span>
              </Button>
            </div>

            {/* 링크 목록 */}
            <div className="flex flex-col divide-y divide-border/60">
              {profile.links.length === 0 ? (
                <div className="py-12 text-center text-sm text-muted-foreground">
                  등록된 링크가 없어요. 상단의 &apos;링크 추가&apos;를 눌러보세요.
                </div>
              ) : (
                profile.links.map((link) => (
                  <LinkItemRow
                    key={link.id}
                    link={link}
                    onCopyAction={handleCopyAction}
                    onDelete={handleDeleteLink}
                  />
                ))
              )}
            </div>
          </Card>
        </section>

        {/* 푸터 */}
        <footer className="text-center py-4 text-xs text-muted-foreground select-none">
          <p>© {new Date().getFullYear()} 장연재. 토스 디자인 시스템(TDS) 스타일</p>
        </footer>
      </main>

      {/* TDS 시그니처: 화면 하단 고정 단일 강조 CTA (BottomCTA) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center px-4 pb-[calc(16px+env(safe-area-inset-bottom,0px))] bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none pt-6">
        <div className="w-full max-w-[440px] pointer-events-auto">
          <a
            href={`mailto:${profile.contactEmail}`}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-[17px] font-bold text-white shadow-[0_4px_12px_rgba(49,130,246,0.25)] hover:bg-primary/90 active:scale-[0.985] transition-all"
          >
            <span>이메일로 커피챗 제안하기</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[18px] h-[18px] shrink-0"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
