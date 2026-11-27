// The home page: Japan at a glance. A compact banner, the headline
// indicators as one strip, then the century of census counts beside
// the age structure — chart, toggle and sources all in the first
// screen — then the largest prefectures, the turning points, and the
// doors into the four topic sections.

import { ageGroups, ageGroupsSource, censusTrend, censusTrendSource, headlineIndicators, populationMilestones } from './data-overview.js';
import { largestPrefectures, prefectureCensusTotal, prefecturesSource } from './data-prefectures.js';
import { barChart, lineChart, shareBar } from './charts.js';
import { escapeHtml, inMillions, sharePercent, sourceLine, withCommas } from './format.js';
import { indicatorGrid, topicCards } from './views-shared.js';

export const homeTopics = [
  {
    href: '#/population',
    kicker: 'Population',
    title: 'The people, counted since 1920',
    text: 'Census counts across a century, the age structure, a tile map and a searchable table of all 47 prefectures.',
  },
  {
    href: '#/economy',
    kicker: 'Economy & work',
    title: 'Prices woke up; work never slept',
    text: 'Inflation after two quiet decades, a tight jobs market and what households spend each month.',
  },
  {
    href: '#/society',
    kicker: 'People & society',
    title: 'Fewer births, longer lives',
    text: 'Births and deaths from the vital register, the fertility rate, and life expectancy among the world’s highest.',
  },
  {
    href: '#/land',
    kicker: 'Land & regions',
    title: 'Islands, forests and crowded plains',
    text: 'The land itself: area, islands, forest cover and the density gap between Hokkaido and Tokyo.',
  },
];

function trendChart(mode) {
  const points = censusTrend.map((d) => ({ x: d.year, y: d.millions }));
  if (mode === 'bars') {
    return barChart(
      censusTrend.map((d) => ({ label: String(d.year), value: d.millions })),
      { colour: '#1f4e79', height: 140, format: (v) => `${v.toFixed(1)}`, title: 'Population at each census, 1920-2020 (millions)' },
    );
  }
  return lineChart(points, {
    colour: '#1f4e79',
    height: 140,
    yMin: 40,
    yMax: 140,
    formatY: (v) => `${Math.round(v)}m`,
    title: 'Population at each census, 1920-2020 (millions)',
  });
}

function agePanel() {
  const legend = ageGroups
    .map(
      (g) => `<li><span class="swatch" style="background:${g.colour}"></span>${escapeHtml(g.label)} — ${inMillions(g.count)} people</li>`,
    )
    .join('');
  return `<section class="panel">
  <h2>Who the country is: the 2020 age structure</h2>
  <p>The three broad age groups of the 126,146,099 people counted in 2020.</p>
  ${shareBar(ageGroups, { title: 'Age structure of the 2020 census' })}
  <ul class="legend">${legend}</ul>
  ${sourceLine(ageGroupsSource)}
</section>`;
}

function prefecturePanel() {
  const rows = largestPrefectures
    .map(
      (p, i) => `<tr><td>${i + 1}</td><td>${escapeHtml(p.name)}</td><td>${escapeHtml(p.region)}</td><td class="num">${withCommas(p.population)}</td><td class="num">${sharePercent(p.population, prefectureCensusTotal)}</td></tr>`,
    )
    .join('');
  return `<section class="panel">
  <h2>Where people live: the five largest prefectures</h2>
  <p>Tokyo alone holds 11.1% of the country. The full table of all 47, with a tile map, search and sorting, is on the Population page.</p>
  <table>
    <thead><tr><th>#</th><th>Prefecture</th><th>Region</th><th class="num">Population</th><th class="num">Share</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  ${sourceLine(prefecturesSource)}
  <p><a class="more-link" href="#/population">See all the prefecture figures →</a></p>
</section>`;
}

function milestonesPanel() {
  const items = populationMilestones
    .map((m) => `<li><strong>${escapeHtml(m.year)}</strong> — ${escapeHtml(m.text)}</li>`)
    .join('');
  return `<section class="panel">
  <h2>Turning points</h2>
  <ul class="milestones">${items}</ul>
  ${sourceLine('Statistics Bureau, Population Estimates and Population Census', '2008-2024')}
</section>`;
}

// mode is 'line' or 'bars', chosen by the toggle on the page; main.js
// re-renders with the new mode and the pressed button stays marked.
export function homeView(mode) {
  const pressed = (m) => (mode === m ? ' aria-pressed="true"' : ' aria-pressed="false"');
  return `<section class="hero">
  <p class="kicker">National statistics of Japan</p>
  <h1>Japan in numbers</h1>
  <p class="intro">Japan's official figures: people, prices, work and land.</p>
</section>
${indicatorGrid(headlineIndicators)}
<div class="duo">
<section class="panel">
  <h2>A century of censuses</h2>
  <p>Censuses since 1920: 56.0 million first, a peak around 2010, falling since.</p>
  <p class="toggle" role="group" aria-label="Chart style">
    <button type="button" data-chart-mode="line"${pressed('line')}>Line</button>
    <button type="button" data-chart-mode="bars"${pressed('bars')}>Bars</button>
  </p>
  ${trendChart(mode)}
  ${sourceLine(censusTrendSource)}
</section>
${agePanel()}
</div>
${prefecturePanel()}
${milestonesPanel()}
<h2 class="section-title">Explore the sections</h2>
${topicCards(homeTopics)}`;
}
