# Portfolio

Personal portfolio built with Next.js 14, TypeScript, Tailwind CSS and MDX.

## Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** MDX files with `gray-matter` + `next-mdx-remote`
- **Animation:** Framer Motion
- **Forms:** React Hook Form + Zod + EmailJS

## Project structure

```
content/
  en/              # English content
  pt/              # Portuguese content
src/app/
  [lang]/          # Localized routes (/en, /pt)
  components/      # React components
  i18n/            # UI dictionaries
  lib/             # Content layer, schemas, metadata helpers
public/images/     # Local images migrated from Hygraph
```

## Environment variables

Only EmailJS credentials are required:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

> **Note:** `HYGRAPH_URL` and `HYGRAPH_TOKEN` are no longer used. Content is now sourced from local MDX files under `content/`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run lint
npm run build
npm start
```

## Content migration

The migration script at `scripts/migrate-from-hygraph.ts` can be used as a reference for migrating Hygraph content to MDX. It is not required for the build.
