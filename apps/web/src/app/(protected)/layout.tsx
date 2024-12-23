import { ApolloWrapper } from '@/apollo/ApolloWrapper';
import { DashboardWrapper } from '@/components/Dashboard/DashboardWrapper';
import { ThemeProvider } from '@/components/Theme/themeProvider';
import { ReactNode, Suspense } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Suspense>
        <ApolloWrapper>
          <DashboardWrapper>{children}</DashboardWrapper>
        </ApolloWrapper>
      </Suspense>
    </ThemeProvider>
  );
};

export default Layout;
