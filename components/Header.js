import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useContext, useState } from 'react';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import {
  MenuIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  ShoppingBagIcon,
  XIcon,
} from '@heroicons/react/outline';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

import Search from './Search';
import AuthContext from '@context/AuthContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="bg-white">
      <header>
        <div>
          <Link href="/">
            <a>DJ Events</a>
          </Link>
        </div>

        <Search />

        <nav>
          <ul>
            <li>
              <Link href="/events">
                <a>Events</a>
              </Link>
            </li>
            {user ? (
              // If logged in
              <>
                {' '}
                <li>
                  <Link href="/events/add">
                    <a>Add Event</a>
                  </Link>
                </li>
                <li>
                  <Link href="/account/dashboard">
                    <a>Dashboard</a>
                  </Link>
                </li>
                <li>
                  <button onClick={() => logout()}>
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </>
            ) : (
              // If logged out
              <>
                {' '}
                <li>
                  <Link href="/account/login">
                    <a>
                      <FaSignInAlt /> Login
                    </a>
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link href="/account/register">
                <a> Register</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
