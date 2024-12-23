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
    <div className="text-dark dark:text-light dark:bg-dark bg-light relative flex h-screen w-screen max-w-screen-2xl overflow-hidden md:text-lg lg:text-xl xl:text-base 2xl:text-2xl">
      <Suspense>
        <SideBar />
      </Suspense>

      <motion.main
        className={`flex w-full flex-col px-1 transition-all ${isSideBarVisible ? 'sm:ml-[16rem]' : ''} overflow-hidden`}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Suspense>
          <NavbarHome isSideBarVisible={isSideBarVisible} />
        </Suspense>
        {children}
      </motion.main>
      <Toaster />
    </div>
  );
};
