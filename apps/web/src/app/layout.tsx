import { ApolloWrapper } from '@/apollo/ApolloWrapper';
import { UserProvider } from '@/context/UserContext';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Taskly',
  description: 'A Project management website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex items-center justify-center bg-blue-50">
        <ApolloWrapper>
          <UserProvider>{children}</UserProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
