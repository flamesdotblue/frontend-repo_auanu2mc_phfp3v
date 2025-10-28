import React from 'react';

function Badge({ children, color = 'indigo' }) {
  const map = {
    indigo: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
    green: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    gray: 'bg-slate-50 text-slate-700 ring-slate-600/20',
  };
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${map[color]}`}>
      {children}
    </span>
  );
}

export default function PostList({ posts }) {
  if (!posts.length) {
    return (
      <div className="text-sm text-slate-500 border border-dashed rounded-lg p-6 text-center">
        No posts yet. Create your first article in the editor below.
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li key={post.slug} className="rounded-xl border bg-white p-5 hover:shadow-sm transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
              <p className="mt-1 text-sm text-slate-600 line-clamp-2">{post.content.slice(0, 160)}{post.content.length > 160 ? '…' : ''}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge color={post.published ? 'green' : 'gray'}>
                {post.published ? 'Published' : 'Draft'}
              </Badge>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {post.categories.map((c) => (
              <Badge key={c.slug}>{c.name}</Badge>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
