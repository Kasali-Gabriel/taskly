'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

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

      <div className="flex h-full w-full flex-col items-center overflow-y-auto sm:justify-center xl:justify-start">
        <div className="mt-10 flex w-full max-w-[45rem] flex-col items-center justify-center px-4 md:mt-5 xl:mt-10">
          <h1 className="text-center text-2xl leading-tight sm:text-4xl md:text-[2.75rem]">
            Welcome back to Taskly
          </h1>

          <h2 className="mt-4 font-medium text-gray-500 md:text-2xl">
            Please sign in to continue
          </h2>

          <div className="mt-10 flex h-auto w-full max-w-[28.5rem] cursor-pointer items-center rounded-lg border-2 transition-all hover:bg-neutral-100 sm:mt-7 md:mt-12">
            <Image
              src="/google.png"
              alt="google logo"
              width={100}
              height={100}
              className="mx-4 my-2 h-10 w-10 rounded object-contain"
            />

            <p className="w-full text-center text-lg font-medium text-black">
              Continue with Google
            </p>
          </div>

          <div className="mt-4 flex w-full max-w-[28.5rem] items-center justify-center">
            <div className="mr-4 h-px w-full bg-stone-300" />

            <p className="my-2 text-sm text-gray-700">or</p>

            <div className="ml-4 h-px w-full bg-stone-300" />
          </div>

          <div className="mt-4 flex w-full max-w-[28.5rem] flex-col space-x-2">
            <Label htmlFor="email" className="m-2 text-gray-500">
              Email address
            </Label>

            <Input
              type="email"
              placeholder="company@gmail.com"
              className="h-12 w-full rounded-lg border border-gray-300 sm:text-lg"
            />

            <Button
              type="submit"
              className="my-4 h-12 w-full bg-blue-600 transition-all hover:bg-blue-500 sm:h-[3.25rem] sm:text-lg"
            >
              Continue
            </Button>
          </div>

          <div className="flex items-center justify-center text-gray-500 sm:text-lg">
            <p>Don't have an account ?</p>

            <button
              className="ml-2 font-semibold text-blue-600 hover:underline"
              onClick={() => router.push('/signup')}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
