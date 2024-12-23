import { CollapsibleSectionProps, SideBarLinkProps } from '@/types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import { SideBarLink } from './SideBarLink';

export const CollapsibleSection = ({
  title,
  isOpen,
  toggleOpen,
  links,
  sectionRef,
}: CollapsibleSectionProps) => {
  useEffect(() => {
    if (isOpen && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, sectionRef]);

  return (
    <div ref={sectionRef}>
      <button
        className="flex w-full items-center justify-between px-8 py-3 text-gray-500 dark:text-gray-300"
        onClick={toggleOpen}
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-full overflow-hidden"
            onAnimationComplete={() => {
              if (isOpen && sectionRef.current) {
                sectionRef.current.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {links.map((link: SideBarLinkProps) => (
              <SideBarLink
                key={link.route}
                route={link.route}
                icon={link.icon}
                label={link.label}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
