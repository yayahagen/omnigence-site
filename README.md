# Omnigence — Landing Page (Next.js + Tailwind + Framer Motion)

A clean, minimal landing page with an AI vibe (space gray + cyan/green accents), using your provided logo.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

### Page looks “broken” (no colors, huge icons, Times New Roman)

That means **Tailwind/CSS isn’t loading** — the HTML is there, but `/_next/static/css/...` didn’t apply. Try:

1. **Use the dev server** — Run `npm run dev` from the **project root** (`omnigence/`) and open **http://localhost:3000** (not a `file://` path, not a random folder).
2. **Hard refresh** — `Cmd+Shift+R` (Mac) or clear cache for localhost.
3. **Reset the Next cache** — Stop the server, then:
   ```bash
   rm -rf .next && npm run dev
   ```
4. **Check the Network tab** (DevTools → Network → filter “CSS”) — if `53498e....css` (or similar) is **red/404**, the URL or server is wrong (wrong port, or opening built files without `next start`).
5. **Disable extensions** temporarily (ad blockers sometimes block `/_next/` assets).
6. **Production** — After `npm run build`, run `npm start` from the same machine; don’t open `index.html` from disk.

Your repo already has `import "./globals.css"` in `app/layout.js` — no change needed there if CSS loads.

## Deploy to Vercel

1) Push this folder to GitHub  
2) Import the repo in Vercel  
3) Build command: `npm run build`  
4) Output: Next.js (auto-detected)

## Update content

- Main page: `app/page.js`
- Global styles: `app/globals.css`
- Logo (Figma: [Omnigence](https://www.figma.com/design/D6cexhnQMGQwHbb7DJHt8Z/Omnigence) · node `297:108`):
  - Component: `app/components/OmnigenceLogo.js` (inline SVG)
  - Static copy: `public/omnigence-logo.svg`
  - To match Figma **exactly**: in Figma, select frame `297:108` → **Copy as SVG**, then paste into `OmnigenceLogo.js` (and `omnigence-logo.svg`) or export **PNG @2x** to `public/omnigence-logo.png` and switch the component to use `<Image src="/omnigence-logo.png" … />` again.
