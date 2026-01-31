# Using Supabase as Backend

Yes, you can use the existing Supabase project as the backend to store data. The app already has:

- **Supabase client** in `src/integrations/supabase/client.ts` (with auth persistence enabled)
- **Env variables** in `.env`: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`
- **Edge function** `supabase/functions/resume-chat` for the AI resume chat

Right now the app stores **auth** and **resumes** in **localStorage** only. To move that data to Supabase:

---

## 1. Create tables in Supabase

In the [Supabase Dashboard](https://supabase.com/dashboard) → SQL Editor, run:

```sql
-- User profiles (optional if you later use Supabase Auth)
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  phone text,
  location text,
  bio text,
  join_date text,
  created_at timestamptz default now()
);

-- Resumes per user (keyed by profile id or email)
create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  title text not null,
  role text,
  company text,
  created text not null,
  status text not null default 'Complete',
  ats_score int,
  messages jsonb not null default '[]',
  created_at timestamptz default now()
);

create index if not exists resumes_user_id on public.resumes (user_id);

-- Enable RLS (Row Level Security) so users only see their own data
alter table public.resumes enable row level security;
create policy "Users can manage own resumes"
  on public.resumes for all
  using (true)
  with check (true);
-- Tighten later: using (auth.uid()::text = user_id) when using Supabase Auth
```

---

## 2. Use the client in your code

- **Read/write resumes**: Import `supabase` from `@/integrations/supabase/client` and use `supabase.from('resumes').select()`, `.insert()`, `.update()`, `.delete()`.
- **Auth**: You can keep the current localStorage-based auth, and use `user.id` (or email) as `user_id` when saving resumes to Supabase. For full Supabase-backed auth, you’d switch to `supabase.auth.signInWithPassword()`, `supabase.auth.getSession()`, etc., and sync `AuthContext` with `supabase.auth.onAuthStateChange()`.

---

## 3. Optional: sync `UserResumesContext` with Supabase

In `src/contexts/UserResumesContext.tsx` and `src/lib/userResumes.ts` you can:

- **Load resumes**: `const { data } = await supabase.from('resumes').select('*').eq('user_id', user.id).order('created_at', { ascending: false });`
- **Add resume**: `await supabase.from('resumes').insert({ user_id: user.id, title, role, created, status, ats_score, messages });`
- **Delete**: `await supabase.from('resumes').delete().eq('id', resumeId).eq('user_id', user.id);`

Use Supabase when `VITE_SUPABASE_URL` is set; otherwise keep using localStorage so the app still works without a backend.

---

## Summary

- **Login persistence** is fixed: the app waits for the localStorage auth check before redirecting, so refresh no longer forces login.
- **Supabase** is already set up as a client; you can add the tables above and use them for profiles and resumes. The `supabase` folder (e.g. `functions/resume-chat`) is part of that backend; add DB tables and wire your contexts to Supabase when you want data stored there.
