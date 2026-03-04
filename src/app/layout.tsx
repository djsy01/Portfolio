import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Inho | Portfolio',
    description: '개발자 엄인호의 포트폴리오',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <body suppressHydrationWarning>{children}</body>
        </html>
    );
}
