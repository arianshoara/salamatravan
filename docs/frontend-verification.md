# Frontend refactor — verification and handoff

Baseline: `38d57a8dbfccb814499623b9bfa9085556fdd680` on `main`.
Branch: `improve/mobile-reading-refactor`.

## Delivered

- One authoritative token/theme/font layer, scoped legacy specialized styles, mobile content spacing, logical properties and safe-area support. Header/footer measurements update when their contents resize.
- Shared application shell with labelled navigation, visible focus, native modal menu, skip link, route focus management and real React Router URLs. Netlify SPA fallback included.
- All 15 article pages migrated to a shared 720px reading layout, 16–24px adjustable reading text, semantic headings and lists, section links, progress, bookmarks, sharing and next-article links. Duplicated article CSS removed.
- Searchable article/test catalogs and a calmer home page. Shared interface strings, article/test catalog metadata, profile, cart and message controls support fa/en/de with key-parity regression checks. Persian article and questionnaire bodies are explicitly labelled, with their own language and direction.
- The menu drawer uses the logical inline-start edge: right in Persian RTL, left in English/German LTR. A source-level regression check protects that behavior.
- Shared questionnaire progress, native radio groups, completion validation, optional local drafts, result notices and immediate help guidance for the self-harm response. Optional reviewed crisis-resource links can be configured by interface language without inferring country.
- Existing specialized personality, relationship, long-form emotional-health, addiction-subtype and EQ workflows retained. EQ results use document flow rather than covering the whole app; its stylesheet cannot redefine app-wide colors.
- Corrupt/out-of-range stored answers are rejected and persisted drafts require consent. Editing answers clears stale results. Cart quantities reject invalid input; malformed message records do not crash the messages page.
- Explicit unconfigured authentication and payment states; production diagnostic requests/logs removed from active flows. Missing EQ animation import corrected, unused MongoDB/Tailwind dependencies removed, document metadata and README replaced, and poster path corrected.

## Verification evidence

- `npm test`: **58 passed** in jsdom, using synthetic answers only.
- `npm run lint`: **passed**, zero ESLint errors/warnings.
- `npm run build`: **passed**; route code splitting and production SPA fallback generated.
- `git diff --check`: checked before committing.
- Production CSS variable references checked against emitted declarations and shell-managed variables.

Behavioral coverage includes 13 general routes, all 15 article bodies, shared questionnaire controls, all-answer validation, maximum depression raw score and urgent notice, result invalidation after an edit, optional draft restoration, rejection of invalid stored data, addiction subtype switching, a personality factor with reverse scoring retained, full EQ completion/restart, article search, language/direction changes, translated profile/cart UI, translation key parity and metadata completeness, logical menu placement, dark mode, font settings and menu opening/closing.

jsdom tests verify DOM/React behavior. They do **not** verify visual layout, real browser history, CSS contrast, focus trapping in a real browser, mobile WebViews or device safe areas. The menu test stubs native dialog methods.

## Browser/viewport acceptance

The preceding execution could not open the approved internal preview. Browser QA was stopped at that infrastructure restriction; no alternate browser-control path was used. The screenshot supplied in the conversation is not an after-change verification image.

| Width | Planned checks | Actual result |
| --- | --- | --- |
| 320 / 360 / 390 / 430 px | Mobile text, navigation overlap, overflow, menus, test answers | Not executed in a rendering browser |
| 768 / 1024 / 1440 px | Columns, article width, specialized results, navigation | Not executed in a rendering browser |

Before production merge, use the branch preview to check these widths in light/dark mode, fa/en/de, maximum reading size and 200% browser text scaling. Check populated cart/profile/messages, long titles, article section links, keyboard navigation, sharing cancellation, route refresh, browser back/forward, questionnaire return navigation, denied storage and real iPhone/Android/Telegram safe areas. `my-telegram-webapp/qa/viewport.html` supplies the route/width harness for a supported development preview. Do not treat it as device emulation.

## Decisions and remaining release work

1. **No clinical revalidation was performed.** Numeric scoring and question-to-category mappings were preserved, not endorsed. The depression wording differs from an authenticated instrument; bipolar is custom rather than a verified MDQ. The EQ category grouping, relationship interpretations, and long-form test feedback remain inherited unverified content. No review dates, scientific sources, translations or population comparisons were fabricated. Previously unsupported social-comparison output in EQ was replaced by a raw-score explanation.
2. **Completion behavior intentionally changed:** the long mental-health questionnaire requires all questions instead of enabling completion after ten. This corrects incomplete-result submission without changing scoring arithmetic.
3. **Authentication cannot be certified:** no token-verification/session backend exists here. The Google UI is configuration-gated and rejects off-origin endpoints. Real OAuth/session testing and a verified backend remain deployment work.
4. **Catalog/profile/cart/messages compatibility:** retained local data features remain device-local. The cart has no payment integration. Existing stored messages/results are readable but questionnaire results are not automatically sent to a message/account backend. UI and catalog metadata are translated; professional translation of the Persian article/questionnaire bodies remains separate clinical content work.
5. **Visual verification remains outstanding.** Responsive source work is implemented; no assertion that every viewport or real device passes is made. This is a reviewable frontend branch, not a fully verified production release.
6. **Repository exposure identified in the audit** requires owner review of any real secrets in previously tracked environment/database files. This branch does not use those values or rewrite repository history.

## Delivery status

The release candidate is delivered through GitHub pull request #1 on the named branch. Production publication is performed by merging that reviewed branch into `main`; hosting status remains the authoritative confirmation that the public deployment completed.
