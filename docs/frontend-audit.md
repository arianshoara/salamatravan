# Frontend audit and incremental plan

Baseline: `38d57a8dbfccb814499623b9bfa9085556fdd680` (main). Scope: the existing React/Vite app in `my-telegram-webapp`; preserve the separate Python Telegram bot. No AGENTS.md or Sites hosting manifest exists in this checkout. Do not migrate hosting or deploy main as part of this change.

## Findings

- App.css is approximately 1,470 lines with repeated global tokens, font faces, app shells and navigation. index.css and global.css introduce conflicting theme defaults. Layout overflow is masked globally.
- Article CSS requires a `.reading-content` ancestor absent from article rendering. Only three article CSS files exist, use identical highly specific selectors, and do not provide a reusable reading layout. Fifteen article components exist but ReadingSection lists only ten in current main; the previously inspected deployment is not identical to current source.
- Article bodies are Persian even when list metadata is translated. Preserve bodies and explicitly label their language; do not invent translations, references or review dates.
- Navigation is in-memory currentView state; browser history, refresh, direct links and the custom back stack are unreliable. Sidebar messages has no corresponding case.
- Some clickable headings/divs have no keyboard semantics. Sidebar focus is not contained and hidden controls can remain focusable. Viewport explicitly disables zoom.
- Tests have independent implementations and globally colliding CSS classes. Several nested test-container wrappers and prototype headings remain. Answers vanish on route changes. No automated test script or ESLint configuration exists.
- PHQ-9 wording/response labels are adapted and need clinical review. The list calls the bipolar questionnaire MDQ, but its implementation actually contains ten custom questions with 0–3 responses, not a documented validated MDQ workflow. Other custom assessment interpretations lack citations. Preserve numerical logic in this UI refactor and label unverified scoring; do not claim diagnostic validity.
- Google callback posts to `/api/google-login`, but no corresponding server handler exists in the tracked tree. The startup Mongo fetch is a diagnostic request with no handler here. No real auth/session implementation may be claimed without backend configuration.
- MongoDB is declared but no frontend import exists. Tailwind is declared without a Vite/PostCSS integration; utility-like article classes are not a reliable styling system.
- Profile/cart/messages use unguarded localStorage reads. Some test results and credentials are logged. Keep sensitive answers off network and out of logs. Persistent answer storage must be explicit and device-local.
- Category HTML comes from repository-authored strings, not user input. Keep that trust boundary; do not connect untrusted HTML to dangerouslySetInnerHTML.
- The document title/favicon/README are Vite defaults. Images have inconsistent sizing; the Shutter Island poster references a JPG but the asset is PNG. The images called placeholders in the earlier review are actual tracked images; retain them.
- Baseline build fails: EQ imports undeclared react-spring and @nivo/radar. Baseline lint fails: ESLint 9 has no config. These are pre-existing issues, not introduced regressions.
- Root-level environment/database files are tracked in the public repository. Their values were not printed or used. Owner should review exposure and rotate any real secrets; this refactor does not rewrite repository history or repurpose credentials.

## Plan and acceptance

1. Establish build/lint baseline; consolidate global tokens and a mobile-first shell; implement accessible real navigation on a separate branch.
2. Centralize article metadata, migrate all 15 article bodies to a shared reading layout, add meaningful metadata controls and a responsive list/home surface.
3. Shared test UI and safety notice; preserve score logic; explicit local draft consent, native radio groups, progress and validation; preserve specialized workflows and report remaining clinical limitations.
4. Verify build, lint, static integrity and responsive/browser smoke tests where supported. Record failures and unavailable checks honestly. No production merge/deploy without approval.

Design: clear Persian editorial typography, restrained emerald accents, neutral surfaces, thin borders, single-column mobile reading, a labelled five-item bottom navigation and a compact header. No new imagery is necessary; reuse existing images where appropriate.

Target widths: 320/360/390/430/768/1024/1440. Check articles, settings, categories, test controls, RTL/LTR, both themes, larger text, direct routes and browser history. Final results are recorded in frontend-verification.md.
