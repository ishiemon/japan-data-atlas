// The Population page: the census story in full. A line of the counts
// since 1920, the age structure, and the prefecture table — the twelve
// largest and five smallest prefectures of the 2020 census — which the
// reader can search and sort with the controls above it. main.js wires
// those controls; this file renders the page and the table rows.

import { ageGroups, ageGroupsSource, censusTrend, censusTrendSource } from './data-overview.js';
import { largestPrefectures, prefectureCensusTotal, prefecturesSource, smallestPrefectures } from './data-prefectures.js';
import { lineChart, shareBar } from './charts.js';
import { escapeHtml, inMillions, sharePercent, sourceLine, withCommas } from './format.js';
import { chartCard, pageHead } from './views-shared.js';

// Every prefecture this page lists, tagged with the table it came from.
export const listedPrefectures = [
  ...largestPrefectures.map((p) => ({ ...p, group: 'largest' })),
  ...smallestPrefectures.map((p) => ({ ...p, group: 'smallest' })),
];

export function prefectureRows(rows) {
  if (rows.length === 0) {
    return `<tr><td colspan="5">No prefecture in this list matches that search.</td></tr>`;
  }
  return rows
    .map(
      (p) => `<tr>
  <td>${escapeHtml(p.name)}</td>
  <td>${escapeHtml(p.region)}</td>
  <td>${p.group === 'largest' ? '12 largest' : '5 smallest'}</td>
  <td class="num">${withCommas(p.population)}</td>
  <td class="num">${sharePercent(p.population, prefectureCensusTotal)}</td>
</tr>`,
    )
    .join('');
}

function agePanel() {
  const legend = ageGroups
    .map((g) => `<li><span class="swatch" style="background:${g.colour}"></span>${escapeHtml(g.label)} — ${inMillions(g.count)} people</li>`)
    .join('');
  return `<section class="panel">
  <h2>The age structure, 2020</h2>
  <p>About one person in eight is under 15 (11.9%); more than one in four is 65 or over (28.6%). In 1970 the same census found 23.9% under 15 and only 7.1% aged 65 or over — the pyramid has turned upside down in fifty years.</p>
  ${shareBar(ageGroups, {})}
  <ul class="legend">${legend}</ul>
  ${sourceLine(ageGroupsSource)}
</section>`;
}

export function populationView() {
  const trend = lineChart(
    censusTrend.map((d) => ({ x: d.year, y: d.millions })),
    { colour: '#1f4e79', yMin: 40, yMax: 140, formatY: (v) => `${Math.round(v)}m` },
  );
  return `${pageHead('Population', 'The people of Japan', 'A population that rose for ninety years, peaked at about 128 million around 2008-2010, and now falls by several hundred thousand a year — the counts behind the headlines, from the census and the monthly estimates.')}
${chartCard('Total population at each census, 1920-2020 (millions)', 'The first modern census in 1920 counted 56.0 million. Growth slowed after 1970, stopped after 2000, and the 2020 census counted 2 million fewer people than 2010.', trend, censusTrendSource)}
${agePanel()}
<section class="panel">
  <h2>Prefectures: the largest and the smallest</h2>
  <p>Japan has 47 prefectures. This table lists the twelve most populous and the five least populous at the 2020 census — Tokyo, the largest, holds about four times as many people as the five smallest combined. Search by name or region, or re-sort the table:</p>
  <p class="controls">
    <label>Search <input type="search" id="pref-search" placeholder="e.g. Tokyo, Kansai"></label>
    <label>Sort by
      <select id="pref-sort">
        <option value="population-desc">Population, largest first</option>
        <option value="population-asc">Population, smallest first</option>
        <option value="name">Name, A to Z</option>
      </select>
    </label>
  </p>
  <table>
    <thead><tr><th>Prefecture</th><th>Region</th><th>In this list</th><th class="num">Population</th><th class="num">Share of Japan</th></tr></thead>
    <tbody id="pref-body">${prefectureRows(listedPrefectures)}</tbody>
  </table>
  ${sourceLine(prefecturesSource)}
</section>
<section class="panel">
  <h2>How the count is made</h2>
  <p>The Population Census, run by the Statistics Bureau every five years since 1920, counts everyone who usually lives in Japan on 1 October of the census year. Between censuses, the Bureau's Population Estimates carry the count forward month by month from births, deaths and border crossings — the source of the 123.80 million headline figure for October 2024.</p>
</section>`;
}
