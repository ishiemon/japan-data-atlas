// The Land & Regions page: the physical country behind the population
// figures, a chart of the density gap between the most and least
// crowded prefectures, and a Sources section that names every
// publisher the site draws on, so a reader can check any figure at
// its origin.

import { allPrefectures, landFacts, prefectureDensity, prefecturesSource } from './data-prefectures.js';
import { barChart } from './charts.js';
import { escapeHtml, sourceLine } from './format.js';
import { indicatorGrid, pageHead } from './views-shared.js';

const publishers = [
  {
    name: 'Statistics Bureau of Japan (Ministry of Internal Affairs and Communications)',
    covers: 'The Population Census and Population Estimates, the Labour Force Survey, the Consumer Price Index and the Family Income and Expenditure Survey — most of the figures on this site.',
  },
  {
    name: 'Ministry of Health, Labour and Welfare',
    covers: 'The Vital Statistics (births, deaths, marriages, fertility), the Abridged Life Tables behind life expectancy, and the national minimum wage.',
  },
  {
    name: 'Geospatial Information Authority of Japan',
    covers: 'The national land area, the island count and the elevation of Mount Fuji, from its national survey of area by prefecture and municipality.',
  },
  {
    name: 'Forestry Agency',
    covers: 'Forest area and cover, from the Annual Report on Forest and Forestry.',
  },
];

function densityPanel() {
  const top = [...allPrefectures]
    .sort((a, b) => prefectureDensity(b) - prefectureDensity(a))
    .slice(0, 8)
    .map((p) => ({ label: p.name, value: Math.round(prefectureDensity(p)) }));
  const chart = barChart(top, {
    colour: '#35648f',
    format: (v) => Math.round(v).toLocaleString('en-US'),
    title: 'Population density of the eight most crowded prefectures, 2020 (people per km²)',
  });
  return `<section class="panel">
  <h2>The density gap: the eight most crowded prefectures</h2>
  <p>People per km² at the 2020 census. Tokyo packs in about 100 times as many people per square kilometre as Hokkaido (63 per km²), the emptiest prefecture — and the national average of 334 per km² describes almost nowhere a visitor actually stands.</p>
  ${chart}
  ${sourceLine(prefecturesSource)}
</section>`;
}

export function landView() {
  const rows = publishers
    .map((p) => `<li><strong>${escapeHtml(p.name)}</strong> — ${escapeHtml(p.covers)}</li>`)
    .join('');
  return `${pageHead('Land & regions', 'The land the figures describe', 'An archipelago of 14,125 islands running 3,000 km from Hokkaido to Okinawa: mountainous, forested, and crowded onto the flat land along its coasts.')}
${indicatorGrid(landFacts)}
<section class="panel">
  <h2>Two Japans: the land and the people</h2>
  <p>Hokkaido, the northern island, is one prefecture with 22% of the land and 4.1% of the people — about 63 people per km². Tokyo, at the other end of the scale, packs 14.0 million people into 2,194 km², about 6,400 per km², and the greater Kantō region around it holds more than a third of the whole country. Most of the land in between is mountain and forest: about 67% of Japan is wooded, and the flat, buildable plains are a small share of the map, which is why the density a visitor feels in a Japanese city is so much higher than the national average of 334 per km² suggests.</p>
  <p>That split shapes every other page of this site: the prefecture table on the Population page, the household figures on the Economy page and the ageing of rural prefectures — Shimane and Kochi among the smallest — on the Society page.</p>
  ${sourceLine('Statistics Bureau, Population Census 2020; Geospatial Information Authority of Japan, 2020; Forestry Agency, 2023')}
</section>
${densityPanel()}
<section class="panel" id="sources">
  <h2>Sources: who publishes what</h2>
  <p>Every figure on this site comes from an official Japanese release, named beside the figure with its year. The publishers are:</p>
  <ul class="milestones">${rows}</ul>
  <p>Figures are the final or latest official values the publishers had released when this site was made in November 2026. Where a number is an estimate rather than a count, the page says so.</p>
</section>`;
}
