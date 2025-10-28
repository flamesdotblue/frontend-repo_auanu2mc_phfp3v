import React from 'react';
import { Home, PenSquare } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-slate-800">
          <PenSquare className="h-5 w-5 text-indigo-600" />
          <span>TypeSafe Blog</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-600">
          <a href="#home" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
            <Home className="h-4 w-4" />
            Home
          </a>
          <a href="#posts" className="hover:text-slate-900 transition-colors">Posts</a>
          <a href="#editor" className="hover:text-slate-900 transition-colors">New Post</a>
        </nav>
        <div className="sm:hidden" />
      </div>
    </header>
  );
}
