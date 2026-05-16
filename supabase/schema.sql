create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  summary text not null,
  project_url text,
  artifact_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "members can read own profile"
on public.profiles
for select
using (auth.uid() = id);

create policy "members can update own profile"
on public.profiles
for update
using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data ->> 'username');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

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
