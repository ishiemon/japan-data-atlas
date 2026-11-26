// Building blocks the topic views share: the page heading, the grid of
// headline indicator cards and the chart card with its source line, so
// every page presents a figure the same way — value first, then what it
// means, then who published it and for which year.

import { escapeHtml, sourceLine } from './format.js';

export function pageHead(kicker, title, intro) {
  return `<p class="kicker">${escapeHtml(kicker)}</p>
<h1>${escapeHtml(title)}</h1>
<p class="intro">${escapeHtml(intro)}</p>`;
}

// indicators: [{label, value, detail, source, year}]
export function indicatorGrid(indicators) {
  const cards = indicators
    .map(
      (d) => `<article class="stat-card">
  <p class="stat-label">${escapeHtml(d.label)}</p>
  <p class="stat-value">${escapeHtml(d.value)}</p>
  <p class="stat-detail">${escapeHtml(d.detail)}</p>
  <p class="stat-source">${escapeHtml(d.source)}, ${d.year}</p>
</article>`,
    )
    .join('');
  return `<section class="stat-grid">${cards}</section>`;
}

// A titled panel holding one chart (an SVG string) and its source line.
export function chartCard(title, blurb, chartSvg, source, year) {
  return `<section class="panel">
  <h2>${escapeHtml(title)}</h2>
  <p>${escapeHtml(blurb)}</p>
  ${chartSvg}
  ${sourceLine(source, year)}
</section>`;
}

// A row of links to the topic pages, used at the foot of the home page.
export function topicCards(topics) {
  const cards = topics
    .map(
      (t) => `<a class="topic-card" href="${t.href}">
  <p class="topic-kicker">${escapeHtml(t.kicker)}</p>
  <h3>${escapeHtml(t.title)}</h3>
  <p>${escapeHtml(t.text)}</p>
  <span class="topic-go">Open the section →</span>
</a>`,
    )
    .join('');
  return `<section class="topic-grid">${cards}</section>`;
}
