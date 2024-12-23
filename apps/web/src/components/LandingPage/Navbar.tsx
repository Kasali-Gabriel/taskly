'use client';

import Image from 'next/image';
import Link from 'next/link';
import SignUpBtn from '../Buttons/SignUpBtn';

import { ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => (
  <Link
    href={href}
    className={`flex cursor-pointer items-center justify-center rounded-xl bg-transparent px-4 py-2 text-xl hover:bg-neutral-500/10 ${href === '#home' ? 'text-blue-500' : ''}`}
    scroll={false}
    onClick={(e) => {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }}
  >
    {children}
  </Link>
);

const Navbar = () => {
  return (
    <div className="flex w-screen max-w-screen-2xl p-2 sm:px-5 sm:py-4 xl:px-20">
      <div className="flex w-full items-center justify-between">
        <Image
          src="/logo.png"
          alt="logo"
          width={165}
          height={50}
          className="-ml-4 scale-75 object-cover sm:-ml-0 sm:scale-[0.85] lg:scale-100"
        />

        <div className="-ml-2 hidden space-x-1 md:flex xl:-ml-0 xl:space-x-4">
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#about">About Us</NavLink>
          <NavLink href="#features">Our Features</NavLink>
        </div>

        <SignUpBtn />
      </div>
    </div>
  );
};

export default Navbar;
