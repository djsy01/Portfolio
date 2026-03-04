"use client";
import { MenuBar } from "@/components/MenuBar";
import { Dock } from "@/components/Dock";
import { Window } from "@/components/Window";
import { FinderContent } from "@/components/FinderContent";
import { SafariContent } from "@/components/SafariContent";
import { TerminalContent } from "@/components/TerminalContent";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.desktop}>
      <MenuBar />
      <div className={styles.windowArea}>
        <Window id="finder" title="Finder">
          <FinderContent />
        </Window>
        <Window id="safari" title="Safari">
          <SafariContent />
        </Window>
        <Window id="terminal" title="Terminal">
          <TerminalContent />
        </Window>
      </div>
      <Dock />
    </div>
  );
}
