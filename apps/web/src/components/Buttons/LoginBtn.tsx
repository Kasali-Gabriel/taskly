'use client';

import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

interface loginBtnProps {
  color?: string;
  arrowDirection?: 'up' | 'down';
}

const LoginBtn = ({ color, arrowDirection = 'down' }: loginBtnProps) => {
  const router = useRouter();

  return (
    <Button
      className={`flex items-center justify-center rounded-3xl py-2 pl-4 pr-1 ${color}`}
      onClick={() => router.push('/login')}
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

export default LoginBtn;
