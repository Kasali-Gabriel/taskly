'use client';

import Loader from '@/components/Buttons/ButtonLoader';
import { FloatingLabelInputField } from '@/components/FormFields/InputFields';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { UserContext } from '@/context/UserContext';
import { USER_LOGIN } from '@/graphql/mutations';
import { createSession } from '@/lib/session';
import { BACKEND_URL } from '@/lib/utils';
import { LoginSchema } from '@/schema/schemas';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const page = () => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>('');
  const { setUser } = useContext(UserContext);

  const [userLogin, { loading }] = useMutation(USER_LOGIN, {
    onCompleted: async (data) => {
      if (data) {
        try {
          console.log(data);
          await createSession({
            user: {
              id: data.userLogin.id,
              email: data.userLogin.email,
              name: data.userLogin.name,
              profilePicture: data.userLogin.profilePicture,
            },
            accessToken: data.userLogin.accessToken,
            refreshToken: data.userLogin.refreshToken,
          });

          setUser({
            id: data.userLogin.id,
            email: data.userLogin.email,
            name: data.userLogin.name,
            profilePicture: data.userLogin.profilePicture,
          });

          router.push('/Home');
        } catch (error) {
          setError('Failed to create session');
        }
      }
    },

    onError: (error) => {
      setError(error?.message || 'An error occurred');
    },
  });

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof LoginSchema>) => {
    await userLogin({ variables: { loginInput: values } });
  };

  const handleGooglebtnClick = () => {
    window.location.href = `${BACKEND_URL}/auth/google/login`;
  };

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

          <div className="mt-10 flex w-full max-w-[28.5rem] flex-col items-center justify-center space-y-4 sm:mt-7 md:mt-12">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-[90%] space-y-4 sm:w-full"
              >
                <FloatingLabelInputField
                  form={form}
                  name="email"
                  type="email"
                  label="Email address"
                  placeholder="Email address"
                />

                <FloatingLabelInputField
                  form={form}
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                />

                <Button
                  type="submit"
                  disabled={loading}
                  className="my-4 h-12 w-full bg-blue-600 transition-all hover:bg-blue-500 sm:h-[3.25rem] sm:text-lg"
                >
                  {loading ? <Loader /> : 'Continue'}
                </Button>
              </form>
            </Form>

            {error && (
              <div className="w-full rounded-md bg-red-50 p-2 text-start text-sm text-red-500 sm:text-base">
                {error}
              </div>
            )}
          </div>

          <div className="mt-4 flex w-full max-w-[28.5rem] items-center justify-center">
            <div className="mr-4 h-px w-full bg-stone-300" />

            <p className="my-2 text-sm text-gray-700">or</p>

            <div className="ml-4 h-px w-full bg-stone-300" />
          </div>

          <button
            onClick={handleGooglebtnClick}
            className="my-4 flex h-auto w-full max-w-[28.5rem] cursor-pointer items-center rounded-lg border-2 transition-all hover:bg-stone-200"
          >
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
          </button>

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
