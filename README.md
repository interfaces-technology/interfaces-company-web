# The Interfaces Company

Public terminal / proof-of-existence page for **The Interfaces Company** — a human technology practice making crafted technology more accessible.

## Direction

Minimal terminal interface: monospace, ASCII-led, command prompts, system status, restrained GSAP motion. Monochrome with a small amber accent. Not cyberpunk, not fake-hacker.

## Stack

- Next.js (App Router)
- Tailwind CSS
- GSAP + `@gsap/react`
- IBM Plex Mono

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Structure

One page with:

1. Boot sequence
2. Hero ASCII frame
3. What we do
4. Operating model (Lab / Studio / Foundry / Company)
5. Current directions
6. Point of view
7. Contact ping
8. System status

Content lives in `src/data/content.ts`.
