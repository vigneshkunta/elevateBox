import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="https://media.licdn.com/dms/image/v2/D560BAQFa5xRvyLrZ7g/company-logo_200_200/company-logo_200_200/0/1719379322506/elevatebox_logo?e=2147483647&v=beta&t=uPk-uTD-bgxcLvNLopalSUPdbsE4hCL3MGnb8gQZkcc"
              alt="elevateBox Logo"
              className="h-10 w-10 rounded-full shadow-sm object-contain"
              loading="lazy"
              draggable={false}
            />
            <span className="text-2xl font-extrabold tracking-tight text-indigo-600 select-none">
              elevateBox
            </span>
          </Link>
          <div>
            <Link
              href="/login"
              className="text-indigo-600 font-semibold rounded-md border border-indigo-600 px-4 py-2 hover:bg-indigo-50 transition"
            >
              Login
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
