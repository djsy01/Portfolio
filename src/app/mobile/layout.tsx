import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Inho | Portfolio",
  description: "프론트엔드 개발자 엄인호의 포트폴리오",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
