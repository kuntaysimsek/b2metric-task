import React from "react";

function Header() {
  return (
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            Kutuphane
          </span>
        </div>
        <div className="flex-grow flex justify-end">
          <div className="text-sm flex-grow">
            <a
              href="#responsive-header"
              className="block mt-4 inline-block mt-0 text-teal-200 hover:text-white mr-6"
            >
              Register
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 inline-block mt-0 text-teal-200 hover:text-white mr-6"
            >
              Login
            </a>
          </div>
        </div>
      </nav>
  );
}

export default Header;
