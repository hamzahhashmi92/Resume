# Hamzah Hashmi · Portfolio website

A static website made of plain HTML, CSS and a little JavaScript. It runs on GitHub Pages or any other static host, and works offline.

## Publish on GitHub Pages

**Option A: address `https://<username>.github.io/`**

1. On GitHub, create a **public** repository named exactly `<username>.github.io` (use your GitHub username).
2. Click **Add file → Upload files** and drag in **everything inside this folder**, including the `assets`, `img` and `work` folders. Click **Commit changes**.
3. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then click **Save**.
4. Wait a minute or two. The site appears at `https://<username>.github.io/`.

**Option B: any repository name**, for example `portfolio`

Follow the same steps. The site appears at `https://<username>.github.io/portfolio/`. All links in the site are relative, so both options work.

## Update the site

- **Text, contact details or links:** edit the page on GitHub (pencil icon) and commit. The home page is `index.html`, and each case study is a page in `work/`. The site updates in a minute.
- **The PDF:** upload a new `Hamzah-Hashmi-Frontend-Portfolio.pdf` with the same name.

## Optional: link previews

To show the dashboard screenshot when the link is shared on LinkedIn or WhatsApp, add these lines inside `<head>` in `index.html`. Replace `SITE` with the real address, ending in `/`. The image `img/og-image.jpg` is already sized for link previews (1200 × 630).

```html
<link rel="canonical" href="SITE">
<meta property="og:url" content="SITE">
<meta property="og:image" content="SITEimg/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
```

## What's inside

| Path | Contents |
|---|---|
| `index.html` | Home page: intro, case-study cards with product filters, about, contact |
| `work/` | One page per case study, with previous/next links (← → keys work too) |
| `assets/site.css`, `assets/site.js` | Styles, the filters, arrow-key navigation and the screenshot viewer |
| `assets/fonts/` | Manrope, Public Sans and Fira Mono, hosted with the site |
| `img/` | Screenshots. `img/thumbs/` holds the card pictures, `img/og-image.jpg` the link-preview image |
| `favicon.svg` | The browser-tab icon |
| `Hamzah-Hashmi-Frontend-Portfolio.pdf` | The downloadable portfolio |
