# Magic Link

Lightweight platform for personalized interactive web pages, shared via URL.

Every page is driven by `src/content/links.json`. Push to GitHub → Vercel deploys automatically.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Sample Links

| URL | Template |
|-----|----------|
| `/homa` | Date invitation |
| `/sara-birthday` | Birthday surprise |
| `/john-anniversary` | Anniversary |
| `/best-friends` | Friendship |
| `/hello-world` | Greeting |
| `/client-123` | Custom page |

## Add a New Page

Edit `src/content/links.json`:

```json
{
  "slug": "my-page",
  "template": "greeting",
  "title": "Hello!",
  "subtitle": "Just for you",
  "name": "Friend",
  "message": "Your message here.",
  "image": "https://images.unsplash.com/photo-...",
  "animation": "fade",
  "buttons": [
    { "label": "Say hi", "href": "#", "variant": "primary" }
  ]
}
```

Push to GitHub. Vercel rebuilds. Your page is live at `/my-page`.

## Project Structure

```
src/
├── app/              # Next.js routes
├── templates/        # Template components
├── components/       # UI, effects, layout
├── content/          # links.json + templates.json
├── lib/              # Registry, loader, resolver
└── types/            # TypeScript types
```

## Deploy

Connected to Vercel — every `git push` deploys automatically. No database or external services required.
