# healcode

## Local development

```bash
node node_modules/next/dist/bin/next dev -p 3000
```

## Dynamic pipeline

The app now includes:

- manager-reviewed membership applications and login
- a protected member dashboard at `/dashboard`
- member point balances, tiers, and transaction history
- a manager console at `/manager` for approvals, account status, permissions, and point adjustments
- a project upload flow at `/projects/new`
- API routes for auth and project creation
- a Supabase schema for project records and uploaded artifacts

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Copy `.env.example` to `.env.local`.
4. Fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. In Supabase Auth, enable email/password signups.
6. Add the same environment variables to Vercel Project Settings.

After that:

- applicants submit the membership form at `/login`
- managers approve applications and issue usernames at `/manager`
- approved, active members can sign in and see their own points at `/dashboard`
- users can upload their own projects at `/projects/new`
- project data is stored in `public.projects`
- uploaded files are stored in the public `project-artifacts` bucket

## Bootstrap the first manager

Create the first user in Supabase Authentication, then set the matching profile
to `role = 'manager'` and `status = 'active'` in the Supabase table editor. All
later member accounts can be created from the manager console.
