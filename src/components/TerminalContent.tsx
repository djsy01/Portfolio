"use client";
import { useState, useEffect } from "react";
import styles from "./TerminalContent.module.css";

// Terminal Content Component
export const TerminalContent = () => {
  const [mounted, setMounted] = useState(false);

  // Set mounted to true on component mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={styles.terminalWrapper}>
      {/* Header Text */}
      <div className={styles.headerText}>
        Last login: {mounted ? new Date().toLocaleDateString() : "..."} on
        ttys001
      </div>
      {/* Terminal Code Output */}
      <pre className={styles.codeText}>
        {`> whoami
프론트엔드 개발자

> skills --list
Front-End : HTML, CSS, JavaScript, TypeScript, React, Vue,js, Next.js
Back-End : Node.js
DataBase : Redis, MySQL
Tools: Git, GitHub, Vercel, Render, Railway

> projects --current
- 오벧 웹사이트 리뉴얼 (진행중)
- 티켓팅 사이트 (진행중)
- 개인 포트폴리오 사이트 (진행중)

> contact --email
dlsgh8884@naver.com`}{" "}
      </pre>
    </div>
  );
};
