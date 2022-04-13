import React from "react";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

function Header() {
  const [userRole, setUserRole] = useState([]);

  useEffect(() => {
    async function postUser() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const userRole = await axios.post("/api/getUser", token);
        setUserRole(userRole.data);
      } catch (error) {}
    }
    postUser();
  }, []);

  const logout = () => {
    localStorage.clear();
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
          <Link href="/register">
            <a className="block mt-4 inline-block mt-0 text-teal-200 hover:text-white mr-6">
              Register
            </a>
          </Link>
          {userRole == "admin" || userRole == "user" ? (
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

          <Link href="/library">
            <a className="block mt-4 inline-block mt-0 text-teal-200 hover:text-white mr-6">
              Library
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
