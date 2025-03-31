import { UserContext } from '@/context/UserContext';
import { SIGN_OUT } from '@/graphql/mutations';
import { deleteSession } from '@/lib/session';
import { useMutation } from '@apollo/client';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useContext, useState, useTransition } from 'react';
import { ClipLoader } from 'react-spinners';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

const SignOutBtn = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { user, setUser } = useContext(UserContext);
  const [signOut] = useMutation(SIGN_OUT, {
    onCompleted: () => setIsDialogOpen(false),
  });

  const handleSignOut = async () => {
    startTransition(async () => {
      await signOut({ variables: { userId: user?.id } });
      await deleteSession();
      setUser(null);
      router.refresh();
    });
  };

  const handleClick = () => {
    setIsDialogOpen(true);
    handleSignOut();
  };

  return (
    <div>
      <button
        className="flex cursor-pointer items-center space-x-3 p-3"
        onClick={handleClick}
        disabled={isPending}
      >
        <LogOut className="text-dark dark:text-light h-[1.2rem] w-[1.2rem] sm:scale-125" />
        <p className="text-lg font-medium">Sign Out</p>
      </button>

      {isDialogOpen && (
        <Dialog open={isDialogOpen}>
          <DialogContent
            onPointerDownOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
            className="flex max-w-[70vw] flex-col items-center justify-center p-6 md:p-8 xl:p-10"
          >
            <DialogHeader className="mb-4 flex w-full items-center justify-center text-center text-xl">
              <DialogTitle>Signing out</DialogTitle>

              <VisuallyHidden>
                <DialogDescription>Signing out user</DialogDescription>
              </VisuallyHidden>
            </DialogHeader>

            <ClipLoader color="blue" size={35} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SignOutBtn;
