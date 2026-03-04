"use client";
import { MenuBar } from "@/components/MenuBar";
import { Dock } from "@/components/Dock";
import { Window } from "@/components/Window";
import { FinderContent } from "@/components/FinderContent";
import { SafariContent } from "@/components/SafariContent";
import { TerminalContent } from "@/components/TerminalContent";
import { LoginScreen } from "@/components/LoginScreen";
import { SwitchOverlay } from "@/components/SwitchOverlay";
import { useWindowStore } from "@/store/useWindowStore";
import styles from "./page.module.css";

export default function Home() {
  const { isLoggedIn } = useWindowStore();

  return (
    <>
      {!isLoggedIn && <LoginScreen />}
      <SwitchOverlay />
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
        {isLoggedIn && <Dock />}
      </div>
    </>
  );
}
