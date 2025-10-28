import React from 'react';
import { Filter } from 'lucide-react';

export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex flex-wrap items-center gap-2" id="posts">
      <span className="inline-flex items-center gap-2 text-sm text-slate-600 mr-2">
        <Filter className="h-4 w-4" />
        Filter by:
      </span>
      <button
        onClick={() => onSelect('all')}
        className={`px-3 py-1 rounded-full border text-sm transition-colors ${
          selected === 'all'
            ? 'bg-indigo-600 text-white border-indigo-600'
            : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
        }`}
      >
        All
      </button>
      {categories.map((c) => (
        <button
          key={c.slug}
          onClick={() => onSelect(c.slug)}
          className={`px-3 py-1 rounded-full border text-sm transition-colors ${
            selected === c.slug
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
          }`}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
