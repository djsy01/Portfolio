"use client";
import { useState, useRef, useEffect } from "react";
import { COMMANDS, WELCOME, type Line } from "@/lib/terminalCommands";
import styles from "./TerminalContent.module.css";

export const TerminalContent = () => {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleSubmit = () => {
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setLines(WELCOME);
      setInput("");
      setHistory((h) => [cmd, ...h]);
      setHistoryIdx(-1);
      return;
    }

    const echoLine: Line = { type: "input", text: cmd };
    const handler = COMMANDS[cmd];
    const result: Line[] = handler
      ? handler()
      : [{ type: "error", text: `command not found: ${cmd}\nType 'help' to see available commands.` }];

    setLines((prev) => [...prev, echoLine, ...result]);
    setInput("");
    setHistory((h) => [cmd, ...h]);
    setHistoryIdx(-1);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? "" : (history[next] ?? ""));
    }
  };

  return (
    <div
      className={styles.terminalWrapper}
      onClick={() => inputRef.current?.focus()}
    >
      <div className={styles.body}>
        {lines.map((line, i) => (
          <div key={i} className={styles[line.type]}>
            {line.type === "input" && (
              <span className={styles.prompt}>inho@portfolio ~ % </span>
            )}
            <span>{line.text}</span>
          </div>
        ))}

        <div className={styles.inputLine}>
          <span className={styles.prompt}>inho@portfolio ~ % </span>
          <span className={styles.inputMirror}>{input}</span>
          <span className={styles.cursor}>█</span>
        </div>

        <div ref={bottomRef} />
      </div>

      <div className={styles.inputArea}>
        <span className={styles.inputPrompt}>%</span>
        <input
          ref={inputRef}
          className={styles.inputField}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="명령어를 입력하세요..."
        />
        <button className={styles.sendBtn} onClick={handleSubmit}>↵</button>
      </div>
    </div>
  );
};
