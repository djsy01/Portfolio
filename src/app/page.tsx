"use client";

import { Dock } from "@/components/Dock";
import { Window } from "@/components/Window";
import { MenuBar } from "@/components/MenuBar";
import { TerminalContent } from "@/components/TerminalContent";
import { SafariContent } from "@/components/SafariContent";
import { FinderContent } from "@/components/FinderContent";
import "./globals.css";

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden macos-gradient">
      {/* 1. Menu Bar */}
      <MenuBar />

      {/* 2. App Windows */}
      <Window id="finder" title="Finder">
        <FinderContent />
      </Window>

      <Window id="safari" title="Safari">
        <SafariContent />
      </Window>

      <Window id="terminal" title="Terminal — zsh">
        <TerminalContent />
      </Window>

      {/* 3. Bottom Dock */}
      <Dock />
    </main>
  );
}
