import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';
import PostList from './components/PostList.jsx';
import PostEditor from './components/PostEditor.jsx';

function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function App() {
  const [categories, setCategories] = useState([
    { name: 'TypeScript', description: 'Static types for JS', slug: 'typescript' },
    { name: 'tRPC', description: 'End-to-end types', slug: 'trpc' },
    { name: 'ORM', description: 'Drizzle, Prisma, SQL', slug: 'orm' },
  ]);

  const [posts, setPosts] = useState([
    {
      title: 'Why tRPC + TypeScript feels magical',
      content:
        'Explore how tRPC leverages TypeScript to deliver end-to-end type safety without codegen. From routers to React hooks, enjoy DX at its best.',
      slug: 'why-trpc-typescript-feels-magical',
      published: true,
      categories: [
        { name: 'TypeScript', slug: 'typescript' },
        { name: 'tRPC', slug: 'trpc' },
      ],
      createdAt: new Date().toISOString(),
    },
    {
      title: 'Getting started with Drizzle ORM on Postgres',
      content:
        'Set up a clean schema, run migrations, and model many-to-many relations for a blog. Drizzle keeps SQL first and DX friendly.',
      slug: 'getting-started-with-drizzle-orm-on-postgres',
      published: false,
      categories: [{ name: 'ORM', slug: 'orm' }],
      createdAt: new Date().toISOString(),
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') return posts;
    return posts.filter((p) => p.categories.some((c) => c.slug === selectedCategory));
  }, [posts, selectedCategory]);

  const handleCreatePost = (post) => {
    // prevent duplicate slugs in this demo
    const existing = new Set(posts.map((p) => p.slug));
    let base = post.slug || slugify(post.title);
    let candidate = base;
    let i = 1;
    while (existing.has(candidate)) {
      candidate = `${base}-${i++}`;
    }
    setPosts((prev) => [{ ...post, slug: candidate }, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main id="home" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <section className="rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-700 text-white p-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl sm:text-3xl font-semibold">A clean, type-safe blog starter</h1>
            <p className="text-indigo-100 max-w-2xl">
              This UI showcases the core pieces of a modern blog: navigation, category filters, a post list, and a simple editor.
              Backend APIs, database, and tRPC routers would power these interactions in a full build.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Latest posts</h2>
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
          <PostList posts={filteredPosts} />
        </section>

        <PostEditor categories={categories} onCreate={handleCreatePost} />

        <section className="text-center text-xs text-slate-500 py-6">
          <p>
            Built with React + Tailwind. Replace the in-memory data with a real API when connecting your backend.
          </p>
        </section>
      </main>
    </div>
  );
}
