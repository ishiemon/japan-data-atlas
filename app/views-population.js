// The Population page: the census story in full. The counts since
// 1920 beside a tile map of all 47 prefectures shaded by density, the
// age structure of 2020 with its history since 1950, and the full
// prefecture table — every one of the 47 — which the reader can
// search, filter by region and sort with the controls above it.
// main.js wires those controls and the map tiles; this file renders
// the page, the map detail line and the table rows.

import { ageGroups, ageGroupsSource, ageShareHistory, ageShareHistorySource, censusTrend, censusTrendSource } from './data-overview.js';
import { allPrefectures, prefectureCensusTotal, prefectureDensity, prefectureRegions, prefecturesSource } from './data-prefectures.js';
import { japanTileMap, lineChart, shareBar, stackedShare } from './charts.js';
import { escapeHtml, inMillions, sharePercent, sourceLine, withCommas } from './format.js';
import { chartCard, pageHead } from './views-shared.js';

// Every prefecture, in the census order the table opens with.
export const listedPrefectures = allPrefectures;

export function prefectureDetail(p) {
  return `${p.name} (${p.region}) — population ${withCommas(p.population)} (${sharePercent(p.population, prefectureCensusTotal)} of Japan), ` +
    `area ${withCommas(Math.round(p.areaKm2))} km², density ${withCommas(Math.round(prefectureDensity(p)))} people per km².`;
}

export function prefectureRows(rows) {
  if (rows.length === 0) {
    return `<tr><td colspan="5">No prefecture matches that search.</td></tr>`;
  }
  return rows
    .map(
      (p) => `<tr>
  <td>${escapeHtml(p.name)}</td>
  <td>${escapeHtml(p.region)}</td>
  <td class="num">${withCommas(p.population)}</td>
  <td class="num">${sharePercent(p.population, prefectureCensusTotal)}</td>
  <td class="num">${withCommas(Math.round(prefectureDensity(p)))}</td>
</tr>`,
    )
    .join('');
}

function tileMapPanel() {
  const tiles = allPrefectures.map((p) => ({ ...p, density: prefectureDensity(p) }));
  const legend = [
    ['#d7e5f2', 'under 100'],
    ['#a9c6e2', '100-200'],
    ['#6f9cc4', '200-400'],
    ['#35648f', '400-1,000'],
    ['#143350', 'over 1,000'],
  ]
    .map(([fill, label]) => `<li><span class="swatch" style="background:${fill}"></span>${label} people per km²</li>`)
    .join('');
  const tokyo = allPrefectures.find((p) => p.name === 'Tokyo');
  return `<section class="panel">
  <h2>Every prefecture at a glance</h2>
  <p>One square per prefecture, roughly where it lies, shaded by crowding. Pick a square for its figures.</p>
  ${japanTileMap(tiles, { title: 'Tile map of the 47 prefectures by population density, 2020 census' })}
  <ul class="legend">${legend}</ul>
  <p class="tile-detail" id="tile-detail">${escapeHtml(prefectureDetail(tokyo))}</p>
  ${sourceLine(prefecturesSource)}
</section>`;
}

function agePanel() {
  const legend = ageGroups
    .map((g) => `<li><span class="swatch" style="background:${g.colour}"></span>${escapeHtml(g.label)} — ${inMillions(g.count)} people</li>`)
    .join('');
  const history = stackedShare(
    ageShareHistory.map((d) => ({
      label: String(d.year),
      parts: [
        { label: 'Aged 0-14', value: d.young, colour: '#2e7d6b' },
        { label: 'Aged 15-64', value: d.working, colour: '#1f4e79' },
        { label: 'Aged 65 and over', value: d.old, colour: '#c0392b' },
      ],
    })),
    { title: 'Shares of the three age groups at each census, 1950-2020 (percent)' },
  );
  return `<section class="panel">
  <h2>The age structure, 2020 — and how it flipped</h2>
  <p>About one person in eight is under 15 (11.9%); more than one in four is 65 or over (28.6%). In 1970 the same census found 24.0% under 15 and only 7.1% aged 65 or over — the pyramid has turned upside down in fifty years.</p>
  ${shareBar(ageGroups, { title: 'Age structure of the 2020 census' })}
  <ul class="legend">${legend}</ul>
  ${sourceLine(ageGroupsSource)}
  <p>The same three groups at every census since 1950 — watch the red band grow:</p>
  ${history}
  ${sourceLine(ageShareHistorySource)}
</section>`;
}

export function populationView() {
  const trend = lineChart(
    censusTrend.map((d) => ({ x: d.year, y: d.millions })),
    { colour: '#1f4e79', yMin: 40, yMax: 140, formatY: (v) => `${Math.round(v)}m`, title: 'Total population at each census, 1920-2020 (millions)' },
  );
  const regionOptions = ['All regions', ...prefectureRegions]
    .map((r) => `<option value="${r === 'All regions' ? 'all' : escapeHtml(r)}">${escapeHtml(r)}</option>`)
    .join('');
  return `${pageHead('Population', 'The people of Japan', 'A population that rose for ninety years, peaked at about 128 million around 2008-2010, and now falls by several hundred thousand a year.')}
<div class="duo duo-pop">
${chartCard('Total population at each census, 1920-2020 (millions)', 'The first modern census in 1920 counted 56.0 million; the 2020 census counted 2 million fewer people than 2010.', trend, censusTrendSource)}
${tileMapPanel()}
</div>
<section class="panel">
  <h2>All 47 prefectures</h2>
  <p>Every prefecture at the 2020 census, from Tokyo's 14.0 million to Tottori's 553 thousand. Search by name or region, filter by region, or re-sort the table:</p>
  <p class="controls">
    <label>Search <input type="search" id="pref-search" placeholder="e.g. Tokyo, Kansai"></label>
    <label>Region
      <select id="pref-region">${regionOptions}</select>
    </label>
    <label>Sort by
      <select id="pref-sort">
        <option value="population-desc">Population, largest first</option>
        <option value="population-asc">Population, smallest first</option>
        <option value="name">Name, A to Z</option>
      </select>
    </label>
  </p>
  <table>
    <thead><tr><th>Prefecture</th><th>Region</th><th class="num">Population</th><th class="num">Share of Japan</th><th class="num">People per km²</th></tr></thead>
    <tbody id="pref-body">${prefectureRows(listedPrefectures)}</tbody>
  </table>
  ${sourceLine(prefecturesSource)}
</section>
${agePanel()}
<section class="panel">
  <h2>How the count is made</h2>
  <p>The Population Census, run by the Statistics Bureau every five years since 1920, counts everyone who usually lives in Japan on 1 October of the census year. Between censuses, the Bureau's Population Estimates carry the count forward month by month from births, deaths and border crossings — the source of the 123.80 million headline figure for October 2024.</p>
  ${sourceLine('Statistics Bureau, Population Census and Population Estimates', '1920-2024')}
</section>`;
}
