import Image from 'next/image';
import { AppStoreButton, PlayStoreButton } from '../Buttons/DownloadApp';

const Hero = () => {
  const LeftSection = () => (
    <div className="grid h-[535px] grid-cols-2 pt-4 sm:px-5 sm:pt-7 md:pt-4 lg:px-0">
      <TextSection />
      <ImageSection />
    </div>
  );

  const TextSection = () => (
    <div className="grid grid-rows-2">
      <div className="flex h-fit flex-col rounded-l-2xl bg-blue-300 py-2 pl-2 sm:py-4 sm:pl-4">
        <div className="flex flex-col items-start justify-start space-y-3 rounded-2xl bg-white px-2 pt-12 sm:px-6">
          <h2 className="rounded-3xl border-2 border-stone-500 p-2 sm:px-4">
            New experience
          </h2>

          <h1 className="pr-4 text-start text-lg font-medium sm:text-xl xl:text-2xl">
            Your Project’s <br /> Solution; <br />
            <span className="text-gray-500">
              Fast, Efficient, and Exceptional
            </span>
          </h1>

          <h3 className="pb-4 text-start text-sm md:text-base xl:text-sm">
            Experience task management reimagined—more than just an app, it’s a
            smarter way to get things done.
          </h3>
        </div>
      </div>
      <div className="h-fit w-full rounded-tr-3xl bg-blue-50 p-2 sm:p-4">
        <Image
          src="/hero3.jpg"
          alt="hero 3"
          width={400}
          height={400}
          className="rounded-2xl object-contain"
        />
      </div>
    </div>
  );

  const ImageSection = () => (
    <div className="h-fit rounded-b-2xl rounded-r-2xl bg-blue-300 p-2 sm:p-4">
      <div className="flex h-[470px] flex-col items-center justify-end rounded-2xl bg-blue-500 sm:h-[500px]">
        <div
          className="mb-14 flex items-center justify-center rounded-full sm:mb-0 sm:h-[200px] sm:w-[200px] lg:mb-14 xl:mb-0"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 255, 255, 0.55) 0%, rgba(59, 130, 246, 1) 65%)',
          }}
        >
          <Image
            src="/hero2.png"
            alt="hero 2"
            width={200}
            height={200}
            className="h-auto w-auto scale-50 object-contain"
          />
        </div>

        <Image
          src="/hero1.png"
          alt="hero 1"
          width={300}
          height={500}
          className="h-[200px] w-auto object-cover sm:h-[300px] lg:h-[260px] xl:h-[300px]"
        />
      </div>
    </div>
  );

  const RightSection = () => (
    <div className="mb-20 flex flex-col items-start justify-start space-y-4 px-5 sm:pl-10">
      <h2 className="rounded-3xl border-2 border-stone-500 px-4 py-2 lg:mt-20">
        Task Management
      </h2>

      <h1 className="pt-7 text-5xl font-semibold sm:text-7xl md:pt-0 md:text-5xl">
        Easier{' '}
        <span className="text-blue-500">
          task <br className="hidden lg:block" />
          management
        </span>{' '}
        <br className="block lg:hidden" /> for{' '}
        <br className="hidden lg:block" />
        better productivity
      </h1>

      <h3 className="pb-5 pt-7 text-xl leading-normal sm:pb-14 md:pb-0 md:pt-0 md:text-lg">
        Streamline your projects, prioritize tasks, and track progress
        effortlessly. Empower your productivity and achieve success with the
        ultimate task management solution.
      </h3>

      <div className="-ml-3 hidden items-center justify-start pt-2 lg:flex">
        <PlayStoreButton />
        <AppStoreButton />
      </div>
    </div>
  );

  return (
    <section className="mt-5 flex items-center justify-center ">
      <div className="flex h-full w-full flex-col-reverse space-y-5 space-y-reverse lg:ml-4 lg:grid lg:grid-cols-2 xl:ml-0 xl:space-x-5 xl:space-y-0">
        <div className="-mt-5 mr-4 flex items-center justify-end sm:-mt-0 sm:pt-7 lg:hidden">
          <PlayStoreButton />
          <AppStoreButton />
        </div>

        <LeftSection />
        <RightSection />
      </div>
    </section>
  );
};

export default Hero;
