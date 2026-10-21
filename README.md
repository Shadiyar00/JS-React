# StudyShelf — React Midterm

An individual React SPA for exploring IT learning resources. Built with React 19 and Vite, without a backend or UI framework.

## Run locally

Install Node.js (22 or newer), open this folder in VS Code, then run:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. `npm test` runs query tests. `npm run build` creates `dist/`; `npm run preview` serves the production build.

## Features and rubric mapping

- 120 initial records in `src/data/resources.json`: 8 topics, 3 levels, 3 formats. These are curated study tasks pointing to topic documentation, not 120 independently authored external courses.
- One simulated API: `src/api/resources.js`, with Promises, delay, JSON seed, and localStorage persistence. Browser-local records are not synchronized between visitors.
- List, detail and controlled add form; hash routes support refreshes on static hosts.
- Combined text search, topic/level/format filters, title/duration/date sorting and pagination (9 items).
- Loading, error/retry, empty and saved-success states. Demo error control below the list.
- AbortController cleanup prevents stale read requests from overwriting current results. Hash listener is removed on unmount. Pending form saves persist data, but do not update unmounted form state.
- Stable record IDs as keys; immutable updates; state belongs to Catalog, ResourceDetail, ResourceForm, or the route owner.
- Responsive CSS, labels, keyboard focus and semantic elements. No direct DOM manipulation (the entry point only mounts React).

## Structure

```
src/App.jsx                       route state, header, page composition
src/components/Catalog.jsx        filters, pagination, API effect
src/components/FilterBar.jsx      controlled search and filter inputs
src/components/ResourceCard.jsx   reusable list card and TopicMark
src/components/Pagination.jsx    reusable page controls
src/components/ResourceDetail.jsx detail API effect
src/components/ResourceForm.jsx   form state, validation and async save
src/components/Field.jsx          reusable label and validation wrapper
src/components/StatusPanel.jsx    reusable loading/error/empty display
src/api/resources.js              asynchronous simulated API + storage
src/api/query.js                  pure filtering, sorting, pagination
src/data/                         JSON records and shared options
```

## GitHub and public deployment

Create an empty repository in your GitHub account, then in this folder:

```sh
git init
git add .
git commit -m "Build StudyShelf React SPA"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/studyshelf.git
git push -u origin main
```

If `.git` already exists, copy the project to a clean directory without `.git` before these steps. Never upload node_modules. The `.openai` folder is hosting metadata for the provided Sites deployment and is not required for other hosts.

For Vercel or Netlify: import your GitHub repository, select Vite, build command `npm run build`, output `dist`. No backend or environment variables needed. Hash routing works without rewrite rules. Verify the deployed URL in a private browser window, including detail navigation and form saving. Submit both the GitHub URL and a publicly accessible application URL, and press Turn in before the deadline.

## Defense demo

1. Show 120 resources; search React, combine filters and reset them.
2. Change sorting; switch pages.
3. Open a detail, follow its documentation link, return.
4. Submit an invalid form, fix it, add a record, reload and find it.
5. Search an impossible term for empty state.
6. Enable demo error, show the error, disable it and retry.
7. Explain props, component-local state, stable keys, effect dependencies and cleanup.

See DEFENSE_RU.md for a beginner-friendly explanation. Do not submit before you understand the code and can modify it yourself.
