'use client';

import { motion } from 'motion/react';
import { ReactNode, Suspense } from 'react';
import { useSideBarStore } from '../../lib/state';
import NavbarHome from '../Navigation/NavbarHome';
import SideBar from '../SideBar/SideBar';
import { Toaster } from '../ui/toaster';

export const DashboardWrapper = ({ children }: { children: ReactNode }) => {
  const { value: isSideBarVisible } = useSideBarStore();

  return (
    <div className="text-dark dark:text-light dark:bg-dark bg-light2 relative flex h-screen w-screen max-w-screen-2xl overflow-hidden">
      <Suspense>
        <SideBar />
      </Suspense>

      <motion.div
        initial={{ marginLeft: 0 }}
        animate={{ marginLeft: isSideBarVisible ? 256 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex w-full flex-col overflow-x-hidden"
      >
        <Suspense>
          <NavbarHome isSideBarVisible={isSideBarVisible} />
        </Suspense>

        <main className="mt-[4rem] flex h-full w-full flex-col">
          {children}
        </main>
      </motion.div>

      <Toaster />
    </div>
  );
};
