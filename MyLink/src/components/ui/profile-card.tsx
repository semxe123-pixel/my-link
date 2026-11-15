import * as React from "react";
import { ProfileData } from "@/data/links";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ProfileCardProps {
  profile: ProfileData;
  className?: string;
}

export function ProfileCard({ profile, className }: ProfileCardProps) {
  return (
    <Card className={cn("p-7 sm:p-8 bg-card shadow-card border border-black/[0.03]", className)}>
      <CardContent className="p-0 flex flex-col">
        {/* 아바타 & 뱃지 행 */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-toss-blue-50 to-[#d4e8ff] text-2xl font-bold text-primary select-none">
            {profile.avatarText}
          </div>
          <Badge variant="default" className="text-xs px-3 py-1 bg-secondary text-primary font-bold">
            {profile.badge}
          </Badge>
        </div>

        {/* 인사말 & 소개 */}
        <h1 className="text-[25px] font-bold leading-[1.35] tracking-tight text-foreground whitespace-pre-line mb-3">
          {profile.greetingTitle}
        </h1>
        <p className="text-[15px] leading-relaxed text-toss-grey-700 break-keep mb-6">
          {profile.bioText}
        </p>

        {/* 관심 분야 및 기술 스택 칩 */}
        <div className="pt-4 border-t border-border">
          <div className="text-[13px] font-semibold text-muted-foreground mb-2.5">
            관심 분야 및 기술
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <Badge
                key={skill.name}
                variant={skill.brand ? "brand" : "outline"}
                className={cn(
                  "h-8 px-3.5 text-xs font-semibold rounded-full",
                  skill.brand
                    ? "bg-secondary text-primary border-primary/20"
                    : "bg-card text-toss-grey-800 border-border"
                )}
              >
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
