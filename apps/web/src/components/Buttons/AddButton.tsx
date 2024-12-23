import { useSideBarStore } from '@/lib/state';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import NewProjectButton from '../Dialogues/NewProject';
import NewTaskButton from '../Dialogues/NewTask';

const AddButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const { value: isSideBarVisible } = useSideBarStore();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      setIsVisible(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsVisible(true), 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="relative flex">
      {showOptions && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowOptions(false)}
        />
      )}
      <div
        className={`fixed bottom-4 right-4 2xl:right-auto ${isSideBarVisible ? 'z-20 sm:z-40' : 'z-40'}`}
      >
        <AnimatePresence>
          {showOptions && (
            <div className="absolute bottom-16 right-0 mb-4 flex flex-col space-y-4">
              <NewTaskButton setShowOptions={setShowOptions} />
              <NewProjectButton setShowOptions={setShowOptions} />
            </div>
          )}
        </AnimatePresence>

        <motion.button
          className={`z-30 h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg transition-transform duration-300 hover:bg-blue-500 ${
            isVisible ? 'scale-100' : 'scale-0'
          }`}
          onClick={() => setShowOptions(!showOptions)}
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ rotate: showOptions ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Plus className="m-auto h-6 w-6" />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
};

export default AddButton;
