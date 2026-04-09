# Bathroom Remodel Cost Calculator (DFW)

A modern, mobile-friendly landing page with a multi-step bathroom remodel calculator and lead capture flow.

## Features

- Hero headline: **"What Will Your Bathroom Remodel Cost in DFW?"**
- Multi-step form for:
  - Bathroom type
  - Project level
  - Layout changes
  - Scope
  - Finish level
  - Timeline
  - Budget
- Lead capture step (name, email, phone) before results
- Pricing logic anchored to:
  - Cosmetic: `$8k–$15k`
  - Standard: `$15k–$25k`
  - Full: `$25k–$45k+`
- Results section with explanation and CTA button:
  - **"Book Your Free Walkthrough"**

## Local Development

No build tools are required.

1. Clone the repo.
2. Open `index.html` directly in a browser, **or** run a simple local server:

```bash
python3 -m http.server 8080
```

Then open: `http://localhost:8080`

## Deployment Instructions

Because this is a static site (HTML/CSS/JS), deploy on any static host.

### Option 1: Netlify (drag-and-drop)

1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag the project folder containing `index.html`, `styles.css`, and `script.js`.
3. Netlify will generate a live URL.

### Option 2: Vercel

1. Push this project to a Git provider (GitHub/GitLab/Bitbucket).
2. In Vercel, click **Add New Project**.
3. Import the repository.
4. Framework preset: **Other** / static site.
5. Build command: leave empty.
6. Output directory: leave empty (root).
7. Deploy.

### Option 3: GitHub Pages

1. Push files to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose:
   - Source: **Deploy from a branch**
   - Branch: `main` (or your default), folder `/ (root)`
4. Save and wait for the Pages URL.

## File Structure

- `index.html` — layout, multi-step form, and results area
- `styles.css` — modern responsive styling
- `script.js` — step navigation, validation, pricing logic, and results rendering
