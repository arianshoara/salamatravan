# Salamat Ravan — سلامت روان

A Persian-first educational mental-health web app built with React 19 and Vite. The interface supports Persian, English and German; article and questionnaire bodies currently remain Persian and are labelled accordingly.

## Development

Use Node.js 22 and npm with the committed lockfile.

```sh
cd my-telegram-webapp
npm ci
npm run dev
npm test
npm run lint
npm run build
```

`npm run preview` serves the production output locally. `qa/viewport.html` is a development-only manual viewport harness; it is not included in the production build. Browser QA in managed environments must use that environment's approved preview workflow.

## Structure

- `src/index.css`: authoritative tokens, typography, theme and global defaults.
- `src/components/AppShell.jsx` / `src/App.css`: responsive header, native menu dialog, navigation and content spacing.
- `src/App.jsx`: URL routes and lazy-loaded pages.
- `src/data/{articles,tests,paths,routeComponents}`: content metadata and route mappings.
- `src/components/articles/ArticleLayout.jsx`: shared reading controls, table of contents, progress, bookmarks, sources and related reading.
- `src/components/tests/TestUI.jsx`: shared native radio groups, progress, optional local drafts and validation.
- `src/i18n/ui.js`: shared interface translations; existing translations remain in `src/i18n`.
- `tests/flows.test.jsx`: routing, content, questionnaire and storage regression tests using synthetic answers in jsdom.

## URLs and deployment

Routes include `/`, `/reading`, `/articles/:slug`, `/tests`, `/tests/:slug`, `/tests/specialized`, `/categories`, `/settings`, `/search`, `/profile`, `/messages`, `/cart`, `/authored-books`, `/thanks` and `/login`.

For Netlify, set base directory to `my-telegram-webapp`, build command to `npm run build`, and publish directory to `dist`. `public/_redirects` provides the SPA fallback needed for refresh and direct article links. On another host, configure its equivalent fallback. Configure API routes before the fallback.

This refactor does not deploy or change the separate Python Telegram bot.

## Configuration and accounts

Copy `.env.example` to an ignored local environment file as appropriate. All `VITE_` variables are public, compiled into browser JavaScript; never put client secrets or database credentials in them.

- `VITE_GOOGLE_CLIENT_ID`: public OAuth client ID.
- `VITE_AUTH_ENDPOINT`: same-origin backend endpoint, such as `/api/google-login`.
- `VITE_CRISIS_RESOURCES`: optional JSON object keyed by `fa`, `en` or `de`, containing arrays of `{ "label": "service and country", "url": "https://..." }`. Only add reviewed resources and explicitly name their country/coverage. Language does not establish the user's location. The safety notice retains general emergency guidance when this is empty.

The repository has no working Google token-verification/session backend. The frontend provides disabled/unconfigured, loading, failure and response states; it does not establish verified account functionality by itself. A backend must validate the Google token, audience and issuer, establish a secure session and implement account endpoints. Authentication must be tested on the actual configured origin before release.

The existing cart is a local prototype; checkout reports that payment is not connected. Profile fields are stored on the device and are not a verified Google profile.

## Storage and content boundaries

Preferences, article bookmarks and profile data use browser localStorage. Questionnaire answers stay in memory by default. Each questionnaire has explicit consent for a local persistent draft; disabling it removes that draft. No questionnaire response is sent to a server by this app. Drafts on shared devices can be read by others with access to that browser. Other scripts on the same origin have the same storage access.

Questionnaire arithmetic and question content were retained. Completion validation now requires every question. Raw percentages are proportions of the questionnaire maximum, not probabilities of illness. The questions, translations, cutoffs and explanatory copy still need professional review; several questionnaires are custom/adapted and must not be advertised as validated instruments. Article sources and review dates remain visibly unverified instead of being invented.

See [the audit](../docs/frontend-audit.md) and [verification report](../docs/frontend-verification.md) for acceptance evidence and remaining release checks.
