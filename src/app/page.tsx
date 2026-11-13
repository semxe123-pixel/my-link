import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.card}>
        {/* 프로필 아바타 */}
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar} aria-label="프로필 이미지">
            장
          </div>
        </div>

        {/* 소속 뱃지 */}
        <div className={styles.badge}>
          <span>🎓 한양대학교 정보시스템학과</span>
        </div>

        {/* 이름 */}
        <h1 className={styles.name}>장연재</h1>

        {/* 소개글 */}
        <p className={styles.bio}>
          안녕하세요 바이브코딩 강의를 듣고 있는 정보시스템학과 장연재입니다
        </p>

        {/* 구분선 */}
        <div className={styles.divider} />

        {/* 바로가기 링크 목록 */}
        <div className={styles.linkGroup}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkButton}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            <span>GitHub 방문하기</span>
          </a>

          <a
            href="mailto:contact@example.com"
            className={styles.linkButton}
          >
            <svg
              width="20"
              height="20"
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
            <span>이메일 보내기</span>
          </a>

          <a
            href="https://velog.io"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkButton}
          >
            <svg
              width="20"
              height="20"
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
            <span>블로그 방문하기</span>
          </a>
        </div>

        {/* 푸터 */}
        <footer className={styles.footer}>
          © {new Date().getFullYear()} 장연재. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
