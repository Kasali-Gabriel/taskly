'use client';

import { features } from '@/constants/featuresData';
import { useFeatureStore } from '@/lib/state';
import { FeatureButtonProps } from '@/types';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

const FeatureButton = ({
  title,
  icon: Icon,
  isOpen,
  setIsOpen,
}: FeatureButtonProps) => (
  <div
    className={`flex cursor-pointer items-center px-2 py-3 ${
      isOpen ? 'bg-blue-500 text-white' : 'text-gray-900 hover:bg-blue-200'
    } rounded-xl`}
    onClick={() => setIsOpen(!isOpen)}
  >
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center">
        <div
          className={`mr-4 flex h-12 w-12 items-center justify-center rounded-full p-3 ${
            isOpen ? 'bg-white text-blue-500' : 'bg-blue-500 text-white'
          }`}
        >
          <Icon className="h-8 w-8" />
        </div>
        <span className="font-medium sm:text-lg lg:text-xl">{title}</span>
      </div>
      <div>
        {isOpen ? (
          <>
            <ChevronUp className="h-6 w-6 md:hidden" />
            <ArrowRight className="hidden h-6 w-6 md:block" />
          </>
        ) : (
          <ChevronDown className="h-6 w-6 md:hidden" />
        )}
      </div>
    </div>
  </div>
);

const Features = () => {
  const {
    openFeatureIndex,
    setOpenFeatureIndex,
    defaultFeatureIndex,
    setDefaultFeatureIndex,
  } = useFeatureStore();

  useEffect(() => {
    const handleResize = () => {
      if (
        window.innerWidth >= 640 &&
        !openFeatureIndex &&
        !defaultFeatureIndex
      ) {
        setDefaultFeatureIndex(features[0].title);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [openFeatureIndex, defaultFeatureIndex, setDefaultFeatureIndex]);

  const handleFeatureClick = (title: string) => {
    setOpenFeatureIndex(title);
  };

  const activeFeatureIndex = openFeatureIndex || defaultFeatureIndex;

  return (
    <section id="features" className="pt-10">
      <div className="grid gap-5 px-2 sm:px-10 md:grid-cols-2 md:px-5 xl:gap-8">
        <div className="md:hidden">
          <h2 className="mb-6 text-center text-4xl font-semibold text-gray-900">
            Key Features
          </h2>
          {features.map((feature) => (
            <Collapsible
              key={feature.title}
              open={activeFeatureIndex === feature.title}
              onOpenChange={() =>
                handleFeatureClick(
                  activeFeatureIndex === feature.title ? '' : feature.title,
                )
              }
            >
              <CollapsibleTrigger asChild>
                <FeatureButton
                  title={feature.title}
                  icon={feature.icon}
                  isOpen={activeFeatureIndex === feature.title}
                  setIsOpen={() =>
                    handleFeatureClick(
                      activeFeatureIndex === feature.title ? '' : feature.title,
                    )
                  }
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-2">
                <Image
                  src={feature.imageSrc}
                  alt={feature.title}
                  width={500}
                  height={400}
                  className="h-auto w-auto rounded-lg object-contain shadow-sm"
                />
                <p className="mt-2 rounded-lg p-2 text-gray-600 shadow-inner">
                  {feature.description}
                </p>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        <div className="hidden space-y-4 md:block">
          <h2 className="-ml-4 text-left text-4xl font-semibold text-gray-900">
            Key Features
          </h2>

          {features.map((feature) => (
            <FeatureButton
              key={feature.title}
              title={feature.title}
              icon={feature.icon}
              isOpen={activeFeatureIndex === feature.title}
              setIsOpen={() => handleFeatureClick(feature.title)}
            />
          ))}
        </div>

        <div className="hidden justify-center p-5 md:flex md:flex-col md:items-start">
          {activeFeatureIndex && (
            <>
              <div className="flex items-center justify-center">
                <Image
                  src={
                    features.find(
                      (feature) => feature.title === activeFeatureIndex,
                    )?.imageSrc || ''
                  }
                  alt={activeFeatureIndex}
                  width={500}
                  height={400}
                  className="flex h-auto max-h-[400px] min-h-[200px] w-auto rounded-2xl object-contain shadow"
                />
              </div>

              <h2 className="mt-5 text-left text-2xl font-medium">
                {
                  features.find(
                    (feature) => feature.title === activeFeatureIndex,
                  )?.subheading
                }
              </h2>

              <p className="rounded-lg p-4 text-gray-600 shadow">
                {
                  features.find(
                    (feature) => feature.title === activeFeatureIndex,
                  )?.description
                }
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Features;
