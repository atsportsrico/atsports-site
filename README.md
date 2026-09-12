# A&T Sports Website Refresh — Base Concept

This is a standalone HTML/CSS/JS concept for the A&T Sports Inc. homepage redesign.

## Open it
Double-click `index.html`, or serve the folder with any local static server.

## Easy brand color changes
At the top of `styles.css`, update:
- `--brand`
- `--brand-2`
- `--ink`
- `--paper`

## Current content state
- Team information is intentionally placeholder-only.
- Schedule items are intentionally placeholder-only.
- News cards are intentionally placeholder-only.
- Impact metrics are placeholders except the initial three-team structure shown on the current site.
- Navigation links are shells and can be wired to real pages later.

## Next pass
1. Insert exact A&T logo assets / exact brand hex colors.
2. Replace team placeholders with current team names, cities, leagues, logos, rosters, and photography.
3. Add real schedule and ticket links.
4. Fill interior navigation pages only after homepage direction is approved.


## V2 brand update
This version uses the supplied A&T Sports Inc. shield logo and a logo-derived palette: electric royal blue, warm orange/gold, deep navy, and a supporting teal/green accent.

## V3 layout polish
- Straightened and vertically centered the moving hero ticker.
- Rebalanced the "More Than a Scoreboard" three-column layout so the headline no longer wraps awkwardly.
- Increased line spacing and separation in the "One Organization / Multiple Identities" headline.
- Added responsive spacing refinements for tablet and mobile.


## V4 update
- Added Circle City Pythons to Team Slot 01.
- Location: Dothan, Alabama.
- League intentionally left as TBD until confirmed.
- Added full-crest image treatment so circular team logos are not cropped.


V18: PBA page render fix. PBA content no longer depends on reveal animation JavaScript and displays by default.


## V19 navigation update
- Teams is now a dropdown with separate ABA Teams and PBA Teams destinations.
- ABA Teams routes to the homepage ABA section.
- PBA Teams routes to the dedicated PBA page.
- Dropdown works on desktop and mobile.

## Deployment refresh
- Removed the old Team Roster navigation links from the current site files.
- Refreshed the `main` branch so GitHub Pages can publish the corrected navigation.
