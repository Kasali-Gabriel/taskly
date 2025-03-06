import { createSession } from '@/lib/session';
import { BACKEND_URL } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url, process.env.NEXT_PUBLIC_BASE_URL);

  const userId = url.searchParams.get('userId');
  const name = url.searchParams.get('name');
  const email = url.searchParams.get('email');
  const profilePicture = url.searchParams.get('profilePicture');
  const accessToken = url.searchParams.get('accessToken');
  const refreshToken = url.searchParams.get('refreshToken');

  if (!userId || !name || !email || !refreshToken || !accessToken) {
    return NextResponse.json(
      { error: 'Google oauth failed!' },
      { status: 400 },
    );
  }

  const res = await fetch(`${BACKEND_URL}/auth/verify-token`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 401) {
    return NextResponse.json(
      { error: 'jwt verification failed!' },
      { status: 401 },
    );
  }

  await createSession({
    user: {
      id: userId,
      name,
      email,
      profilePicture: profilePicture ?? undefined,
    },
    accessToken,
    refreshToken,
  });

  redirect('/Home');
}
