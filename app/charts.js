// Charts drawn as inline SVG from the data files. No library and no
// image files: each builder returns an SVG string the views drop into
// the page, so the charts work offline and stay sharp at any size.
// Every chart carries a <title> so it still says what it shows to a
// screen reader and in the source outline.



// A line chart over year/value points, with labelled first and last
// points, a soft area fill and light horizontal gridlines.
// points: [{x, y}], opts: {width, height, colour, yMin, yMax, formatY}
export function lineChart(points, opts) {
  const { width = 720, height = 300, colour = '#1f4e79', formatY } = opts;
  const padL = 52;
  const padR = 16;
  const padT = 18;
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
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${px(p.x).toFixed(1)},${py(p.y).toFixed(1)}`).join(' ');
  const area = `${path} L${px(xMax).toFixed(1)},${py(yMin)} L${px(xMin).toFixed(1)},${py(yMin)} Z`;
  const first = points[0];
  const last = points[points.length - 1];
  const dots = points
    .map((p) => `<circle cx="${px(p.x)}" cy="${py(p.y)}" r="3" fill="${colour}"><title>${p.x}: ${fmt(p.y)}</title></circle>`)
    .join('');
  const labels = `
    <text x="${px(first.x)}" y="${py(first.y) - 10}" class="point-label">${fmt(first.y)}</text>
    <text x="${px(last.x)}" y="${py(last.y) - 10}" class="point-label" text-anchor="end">${fmt(last.y)}</text>
    <text x="${px(xMin)}" y="${height - 8}" class="tick">${xMin}</text>
    <text x="${px(xMax)}" y="${height - 8}" class="tick" text-anchor="end">${xMax}</text>`;
  return `<svg viewBox="0 0 ${width} ${height}" role="img" class="chart">${grid}<path d="${area}" fill="${colour}" opacity="0.12"/><path d="${path}" fill="none" stroke="${colour}" stroke-width="2.5"/>${dots}${labels}</svg>`;
}

// Vertical bars for a short series, each bar labelled with its value.
// items: [{label, value}], opts: {colour, format}
export function barChart(items, opts) {
  const { width = 720, height = 300, colour = '#1f4e79', format } = opts;
  const padT = 26;
  const padB = 30;
  const max = Math.max(...items.map((d) => d.value)) || 1;
  const slot = width / items.length;
  const barW = Math.min(64, slot * 0.58);
  const fmt = format ?? ((v) => String(v));
  const bars = items
    .map((d, i) => {
      const h = ((height - padT - padB) * d.value) / max;
      const x = slot * i + (slot - barW) / 2;
      const y = height - padB - h;
      return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW}" height="${h.toFixed(1)}" rx="4" fill="${colour}"><title>${d.label}: ${fmt(d.value)}</title></rect>` +
        `<text x="${(x + barW / 2).toFixed(1)}" y="${y - 8}" class="point-label" text-anchor="middle">${fmt(d.value)}</text>` +
        `<text x="${(x + barW / 2).toFixed(1)}" y="${height - 8}" class="tick" text-anchor="middle">${d.label}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" class="chart">${bars}</svg>`;
}

// Two mirrored series sharing a baseline (births against deaths, men
// against women): rows of back-to-back bars, one row a year or group.
// rows: [{label, left, right}], opts: {leftColour, rightColour, format}
export function mirroredBars(rows, opts) {
  const { width = 720, leftColour = '#2e7d6b', rightColour = '#c0392b', format } = opts;
  const rowH = 30;
  const height = rows.length * rowH + 8;
  const mid = width / 2;
  const max = Math.max(...rows.flatMap((r) => [r.left, r.right])) || 1;
  const half = mid - 118;
  const fmt = format ?? ((v) => String(v));
  const body = rows
    .map((r, i) => {
      const y = i * rowH + 6;
      const lw = (r.left / max) * half;
      const rw = (r.right / max) * half;
      return `<text x="${mid - half - 8}" y="${y + 16}" class="tick" text-anchor="end">${fmt(r.left)}</text>` +
        `<rect x="${(mid - lw).toFixed(1)}" y="${y}" width="${lw.toFixed(1)}" height="20" rx="3" fill="${leftColour}"><title>${r.label}: ${fmt(r.left)}</title></rect>` +
        `<text x="${mid}" y="${y + 16}" class="point-label" text-anchor="middle">${r.label}</text>` +
        `<rect x="${mid}" y="${y}" width="${rw.toFixed(1)}" height="20" rx="3" fill="${rightColour}"><title>${r.label}: ${fmt(r.right)}</title></rect>` +
        `<text x="${mid + rw + 8}" y="${y + 16}" class="tick">${fmt(r.right)}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" class="chart">${body}</svg>`;
}

// A horizontal stacked bar that shows parts of one whole, with the
// legend written under it by the caller. parts: [{label, count, colour}]
export function shareBar(parts, opts) {
  const { width = 720, height = 64 } = opts;
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
  return `<svg viewBox="0 0 ${width} ${height}" role="img" class="chart">${segs}</svg>`;
}
