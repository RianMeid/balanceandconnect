# Balance and Connect Psychology Website

A polished, responsive static website for Tessa van der Meiden’s independent psychology
practice, providing online counselling for expats, international families, teenagers
aged 12+, and adults in English and Dutch.

The site uses plain HTML, CSS, and a small amount of JavaScript. It has no build step,
framework, database, or backend, and is ready to host on GitHub Pages.

## Files

- `index.html` - page content, metadata, structured data, and contact form
- `styles.css` - complete responsive design system and layout
- `script.js` - mobile navigation, subtle reveal effects, active navigation, and Tally embed loading
- `assets/tessa-van-der-meiden.jpeg` - Tessa’s website portrait
- `assets/logo-mark.png` and `assets/logo-lockup.png` - transparent brand assets
- `assets/favicon-48.png`, `apple-touch-icon.png`, `icon-192.png`, and `icon-512.png` - site icons
- `assets/social-preview.png` - 1200 x 630 social sharing image
- `site.webmanifest` - browser and home-screen metadata
- `README.md` - setup and deployment instructions

## Preview locally

You can open `index.html` directly in a browser. For the most accurate preview, run a
small local server from the project folder:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages

1. Create a GitHub repository and add all project files, including the `assets` folder.
2. Push the repository to GitHub.
3. In the GitHub repository, open **Settings > Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select your main branch and the `/ (root)` folder, then click **Save**.
6. GitHub will publish the site at a URL such as
   `https://your-username.github.io/repository-name/`.

Because every asset uses a relative path, the site works both at a custom domain and in
a GitHub Pages project subfolder.

## Connect the contact form

The contact section uses this [Tally](https://tally.so/) form:

```text
https://tally.so/r/yP7v5X
```

The responsive embed is already configured in `index.html`, and Tally’s embed script is
loaded near the end of the page. The direct email link and a no-JavaScript link to Tally
remain available as fallbacks.

If the Tally form changes, replace `yP7v5X` in both the embedded form URL and the
no-JavaScript fallback URL. Configure notifications, consent wording, and submission
handling in the Tally dashboard.

## Replace the placeholders

Search all files for square brackets (`[` and `]`) and update:

- Any future editable content placeholders you add

Also replace:

- `info@balanceandconnect.nl`
- `+31-00-000-0000`
- Footer links for privacy, terms, complaints, and professional registration
- The NIP registration comment in `index.html` once the details are confirmed

Tessa’s portrait is stored at `assets/tessa-van-der-meiden.jpeg`. To replace it, use the
same file name or update the image path, width, and height in `index.html`. Keep the
existing descriptive alt text and compress any replacement photograph for the web.

## Update SEO and social sharing

In the `<head>` of `index.html`, update:

- Page `<title>`
- Meta description
- Canonical URL
- Open Graph title, description, URL, site name, and image
- Twitter title, description, and image

The social image is stored at `assets/social-preview.png`. After connecting the final
domain, its metadata URL should be:

```text
https://www.your-domain.nl/assets/social-preview.png
```

Replace `https://www.your-domain.nl/` in the Open Graph, Twitter, canonical, and
structured-data URLs with the final public domain.

## Brand assets

The website keeps its calm original palette while using the supplied blue logo:

- Logo blue: `#38B6FF`
- Warm off-white: `#F7F3EC`
- Muted sage: `#82968A`
- Terracotta accent: `#BB7159`
- Deep green: `#263E38`

The header and footer use `assets/logo-mark.png`. Favicons and home-screen icons are
linked in `index.html` and `site.webmanifest`. When the logo changes, regenerate these
derived assets together so browser tabs, search results, and social sharing remain
consistent.

Also update the domain, email, and telephone placeholders in the JSON-LD structured data.
The practice name, location, languages, audience, session fee, and psychologist details
already reflect the supplied information. Test the result with Google’s Rich Results Test
after publishing.

## Analytics

There is a commented analytics placeholder near the end of the `<head>`. Add a
privacy-conscious Plausible script or Google Analytics tag there. Check Dutch and EU
privacy requirements before enabling analytics or cookies, and update the privacy
statement and consent setup where needed.

## Add a custom domain

1. Buy or use an existing domain.
2. Open **Settings > Pages** in the GitHub repository.
3. Enter the domain under **Custom domain** and save.
4. At the domain registrar, add the DNS records GitHub provides:
   - For a subdomain such as `www`, add a `CNAME` pointing to
     `your-username.github.io`.
   - For an apex domain, use GitHub's current `A` and `AAAA` records.
5. Wait for DNS to update, then enable **Enforce HTTPS** in GitHub Pages.
6. Replace all `https://www.your-domain.nl/` placeholders in `index.html`.

GitHub may create a `CNAME` file automatically. If it does not, add a file named `CNAME`
containing only the custom domain.

## Before publishing

- Have all professional, registration, insurance, and fee information reviewed.
- Add complete privacy, cookie, complaints, and terms pages suited to the practice.
- Confirm that the crisis information and contact details are appropriate and current.
- Check whether the practice requires an explicit medical disclaimer.
- Test the form, email link, navigation, and page on several screen sizes.
- Run a Lighthouse audit for accessibility, performance, SEO, and best practices.

## Accessibility and performance

The site includes semantic landmarks, a skip link, visible keyboard focus, a titled form
embed, reduced-motion support, responsive layouts, and accessible mobile navigation. The
decorative hero artwork is CSS-only, so it adds no image download. Google Fonts are
optional; remove the font links in `index.html` to use the system font fallbacks only.
