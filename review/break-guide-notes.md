# Highest-break visual guide

The existing scorer ends each visit on Submit. Existing history stores visit totals but not individual ball sequences, so past sequences cannot be inferred. The new isolated script captures pending ball icons before Submit and associates them with the actual saved pots record after the original action finishes. It writes only `snookerBreakVisualsV1`, keyed by frame start and exact history records. Original script bodies and `snookerBoardV1`/`snookerLogs` schemas remain untouched.

The guide matches the existing displayed high-break total to a recorded potting sequence. It follows the scorer's existing undo/redo outcome without correcting that logic. Fouls never create a guide. Free balls have a dashed outline. Old or unavailable sequences display an explanation. Equal high breaks retain the earlier known sequence. New frames clear the companion records; refreshing preserves them. Sequences longer than the panel scroll horizontally within the small guide instead of expanding the page.

Edit `break-guide.js`/`break-guide.css` and run `node review/update-break-guide.cjs`. `verify-break-guide.cjs` covers guide lifecycle, undo/redo, free balls, fouls, old records and fit at 960×540 with both guides and five expanded head-to-head results across all six skins. `verify-guide-regression.cjs` compares original script bodies and exercises scoring/results controls against main. Existing results-row `match is not defined` error remains unchanged.

On the shortest viewports the score header becomes slightly denser when a guide is visible, to keep every control on screen. This feature is saved on its own preview branch; no deployment is performed without user approval.
