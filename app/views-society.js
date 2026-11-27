// The People & Society page: births against deaths as mirrored bars a
// reader can trim to either series, the fertility rate as bars, and
// life expectancy as a table with the long view since 1990.

import { birthsTrend, deathsTrend, fertilitySource, fertilityTrend, lifeExpectancySource, lifeExpectancyTrend, societyIndicators, vitalSource } from './data-society.js';
import { barChart, mirroredBars } from './charts.js';
import { escapeHtml, sourceLine, withCommas } from './format.js';
import { chartCard, indicatorGrid, pageHead } from './views-shared.js';

// show is 'both', 'births' or 'deaths'; main.js re-renders on change.
export function societyView(show) {
  const years = birthsTrend.map((b) => b.year);
  const rows = years.map((year) => {
    const births = birthsTrend.find((b) => b.year === year).count;
    const deathRow = deathsTrend.find((d) => d.year === year);
    return {
      label: String(year),
      left: show === 'deaths' ? 0 : births,
      right: show === 'births' || !deathRow ? 0 : deathRow.count,
    };
  });
  const pressed = (k) => (show === k ? ' aria-pressed="true"' : ' aria-pressed="false"');
  const mirrored = mirroredBars(rows, {
    format: (v) => (v === 0 ? '' : withCommas(v)),
    leftLabel: 'Births',
    rightLabel: 'Deaths',
    title: 'Births against deaths, 2016-2023',
  });
  const fertility = barChart(
    fertilityTrend.map((d) => ({ label: String(d.year), value: d.rate })),
    {
      colour: '#8e44ad',
      format: (v) => v.toFixed(2),
      refLine: { value: 2.07, label: 'Replacement level 2.07' },
      title: 'Total fertility rate, 2015-2023',
    },
  );
  const lifeRows = lifeExpectancyTrend
    .map((d) => `<tr><td>${d.year}</td><td class="num">${d.men.toFixed(2)}</td><td class="num">${d.women.toFixed(2)}</td></tr>`)
    .join('');
  return `${pageHead('People & society', 'Births, deaths and long lives', 'Japan records every birth and death: deaths have outnumbered births since 2007, fertility has fallen to 1.20, and lives are among the longest anywhere.')}
<section class="panel">
  <h2>Births (left, green) against deaths (right, red)</h2>
  <p>Births fell below one million in 2016 and have fallen every year since. Deaths climbed past 1.5 million in 2022. Show both series, or one at a time:</p>
  <p class="toggle" role="group" aria-label="Choose the series">
    <button type="button" data-show="both"${pressed('both')}>Both</button>
    <button type="button" data-show="births"${pressed('births')}>Births only</button>
    <button type="button" data-show="deaths"${pressed('deaths')}>Deaths only</button>
  </p>
  ${mirrored}
  ${sourceLine(vitalSource, '2016-2023')}
</section>
${indicatorGrid(societyIndicators)}
${chartCard('Total fertility rate', 'The average number of children a woman bears over her life. Replacement level is about 2.07; Japan has been below it since 1975, and the 2023 figure of 1.20 is the lowest on record.', fertility, fertilitySource)}
<section class="panel">
  <h2>Life expectancy at birth (years)</h2>
  <p>Lives lengthened by about five years for men and women alike between 1990 and 2020, then dipped slightly through the pandemic years.</p>
  <table>
    <thead><tr><th>Year</th><th class="num">Men</th><th class="num">Women</th></tr></thead>
    <tbody>${lifeRows}</tbody>
  </table>
  ${sourceLine(lifeExpectancySource, '1990-2023')}
</section>`;
}
