# Portfolio — Scripts & Videos

Professional English-language portfolio for scripts and videos stored on Google Drive.

## What is built

- On-page Drive preview (video player / document reader)
- Secondary **Open in Drive** action
- Content data layer: title, function, category, description, thumbnail, Drive file ID
- Filters by type (Scripts / Videos) and category
- Contact links for WhatsApp, Discord, and Slack (hidden until final delivery)
- Mobile-first layout, sharing meta tags, fast Vite build

## Run locally

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Update content (no code changes needed)

| File | Purpose |
|------|---------|
| `src/data/site.ts` | Name, role, about text, contact links, SEO |
| `src/data/works.ts` | Portfolio items |

### Drive file ID

From a share link like:

`https://drive.google.com/file/d/1AbCDefGHiJkLmNop/view?usp=sharing`

use only:

`1AbCDefGHiJkLmNop`

Every file must be shared as **Anyone with the link → Viewer**.

### Contacts (enable only at final delivery)

Direct contact channels stay off during platform review to avoid policy issues.

1. Fill `href` in `site.contacts`
2. Set `showDirectContacts: true` in `src/data/site.ts`

- WhatsApp: `https://wa.me/5511999999999`
- Discord: invite or profile URL
- Slack: invite / workspace link

## Client materials checklist

See `CLIENT_MATERIALS.md`.
