# [Practice Name] Psychology Website

A polished, responsive static website for a psychology practice supporting expats,
international families, and third-culture children in the Netherlands.

The site uses plain HTML, CSS, and a small amount of JavaScript. It has no build step,
framework, database, or backend, and is ready to host on GitHub Pages.

## Files

- `index.html` - page content, metadata, structured data, and contact form
- `styles.css` - complete responsive design system and layout
- `script.js` - mobile navigation, subtle reveal effects, active navigation, and form validation
- `README.md` - setup and deployment instructions

## Preview locally

You can open `index.html` directly in a browser. For the most accurate preview, run a
small local server from the project folder:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages

1. Create a GitHub repository and add these four files at the repository root.
2. Push the repository to GitHub.
3. In the GitHub repository, open **Settings > Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select your main branch and the `/ (root)` folder, then click **Save**.
6. GitHub will publish the site at a URL such as
   `https://your-username.github.io/repository-name/`.

Because every asset uses a relative path, the site works both at a custom domain and in
a GitHub Pages project subfolder.

## Connect the contact form

The form is prepared for [Formspree](https://formspree.io/):

1. Create a Formspree account and a new form.
2. Copy the form endpoint or form ID.
3. In `index.html`, find:

```html
action="https://formspree.io/f/YOUR_FORM_ID"
```

4. Replace `YOUR_FORM_ID` with the ID provided by Formspree.
5. Submit a test enquiry and confirm the email address in Formspree if requested.

Until a real ID is added, JavaScript prevents accidental submission and points visitors
to the fallback email link.

## Replace the placeholders

Search all files for square brackets (`[` and `]`) and update:

- `[Practice Name]`
- `[Psychologist Name]`
- `[Degree and professional credentials]`
- `[Professional body and registration number]`
- `[Add other languages]`
- `[Street and number]`
- `[Postcode]` and `[City]`
- `[two working days]`

Also replace:

- `hello@your-domain.nl`
- `+31-00-000-0000`
- LinkedIn profile URL
- Fees, insurance arrangements, session format, and cancellation terms
- Footer links for privacy, terms, complaints, and professional registration

To add a portrait, replace the `.portrait-placeholder` block in `index.html` with an
`img` element. Keep meaningful alt text:

```html
<img
  class="professional-portrait"
  src="portrait.jpg"
  alt="[Psychologist Name], psychologist at [Practice Name]"
  width="900"
  height="1200"
>
```

Add styling for the image or reuse the existing placeholder dimensions and border radius.
Compress photographs to WebP or AVIF where practical.

## Update SEO and social sharing

In the `<head>` of `index.html`, update:

- Page `<title>`
- Meta description
- Canonical URL
- Open Graph title, description, URL, site name, and image
- Twitter title, description, and image

The placeholder social image URL is:

```text
https://www.your-domain.nl/social-preview.jpg
```

Create a social preview image around 1200 x 630 pixels and add it to the project root.
Then use its final absolute URL in the metadata.

Also update every placeholder in the JSON-LD structured data, including the practice
name, domain, email, telephone, address, languages, and psychologist details. Test the
result with Google's Rich Results Test after publishing.

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

The site includes semantic landmarks, a skip link, visible keyboard focus, labelled form
controls, reduced-motion support, responsive layouts, and accessible mobile navigation.
The decorative hero artwork is CSS-only, so it adds no image download. Google Fonts are
optional; remove the font links in `index.html` to use the system font fallbacks only.
