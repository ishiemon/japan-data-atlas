// Japan Data Atlas — the router. One page, five views on hash routes,
// every view rendered from the data files by the views-*.js modules:
//
//   #/             home: Japan at a glance
//   #/population   census counts, age structure, prefecture table
//   #/economy      prices, unemployment, household spending
//   #/society      births, deaths, fertility, life expectancy
//   #/land         area, islands, density, and the sources section
//
// window.__shotReady is false while a view renders and true once it is
// on screen, so the screenshot script knows when to capture.

import { homeView } from './views-home.js';
import { economyView } from './views-economy.js';
import { landView } from './views-land.js';
import { allPrefectures } from './data-prefectures.js';
import { listedPrefectures, populationView, prefectureDetail, prefectureRows } from './views-population.js';
import { societyView } from './views-society.js';

const app = document.getElementById('app');
const titles = {
  home: 'Japan Data Atlas — the national statistics of Japan',
  population: 'Population | Japan Data Atlas',
  economy: 'Economy & work | Japan Data Atlas',
  society: 'People & society | Japan Data Atlas',
  land: 'Land & regions | Japan Data Atlas',
};

// Small pieces of page state, kept while the visitor stays on a page.
const state = {
  chartMode: 'line',
  series: 'cpi',
  show: 'both',
  tilePref: 'Tokyo',
};

function markCurrentNav(route) {
  document.querySelectorAll('nav a[data-route]').forEach((a) => {
    if (a.getAttribute('data-route') === route) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

function wireHome() {
  app.querySelectorAll('[data-chart-mode]').forEach((button) => {
    button.addEventListener('click', () => {
      state.chartMode = button.getAttribute('data-chart-mode');
      render(true);
    });
  });
}

function wirePopulation() {
  const search = document.getElementById('pref-search');
  const region = document.getElementById('pref-region');
  const sort = document.getElementById('pref-sort');
  const body = document.getElementById('pref-body');
  if (search && region && sort && body) {
    const apply = () => {
      const needle = search.value.trim().toLowerCase();
      let rows = listedPrefectures.filter(
        (p) => (region.value === 'all' || p.region === region.value) &&
          (!needle || p.name.toLowerCase().includes(needle) || p.region.toLowerCase().includes(needle)),
      );
      if (sort.value === 'population-desc') rows = [...rows].sort((a, b) => b.population - a.population);
      if (sort.value === 'population-asc') rows = [...rows].sort((a, b) => a.population - b.population);
      if (sort.value === 'name') rows = [...rows].sort((a, b) => a.name.localeCompare(b.name));
      body.innerHTML = prefectureRows(rows);
    };
    search.addEventListener('input', apply);
    region.addEventListener('change', apply);
    sort.addEventListener('change', apply);
  }
  // The tile map: picking a square writes that prefecture's figures
  // into the detail line under the map.
  const detail = document.getElementById('tile-detail');
  if (detail) {
    const show = (name) => {
      const p = allPrefectures.find((q) => q.name === name);
      if (!p) return;
      state.tilePref = name;
      detail.textContent = prefectureDetail(p);
      app.querySelectorAll('.tile').forEach((t) => {
        t.classList.toggle('tile-selected', t.getAttribute('data-pref') === name);
      });
    };
    app.querySelectorAll('.tile').forEach((tile) => {
      const name = tile.getAttribute('data-pref');
      tile.addEventListener('click', () => show(name));
      tile.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          show(name);
        }
      });
    });
    show(state.tilePref);
  }
}

function wireEconomy() {
  app.querySelectorAll('[data-series]').forEach((button) => {
    button.addEventListener('click', () => {
      state.series = button.getAttribute('data-series');
      render(true);
    });
  });
}

function wireSociety() {
  app.querySelectorAll('[data-show]').forEach((button) => {
    button.addEventListener('click', () => {
      state.show = button.getAttribute('data-show');
      render(true);
    });
  });
}

// keepScroll is set by the in-page toggles: re-drawing a chart must
// not throw the reader back to the top of the page. Only a change of
// route (the hashchange listener) starts at the top.
function render(keepScroll = false) {
  window.__shotReady = false;
  const scrollY = keepScroll ? window.scrollY : 0;
  const route = (location.hash.replace(/^#\//, '') || 'home').split('?')[0];
  if (route === 'population') {
    document.title = titles.population;
    app.innerHTML = populationView();
    wirePopulation();
    markCurrentNav('population');
  } else if (route === 'economy') {
    document.title = titles.economy;
    app.innerHTML = economyView(state.series);
    wireEconomy();
    markCurrentNav('economy');
  } else if (route === 'society') {
    document.title = titles.society;
    app.innerHTML = societyView(state.show);
    wireSociety();
    markCurrentNav('society');
  } else if (route === 'land') {
    document.title = titles.land;
    app.innerHTML = landView();
    markCurrentNav('land');
  } else {
    document.title = titles.home;
    app.innerHTML = homeView(state.chartMode);
    wireHome();
    markCurrentNav('home');
  }
  window.scrollTo(0, scrollY);
  window.__shotReady = true;
}

window.addEventListener('hashchange', () => render());
render();
