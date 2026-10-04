# Visual themes review

Branch: `codex/visual-themes`. No merge or deployment performed.

## Revised visual direction and head-to-head panel

Non-Classic skins now use CSS resin-ball highlights, spherical shading and cast shadows. Club adds illuminated, textured baize and a recessed ball tray; Broadcast uses blue lighting and a diagonal background. OLED retains black. No image downloads, frameworks or new runtime asset requests are needed.

The requested head-to-head feature is an isolated, read-only script (`data-head-to-head`) displaying the latest five logged frames between the current names, regardless of original player positions. Scores appear in current Player 1 / Player 2 order. It reports wins/draws and individual frame scores, winners and dates. Exact names identify players because existing logs have no player IDs. Identical names display an explanatory empty state. It refreshes on name blur, frame save, page return and storage events. It never writes logs or scoreboard state.

Edit `review/dramatic.css` and `review/head-to-head.js`, then run `node review/update-visuals.cjs` to synchronize their inline blocks. `node review/verify-head-to-head.cjs` tests newest-five selection, reversed sides, draws, exclusion of unrelated players, name changes, unchanged logs, malformed logs and phone width. `club-head-to-head.png` and its phone variant contain synthetic test data for preview, not actual user results.

## Audit

Latest repository commit `6b3dcbf` promotes `snooker3_1.html` to `index.html`. The root index is the current scoreboard entry point. Both backup HTML files are historical; README v2.8 text is stale. The deployed Pages revision could not be independently verified.

`index.html` owns inline scoreboard CSS, scoring/state/history/undo/free-ball/timer JavaScript, modal markup, sounds, winner overlay, fullscreen and wake-lock/orientation code. `results.html` owns inline results styling and history/filter/statistics/export/copy/share code. Existing storage keys are `snookerBoardV1`, `snookerName1`, `snookerName2`, and `snookerLogs`.

`sw.js` is a cache-first worker using `snooker-v8`; manifest and icons exist. Current index does not link the manifest or register the worker. These files and all original script bodies are unchanged.

## Implementation

Original styling is retained. A labelled theme CSS block follows it. Non-Classic overrides are scoped through `html[data-theme]`, using shared custom properties. Native collapsed Appearance menus expose the selector on both pages. The isolated theme script only reads/writes `snookerVisualTheme`; invalid/missing values fall back to Classic, and inaccessible storage does not prevent use.

Theme blocks are inline to avoid adding network/offline dependencies or altering PWA caching. Keep their CSS and preference scripts identical between pages. `build-themes.cjs` records the initial insertion source and refuses duplicate insertion; no build step is required to use the scoreboard. Narrow phone CSS stacks the middle panels and wraps the balls into two rows; original control IDs, actions and desktop layout are retained.

## Verification

Run `node review/verify.cjs` in this environment. Uses bundled Playwright and installed Edge, a temporary loopback HTTP server and isolated browser storage. Checks original functional script bodies for exact equality against main and compares baseline and all themes with a controlled clock.

Exercises all seven ball buttons, Submit, both players, all four foul buttons, Undo/Redo, Free Ball, Clear Pending, reds +/−, player editing, New Game confirm/cancel, End Frame save/cancel, timer/reload, fullscreen, results/back navigation, three result tabs, four date filters, search, all sort options, CSV download, copy/share fallback, clear-logs cancel/confirm and row details. Captures desktop and phone screenshots. Stored scoring states and CSV output match baseline. Browser clipboard/share and fullscreen are exercised in headless Edge; native mobile OS prompts, installed PWA lifecycle and physical touchscreen behaviour require device testing.

Existing issue: clicking a results row raises `ReferenceError: match is not defined` in baseline and all themes. Its detail dialog/Close control cannot be reached through that broken handler. Left unchanged as requested.

Screenshots: `classic.png`, `broadcast.png`, `oled.png`, `club.png`, plus phone/landscape and results variants. No claim of exhaustive scoring-state coverage; exact preservation of original scripts supplements the control comparisons.
