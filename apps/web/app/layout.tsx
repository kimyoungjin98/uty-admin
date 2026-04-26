import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UTY Admin',
  description: 'Admin dashboard for UTY',
};

import { Sidebar } from '../components/sidebar';
import { Header } from '../components/header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} min-h-screen bg-background`}>
        <div className="flex h-screen overflow-hidden text-text antialiased selection:bg-brand-100 selection:text-brand-900">
          <Sidebar />
          <div className="flex flex-col flex-1 relative flex-grow overflow-x-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto px-6 py-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
