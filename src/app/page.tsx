"use client"; // Next.js에서 인터랙션(클릭, 상태)을 쓰려면 필수!

import { Dock } from "@/components/Dock";
import { Window } from "@/components/Window";
import { MenuBar } from "@/components/MenuBar";
import { TerminalContent } from "@/components/TerminalContent";
import { SafariContent } from "@/components/SafariContent";
import { useWindowStore } from "@/store/useWindowStore";

export default function Home() {
  const { apps } = useWindowStore();

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[url('https://images.unsplash.com/photo-1614027164847-1b2809eb189d?q=80&w=2000')] bg-cover bg-center">
      {/* 1. 최상단 메뉴바 */}
      <MenuBar />
      
      {/* 2. 앱 창들 */}
      <Window id="terminal" title="Terminal — zsh">
        <TerminalContent />
      </Window>
      
      <Window id="safari" title="Safari">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Selected Projects</h2>
          <SafariContent />
        </div>
      </Window>

      {/* 3. 하단 독 */}
      <Dock />
    </main>
  );
}