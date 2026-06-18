***# SkillVerse Architecture Notes***



***## Database Split (Intentional)***



***This project uses TWO data stores by design:***



***### 1. Prisma + PostgreSQL (via Express backend, JWT auth)***

***Used for: User accounts, login/auth, Projects, Proposals, Messages, Gigs,*** 

***FreelancerProfile (internal/dashboard data), ClientProfile.***



***Access pattern: Frontend → Axios → Express routes → Prisma → Postgres.***



***### 2. Supabase client (direct from frontend, anon key)***

***Used for: `profiles` table only — the public-facing freelancer profile*** 

***(name, title, bio, avatar, skills, portfolio, ranking score).***



***Access pattern: Frontend → Supabase JS client → Supabase Postgres directly.***



***## Why split this way***



***The `profiles` table was originally built directly against Supabase*** 

***for fast iteration on the public profile page. Everything else*** 

***(auth, projects, proposals, messaging) needs custom business logic*** 

***(JWT auth, ownership checks, proposal accept/reject rules) that lives*** 

***naturally in the Express backend with Prisma.***



***## Rule going forward***



***- New transactional features (payments, disputes, contracts) → Prisma backend.***

***- New profile-display features (badges, testimonials shown on public profile) → Supabase `profiles` table.***

***- Never query `profiles` through Prisma, never query `User`/`Project`/etc through the Supabase client.***

***- When a new freelancer registers, `backend/controllers/authController.js`*** 

&#x20; ***creates rows in BOTH stores (Prisma `FreelancerProfile` + Supabase `profiles`)*** 

&#x20; ***using the Supabase service role key (`backend/utils/supabaseAdmin.js`).*** 

&#x20; ***Keep this in sync if either schema changes.***

