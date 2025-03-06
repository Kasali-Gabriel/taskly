'use client';

import Loader from '@/components/Buttons/ButtonLoader';
import { FloatingLabelInputField } from '@/components/FormFields/InputFields';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { UserContext } from '@/context/UserContext';
import { CREATE_USER } from '@/graphql/mutations';
import { createSession } from '@/lib/session';
import { BACKEND_URL } from '@/lib/utils';
import { SignUpSchema } from '@/schema/schemas';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheckBig, GlobeIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const SignupPage = () => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>('');
  const { setUser } = useContext(UserContext);

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onCompleted: async (data) => {
      if (data) {
        try {
          await createSession({
            user: {
              id: data.createUser.id,
              email: data.createUser.email,
              name: data.createUser.name,
            },
            accessToken: data.createUser.accessToken,
            refreshToken: data.createUser.refreshToken,
          });

          setUser({
            id: data.createUser.id,
            email: data.createUser.email,
            name: data.createUser.name,
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

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    await createUser({ variables: { createUserInput: values } });
  };

  const handleGooglebtnClick = () => {
    window.location.href = `${BACKEND_URL}/auth/google/login`;
  };

  const renderFeature = (text: string) => (
    <div className="hidden items-start gap-2 text-sm sm:flex md:text-lg xl:text-sm">
      <CircleCheckBig size={80} strokeWidth={1.15} className="-mt-6" />
      <span>{text}</span>
    </div>
  );

  return (
    <div className="flex h-screen w-screen flex-col overflow-y-auto overflow-x-hidden bg-white">
      <Image
        src="/logo.png"
        alt="logo"
        width={200}
        height={100}
        onClick={handleLogoClick}
        className="scale-75 cursor-pointer md:ml-14 md:mt-5 md:scale-100 xl:ml-28"
      />

      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="mt-16 flex w-full max-w-[45rem] flex-col items-center justify-center px-4 xl:mt-5">
          <h1 className="text-center text-2xl font-medium leading-tight sm:text-3xl md:text-4xl md:text-[2.75rem]">
            You're One Step Away from <br /> Seamless Productivity
          </h1>

          <div className="mt-10 flex w-full max-w-[28.5rem] flex-col items-center space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-[90%] space-y-3 sm:w-full"
              >
                <FloatingLabelInputField
                  form={form}
                  name="name"
                  label="Full Name"
                  placeholder="Full Name"
                />

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
                  className="h-10 w-full sm:h-12 sm:text-lg"
                >
                  {loading ? <Loader /> : 'Create Account'}
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
            <p className="my-2 text-sm text-gray-700">OR</p>
            <div className="ml-4 h-px w-full bg-stone-300" />
          </div>

          <button
            onClick={handleGooglebtnClick}
            className="mt-10 flex h-auto w-full max-w-[28.5rem] items-center rounded bg-blue-600 p-1 hover:bg-blue-500 sm:mt-7 md:mt-5"
          >
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
          </button>

          <p className="mt-7 max-w-[90vw] text-center text-sm text-gray-700 md:text-lg xl:text-sm">
            By createUserg up, I agree to Taskly
            <span className="font-bold text-black"> Privacy Policy </span> and{' '}
            <span className="font-bold text-black">Terms of Service</span>.
          </p>

          <div className="mt-10 w-full max-w-[90vw] gap-4 text-start sm:grid sm:w-auto sm:grid-cols-2 sm:justify-items-start sm:gap-x-6 sm:px-32 md:flex md:max-w-full md:flex-row md:px-10 lg:gap-8">
            {renderFeature(
              'Unlimited tasks, projects, and storage—stay organized effortlessly.',
            )}
            {renderFeature('View your work your way—list, board, or calendar.')}
            {renderFeature(
              'Collaborate seamlessly—invite your team and get started.',
            )}
          </div>

          <div className="mt-10 flex flex-row items-center justify-center space-x-10 text-sm font-bold text-stone-700 sm:mt-5 md:my-10 md:text-lg md:font-medium xl:mt-5 xl:text-sm xl:font-bold">
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
