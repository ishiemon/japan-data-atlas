// Small formatting helpers shared by every view: escaping for values
// that go into HTML, and number formats that read the same everywhere.

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);
}

// 14047594 -> "14,047,594"
export function withCommas(n) {
  return Math.round(n).toLocaleString('en-US');
}

// 0.11137 -> "11.1%" of a total.
export function sharePercent(part, total) {
  return `${((part / total) * 100).toFixed(1)}%`;
}

// 15031602 -> "15.03 million"
export function inMillions(n) {
  return `${(n / 1000000).toFixed(2)} million`;
}

// A signed percent change with one decimal: 3.2 -> "+3.2%", -0.2 -> "−0.2%".
export function signedPercent(v) {
  if (v > 0) return `+${v.toFixed(1)}%`;
  if (v < 0) return `−${Math.abs(v).toFixed(1)}%`;
  return '0.0%';
}

// The attribution line printed under every chart and table, so no figure
// appears without the office that published it and its year.
export function sourceLine(source, year) {
  const when = year ? `, ${year}` : '';
  return `<p class="source">Source: ${escapeHtml(source)}${when}.</p>`;
}
