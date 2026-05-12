# poptyping

Political satire that types loud. Built with Astro, Decap CMS, Buttondown.

---

## Setup (one-time, ~20 minutes)

### 1. Push this folder to GitHub

1. Go to **github.com** → click **New repository** (green button, top right)
2. Name it `poptyping` (or whatever you like)
3. Leave it **public** (Netlify free tier needs this; private also works but with limits)
4. Don't initialise it with a README — we already have files
5. Click **Create repository**

Then, on the next screen, GitHub will show you commands. Ignore those — use these instead. From this folder in your terminal:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/poptyping.git
git push -u origin main
```

(Replace `YOUR-USERNAME` with your actual GitHub username.)

### 2. Connect Netlify

1. Go to **netlify.com** → **Sign up** (use your GitHub account)
2. On the dashboard, click **Add new site** → **Import an existing project**
3. Choose **Deploy with GitHub** → authorise Netlify
4. Pick the `poptyping` repo
5. Build settings should auto-detect from `netlify.toml`. Leave defaults. Click **Deploy site**
6. Wait ~60 seconds. Your site is now live at something like `https://random-name-abc123.netlify.app`

### 3. Rename your Netlify site (optional but nice)

1. **Site configuration** → **Change site name**
2. Set it to `poptyping` (so the URL becomes `https://poptyping.netlify.app`)
3. If that's taken, try `poptyping-news` or similar

### 4. Enable Netlify Identity (this powers the CMS login)

1. In your Netlify site dashboard, go to **Integrations** (left sidebar)
2. Search for **Netlify Identity** → enable it
3. Click **Identity** in the left sidebar (it should now appear)
4. Click **Enable Identity**
5. Under **Registration**, set it to **Invite only** (so randoms can't sign up)
6. Click **Invite users** → enter your own email → send
7. Check your email, click the invite link, set a password

### 5. Enable Git Gateway (this lets the CMS save back to GitHub)

1. Still in the **Identity** section, scroll to **Services**
2. Click **Enable Git Gateway**

### 6. Log in to the CMS

1. Visit `https://poptyping.netlify.app/admin/`
2. Click **Login** → use the email + password from step 4
3. You're in. Write an article. Hit publish. The site rebuilds itself in ~30 seconds.

---

## Newsletter setup (Buttondown)

1. Sign up at **buttondown.com** (free up to 100 subscribers)
2. Pick a username — `poptyping` if available
3. In Netlify: **Site configuration** → **Environment variables** → **Add a variable**
4. Key: `PUBLIC_BUTTONDOWN_USERNAME`
5. Value: your Buttondown username (e.g. `poptyping`)
6. Trigger a redeploy: **Deploys** → **Trigger deploy** → **Deploy site**

The subscribe form on the homepage now flows directly to your Buttondown list.

---

## Custom domain (when you're ready)

1. Buy a domain at **Namecheap**, **Porkbun**, or anywhere (~£8-12/year)
2. In Netlify: **Domain management** → **Add a domain you already own** → enter your domain
3. Netlify will give you DNS records. Add them at your registrar.
4. Wait an hour or so for DNS to propagate. Your site is now at `poptyping.com` (or whatever).

---

## Day-to-day workflow

1. Go to `yoursite.com/admin/`
2. Click **New Article**
3. Fill in headline, category, date, optional hero image
4. Write the body in markdown
5. Toggle **Draft** off when ready to publish
6. Hit **Publish**
7. The site rebuilds in ~30 seconds. Done.

---

## Writing tips for this design

- Wrap the punchline word in `<em>...</em>` to make it italic + accent yellow. The headline is the joke.
- Use `## subheads` to break up longer pieces — they fake the structure of a "real" news article.
- Use `> blockquote` for pull-quotes — they get the big italic treatment.
- The first paragraph automatically gets a drop cap, so make the opening line count.

---

## Local development (optional)

If you want to preview changes before pushing:

```bash
npm install
npm run dev
```

Then open `http://localhost:4321`.

---

## File structure

```
src/
  content/articles/   ← your articles (markdown)
  layouts/Base.astro  ← page wrapper (head, masthead, footer)
  components/         ← reusable bits (cards, ticker, newsletter)
  pages/              ← page routes
  styles/global.css   ← all design tokens and component styles
public/
  admin/              ← Decap CMS admin panel
  images/             ← uploaded images go here
netlify.toml          ← Netlify build config
astro.config.mjs      ← Astro config
```
