'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { getSession, SessionUser } from '../lib/session';

export const UserContext = createContext<{
  user: SessionUser | null;
  setUser: (user: SessionUser | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setUser(session?.user ?? null);
    };

    fetchSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
