"use client";
import { useState, useEffect } from "react";
import styles from "./TerminalContent.module.css";

export const TerminalContent = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={styles.terminalWrapper}>
      <div className={styles.headerText}>
        Last login: {mounted ? new Date().toLocaleDateString() : "..."} on
        ttys001
      </div>
      <pre className={styles.codeText}>
        {`> whoami
프론트엔드 개발자

> skills --list
HTML, CSS, JavaScript, TypeScript, React, VueJS, Node.js, Git, Redis, MySQL

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
