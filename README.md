# Samarth Shakti Foundation Platform

> Digital platform for skill development programmes, vocational education, government schemes, partnerships, donations and administrative operations.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3FCF8E?logo=supabase&logoColor=white)

This application supports the public website and protected administrative workflows of Samarth Shakti Foundation. Public users can explore programmes, schemes, partners and donation information, while authorised administrators manage content and operational records.

## Main capabilities

- Skill-development and vocational programme information
- Government-scheme and mission pages
- Partner and contact information
- Donation workflow
- Authentication and password recovery
- Role-protected administration area
- Course, news, attendance and organisational content management
- Printable and downloadable reports

## Technology

- React 18 and TypeScript
- Vite and SWC
- Tailwind CSS and shadcn/ui
- React Router
- TanStack Query
- Supabase authentication and database
- React Hook Form and Zod
- jsPDF, html2canvas and Recharts

## Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- A Supabase project with the required schema

## Local setup

1. Clone the repository.

   ```bash
   git clone https://github.com/deepakvish001/mataphoolpatidss.git
   cd mataphoolpatidss
   ```

2. Install exact dependencies.

   ```bash
   npm ci
   ```

3. Create a local environment file.

   ```bash
   cp .env.example .env
   ```

4. Configure the browser-safe Supabase variables.

   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
   ```

5. Start the development server.

   ```bash
   npm run dev
   ```

6. Open [http://localhost:8080](http://localhost:8080).

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start local development |
| `npm run build` | Create the production bundle |
| `npm run lint` | Run static analysis |
| `npm run test` | Run Vitest once |
| `npm run test:watch` | Run tests during development |
| `npm run preview` | Preview the production bundle |

## Routes

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Foundation landing page |
| `/about` | Public | Organisation information |
| `/contact` | Public | Contact details and enquiry flow |
| `/donation` | Public | Donation information |
| `/partners` | Public | Partner organisations |
| `/login` | Public | Administrator sign-in |
| `/reset-password` | Public | Account recovery |
| `/admin/*` | Admin | Protected management workflows |

## Structure

```text
src/
├── components/       public, administrative and shared UI
├── contexts/         authentication and shared CRUD state
├── hooks/            reusable React behaviour
├── integrations/     Supabase client and generated types
├── pages/            routed pages
├── services/         data access and business workflows
└── test/             automated test setup and cases
supabase/
├── functions/        server-side edge functions
└── migrations/       schema and security-policy history
```

## Security and privacy

- Never expose a Supabase service-role key in Vite variables.
- Apply row-level security to all client-accessible tables.
- Check administrative roles on the server and in database policies.
- Do not commit donor, student, staff or payment production data.
- Avoid logging personal information and authentication tokens.
- Validate file uploads and generated reports before distribution.

## Validation

Run the standard checks before submitting changes:

```bash
npm ci
npm run lint
npm run test
npm run build
```

## Deployment

Provide production environment variables through the hosting platform, build with `npm run build`, and deploy `dist/` behind HTTPS. Configure SPA fallback, security headers and restricted access to administrative paths.

## Contributing

Use focused branches and pull requests. Include tests for business logic, screenshots for visible changes, migration notes for database updates and a rollback plan for operational changes.

## License

No public reuse licence is currently declared. Obtain permission from the repository owner before redistribution.
