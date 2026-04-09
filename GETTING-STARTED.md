# FJS Holding — Getting Started Guide

## Step 1: Download & Unzip the Project

Download the `fjs-holding.zip` file and unzip it wherever you keep your projects:

```bash
cd ~/Projects  # or your preferred directory
unzip fjs-holding.zip
cd fjs-holding
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000` — you should see the homepage. Check all pages work:
- http://localhost:3000/about
- http://localhost:3000/services
- http://localhost:3000/projects
- http://localhost:3000/contact
- http://localhost:3000/privacy-policy
- http://localhost:3000/test-404-page (should show custom 404)

## Step 4: Copy Images from Old Project

Before pushing to GitHub, copy the project images from the old FjsHolding repo:

```bash
# Clone old repo temporarily (if not already cloned)
git clone https://github.com/Nhlanhla30/FjsHolding.git /tmp/fjs-old

# Copy project images
cp /tmp/fjs-old/public/images/bundwall1.jpeg public/images/projects/
cp /tmp/fjs-old/public/images/bundwall2.jpeg public/images/projects/
cp /tmp/fjs-old/public/images/bundwall3.jpeg public/images/projects/
cp /tmp/fjs-old/public/images/bundwall4.jpeg public/images/projects/
cp /tmp/fjs-old/public/images/Rehabilitation1.JPG public/images/projects/
cp /tmp/fjs-old/public/images/Rehabilitation2.JPG public/images/projects/
cp /tmp/fjs-old/public/images/Rehabilitation3.JPG public/images/projects/
cp /tmp/fjs-old/public/images/Rehabilitation4.JPG public/images/projects/

# Copy logo
cp /tmp/fjs-old/public/images/fjslogo.jpeg public/images/

# Copy service images if available
cp /tmp/fjs-old/public/images/fjsservice*.png public/images/services/ 2>/dev/null

# Clean up
rm -rf /tmp/fjs-old
```

**Note:** The image paths in `src/lib/constants.ts` reference `public/images/projects/` and `public/images/services/`. Make sure the filenames match exactly.

## Step 5: Initialize Git & Push

```bash
git init
git add .
git commit -m "feat: complete FJS Holding rebuild with Next.js 15"
git branch -M main

# Create a NEW repo on GitHub called "fjs-holding" (leave it empty, no README)
git remote add origin https://github.com/Nhlanhla30/fjs-holding.git
git push -u origin main

# Create develop branch
git checkout -b develop
git push -u origin develop
```

## Step 6: Deploy to Vercel

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import `Nhlanhla30/fjs-holding`
4. Leave all settings as default — Vercel auto-detects Next.js
5. Click "Deploy"
6. **DO NOT add the custom domain yet** — old site stays live on Render

You'll get a preview URL like `fjs-holding.vercel.app` to test.

## Step 7: Initialize Claude Code

```bash
# Make sure you're in the project directory
cd ~/Projects/fjs-holding

# Start Claude Code
claude

# Claude Code will automatically read the CLAUDE.md file and understand the project context
```

### Example Prompts for Claude Code

**Polish the homepage design:**
```
The homepage looks functional but I want it to feel more premium. Add some 
visual polish — maybe a subtle grid pattern in the hero, refine the spacing, 
and make the service cards more visually interesting on hover. Keep the 
charcoal + amber color scheme.
```

**Add project images properly:**
```
I've added the project images to public/images/projects/. Update the 
Projects page to use Next.js Image component with proper sizes, aspect 
ratios, and loading states. Make the gallery look professional.
```

**Set up Formspree:**
```
I created a Formspree form and my ID is [YOUR_ID]. Update the contact 
page with the correct endpoint and test that it works.
```

**Generate favicons:**
```
Generate a simple favicon for FJS Holding — the letters "FJS" in bold on 
an amber (#f59e07) background. Create favicon.ico, favicon-16x16.png, 
favicon-32x32.png, and apple-touch-icon.png.
```

**Add Vercel Analytics:**
```
Add Vercel Analytics and Vercel Speed Insights to the project. Follow 
the official setup process.
```

**Build error help:**
```
I'm getting this build error when I push: [paste error]. Fix it.
```

## Step 8: Before Going Live Checklist

Before switching the domain from Render to Vercel, verify:

- [ ] All pages load on the Vercel preview URL
- [ ] Contact form works (test with Formspree)
- [ ] All images load correctly
- [ ] Mobile responsive looks good
- [ ] Run `npm run build` with no errors
- [ ] Favicons show in browser tab
- [ ] Client has approved the new design

## Step 9: Domain Migration (When Ready)

1. **In Vercel:** Settings → Domains → Add `fjsholding.co.za` and `www.fjsholding.co.za`
2. **In GoDaddy:** DNS Management for fjsholding.co.za
   - Remove old Render DNS records
   - Add A Record: `@` → `76.76.21.21`
   - Add CNAME: `www` → `cname.vercel-dns.com`
   - Set TTL to 600
3. **Wait** for Vercel to show "Valid Configuration" (2-30 minutes)
4. **Test** the live site at fjsholding.co.za
5. **After 48 hours** of stability → decommission the old Render service
