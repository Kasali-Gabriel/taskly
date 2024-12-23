import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TaskLy',
  description: 'A task management website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex items-center justify-center bg-blue-50">
        {children}
      </body>
    </html>
  );
}
