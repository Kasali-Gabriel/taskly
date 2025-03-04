import { sections } from '@/constants/aboutData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const SectionHeader = ({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string;
  subtitle: string;
  icon?: React.ElementType;
}) => (
  <div className="flex flex-col items-center space-y-4 text-center lg:items-start lg:text-left">
    {Icon && (
      <Icon
        className="scale-75 transform text-blue-600 transition-all duration-300 hover:scale-110 sm:scale-100"
        size={50}
      />
    )}
    <h2 className="text-lg font-semibold text-gray-900 sm:text-2xl">{title}</h2>
    <p className="px-1 text-sm text-gray-700 sm:text-lg">{subtitle}</p>
  </div>
);

const SlantedBars = () => (
  <div className="absolute inset-0 z-0">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="absolute top-0 h-full w-[10%] rotate-12 transform bg-black/20"
        style={{
          left: `${i * 20}%`,
          transform: `rotate(-30deg)`,
          background: `linear-gradient(to bottom, transparent, black 60%, transparent)`,
          opacity: 0.3 + i * 0.05,
        }}
      />
    ))}
  </div>
);

const Section = ({ section }: { section: any }) => (
  <div className="grid justify-center gap-12 lg:grid-cols-12 lg:items-center lg:gap-20 xl:gap-24">
    <div className="col-span-7 space-y-8">
      <div
        className={`${section.reverseLayout ? 'flex-row-reverse' : 'flex-row'} flex items-center justify-between lg:justify-start`}
      >
        <div
          className={`${section.reverseLayout ? 'pl-5 sm:pl-10 lg:pl-0' : 'pr-5'} w-[50%] space-y-4 text-left sm:w-[65%] sm:py-10 lg:w-full`}
        >
          <h2 className="w-fit rounded-3xl border-2 border-stone-500 px-4 py-2">
            About Us
          </h2>

          <h2 className="text-xl font-semibold text-gray-900 sm:text-5xl lg:text-4xl">
            {section.mainTitle}
          </h2>

          <p className="text-gray-700 sm:text-xl">{section.mainSubtitle}</p>
        </div>

        <div className="flex h-auto w-[50%] items-end justify-center sm:w-[35%] lg:hidden">
          <div className="relative flex h-full w-full items-end justify-center overflow-hidden rounded-[2rem] bg-gradient-to-bl from-black via-stone-900 to-gray-800 shadow-lg sm:rounded-[3rem]">
            <SlantedBars />

            <Image
              src={section.image}
              alt={section.alt}
              width={300}
              height={600}
              className="relative z-10 -mb-6 h-auto w-auto scale-90 object-contain"
            />
          </div>
        </div>
      </div>

      <div className="relative flex items-center pt-8">
        <div className="absolute right-11 z-20">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-stone-500 bg-blue-50">
            <ChevronLeft className="text-gray-700" size={24} />
          </div>
        </div>

        <div className="z-10 h-[2px] flex-grow bg-stone-500" />

        <div className="absolute right-0 z-20">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-stone-500 bg-blue-50">
            <ChevronRight className="text-gray-700" size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-4 sm:gap-8">
        {section.items.map((item: any, i: number) => (
          <div key={i} className="flex flex-col items-center space-y-4">
            <SectionHeader
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>

    <div
      className={`col-span-5 hidden h-full w-full items-end justify-center lg:flex ${section.reverseLayout ? 'lg:order-first' : ''}`}
    >
      <div className="relative flex h-full w-full items-end justify-center overflow-hidden rounded-[4rem] bg-gradient-to-bl from-black via-stone-900 to-gray-800 shadow-lg">
        <SlantedBars />

        <Image
          src={section.image}
          alt={section.alt}
          width={300}
          height={600}
          className="relative z-10 -mb-8 h-full w-auto scale-90 object-contain"
        />
      </div>
    </div>
  </div>
);

const About = () => {
  return (
    <section className="space-y-20 px-2 py-5 sm:px-8 md:space-y-24" id="about">
      {sections.map((section, index) => (
        <Section key={index} section={section} />
      ))}
    </section>
  );
};

export default About;
