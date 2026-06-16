# Tencent COS/CDN Deployment

## Local Deploy

Copy the example file and fill in real credentials:

```bash
cp deploy.cos.example.env .env.deploy.local
```

Then deploy:

```bash
npm run deploy:cos
```

The script builds `dist/` and uploads its contents to Tencent COS.

## Required Variables

- `COS_SECRET_ID`
- `COS_SECRET_KEY`
- `COS_BUCKET`, for example `milk-tea-game-1250000000`
- `COS_REGION`, for example `ap-shanghai`
- `COS_PREFIX`, optional. Leave empty when deploying to the bucket root.

## Secret Handling

Do not commit real Tencent credentials.

Use one of these:

- Local deploy: `.env.deploy.local`
- CI deploy: repository secrets or CI environment variables

`.env.deploy.local` is ignored by git through `.env.*`.

## CDN Notes

Recommended cache policy:

- `index.html`: no cache or very short cache
- `assets/*`: long cache
- `audio/*`: long cache

The deploy script sets upload metadata:

- `.m4a`: `audio/mp4`
- `.png`: `image/png`
- `.js`: `text/javascript`
- `.css`: `text/css`

If the CDN serves the app from a subdirectory, set both:

- `COS_PREFIX` in `.env.deploy.local`
- `base` in `vite.config.js`
