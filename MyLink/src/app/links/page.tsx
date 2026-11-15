"use client";

import { useState } from "react";
import { LinkItem } from "@/data/links";
import { useProfile } from "@/hooks/use-profile";
import { LinkItemRow } from "@/components/ui/link-item-row";
import { ToastSimple } from "@/components/ui/toast-simple";
import { AddLinkDialog } from "@/components/add-link-dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LinksOnlyPage() {
  const { profile, addLink, deleteLink } = useProfile();
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

  const handleAddLinkSubmit = (newLink: Omit<LinkItem, "id">) => {
    addLink(newLink);
    showToast("새로운 링크를 추가했어요");
  };

  const handleDeleteLink = (linkId: string) => {
    deleteLink(linkId);
    showToast("링크를 삭제했어요");
  };

  return (
    <div className="min-h-screen bg-background flex justify-center items-start px-4 pt-6 pb-20">
      {/* 피드백 토스트 */}
      <ToastSimple message={toastMessage} />

      {/* 링크 추가 다이얼로그 모달 */}
      <AddLinkDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddLink={handleAddLinkSubmit}
      />

      <main className="w-full max-w-[440px] flex flex-col gap-4">
        {/* 상단 헤더 */}
        <header className="flex h-[52px] items-center justify-between px-1">
          <div className="flex items-center gap-2 text-[17px] font-bold text-foreground">
            <span>🔗 바로가기 목록</span>
          </div>
          <Link
            href="/"
            className="text-xs font-semibold text-primary hover:underline"
          >
            전체 프로필 보기
          </Link>
        </header>

        {/* 링크 목록 섹션 (shadcn/ui Card & LinkItemRow) */}
        <section aria-label="링크 목록">
          <Card className="p-0 overflow-hidden bg-card shadow-card border border-black/[0.03]">
            <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-border/40">
              <span className="text-sm font-bold text-foreground">
                바로가기 <span className="text-xs font-normal text-muted-foreground">({profile.links.length})</span>
              </span>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setIsAddDialogOpen(true)}
                className="h-7 px-2.5 gap-1 rounded-full text-xs font-bold bg-secondary text-primary hover:bg-secondary/80"
              >
                + 추가
              </Button>
            </div>
            <div className="flex flex-col divide-y divide-border/60">
              {profile.links.length === 0 ? (
                <div className="py-12 text-center text-sm text-muted-foreground">
                  등록된 링크가 없어요. 상단의 &apos;+ 추가&apos;를 눌러보세요.
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
        <footer className="text-center py-6 text-xs text-muted-foreground select-none">
          <p>© {new Date().getFullYear()} MyLink. shadcn/ui & Tailwind CSS</p>
        </footer>
      </main>
    </div>
  );
}
