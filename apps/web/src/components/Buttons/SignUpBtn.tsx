'use client';

import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/button';

interface SignUpBtnProps {
  color?: string;
  arrowDirection?: 'up' | 'down';
}

const SignUpBtn = ({ color, arrowDirection = 'down' }: SignUpBtnProps) => {
  return (
    <Button
      className={`flex items-center justify-center rounded-3xl py-2 pl-4 pr-1 ${color}`}
    >
      <span className="sm:text-lg">Get Started</span>

      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-500/70 p-1">
        {arrowDirection === 'down' ? (
          <ArrowDownRight />
        ) : (
          <ArrowUpRight className="scale-125" />
        )}
      </div>
    </Button>
  );
};

export default SignUpBtn;
