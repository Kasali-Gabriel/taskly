import { Smile } from 'lucide-react';
import Image from 'next/image';
import SignUpBtn from '../Buttons/SignUpBtn';

const Banner = () => {
  return (
    <div className="mx-16 flex h-[85vh] flex-col items-center justify-center rounded-3xl bg-blue-400 px-8 py-12 text-center text-white md:flex-row md:space-x-8 xl:space-x-20 xl:px-20">
      <div className="flex h-full w-full flex-col items-start justify-center space-y-6 md:w-1/2">
        <div className="flex w-fit items-center justify-center rounded-xl bg-gray-300/30 px-4 py-2">
          <Smile size={25} /> <span className="ml-2">New experience</span>
        </div>

        <div className="relative flex h-[80%] w-full items-end justify-center rounded-b-3xl bg-white">
          <Image
            src="/hero1.png"
            alt="banner.img"
            width={800}
            height={1000}
            className="absolute z-50 h-[430px] w-[300px] object-contain"
          />
          <div className="step-cutout absolute left-0 top-0 h-[50%] w-full bg-blue-400"></div>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center space-y-4">
        <h2 className="text-start text-3xl font-bold md:text-4xl">
          Ready to conquer your tasks?
        </h2>

        <p className="text-start text-lg md:text-xl">
          Streamline your productivity with our task management platform.
        </p>

        <SignUpBtn
          arrowDirection="up"
          color="bg-white text-black hover:bg-gray-200"
        />
      </div>
    </div>
  );
};

export default Banner;
