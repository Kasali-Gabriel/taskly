import { useSideBarStore } from '@/lib/state';
import { SideBarLinkProps } from '@/types';
import { usePathname, useRouter } from 'next/navigation';

export const SideBarLink = ({ route, icon: Icon, label }: SideBarLinkProps) => {
  const pathName = usePathname();

  const isActive =
    pathName === route || (pathName === '/' && route === '/dashboard');

  const router = useRouter();
  const setSideBar = useSideBarStore((state) => state.setSideBar);

  const handleClick = () => {
    router.push(route);
    if (window.innerWidth < 640) {
      setSideBar(false);
    }
  };

  return (
    <div className="w-full">
      <div
        onClick={handleClick}
        className={`relative flex cursor-pointer items-center justify-start border-l-4 py-2 pl-8 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${isActive ? 'border-blue-300 bg-gray-300 dark:bg-gray-600' : 'border-transparent'}`}
      >
        <Icon className="mr-5 h-6 w-6" />
        <span className="text-lg font-medium 2xl:text-xl">{label}</span>
      </div>
    </div>
  );
};
