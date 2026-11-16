"use client";
import { useState, useEffect, useRef } from "react";
import { useWindowStore } from "@/store/useWindowStore";
import styles from "./LoginScreen.module.css";

const PROFILE = {
  label: "엄인호",
  emoji: "👨‍💻",
  subtitle: "Web Developer",
  demoCode: "portfolio-demo",
  color: "#4A9EFF",
};

export const LoginScreen = () => {
  const { login } = useWindowStore();
  const [selected, setSelected] = useState(false);
  const [typedPassword, setTypedPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 프로필 선택 시 타이핑 애니메이션 시작
  useEffect(() => {
    if (!selected) return;

    setTypedPassword("");
    setIsLoggingIn(false);

    // 이전 타이머 정리
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const pw = PROFILE.demoCode;
    let i = 0;

    // 500ms 딜레이 후 타이핑 시작
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        i++;
        setTypedPassword(pw.slice(0, i));
        if (i >= pw.length) {
          clearInterval(intervalRef.current!);
          // 타이핑 완료 후 600ms 대기 → 로그인 진행
          timeoutRef.current = setTimeout(() => {
            setIsLoggingIn(true);
            // 로그인 애니메이션 후 실제 로그인
            timeoutRef.current = setTimeout(() => {
              setFadeOut(true);
              timeoutRef.current = setTimeout(() => {
                login();
              }, 600);
            }, 800);
          }, 600);
        }
      }, 70);
    }, 500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [selected]);

  const handleProfileClick = () => {
    if (isLoggingIn) return;
    setSelected(true);
  };

  const handleBack = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSelected(false);
    setTypedPassword("");
    setIsLoggingIn(false);
  };

  return (
    <div className={`${styles.container} ${fadeOut ? styles.fadeOut : ""}`}>
      {/* 배경 블러 원들 */}
      <div className={styles.bg}>
        <div className={styles.bgBlob1} />
        <div className={styles.bgBlob2} />
        <div className={styles.bgBlob3} />
      </div>

      <div className={styles.inner}>
        {/* 상단 시계 */}
        <Clock />

        {!selected ? (
          /* 프로필 선택 화면 */
          <div className={styles.profileSection}>
            <p className={styles.hint}>프로필을 클릭해 로그인하세요</p>
            <div className={styles.profiles}>
              <button
                className={styles.profileCard}
                onClick={handleProfileClick}
                style={{ "--accent": PROFILE.color } as React.CSSProperties}
              >
                <div
                  className={styles.avatar}
                  style={{ borderColor: PROFILE.color }}
                >
                  <span className={styles.avatarEmoji}>{PROFILE.emoji}</span>
                </div>
                <span className={styles.profileLabel}>{PROFILE.label}</span>
                <span className={styles.profileSub}>{PROFILE.subtitle}</span>
              </button>
            </div>
          </div>
        ) : (
          /* 비밀번호 입력 화면 */
          <div className={styles.loginSection}>
            <div
              className={styles.bigAvatar}
              style={{ borderColor: PROFILE.color }}
            >
              <span className={styles.bigEmoji}>{PROFILE.emoji}</span>
            </div>
            <p className={styles.loginLabel}>{PROFILE.label}</p>
            <p className={styles.loginSub}>{PROFILE.subtitle}</p>

            {/* 비밀번호 필드 */}
            <div
              className={`${styles.passwordField} ${
                isLoggingIn ? styles.passwordSuccess : ""
              }`}
              style={
                {
                  "--accent": PROFILE.color,
                } as React.CSSProperties
              }
            >
              <span className={styles.passwordDots}>
                {Array.from({ length: PROFILE.demoCode.length }).map((_, i) => (
                  <span key={i} className={styles.passwordSlot}>
                    {i < typedPassword.length && (
                      <span
                        className={styles.dot}
                        style={{ animationDelay: `${i * 0.05}s` }}
                      />
                    )}
                  </span>
                ))}
              </span>
            </div>

            {isLoggingIn && (
              <p
                className={styles.loggingInText}
                style={{ color: PROFILE.color }}
              >
                로그인 중...
              </p>
            )}

            {!isLoggingIn && (
              <button className={styles.backBtn} onClick={handleBack}>
                ← 돌아가기
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/* 실시간 시계 컴포넌트 */
const Clock = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!time) return <div className={styles.clock} />;

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dateStr = `${time.getFullYear()}년 ${
    time.getMonth() + 1
  }월 ${time.getDate()}일 (${days[time.getDay()]})`;

  return (
    <div className={styles.clock}>
      <div className={styles.clockTime}>
        {hours}:{minutes}
      </div>
      <div className={styles.clockDate}>{dateStr}</div>
    </div>
  );
};
