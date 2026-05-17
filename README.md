# Meeting invite for Roody

A baby-blue floral invite page. When she types **accept**, you can get notified by email or Discord.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Dashboard — see what she writes

Open **http://localhost:3000/dashboard** (after you set a password).

1. Create `.env.local`:

```bash
DASHBOARD_PASSWORD=your-secret-password
```

2. Restart `npm run dev`
3. Open `/dashboard`, enter your password
4. Every time she types something and taps **Send your reply**, it appears in the list

Replies are saved in `data/replies.json` on your computer.

## Email / Discord (optional)

### Option 1 — Email (easiest)

1. Go to [web3forms.com](https://web3forms.com) and sign up (free).
2. Add **your email** — that is where replies arrive.
3. Copy your **Access Key**.
4. Create a file `.env.local` in the project root:

```bash
WEB3FORMS_ACCESS_KEY=paste_your_key_here
```

5. Restart the dev server (`npm run dev`), or add the same variable in **Vercel → Project → Settings → Environment Variables** when you deploy.

When Roody types `accept` and taps the button, you get an **email** like:

> Roody accepted your meeting invite.  
> Reply typed: accept  
> Time: …

You can also see submissions on the Web3Forms dashboard.

### Option 2 — Discord (instant ping)

1. In Discord: Server → Channel → **Integrations** → **Webhooks** → New Webhook.
2. Copy the webhook URL.
3. Add to `.env.local`:

```bash
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

You can use **both** email and Discord together.

## Deploy to Vercel

1. Push to GitHub and import on [Vercel](https://vercel.com).
2. Add `WEB3FORMS_ACCESS_KEY` (and optional `DISCORD_WEBHOOK_URL`) in environment variables.
3. Redeploy.

```bash
npx vercel
```

## Customize text

Edit `src/lib/invite-content.ts` — names, meeting details, messages.

## Customize her name animation

Edit `NAME` in `src/components/invite/name-intro.tsx`.
