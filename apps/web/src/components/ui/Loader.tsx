import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FadeLoader } from 'react-spinners';

const Loader = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const darkMode = theme === 'dark';

  return (
    <div className="mb-20 flex items-center justify-center pt-20 sm:pt-24 md:pt-32 lg:pt-28">
      <FadeLoader height={25} color={darkMode ? '#66B2FF' : '#0D6EFD'} />
    </div>
  );
};

export default Loader;
