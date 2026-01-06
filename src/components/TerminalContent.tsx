"use client";
import { useState, useEffect } from "react";
import styles from "./TerminalContent.module.css";

const commands = [
  { label: "Guest", text: "whoami" },
  { label: "Role", text: "Full-stack Developer" },
  { label: "Skills", text: "TypeScript, React, Next.js, Vue.js" },
  { label: "Status", text: "Ready to build something awesome!" },
];

export const TerminalContent = () => {
  const [text, setText] = useState("");
  const fullText = commands.map(c => `> ${c.label}: ${c.text}`).join("\n");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.terminalWrapper}>
      <div className={styles.headerText}>
        Last login: {new Date().toLocaleDateString()} on ttys001
      </div>
      <pre className={styles.codeText}>
        {text}
        <span className={styles.cursor} />
      </pre>
    </div>
  );
};