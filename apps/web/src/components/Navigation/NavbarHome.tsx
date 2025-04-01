'use client';

import { useSideBarStore } from '@/lib/state';
import { Menu } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import SearchBar from '../SearchBar/SearchBar';
import { ThemeToggler } from '../Theme/themeToggler';
import Notification from './Notification';
import Profile from './Profile';

const NavbarHome = ({ isSideBarVisible }: { isSideBarVisible: boolean }) => {
  const { setSideBar } = useSideBarStore();

  const toggleSideBar = () => setSideBar(!isSideBarVisible);

  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        exit={{ y: '-100%' }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="dark:bg-dark2 bg-light absolute left-0 right-0 top-0 z-20 flex h-[4rem] items-center justify-between border-b border-stone-300 px-2 py-2 dark:border-stone-600 dark:shadow-lg"
      >
        <motion.div
          initial={{ x: 0 }}
          animate={{
            x: isSideBarVisible ? -500 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
          className="flex items-center sm:last:space-x-2"
        >
          {!isSideBarVisible && (
            <button
              className="rounded-none bg-inherit hover:scale-110 focus:outline-none"
              onClick={toggleSideBar}
            >
              <Menu
                className="text-dark dark:text-light -ml-2 scale-90 sm:-ml-0 sm:scale-100"
                size={45}
              />
            </button>
          )}

          <Image
            src="/logo.png"
            alt="logo"
            width={165}
            height={50}
            priority
            className="-ml-6 scale-[0.675] object-cover sm:-ml-3 sm:scale-[0.85] lg:ml-3 lg:scale-100 xl:-ml-0"
          />
        </motion.div>

        {/* Right Section */}
        <nav className="flex items-center space-x-2 sm:space-x-4">
          <SearchBar placeholder="Search" />

          <Notification />

          <div className="hidden sm:block">
            <ThemeToggler />
          </div>

          <Profile />
        </nav>
      </motion.header>
    </AnimatePresence>
  );
};

export default NavbarHome;
