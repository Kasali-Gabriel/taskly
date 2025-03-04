import { Smile } from 'lucide-react';
import Image from 'next/image';
import LoginBtn from '../Buttons/loginBtn';

const Banner = () => {
  return (
    <div className="mx-5 flex h-auto flex-col rounded-3xl bg-blue-400 p-5 text-center text-white sm:flex-row sm:space-x-5 sm:px-5 sm:py-10 xl:mx-16 xl:space-x-10 xl:px-8 xl:py-12">
      <div className="flex h-full w-full flex-col items-start justify-center md:space-y-10">
        <div className="flex w-fit items-center justify-center rounded-xl bg-gray-300/30 px-4 py-2">
          <Smile size={25} /> <span className="ml-2">New experience</span>
        </div>

        <div className="relative my-5 flex h-auto w-full items-center justify-center">
          {/* TODO change the shape of the banner, the middle must be longer and the first step shorter */}
          <Image
            src="/bannerBacground.png"
            alt="banner background"
            height={1000}
            width={1000}
            className="h-auto w-auto object-contain"
          />

          <Image
            src="/banner.png"
            alt="banner image"
            width={1000}
            height={650}
            className="absolute bottom-0 z-50 h-auto w-auto object-contain sm:h-[17rem] md:h-[19.25rem] lg:h-[27.25rem] xl:h-[28.125rem]"
          />
        </div>
      </div>

      <div className="relative flex w-full flex-col justify-center space-y-4 md:pt-5 lg:pt-8 xl:pt-0">
        <h2 className="text-start text-2xl md:text-3xl lg:text-6xl">
          Ready to dig into an incredible productivity experience?
        </h2>

        <p className="text-start text-sm md:text-base">
          Elevate your productivity with our innovative task management
          platform. Experience seamless organization and efficiency, bringing
          the future of productivity into your hands. Try it for free today and
          transform the way you work.
        </p>

        <div className="flex flex-row-reverse justify-between py-2 lg:flex-row xl:py-0">
          <LoginBtn
            arrowDirection="up"
            color="bg-white text-black hover:bg-gray-200 w-full sm:w-auto text-lg"
          />

          <Image
            src="/banner_design.png"
            alt="banner design line"
            width={200}
            height={200}
            className="-mt-2 hidden scale-75 lg:block xl:scale-[0.85]"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
