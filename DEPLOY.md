# Deploying this site

The site is hosted on **Firebase Hosting** (project: `etan-music-website`).

Live URL: https://etan-music-website.web.app
Firebase console: https://console.firebase.google.com/project/etan-music-website/overview

## Deploy

From the repo root:

```bash
npm run build
npx -y firebase-tools@latest deploy --only hosting
```

That's it — the first command builds the site into `dist/`, the second uploads
`dist/` to Firebase Hosting and releases it live.

## Preview a change before going live (optional)

Deploys to a temporary preview URL instead of the live site:

```bash
npm run build
npx -y firebase-tools@latest hosting:channel:deploy preview
```

## Roll back

If a deploy breaks something, open the Firebase console → Hosting → Release
history, and click "Rollback" on a previous release.

## Notes

- You must be logged in to the Firebase CLI (`npx -y firebase-tools@latest login`)
  as the Google account that owns the project.
- Hosting config lives in `firebase.json`; the project ID is pinned in `.firebaserc`.
