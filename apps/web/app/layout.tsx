import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UTY',
  description: 'UTY order and operations workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
