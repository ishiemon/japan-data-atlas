// The Economy & Work page. One chart the reader can switch between the
// two series everyone asks about — consumer prices and unemployment —
// plus the indicator cards and the short story behind the numbers.
// main.js wires the switch; this file renders both states.

import { cpiSource, cpiTrend, economyIndicators, economyNotes, unemploymentSource, unemploymentTrend } from './data-economy.js';
import { lineChart } from './charts.js';
import { escapeHtml, signedPercent, sourceLine } from './format.js';
import { indicatorGrid, pageHead } from './views-shared.js';

const SERIES = {
  cpi: {
    title: 'Consumer prices: change from the year before',
    blurb:
      'After two decades in which prices barely moved, the all-items index rose 2.5% in 2022 and 3.2% in 2023 — the fastest rise since 1982 — as energy and food import costs climbed.',
    points: cpiTrend.map((d) => ({ x: d.year, y: d.percent })),
    colour: '#c0392b',
    yMin: -1,
    yMax: 4,
    formatY: (v) => signedPercent(v),
    source: cpiSource,
    years: '2019-2024',
  },
  jobs: {
    title: 'Unemployment rate',
    blurb:
      'The jobless rate stayed in a narrow band through the pandemic and the price shock alike: 2.8% at its 2020-2021 height, 2.5% in 2024, with a record 67.47 million people in work in 2023.',
    points: unemploymentTrend.map((d) => ({ x: d.year, y: d.percent })),
    colour: '#2e7d6b',
    yMin: 0,
    yMax: 4,
    formatY: (v) => `${v.toFixed(1)}%`,
    source: unemploymentSource,
    years: '2019-2024',
  },
};

// dataset is 'cpi' or 'jobs'.
export function economyView(dataset) {
  const s = SERIES[dataset] ?? SERIES.cpi;
  const pressed = (k) => (dataset === k ? ' aria-pressed="true"' : ' aria-pressed="false"');
  const chart = lineChart(s.points, {
    colour: s.colour,
    yMin: s.yMin,
    yMax: s.yMax,
    formatY: s.formatY,
    title: s.title,
  });
  const notes = economyNotes.map((n) => `<li>${escapeHtml(n)}</li>`).join('');
  return `${pageHead('Economy & work', 'Prices, jobs and household spending', 'Two quiet decades of prices ended in 2022. Work, though, never loosened: unemployment stayed under 3% and employment reached a record. The figures below are the annual averages the official releases lead with.')}
${indicatorGrid(economyIndicators)}
<section class="panel">
  <h2>${escapeHtml(s.title)}</h2>
  <p>${escapeHtml(s.blurb)}</p>
  <p class="toggle" role="group" aria-label="Choose the series">
    <button type="button" data-series="cpi"${pressed('cpi')}>Consumer prices</button>
    <button type="button" data-series="jobs"${pressed('jobs')}>Unemployment</button>
  </p>
  ${chart}
  ${sourceLine(s.source, s.years)}
</section>
<section class="panel">
  <h2>The story in short</h2>
  <ul class="milestones">${notes}</ul>
  ${sourceLine('Statistics Bureau, Consumer Price Index and Labour Force Survey; Ministry of Health, Labour and Welfare (minimum wage)', '1999-2024')}
</section>`;
}
