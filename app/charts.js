// Charts drawn as inline SVG from the data files. No library and no
// image files: each builder returns an SVG string the views drop into
// the page, so the charts work offline and stay sharp at any size.
// Every chart carries a <title> and an aria-label, so it still says
// what it shows to a screen reader and in the source outline.

import { escapeHtml } from './format.js';

function svgOpen(width, height, title) {
  const t = title ? escapeHtml(title) : 'Chart';
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${t}" class="chart"><title>${t}</title>`;
}

// A line chart over year/value points, with labelled first, peak and
// last points, a soft area fill, horizontal gridlines, intermediate
// year labels with light vertical gridlines, and a dashed zero line
// when the scale crosses zero (the area fill then rests on zero, so
// negative values hang below it).
// points: [{x, y}], opts: {width, height, colour, yMin, yMax, formatY, title}
export function lineChart(points, opts) {
  const { width = 600, height = 260, colour = '#1f4e79', formatY, title } = opts;
  const padL = 52;
  const padR = 16;
  const padT = 20;
  const padB = 30;
  const ys = points.map((p) => p.y);
  const yMin = opts.yMin ?? Math.min(...ys);
  const yMax = opts.yMax ?? Math.max(...ys);
  const span = yMax - yMin || 1;
  const xs = points.map((p) => p.x);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const px = (x) => padL + ((x - xMin) / (xMax - xMin || 1)) * (width - padL - padR);
  const py = (y) => padT + (1 - (y - yMin) / span) * (height - padT - padB);
  const fmt = formatY ?? ((v) => String(v));

  let grid = '';
  for (let i = 0; i <= 4; i += 1) {
    const v = yMin + (span * i) / 4;
    const y = py(v);
    grid += `<line x1="${padL}" y1="${y}" x2="${width - padR}" y2="${y}" class="grid"/>`;
    grid += `<text x="${padL - 8}" y="${y + 4}" class="tick" text-anchor="end">${fmt(v)}</text>`;
  }
  // Up to six x labels, first and last always among them.
  const step = Math.max(1, Math.ceil(points.length / 6));
  const labelled = points.filter((p, i) => i % step === 0 || i === points.length - 1);
  let xGrid = '';
  for (const p of labelled) {
    xGrid += `<line x1="${px(p.x)}" y1="${padT}" x2="${px(p.x)}" y2="${height - padB}" class="grid"/>`;
    xGrid += `<text x="${px(p.x)}" y="${height - 8}" class="tick" text-anchor="middle">${p.x}</text>`;
  }
  const crossesZero = yMin < 0 && yMax > 0;
  const zeroLine = crossesZero
    ? `<line x1="${padL}" y1="${py(0)}" x2="${width - padR}" y2="${py(0)}" class="zero"/>`
    : '';
  const baseY = crossesZero ? py(0) : py(yMin);
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${px(p.x).toFixed(1)},${py(p.y).toFixed(1)}`).join(' ');
  const area = `${path} L${px(xMax).toFixed(1)},${baseY} L${px(xMin).toFixed(1)},${baseY} Z`;
  const first = points[0];
  const last = points[points.length - 1];
  const peak = points.reduce((a, b) => (b.y > a.y ? b : a), points[0]);
  const dots = points
    .map((p) => `<circle cx="${px(p.x)}" cy="${py(p.y)}" r="3" fill="${colour}"><title>${p.x}: ${fmt(p.y)}</title></circle>`)
    .join('');
  let labels = `
    <text x="${px(first.x) + 2}" y="${py(first.y) - 11}" class="point-label">${fmt(first.y)}</text>
    <text x="${px(last.x)}" y="${py(last.y) - 11}" class="point-label" text-anchor="end">${fmt(last.y)}</text>`;
  if (peak !== first && peak !== last) {
    // Near the right edge the peak label anchors to the peak's left,
    // so it never collides with the last point's label.
    const fromRight = px(peak.x) > width * 0.7;
    labels += `
    <text x="${fromRight ? px(peak.x) - 8 : px(peak.x)}" y="${py(peak.y) - 11}" class="point-label" text-anchor="${fromRight ? 'end' : 'middle'}">${fmt(peak.y)} in ${peak.x}</text>`;
  }
  return `${svgOpen(width, height, title)}${grid}${xGrid}${zeroLine}<path d="${area}" fill="${colour}" opacity="0.12"/><path d="${path}" fill="none" stroke="${colour}" stroke-width="2.5"/>${dots}${labels}</svg>`;
}

// Vertical bars for a short series, each bar labelled with its value,
// over light gridlines. opts.refLine = {value, label} draws a dashed
// reference line across the plot (a replacement level, a target).
// items: [{label, value}], opts: {colour, format, refLine, title}
export function barChart(items, opts) {
  const { width = 600, height = 260, colour = '#1f4e79', format, refLine, title } = opts;
  const padL = 46;
  const padT = 26;
  const padB = 30;
  const max = Math.max(...items.map((d) => d.value), refLine ? refLine.value : 0) || 1;
  const plotW = width - padL - 10;
  const slot = plotW / items.length;
  const barW = Math.min(56, slot * 0.58);
  const fmt = format ?? ((v) => String(v));
  const yOf = (v) => padT + (1 - v / max) * (height - padT - padB);
  let grid = '';
  for (let i = 0; i <= 4; i += 1) {
    const v = (max * i) / 4;
    const y = yOf(v);
    grid += `<line x1="${padL}" y1="${y}" x2="${width - 10}" y2="${y}" class="grid"/>`;
    grid += `<text x="${padL - 7}" y="${y + 4}" class="tick" text-anchor="end">${fmt(v)}</text>`;
  }
  const ref = refLine
    ? `<line x1="${padL}" y1="${yOf(refLine.value)}" x2="${width - 10}" y2="${yOf(refLine.value)}" class="zero"/>` +
      `<text x="${width - 12}" y="${yOf(refLine.value) - 6}" class="tick" text-anchor="end">${escapeHtml(refLine.label)}</text>`
    : '';
  const bars = items
    .map((d, i) => {
      const h = ((height - padT - padB) * d.value) / max;
      const x = padL + slot * i + (slot - barW) / 2;
      const y = height - padB - h;
      return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW}" height="${h.toFixed(1)}" rx="4" fill="${colour}"><title>${d.label}: ${fmt(d.value)}</title></rect>` +
        `<text x="${(x + barW / 2).toFixed(1)}" y="${y - 8}" class="point-label" text-anchor="middle">${fmt(d.value)}</text>` +
        `<text x="${(x + barW / 2).toFixed(1)}" y="${height - 8}" class="tick" text-anchor="middle">${d.label}</text>`;
    })
    .join('');
  return `${svgOpen(width, height, title)}${grid}${ref}${bars}</svg>`;
}

// Two mirrored series sharing a baseline (births against deaths, men
// against women): rows of back-to-back bars, one row a year or group.
// A clear gutter in the middle holds the row labels, so no label ever
// touches a bar, and both value labels sit the same distance beyond
// their bar ends. Column headers name the two sides.
// rows: [{label, left, right}], opts: {leftColour, rightColour, format, leftLabel, rightLabel, title}
export function mirroredBars(rows, opts) {
  const { width = 600, leftColour = '#2e7d6b', rightColour = '#c0392b', format, leftLabel, rightLabel, title } = opts;
  const headH = 18;
  const rowH = 24;
  const height = headH + rows.length * rowH + 6;
  const mid = width / 2;
  const gutter = 26;
  const max = Math.max(...rows.flatMap((r) => [r.left, r.right])) || 1;
  const half = mid - gutter - 108;
  const fmt = format ?? ((v) => String(v));
  const head =
    `<text x="${mid - gutter - 4}" y="15" class="point-label" text-anchor="end">${escapeHtml(leftLabel ?? '')} &#8592;</text>` +
    `<text x="${mid + gutter + 4}" y="15" class="point-label">&#8594; ${escapeHtml(rightLabel ?? '')}</text>`;
  const body = rows
    .map((r, i) => {
      const y = headH + i * rowH + 3;
      const lw = (r.left / max) * half;
      const rw = (r.right / max) * half;
      return `<text x="${(mid - gutter - lw - 8).toFixed(1)}" y="${y + 16}" class="tick" text-anchor="end">${fmt(r.left)}</text>` +
        `<rect x="${(mid - gutter - lw).toFixed(1)}" y="${y}" width="${lw.toFixed(1)}" height="19" rx="3" fill="${leftColour}"><title>${r.label} ${escapeHtml(leftLabel ?? '')}: ${fmt(r.left)}</title></rect>` +
        `<text x="${mid}" y="${y + 16}" class="point-label" text-anchor="middle">${r.label}</text>` +
        `<rect x="${(mid + gutter).toFixed(1)}" y="${y}" width="${rw.toFixed(1)}" height="19" rx="3" fill="${rightColour}"><title>${r.label} ${escapeHtml(rightLabel ?? '')}: ${fmt(r.right)}</title></rect>` +
        `<text x="${(mid + gutter + rw + 8).toFixed(1)}" y="${y + 16}" class="tick">${fmt(r.right)}</text>`;
    })
    .join('');
  return `${svgOpen(width, height, title)}${head}${body}</svg>`;
}

// A horizontal stacked bar that shows parts of one whole, with the
// legend written under it by the caller. parts: [{label, count, colour}]
export function shareBar(parts, opts) {
  const { width = 600, height = 64, title } = opts;
  const total = parts.reduce((sum, p) => sum + p.count, 0) || 1;
  let x = 0;
  const segs = parts
    .map((p) => {
      const w = (p.count / total) * width;
      const seg = `<rect x="${x.toFixed(1)}" y="6" width="${Math.max(0, w - 2).toFixed(1)}" height="${height - 28}" rx="4" fill="${p.colour}"><title>${p.label}: ${((p.count / total) * 100).toFixed(1)}%</title></rect>` +
        `<text x="${(x + w / 2).toFixed(1)}" y="${height - 4}" class="point-label" text-anchor="middle">${((p.count / total) * 100).toFixed(1)}%</text>`;
      x += w;
      return seg;
    })
    .join('');
  return `${svgOpen(width, height, title)}${segs}</svg>`;
}

// One 100% stacked bar a row, for watching a structure change over
// time: each row is a year, split into the same parts (the three age
// groups of a census, say), with the share printed inside any segment
// wide enough to hold it.
// rows: [{label, parts: [{label, value, colour}]}], opts: {title}
export function stackedShare(rows, opts) {
  const { width = 600, title } = opts;
  const rowH = 36;
  const labelW = 52;
  const height = rows.length * rowH + 8;
  const plotW = width - labelW - 6;
  const body = rows
    .map((r, i) => {
      const y = i * rowH + 6;
      const total = r.parts.reduce((s, p) => s + p.value, 0) || 1;
      let x = labelW;
      const segs = r.parts
        .map((p) => {
          const w = (p.value / total) * plotW;
          const share = ((p.value / total) * 100).toFixed(1);
          const label = w >= 44
            ? `<text x="${(x + w / 2).toFixed(1)}" y="${y + 19}" class="seg-label" text-anchor="middle">${share}%</text>`
            : '';
          const seg = `<rect x="${x.toFixed(1)}" y="${y}" width="${Math.max(0, w - 2).toFixed(1)}" height="24" rx="4" fill="${p.colour}"><title>${r.label} ${p.label}: ${share}%</title></rect>${label}`;
          x += w;
          return seg;
        })
        .join('');
      return `<text x="${labelW - 10}" y="${y + 17}" class="point-label" text-anchor="end">${r.label}</text>${segs}`;
    })
    .join('');
  return `${svgOpen(width, height, title)}${body}</svg>`;
}

// A tile map of the 47 prefectures: one square each, laid out roughly
// where the prefecture sits in Japan and shaded by population density,
// so the crowded Kantō plain and the empty north read at a glance.
// Each tile is a button: main.js wires clicks to a detail line under
// the map. prefList items carry name, col, row and density (people/km²).
const DENSITY_BANDS = [
  { upTo: 100, fill: '#d7e5f2', dark: true },
  { upTo: 200, fill: '#a9c6e2', dark: true },
  { upTo: 400, fill: '#6f9cc4', dark: false },
  { upTo: 1000, fill: '#35648f', dark: false },
  { upTo: Infinity, fill: '#143350', dark: false },
];

export function densityBand(density) {
  return DENSITY_BANDS.find((b) => density < b.upTo) ?? DENSITY_BANDS[DENSITY_BANDS.length - 1];
}

export function japanTileMap(prefList, opts) {
  const { title } = opts;
  const cellW = 62;
  const cellH = 32;
  const cols = Math.max(...prefList.map((p) => p.col)) + 1;
  const rows = Math.max(...prefList.map((p) => p.row)) + 1;
  const width = cols * cellW;
  const height = rows * cellH;
  const tiles = prefList
    .map((p) => {
      const band = densityBand(p.density);
      const x = p.col * cellW + 2;
      const y = p.row * cellH + 2;
      const fontSize = p.name.length > 8 ? 8 : 9.5;
      return `<g class="tile${band.dark ? ' tile-dark' : ''}" data-pref="${escapeHtml(p.name)}" tabindex="0" role="button" aria-label="${escapeHtml(p.name)}: ${Math.round(p.density)} people per km²">` +
        `<rect x="${x}" y="${y}" width="${cellW - 4}" height="${cellH - 4}" rx="5" fill="${band.fill}"><title>${escapeHtml(p.name)} — ${Math.round(p.density)} people per km²</title></rect>` +
        `<text x="${x + (cellW - 4) / 2}" y="${y + (cellH - 4) / 2 + 3.5}" font-size="${fontSize}">${escapeHtml(p.name)}</text></g>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="group" aria-label="${escapeHtml(title ?? 'Tile map of the 47 prefectures')}" class="chart tilemap"><title>${escapeHtml(title ?? 'Tile map of the 47 prefectures')}</title>${tiles}</svg>`;
}
