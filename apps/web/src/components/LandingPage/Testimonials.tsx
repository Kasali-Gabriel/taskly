'use client';

import { testimonialsData } from '@/constants/testimonialData';
import { TestimonialCardProps } from '@/types';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const TestimonialCard = ({ testimonial, className }: TestimonialCardProps) => (
  <div
    className={`flex min-w-[225px] flex-col items-start justify-between rounded-3xl border p-4 shadow md:transform md:rounded-lg md:transition-all md:hover:scale-[1.005] md:hover:shadow-xl ${className}`}
  >
    {className.includes('h-[458px]') && testimonial.companyImgSrc && (
      <Image
        src={testimonial.companyImgSrc}
        width={200}
        height={100}
        alt={`${testimonial.author}'s company`}
        className="h-auto w-auto rounded-lg"
      />
    )}

    <p
      className={
        className.includes('h-[458px]')
          ? 'text-2xl font-medium'
          : 'text-base font-normal'
      }
    >
      "{testimonial.text}"
    </p>

    <div className="mt-4 flex items-center">
      <Avatar className="flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14">
        <AvatarImage src={testimonial.imgSrc} />

        <AvatarFallback className="bg-blue-400">
          <User />
        </AvatarFallback>
      </Avatar>

      <div className="ml-3">
        <h4 className="font-semibold">{testimonial.author}</h4>

        <p
          className={`text-sm ${className.includes('bg-blue-500') ? 'text-gray-200' : 'text-gray-500'}`}
        >
          {testimonial.job}
        </p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      const scrollAmount = window.innerWidth < 640 ? 235 : 475;
      containerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const scrollAmount = window.innerWidth < 640 ? 235 : 475;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex w-full flex-col justify-center py-5" id="testimonials">
      <div className="flex w-full flex-wrap items-center justify-between pb-5">
        <div className="flex w-full items-center justify-between px-4 sm:w-[60%] sm:px-0">
          <h2 className="w-fit rounded-3xl border-2 border-stone-500 px-4 py-2">
            Testimonials
          </h2>

          <h1 className="text-center text-xl font-bold leading-normal md:text-3xl lg:text-4xl xl:text-[2.5rem] xl:leading-[2.85rem]">
            Over 20K+ Stories <br /> from Taskly Users.
          </h1>
        </div>

        <p className="w-full p-4 text-center text-sm sm:max-w-[15rem] sm:px-0 sm:text-right lg:text-base xl:max-w-xs">
          Discover how Tasky has revolutionized workflows and empowered our
          users—hear their success stories!
        </p>
      </div>

      <div className="flex h-full w-full items-center py-3 md:hidden">
        <div
          ref={containerRef}
          className="flex h-full w-full space-x-3 overflow-x-auto"
        >
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              className="my-2 h-[350px] bg-white sm:min-w-[250px]"
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-2 text-white md:hidden">
        <button
          onClick={scrollLeft}
          className="rounded-full bg-black/90 p-2 hover:bg-black/80"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={scrollRight}
          className="rounded-full bg-black/90 p-2 hover:bg-black/80"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="hidden gap-2 xl:grid xl:grid-flow-row-dense xl:grid-cols-3">
        <div className="flex flex-col gap-2">
          <TestimonialCard
            testimonial={testimonialsData[0]}
            className="h-[458px] bg-white md:shadow-xl md:hover:shadow-2xl"
          />
          <TestimonialCard
            testimonial={testimonialsData[1]}
            className="h-[225px]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <TestimonialCard
            testimonial={testimonialsData[2]}
            className="h-[225px]"
          />
          <TestimonialCard
            testimonial={testimonialsData[3]}
            className="h-[225px]"
          />
          <TestimonialCard
            testimonial={testimonialsData[4]}
            className="h-[225px]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <TestimonialCard
            testimonial={testimonialsData[5]}
            className="h-[225px]"
          />
          <TestimonialCard
            testimonial={testimonialsData[6]}
            className="h-[458px] bg-blue-500 text-white"
          />
        </div>
      </div>

      <div className="hidden gap-2 md:grid md:grid-cols-2 xl:hidden">
        <div className="flex flex-col gap-2">
          <TestimonialCard
            testimonial={testimonialsData[0]}
            className="h-[458px] bg-white md:shadow-xl md:hover:shadow-2xl"
          />
          <TestimonialCard
            testimonial={testimonialsData[1]}
            className="h-[225px]"
          />
          <TestimonialCard
            testimonial={testimonialsData[2]}
            className="h-[225px]"
          />
          <TestimonialCard
            testimonial={testimonialsData[3]}
            className="h-[225px]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <TestimonialCard
            testimonial={testimonialsData[4]}
            className="h-[225px]"
          />
          <TestimonialCard
            testimonial={testimonialsData[5]}
            className="h-[225px]"
          />
          <TestimonialCard
            testimonial={testimonialsData[7]}
            className="h-[225px]"
          />
          <TestimonialCard
            testimonial={testimonialsData[6]}
            className="h-[458px] bg-blue-500 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
