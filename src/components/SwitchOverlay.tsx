"use client";
import { useState, useEffect, useRef } from "react";
import { useWindowStore, PortfolioType } from "@/store/useWindowStore";
import styles from "./LoginScreen.module.css";

const PROFILES: {
  type: PortfolioType;
  label: string;
  emoji: string;
  subtitle: string;
  password: string;
  color: string;
}[] = [
  {
    type: "frontend",
    label: "Frontend",
    emoji: "🎨",
    subtitle: "UI / UX Developer",
    password: "fr0nt3nd!",
    color: "#4A9EFF",
  },
  {
    type: "backend",
    label: "Backend",
    emoji: "⚙️",
    subtitle: "Server / DB Engineer",
    password: "b4ck3nd!",
    color: "#34C759",
  },
  {
    type: "fullstack",
    label: "Fullstack",
    emoji: "🚀",
    subtitle: "End-to-End Developer",
    password: "full5t4ck!",
    color: "#FF9F0A",
  },
];

export const SwitchOverlay = () => {
  const { switchTarget, login, setSwitchTarget } = useWindowStore();
  const [typedPassword, setTypedPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const profile = PROFILES.find((p) => p.type === switchTarget);

  useEffect(() => {
    if (!switchTarget || !profile) return;

    // 마운트 시 초기화
    setTypedPassword("");
    setIsLoggingIn(false);
    setFadeOut(false);
    setVisible(true);

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const pw = profile.password;
    let i = 0;

    // 300ms 딜레이 후 타이핑 시작
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        i++;
        setTypedPassword(pw.slice(0, i));
        if (i >= pw.length) {
          clearInterval(intervalRef.current!);
          // 타이핑 완료 → 600ms 대기 → 전환 진행
          timeoutRef.current = setTimeout(() => {
            setIsLoggingIn(true);
            // 포트폴리오 타입 변경
            login(switchTarget);
            // 800ms 후 페이드아웃
            timeoutRef.current = setTimeout(() => {
              setFadeOut(true);
              // 페이드아웃 완료 후 오버레이 제거
              timeoutRef.current = setTimeout(() => {
                setSwitchTarget(null);
                setVisible(false);
              }, 600);
            }, 800);
          }, 600);
        }
      }, 70);
    }, 300);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [switchTarget]);

  if (!visible || !profile) return null;

  return (
    <div className={`${styles.container} ${fadeOut ? styles.fadeOut : ""}`}>
      <div className={styles.bg}>
        <div className={styles.bgBlob1} />
        <div className={styles.bgBlob2} />
        <div className={styles.bgBlob3} />
      </div>
      <div className={styles.inner}>
        <div className={styles.loginSection}>
          <div
            className={styles.bigAvatar}
            style={{ borderColor: profile.color }}
          >
            <span className={styles.bigEmoji}>{profile.emoji}</span>
          </div>
          <p className={styles.loginLabel}>{profile.label}</p>
          <p className={styles.loginSub}>{profile.subtitle}</p>

          <div
            className={`${styles.passwordField} ${
              isLoggingIn ? styles.passwordSuccess : ""
            }`}
            style={{ "--accent": profile.color } as React.CSSProperties}
          >
            <span className={styles.passwordDots}>
              {typedPassword.split("").map((_, i) => (
                <span
                  key={i}
                  className={styles.dot}
                  style={{ animationDelay: `${i * 0.05}s` }}
                />
              ))}
              {typedPassword.length > 0 &&
                typedPassword.length < profile.password.length && (
                  <span className={styles.cursor} />
                )}
            </span>
          </div>

          {isLoggingIn && (
            <p
              className={styles.loggingInText}
              style={{ color: profile.color }}
            >
              전환 중...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
