'use client';

import SidebarData from '@/components/SideBar/sidebarData';
import { useSideBarStore } from '@/lib/state';
import { ChevronsLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { CollapsibleSection } from './Collabsible';
import { SideBarLink } from './SideBarLink';

const SideBar = () => {
  const {
    value: isSideBarVisible,
    teams: isTeamOpen,
    projects: isProjectsOpen,
    setSideBar,
    setTeams,
    setProjects,
  } = useSideBarStore();

  const { sidebarLinks, projectLinks, teamLinks } = SidebarData();

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const toggleSideBar = () => setSideBar(!isSideBarVisible);

  useEffect(() => {
    if (window.innerWidth < 640) {
      setSideBar(false);
    }
  }, [setSideBar]);

  return (
    <aside className="relative flex">
      <AnimatePresence>
        {isSideBarVisible && (
          <>
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="bg-light2 dark:bg-dark2 absolute inset-y-2 left-2 z-40 flex w-64 flex-col rounded-2xl border-2 shadow-lg dark:border-stone-700"
            >
              <button
                className="absolute right-[-13px] top-[20px] z-50 flex items-center justify-center rounded-full bg-stone-600 p-0.5 text-white hover:bg-stone-700 focus:outline-none md:top-[32px] md:scale-125 xl:top-[20px] xl:scale-100"
                onClick={toggleSideBar}
              >
                <ChevronsLeft />
                <span className="sr-only">Close</span>
              </button>

              <div className="pb-4 pl-5 pt-2">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={200}
                  priority
                  height={75}
                  className="-ml-2  scale-75 object-cover sm:scale-[0.85] xl:-ml-0 xl:scale-100"
                />
              </div>

              <div className="mx-3 -mt-3 mb-3 h-[2px] bg-stone-300 dark:bg-stone-600" />

              {sidebarLinks.map((link) => (
                <SideBarLink
                  key={link.route}
                  route={link.route}
                  icon={link.icon}
                  label={link.label}
                  className="py-2"
                />
              ))}

              <div className="mx-3 mt-2 h-[2px] bg-stone-300 dark:bg-stone-600" />

              <div
                ref={scrollContainerRef}
                className="scrollbar scrollbar-thumb-stone-400 scrollbar-thumb-rounded-full dark:scrollbar-thumb-slate-500 scrollbar-w-[5px] mb-3 mt-1.5 flex-1 space-y-2 overflow-y-auto"
              >
                <CollapsibleSection
                  title="Projects"
                  isOpen={isProjectsOpen}
                  toggleOpen={() => setProjects(!isProjectsOpen)}
                  links={projectLinks}
                />

                <CollapsibleSection
                  title="Teams"
                  isOpen={isTeamOpen}
                  toggleOpen={() => setTeams(!isTeamOpen)}
                  links={teamLinks}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="fixed inset-0 z-30 bg-black sm:hidden"
              onClick={toggleSideBar}
            />
          </>
        )}
      </AnimatePresence>
    </aside>
  );
};

export default SideBar;
