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
import { listedPrefectures, populationView, prefectureRows } from './views-population.js';
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
      render();
    });
  });
}

function wirePopulation() {
  const search = document.getElementById('pref-search');
  const sort = document.getElementById('pref-sort');
  const body = document.getElementById('pref-body');
  if (!search || !sort || !body) return;
  const apply = () => {
    const needle = search.value.trim().toLowerCase();
    let rows = listedPrefectures.filter(
      (p) => !needle || p.name.toLowerCase().includes(needle) || p.region.toLowerCase().includes(needle),
    );
    if (sort.value === 'population-desc') rows = [...rows].sort((a, b) => b.population - a.population);
    if (sort.value === 'population-asc') rows = [...rows].sort((a, b) => a.population - b.population);
    if (sort.value === 'name') rows = [...rows].sort((a, b) => a.name.localeCompare(b.name));
    body.innerHTML = prefectureRows(rows);
  };
  search.addEventListener('input', apply);
  sort.addEventListener('change', apply);
}

function wireEconomy() {
  app.querySelectorAll('[data-series]').forEach((button) => {
    button.addEventListener('click', () => {
      state.series = button.getAttribute('data-series');
      render();
    });
  });
}

function wireSociety() {
  app.querySelectorAll('[data-show]').forEach((button) => {
    button.addEventListener('click', () => {
      state.show = button.getAttribute('data-show');
      render();
    });
  });
}

function render() {
  window.__shotReady = false;
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
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
