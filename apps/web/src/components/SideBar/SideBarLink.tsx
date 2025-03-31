import { useSideBarStore } from '@/lib/state';
import { SideBarLinkProps } from '@/types';
import { Folder, FolderOpen } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export const SideBarLink = ({
  route,
  icon: Icon,
  label,
  className,
}: SideBarLinkProps) => {
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
    <div className="w-full px-3">
      <div
        onClick={handleClick}
        className={`relative flex ${className} cursor-pointer items-center justify-start rounded-xl pl-4 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${isActive ? 'bg-neutral-200 dark:bg-gray-600' : 'border-transparent'}`}
      >
        {route.startsWith('/projects/') ? (
          isActive ? (
            <FolderOpen className="mr-2.5 h-5 w-5" />
          ) : (
            <Folder className="mr-2.5 h-5 w-5" />
          )
        ) : (
          <Icon className="mr-2.5 h-5 w-5" />
        )}

        <span className="mt-1 truncate sm:text-lg 2xl:text-xl">{label}</span>
      </div>
    </div>
  );
};
