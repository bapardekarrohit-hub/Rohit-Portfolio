# Rohit Bapardekar — Portfolio (no login)

Animated portfolio on **Vercel**. There is **no login and no admin page**.

- Your projects and certificates live in one file: `data.js`
- Certificates are clickable and open a viewer (PDF or image) plus an optional "Verify credential" link
- The contact form saves messages to Supabase (optional). Visitors can only send, never read.

## Folder structure

```
portfolio/
├── index.html, style.css, script.js   site + animations
├── app.js          renders data.js, certificate viewer, contact form
├── data.js         <-- EDIT THIS to add projects / certificates
├── config.js       Supabase URL + key (contact form only)
├── supabase/schema.sql   messages table (only if you want the form saved)
└── assets/
    ├── photo.jpg, resume.pdf
    └── certificates/   <-- put certificate PDFs / images here
```

## Certificate categories (slots)
The Certificates section has filter tabs: **Job Simulations, Internships, Certifications, Workshops**.
Each block in `certificates` inside `data.js` is one slot. Set `category` to exactly one of those four names and the card appears under that tab automatically. The counts update by themselves.

## Colors
Palette: Black, Cobalt Blue Deep `#2C3480`, White. To tweak, edit the variables at the top of `style.css` (`--cobalt`, `--cobalt-hi`, `--cobalt-lo`, `--tint`).

## Extras in this version
- Your full name: top menu, hero (big ROHIT + SANJAY BAPARDEKAR, faint BAPARDEKAR behind), page title and About.
- Animated network of dots in the hero that reacts to the mouse, letter-by-letter name reveal, scrolling skills banner, "Open to roles in" chips, cards that glow under the cursor, a timeline that draws itself as you scroll, and a back-to-top button. All animations switch off automatically for people who turned off motion on their device.

## Your certificates are already included
All 11 certificate PDFs are in `assets/certificates/` and already linked in `data.js` (2 Job Simulations, 2 Internships, 4 Certifications, 3 Workshops). On PC the certificate opens inside a viewer; on phones it opens with an "Open certificate" button, because many phones can't show PDFs inside a page.
Tip: `internship-offer-letter.pdf` is your InAmigos offer letter. If you'd rather not show it publicly, delete its block from `data.js` (and the file).

## Same look on PC and phone
The hero section scales as one piece, so phones show the same design as the PC, just smaller. The top menu turns into a hamburger button on phones; everything else is the same.

## Add a certificate file (clickable)
1. Copy the PDF/image into `assets/certificates/` (e.g. `jpmorgan.pdf`; avoid spaces in names).
2. In `data.js`, set `file_url: "assets/certificates/jpmorgan.pdf"` and optionally `credential_url: "https://..."`.
3. Save, then push (below). Clicking the card now opens the certificate.

## Add a project
In `data.js`, copy a project block inside `projects: [ ... ]`, put a comma between blocks, and fill in title, description, tech, live_url, github_url.

## Publish changes
```
git add .
git commit -m "update portfolio"
git push
```
Vercel redeploys in about 30 seconds. No Git? On github.com open your repo, **Add file → Upload files**, drop the changed files, **Commit changes**.

## Reading contact messages
Supabase dashboard → **Table Editor → messages**. (If you haven't created the table, run `supabase/schema.sql` once in the SQL Editor. If you already ran the earlier bigger schema, nothing more is needed.)
If you skip Supabase entirely, leave `config.js` values empty and the form opens the visitor's email app instead.

## Cleanup in Supabase (optional)
- Authentication → Users: you can delete your admin user.
- The old `projects` and `certificates` tables are no longer used; you can delete them in Table Editor.

## Troubleshooting
- Form says "Could not send": check `config.js` (URL must end at `.supabase.co`) and that the `messages` table exists.
- Certificate shows "file will be added soon": `file_url` is empty or the path doesn't match the file name exactly (case matters).
- Changes not visible online: you forgot `git push`; hard refresh with Ctrl+Shift+R.
