"use client";
import { useState, useEffect, useRef } from "react";
import { useWindowStore, PortfolioType } from "@/store/useWindowStore";
import styles from "./LoginScreen.module.css";

const PROFILES: {
  type: PortfolioType;
  label: string;
  emoji: string;
  subtitle: string;
  demoCode: string;
  color: string;
}[] = [
  {
    type: "frontend",
    label: "Frontend",
    emoji: "🎨",
    subtitle: "UI / UX Developer",
    demoCode: "frontend-demo",
    color: "#4A9EFF",
  },
  {
    type: "backend",
    label: "Backend",
    emoji: "⚙️",
    subtitle: "Server / DB Engineer",
    demoCode: "backend-demo",
    color: "#34C759",
  },
  {
    type: "fullstack",
    label: "Fullstack",
    emoji: "🚀",
    subtitle: "End-to-End Developer",
    demoCode: "fullstack-demo",
    color: "#FF9F0A",
  },
];

export const LoginScreen = () => {
  const { login } = useWindowStore();
  const [selected, setSelected] = useState<PortfolioType | null>(null);
  const [typedPassword, setTypedPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedProfile = PROFILES.find((p) => p.type === selected);

  // 프로필 선택 시 타이핑 애니메이션 시작
  useEffect(() => {
    if (!selected || !selectedProfile) return;

    setTypedPassword("");
    setIsLoggingIn(false);

    // 이전 타이머 정리
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const pw = selectedProfile.demoCode;
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
                login(selected);
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

  const handleProfileClick = (type: PortfolioType) => {
    if (isLoggingIn) return;
    setSelected(type);
  };

  const handleBack = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSelected(null);
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
            <p className={styles.hint}>포트폴리오 유형을 선택하세요</p>
            <div className={styles.profiles}>
              {PROFILES.map((profile) => (
                <button
                  key={profile.type}
                  className={styles.profileCard}
                  onClick={() => handleProfileClick(profile.type)}
                  style={{ "--accent": profile.color } as React.CSSProperties}
                >
                  <div
                    className={styles.avatar}
                    style={{ borderColor: profile.color }}
                  >
                    <span className={styles.avatarEmoji}>{profile.emoji}</span>
                  </div>
                  <span className={styles.profileLabel}>{profile.label}</span>
                  <span className={styles.profileSub}>{profile.subtitle}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* 비밀번호 입력 화면 */
          <div className={styles.loginSection}>
            <div
              className={styles.bigAvatar}
              style={{ borderColor: selectedProfile?.color }}
            >
              <span className={styles.bigEmoji}>{selectedProfile?.emoji}</span>
            </div>
            <p className={styles.loginLabel}>{selectedProfile?.label}</p>
            <p className={styles.loginSub}>{selectedProfile?.subtitle}</p>

            {/* 비밀번호 필드 */}
            <div
              className={`${styles.passwordField} ${
                isLoggingIn ? styles.passwordSuccess : ""
              }`}
              style={
                {
                  "--accent": selectedProfile?.color,
                } as React.CSSProperties
              }
            >
              <span className={styles.passwordDots}>
                {Array.from({ length: selectedProfile!.demoCode.length }).map((_, i) => (
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
                style={{ color: selectedProfile?.color }}
              >
                로그인 중...
              </p>
            )}

            {!isLoggingIn && typedPassword.length === 0 && (
              <button className={styles.backBtn} onClick={handleBack}>
                ← 다른 유형 선택
              </button>
            )}

            {!isLoggingIn && typedPassword.length > 0 && (
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
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

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
