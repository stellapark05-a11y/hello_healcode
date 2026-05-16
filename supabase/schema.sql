create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  summary text not null,
  project_url text,
  artifact_url text,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "members can read own projects"
on public.projects
for select
using (auth.uid() = owner_id);

create policy "members can insert own projects"
on public.projects
for insert
with check (auth.uid() = owner_id);

create policy "members can update own projects"
on public.projects
for update
using (auth.uid() = owner_id);

create policy "members can delete own projects"
on public.projects
for delete
using (auth.uid() = owner_id);

insert into storage.buckets (id, name, public)
values ('project-artifacts', 'project-artifacts', true)
on conflict (id) do nothing;
