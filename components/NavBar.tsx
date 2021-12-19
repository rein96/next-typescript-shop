import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { User } from 'lib/user';
import { fetchJson } from 'lib/api';
import { useQuery } from 'react-query';

const NavBar: React.FC = () => {

  const { data: user } = useQuery('user', async () => {
    try {
      return await fetchJson('/api/user')
    } catch (err) {
      return undefined
    }
  }, {
    staleTime: 30000, // 30 seconds
    cacheTime: Infinity,
  })
  console.log('user', user)

  const handleSignOut = async () => {
    await fetchJson('/api/logout')
    // setUser(undefined);
  }

  return (
    <nav className="px-2 py-1 text-sm">
      <ul className="flex gap-2">
        <li className="text-lg font-extrabold">
          <Link href="/">
            <a>
              Next Shop
            </a>
          </Link>
        </li>
        <li role="separator" className="flex-1" />
        {user ? (
          <>
            <li>
              {user.name}
            </li>
            <li>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/sign-in">
              <a>
                Sign In
              </a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;