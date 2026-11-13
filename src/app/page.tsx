"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = "contact@example.com";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
      showToast("이메일 주소를 복사했어요");
    } else {
      window.location.href = `mailto:${email}`;
    }
  };

  const skills = [
    { name: "Next.js", brand: true },
    { name: "React", brand: true },
    { name: "TypeScript", brand: false },
    { name: "Python", brand: false },
    { name: "데이터 분석", brand: false },
    { name: "UI/UX", brand: false },
  ];

  return (
    <div className={styles.screen}>
      {/* 토스 스타일 토스트 알림 */}
      {toastMessage && (
        <aside className={styles.toast} role="status">
          <span className={styles.toastCheck}>✓</span>
          <span>{toastMessage}</span>
        </aside>
      )}

      <main className={styles.container}>
        {/* 상단 TopBar */}
        <header className={styles.topBar}>
          <div className={styles.topBarBrand}>
            <svg
              className={styles.topBarIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>프로필</span>
          </div>
          <button
            type="button"
            className={styles.topBarAction}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "장연재 프로필",
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                showToast("프로필 링크를 복사했어요");
              }
            }}
          >
            공유
          </button>
        </header>

        {/* 메인 프로필 카드 */}
        <section className={styles.profileCard}>
          <div className={styles.avatarRow}>
            <div className={styles.avatar} aria-label="장연재 프로필 아바타">
              장
            </div>
            <div className={styles.badge}>
              <span>🎓 정보시스템학과</span>
            </div>
          </div>

          <h1 className={styles.greetingTitle}>
            {"안녕하세요,\n개발자 장연재예요"}
          </h1>

          <p className={styles.bioText}>
            데이터와 코드로 일상의 문제를 해결해요. 더 나은 사용자 경험과 견고한
            소프트웨어를 만들기 위해 꾸준히 배우고 도전하고 있어요.
          </p>

          {/* 주요 관심 기술 칩 */}
          <div className={styles.chipsSection}>
            <div className={styles.chipsLabel}>관심 분야 및 기술</div>
            <div className={styles.chipsList}>
              {skills.map((skill) => (
                <span
                  key={skill.name}
                  className={`${styles.chip} ${
                    skill.brand ? styles.chipBrand : ""
                  }`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 바로가기 링크 그룹 (TDS ListRow 스타일) */}
        <section className={styles.listSection} aria-label="링크 목록">
          <div className={styles.sectionHeader}>바로가기</div>

          {/* GitHub ListRow */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.listRow}
          >
            <div className={styles.listLeft}>
              <div className={styles.listIconWrapper}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </div>
              <div className={styles.listText}>
                <span className={styles.listTitle}>GitHub</span>
                <span className={styles.listSubtitle}>
                  코드 저장소와 오픈소스 프로젝트 보기
                </span>
              </div>
            </div>
            <div className={styles.listRight}>
              <svg
                className={styles.chevronIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </a>

          {/* 기술 블로그 ListRow */}
          <a
            href="https://velog.io"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.listRow}
          >
            <div className={styles.listLeft}>
              <div className={styles.listIconWrapper}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                  <path d="M6 6h10" />
                  <path d="M6 10h10" />
                </svg>
              </div>
              <div className={styles.listText}>
                <span className={styles.listTitle}>기술 블로그</span>
                <span className={styles.listSubtitle}>
                  배운 지식과 회고를 기록해요
                </span>
              </div>
            </div>
            <div className={styles.listRight}>
              <svg
                className={styles.chevronIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </a>

          {/* 이메일 ListRow */}
          <button
            type="button"
            onClick={handleCopyEmail}
            className={styles.listRow}
            style={{ width: "100%", textAlign: "left" }}
          >
            <div className={styles.listLeft}>
              <div className={styles.listIconWrapper}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className={styles.listText}>
                <span className={styles.listTitle}>이메일 주소 복사</span>
                <span className={styles.listSubtitle}>
                  contact@example.com
                </span>
              </div>
            </div>
            <div className={styles.listRight}>
              <svg
                className={styles.chevronIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </button>
        </section>

        {/* 푸터 */}
        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} 장연재. 토스 디자인 시스템(TDS) 스타일</p>
        </footer>
      </main>

      {/* TDS 시그니처: 화면 하단 고정 단일 강조 CTA (BottomCTA) */}
      <div className={styles.bottomCtaWrapper}>
        <div className={styles.bottomCtaInner}>
          <a
            href="mailto:contact@example.com"
            className={styles.primaryButton}
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
