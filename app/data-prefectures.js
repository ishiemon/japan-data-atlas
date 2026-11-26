// Prefecture populations from the 2020 census: the twelve largest and
// the five smallest of Japan's 47 prefectures, with each prefecture's
// region and its share of the national total of 126,146,099 people.

export const prefectureCensusTotal = 126146099;

export const largestPrefectures = [
  { name: 'Tokyo', region: 'Kanto', population: 14047594 },
  { name: 'Kanagawa', region: 'Kanto', population: 9237337 },
  { name: 'Osaka', region: 'Kansai', population: 8837685 },
  { name: 'Aichi', region: 'Chubu', population: 7542415 },
  { name: 'Saitama', region: 'Kanto', population: 7344765 },
  { name: 'Chiba', region: 'Kanto', population: 6284480 },
  { name: 'Hyogo', region: 'Kansai', population: 5465002 },
  { name: 'Hokkaido', region: 'Hokkaido', population: 5224614 },
  { name: 'Fukuoka', region: 'Kyushu', population: 5135214 },
  { name: 'Shizuoka', region: 'Chubu', population: 3633202 },
  { name: 'Ibaraki', region: 'Kanto', population: 2867009 },
  { name: 'Hiroshima', region: 'Chugoku', population: 2799702 },
];

export const smallestPrefectures = [
  { name: 'Tottori', region: 'Chugoku', population: 553407 },
  { name: 'Shimane', region: 'Chugoku', population: 671126 },
  { name: 'Kochi', region: 'Shikoku', population: 691527 },
  { name: 'Fukui', region: 'Chubu', population: 766863 },
  { name: 'Saga', region: 'Kyushu', population: 811442 },
];

export const prefecturesSource = 'Statistics Bureau, Population Census 2020';

// Land facts used on the Land & Regions page.
export const landFacts = [
  {
    label: 'Total land area',
    value: '377,976 km²',
    detail: 'The 62nd largest country in the world, spread over four main islands and thousands of smaller ones',
    source: 'Geospatial Information Authority of Japan',
    year: 2023,
  },
  {
    label: 'Islands',
    value: '14,125',
    detail: 'Counted digitally in 2023 — the first recount since 1987, which had listed 6,852',
    source: 'Geospatial Information Authority of Japan',
    year: 2023,
  },
  {
    label: 'Forest cover',
    value: 'about 67%',
    detail: '25.1 million hectares of forest, one of the highest shares among developed countries',
    source: 'Forestry Agency, Annual Report on Forest and Forestry',
    year: 2023,
  },
  {
    label: 'Largest prefecture',
    value: 'Hokkaido, 83,424 km²',
    detail: 'One prefecture holds 22% of the national land — and 5.2 million of its people',
    source: 'Geospatial Information Authority of Japan',
    year: 2023,
  },
  {
    label: 'Highest point',
    value: 'Mount Fuji, 3,776 m',
    detail: 'The summit is the highest ground in the country; the lowest is about 4 m below sea level at Hachirogata, Akita',
    source: 'Geospatial Information Authority of Japan',
    year: 2023,
  },
  {
    label: 'Population density',
    value: '334 people per km²',
    detail: 'Computed from the 2020 census count over the national land area; Tokyo reaches about 6,400 per km²',
    source: 'Statistics Bureau, Population Census 2020',
    year: 2020,
  },
];
