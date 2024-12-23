import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const Notification = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="mt-2 bg-inherit">
          <Bell className="hover:scale-[1.15] hover:bg-transparent" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="dark:bg-dark2 bg-light2 mx-5 mt-4 w-80">
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center justify-center px-1 py-2"></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Notification;
