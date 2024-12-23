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
      <motion.nav
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        exit={{ y: '-100%' }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className={`${
          isSideBarVisible ? 'xl:mx-4' : 'xl:mr-4'
        } flex items-center justify-between border-b border-stone-300 px-2 md:py-3 xl:py-2 dark:border-stone-600`}
      >
        <motion.div
          initial={{ x: 0 }}
          animate={{
            x: isSideBarVisible ? -500 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            duration: 0.4,
            ease: 'easeInOut',
          }}
          className="flex items-center sm:last:space-x-2"
        >
          {!isSideBarVisible && (
            <motion.button
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ rotate: 15 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="rounded-none bg-inherit hover:bg-transparent"
              onClick={toggleSideBar}
            >
              <Menu
                className="text-dark dark:text-light -ml-2 scale-90 sm:-ml-0 sm:scale-100"
                size={45}
              />
            </motion.button>
          )}

          <Image
            src="/logo.png"
            alt="logo"
            width={165}
            height={50}
            className="-ml-6 scale-[0.675] object-cover sm:-ml-3 sm:scale-[0.85] lg:ml-3 lg:scale-100 xl:-ml-0"
          />
        </motion.div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <SearchBar placeholder="Search" />

          <Notification />

          <div className="hidden sm:block">
            <ThemeToggler />
          </div>

          <Profile />
        </div>
      </motion.nav>
    </AnimatePresence>
  );
};

export default NavbarHome;
