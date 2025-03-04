'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CircleCheckBig, GlobeIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  const renderFeature = (text: string) => (
    <div className="hidden items-start gap-2 text-sm sm:flex md:text-lg xl:text-sm">
      <CircleCheckBig size={80} strokeWidth={1.15} className="-mt-6" />
      <span>{text}</span>
    </div>
  );

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-white">
      <Image
        src="/logo.png"
        alt="logo"
        width={200}
        height={100}
        onClick={handleLogoClick}
        className="scale-75 cursor-pointer sm:ml-14 sm:mt-5 sm:scale-100 xl:ml-28"
      />

      <div className="flex h-full w-full flex-col items-center justify-center overflow-y-auto">
        <div className="mt-24 flex w-full max-w-[45rem] flex-col items-center justify-center px-4 sm:mt-5 xl:mt-14">
          <h1 className="text-center text-2xl font-medium leading-tight sm:text-4xl md:text-[2.75rem]">
            You're One Step Away from <br /> Seamless Productivity
          </h1>

          <div className="mt-10 flex h-auto w-full max-w-[28.5rem] cursor-pointer items-center rounded bg-blue-600 p-1 hover:bg-blue-500 sm:mt-7 md:mt-12">
            <Image
              src="/google.png"
              alt="google logo"
              width={100}
              height={100}
              className="h-12 w-12 rounded bg-white object-contain sm:h-10 sm:w-10"
            />

            <p className="w-full text-center text-[0.885rem] font-medium text-white sm:text-lg">
              Continue with your Google work account
            </p>
          </div>

          <div className="mt-4 flex w-full max-w-[28.5rem] items-center justify-center">
            <div className="mr-4 h-px w-full bg-stone-300" />
            <p className="my-2 text-sm text-gray-700">OR</p>
            <div className="ml-4 h-px w-full bg-stone-300" />
          </div>

          <div className="mt-4 flex w-full max-w-[28.5rem] items-center space-x-2">
            <Input
              type="email"
              placeholder="company@gmail.com"
              className="h-12 w-full border border-gray-300 sm:h-[3.25rem] sm:text-lg"
            />

            <Button
              type="submit"
              className="h-12 sm:h-[3.25rem] sm:w-[10rem] sm:text-lg"
            >
              Continue
            </Button>
          </div>

          <p className="mt-7 max-w-[90vw] text-center text-sm text-gray-700 md:text-lg xl:text-sm">
            By signing up, I agree to Taskly
            <span className="font-bold text-black"> Privacy Policy </span> and{' '}
            <span className="font-bold text-black">Terms of Service</span>.
          </p>

          <div className="mt-10 w-full max-w-[90vw] gap-4 text-start sm:grid sm:w-auto sm:grid-cols-2 sm:justify-items-start sm:gap-x-6 sm:px-32 md:flex md:flex-row md:px-10 lg:gap-8">
            {renderFeature(
              'Unlimited tasks, projects, and storage—stay organized effortlessly.',
            )}
            {renderFeature('View your work your way—list, board, or calendar.')}
            {renderFeature(
              'Collaborate seamlessly—invite your team and get started.',
            )}
          </div>

          <div className="mt-10 flex flex-row items-center justify-center space-x-10 text-sm font-bold text-stone-700 sm:mt-5 md:my-10 md:text-lg md:font-medium xl:text-sm xl:font-bold">
            <span className="my-2 flex flex-row items-center justify-center space-x-2">
              <GlobeIcon size={20} strokeWidth={1} />
              <p>English</p>
            </span>
            <p>Terms & Privacy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
