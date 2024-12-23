import Image from 'next/image';
import { Button } from '../ui/button';

export const AppStoreButton = () => (
  <Button className="h-14 rounded-xl scale-[0.85] bg-black text-white hover:bg-stone-800">
    <div className="flex items-center">
      <Image
        src="/app-store.png"
        alt="Download from App store"
        height={50}
        width={50}
        className="-ml-3 scale-50 object-contain md:scale-75"
      />
      <div className="text-justify">
        <p className="hidden text-[12px] font-extralight sm:block">
          Download on the
        </p>
        <p className="-ml-2 text-lg font-bold sm:-ml-0">App store</p>
      </div>
    </div>
  </Button>
);

export const PlayStoreButton = () => (
  <Button className="h-14 scale-[0.85] rounded-xl bg-black text-white hover:bg-stone-800">
    <div className="flex items-center">
      <Image
        src="/playstore.png"
        alt="Download from Playstore"
        height={50}
        width={50}
        className="-ml-3 scale-50 object-contain md:scale-75"
      />
      <div>
        <p className="hidden text-sm font-extralight sm:block">GET IT ON</p>
        <p className="hidden text-lg font-bold sm:block">Google Play</p>
        <p className="-ml-2 text-lg font-bold sm:hidden">Playstore</p>
      </div>
    </div>
  </Button>
);
