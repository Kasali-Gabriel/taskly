import { UserContext } from '@/context/UserContext';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ChevronDown, Lock, Settings, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import SignOutBtn from '../Buttons/SignOutBtn';
import { ThemeToggler } from '../Theme/themeToggler';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const Profile = () => {
  const router = useRouter();

  const { user } = useContext(UserContext);

  const menuItems = [
    {
      label: 'Settings',
      icon: (
        <Settings className="text-dark dark:text-light h-[1.2rem] w-[1.2rem] sm:scale-125" />
      ),
      onClick: () => router.push('/Settings'),
    },
    { label: 'Team' },
    { label: 'Subscription' },
  ];

  return (
    <div>
      <div className="block sm:hidden">
        <Drawer>
          <DrawerTrigger className="hover:bg-transparent focus:bg-transparent focus:outline-none">
            <div className="flex items-center justify-center rounded-lg bg-inherit hover:bg-gray-300 xl:-mr-0 xl:px-2 dark:hover:bg-gray-500">
              <Avatar>
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback className="bg-blue-400">
                  <User />
                </AvatarFallback>
              </Avatar>

              <div className="ml-3 hidden flex-col items-start space-y-1 py-2 text-xs lg:flex">
                <p className="font-bold">{user?.name}</p>
                <div className="flex items-center justify-between space-x-2 font-light">
                  <p>Personal</p>
                  <Lock size={12} />
                </div>
              </div>

              <ChevronDown size={20} className="ml-0.5 xl:ml-2" />
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <VisuallyHidden>
              <DrawerHeader>
                <DrawerTitle>Profile Menu</DrawerTitle>
                <DrawerDescription>Select an option</DrawerDescription>
              </DrawerHeader>
            </VisuallyHidden>

            <div className="fixed bottom-5 right-5">
              <ThemeToggler />
            </div>

            <div className="mb-14 pl-5">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3"
                  onClick={item.onClick}
                >
                  {item.icon && (
                    <div className="bg-inherit sm:scale-125">{item.icon}</div>
                  )}
                  <p className="text-lg font-medium">{item.label}</p>
                </div>
              ))}
              <SignOutBtn />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="hidden sm:block">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center justify-center rounded-lg bg-inherit hover:bg-gray-300 xl:-mr-0 xl:px-2 dark:hover:bg-gray-500">
              <Avatar>
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback className="bg-blue-400">
                  <User />
                </AvatarFallback>
              </Avatar>

              <div className="ml-3 hidden flex-col items-start space-y-1 py-2 text-xs lg:flex">
                <p className="font-bold">{user?.name}</p>
                <div className="flex items-center justify-between space-x-2 font-light">
                  <p>Personal</p>
                  <Lock size={12} />
                </div>
              </div>

              <ChevronDown size={20} className="ml-0.5 xl:ml-2" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="dark:bg-dark2 mx-5 w-44">
            <DropdownMenuSeparator />
            {menuItems.map((item, index) => (
              <DropdownMenuItem
                key={index}
                className="flex items-center space-x-3 p-3"
                onClick={item.onClick}
              >
                {item.icon && (
                  <div className="bg-inherit sm:scale-125">{item.icon}</div>
                )}
                <p className="text-lg font-medium">{item.label}</p>
              </DropdownMenuItem>
            ))}
            <SignOutBtn />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Profile;
