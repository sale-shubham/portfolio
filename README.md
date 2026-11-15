# Shubham Sale — Portfolio

Portfolio site of Shubham Sale, a full stack developer in Nashik, India. Live at [https://shubsale.in](https://shubsale.in).

![Shubham Sale portfolio](src/app/opengraph-image.png)

## About

Shubham is a full stack developer in Nashik, Maharashtra, with 3+ years of experience building ERPs, SaaS products and dashboards. Open to full-time roles and freelance projects.

## Features

- Case studies with flow diagrams
- Ctrl/⌘+K command menu
- Terminal mode
- WhatsApp and email enquiry form, with a job or project intent
- Responsive layout
- Accessible markup and keyboard navigation
- SEO metadata and JSON-LD structured data

## Tech stack

- Next.js 16 (App Router, static export)
- React 19
- TypeScript
- Tailwind CSS v4
- AWS Amplify Hosting
- Amazon Route 53

## Project structure

```
src/
  app/              layout, page, metadata files (robots, sitemap, manifest, icons, OG image)
  components/       page sections, command menu, terminal, contact form
  data/profile.ts   single source of content for the page, command menu and terminal
public/             profile photo
amplify.yml         Amplify build settings
```

## Run locally

```bash
npm ci
npm run dev
```

The dev server runs at http://localhost:3000. `npm run build` outputs the static site to `out/`.

## Deployment

Pushing to `main` triggers an AWS Amplify build that follows `amplify.yml` and publishes the `out/` folder.

## Client work

The client projects shown on the site were built at AI Alpha Tech Pvt. Ltd. Their code is private and is not part of this repository.

## Contact

- Website: [shubsale.in](https://shubsale.in)
- LinkedIn: [shubham-sale28](https://www.linkedin.com/in/shubham-sale28)
- GitHub: [sale-shubham](https://github.com/sale-shubham)
- Email: [saleshubham2121@gmail.com](mailto:saleshubham2121@gmail.com)
