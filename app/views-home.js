// The home page: Japan at a glance. The headline indicators up top,
// the century of census counts as a chart a visitor can re-draw as bars,
// the age structure of the 2020 census, the largest prefectures, and
// the doors into the four topic sections.

import { ageGroups, ageGroupsSource, censusTrend, censusTrendSource, headlineIndicators, populationMilestones } from './data-overview.js';
import { largestPrefectures, prefectureCensusTotal, prefecturesSource } from './data-prefectures.js';
import { barChart, lineChart, shareBar } from './charts.js';
import { escapeHtml, inMillions, sharePercent, sourceLine, withCommas } from './format.js';
import { indicatorGrid, topicCards } from './views-shared.js';

export const homeTopics = [
  {
    href: '#/population',
    kicker: 'Population',
    title: 'A country of 123.8 million, and shrinking',
    text: 'Census counts since 1920, the age structure, and the prefectures where people actually live.',
  },
  {
    href: '#/economy',
    kicker: 'Economy & work',
    title: 'Prices woke up; work never slept',
    text: 'Inflation after two quiet decades, a 2.5% unemployment rate and what households spend.',
  },
  {
    href: '#/society',
    kicker: 'People & society',
    title: 'Fewer births, longer lives',
    text: '727,277 births in 2023, a fertility rate of 1.20, and life expectancy among the world’s highest.',
  },
  {
    href: '#/land',
    kicker: 'Land & regions',
    title: '14,125 islands, two-thirds forest',
    text: 'The land itself: area, density, the great Hokkaido share and the crowded Kantō plain.',
  },
];

function trendChart(mode) {
  const points = censusTrend.map((d) => ({ x: d.year, y: d.millions }));
  if (mode === 'bars') {
    return barChart(
      censusTrend.map((d) => ({ label: String(d.year), value: d.millions })),
      { colour: '#1f4e79', format: (v) => `${v.toFixed(1)}` },
    );
  }
  return lineChart(points, {
    colour: '#1f4e79',
    yMin: 40,
    yMax: 140,
    formatY: (v) => `${Math.round(v)}m`,
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
  <p>Three broad age groups of the 126,146,099 people the census counted. The working-age group shrinks every census while the oldest group grows.</p>
  ${shareBar(ageGroups, {})}
  <ul class="legend">${legend}</ul>
  ${sourceLine(ageGroupsSource)}
</section>`;
}

function prefecturePanel() {
  const rows = largestPrefectures
    .slice(0, 5)
    .map(
      (p, i) => `<tr><td>${i + 1}</td><td>${escapeHtml(p.name)}</td><td>${escapeHtml(p.region)}</td><td class="num">${withCommas(p.population)}</td><td class="num">${sharePercent(p.population, prefectureCensusTotal)}</td></tr>`,
    )
    .join('');
  return `<section class="panel">
  <h2>Where people live: the five largest prefectures</h2>
  <p>Tokyo alone holds 11.1% of the country. The full table, with the smallest prefectures and a search box, is on the Population page.</p>
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
</section>`;
}

// mode is 'line' or 'bars', chosen by the toggle on the page; main.js
// re-renders with the new mode and the pressed button stays marked.
export function homeView(mode) {
  const pressed = (m) => (mode === m ? ' aria-pressed="true"' : ' aria-pressed="false"');
  return `<section class="hero">
  <p class="kicker">National statistics of Japan</p>
  <h1>Japan in numbers</h1>
  <p class="intro">The official figures for the country — its people, prices, work and land — gathered from the offices that publish them, with the source and year on every number. No trackers, no network calls: everything on this page ships in its own files.</p>
</section>
${indicatorGrid(headlineIndicators)}
<section class="panel">
  <h2>A century of censuses</h2>
  <p>Japan counted 56.0 million people at its first modern census in 1920, more than doubled that by 1990, peaked around 2010 and has fallen since. Draw it as a line or as bars:</p>
  <p class="toggle" role="group" aria-label="Chart style">
    <button type="button" data-chart-mode="line"${pressed('line')}>Line</button>
    <button type="button" data-chart-mode="bars"${pressed('bars')}>Bars</button>
  </p>
  ${trendChart(mode)}
  ${sourceLine(censusTrendSource)}
</section>
${agePanel()}
${prefecturePanel()}
${milestonesPanel()}
<h2 class="section-title">Explore the sections</h2>
${topicCards(homeTopics)}`;
}
