import React from "react";
import Link from "next/link";
import axios from "axios";
import UseUser from "../hooks/useUser"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Header() {
  const [user, setUser] = UseUser();
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push('/')
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          b2metric task
        </span>
      </div>
      <div className="flex-grow flex justify-end">
        <div className="text-sm flex-grow">
          {user ? (
            <button
              onClick={logout}
              className="block mt-4 inline-block mt-0 text-teal-200 hover:text-white mr-6"
            >
              Log out
            </button>
          ) : (
            <Link href="/">
              <a className="block mt-4 inline-block mt-0 text-teal-200 hover:text-white mr-6">
                Login
              </a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
