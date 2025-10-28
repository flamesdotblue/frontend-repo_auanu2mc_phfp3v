import React, { useMemo, useState } from 'react';
import { PlusCircle } from 'lucide-react';

function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function PostEditor({ categories, onCreate }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selected, setSelected] = useState([]);
  const [published, setPublished] = useState(false);

  const contentStats = useMemo(() => {
    const words = content.trim().length ? content.trim().split(/\s+/).length : 0;
    const minutes = Math.max(1, Math.round(words / 200));
    return { words, minutes };
  }, [content]);

  const handleToggleCategory = (slug) => {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const post = {
      title: title.trim(),
      content: content.trim(),
      slug: slugify(title),
      published,
      categories: categories.filter((c) => selected.includes(c.slug)),
      createdAt: new Date().toISOString(),
    };
    onCreate(post);
    setTitle('');
    setContent('');
    setSelected([]);
    setPublished(false);
  };

  return (
    <section id="editor" className="rounded-xl border bg-white p-5">
      <h2 className="text-base font-semibold text-slate-900">Create a new post</h2>
      <p className="mt-1 text-sm text-slate-600">
        Write with markdown-friendly text. You can choose categories and set draft or published.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="An introduction to type-safe APIs with tRPC"
            className="mt-1 w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-slate-700">Content</label>
            <span className="text-xs text-slate-500">{contentStats.words} words • ~{contentStats.minutes} min read</span>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            placeholder={`Use markdown-like text. Example:\n\n# Hello world\nThis is my first post with **bold** ideas.`}
            className="mt-1 w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Categories</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => handleToggleCategory(c.slug)}
                className={`px-3 py-1 rounded-full border text-sm transition-colors ${
                  selected.includes(c.slug)
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <label className="inline-flex items-center gap-2 text-sm text-slate-700 select-none">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            Published
          </label>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PlusCircle className="h-4 w-4" />
            Add Post
          </button>
        </div>
      </form>
    </section>
  );
}
