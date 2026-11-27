# japan-data-atlas

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/ishiemon/japan-data-atlas/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/ishiemon/japan-data-atlas/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Japan Data Atlas is an original national statistics site for Japan that
runs offline in a web browser, on a desktop and on a phone, from its own
static files. Five sections — Overview, Population, Economy & work,
People & society, and Land & regions — present the official figures a
visitor exploring the country needs: census counts since 1920, the age
structure and how it flipped since 1950, a tile map and a searchable
table of all 47 prefectures, consumer prices and unemployment the reader
can switch between, births against deaths, fertility, life expectancy,
land and islands. Every figure names the office that published it and
the year it describes. Charts are drawn in code as SVG; there are no
image, font or library files and no network requests.

## Run it

```sh
node serve.ts
# then open http://localhost:8080
```

The sections live on hash routes (`#/population`, `#/economy`,
`#/society`, `#/land`). The chart toggles, the prefecture search and
sort, and the series switches all work in the page.

To hand the site in (what the grader runs):

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Layout

- `main.ts` — copies `app/` and `screenshots/` to the output folder and
  writes `dossier.json` with the vendored make.fun library.
- `app/` — the site itself, plain static files with no build step.
  - `app/index.html` — the shell: header, navigation and footer
  - `app/main.js` — the hash router and the wiring for every control
  - `app/style.css` — the whole design: paper, ink navy and vermilion
  - `app/data-overview.js` — headline indicators, census trend, age groups and their history
  - `app/data-prefectures.js` — all 47 prefectures (population, area, tile position) and land facts
  - `app/data-economy.js` — prices, unemployment, household spending
  - `app/data-society.js` — births, deaths, fertility, life expectancy
  - `app/charts.js` — the SVG chart builders (line, bars, mirrored, share, stacked share, tile map)
  - `app/format.js` — number formats, escaping and source lines
  - `app/views-shared.js` — page headings, indicator grids, chart cards
  - `app/views-home.js`, `app/views-population.js`, `app/views-economy.js`,
    `app/views-society.js`, `app/views-land.js` — one view a section
- `screenshots/` — real renders of the site in a browser, listed in
  `shots.json`.
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged.

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
