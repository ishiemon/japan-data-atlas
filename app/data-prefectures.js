// Prefectures and land. All 47 prefectures with their population at the
// 2020 census (Statistics Bureau, Population Census 2020) and their land
// area (Geospatial Information Authority of Japan, Areas by Prefecture
// and Municipality, 1 October 2020). The populations sum to the census
// total of 126,146,099 people. col/row place each prefecture on the
// tile map in charts.js: one square per prefecture, laid out roughly
// where it sits in the country.

export const prefectureCensusTotal = 126146099;

export const allPrefectures = [
  { name: 'Hokkaido', region: 'Hokkaido', population: 5224614, areaKm2: 83424.44, col: 10, row: 0 },
  { name: 'Aomori', region: 'Tohoku', population: 1237984, areaKm2: 9645.64, col: 9, row: 1 },
  { name: 'Akita', region: 'Tohoku', population: 959502, areaKm2: 11637.52, col: 8, row: 2 },
  { name: 'Iwate', region: 'Tohoku', population: 1210534, areaKm2: 15275.01, col: 9, row: 2 },
  { name: 'Yamagata', region: 'Tohoku', population: 1068027, areaKm2: 9323.15, col: 8, row: 3 },
  { name: 'Miyagi', region: 'Tohoku', population: 2301996, areaKm2: 7282.29, col: 9, row: 3 },
  { name: 'Niigata', region: 'Chubu', population: 2201272, areaKm2: 12583.96, col: 7, row: 4 },
  { name: 'Fukushima', region: 'Tohoku', population: 1833152, areaKm2: 13784.14, col: 9, row: 4 },
  { name: 'Ishikawa', region: 'Chubu', population: 1132526, areaKm2: 4186.21, col: 5, row: 5 },
  { name: 'Toyama', region: 'Chubu', population: 1034814, areaKm2: 4247.58, col: 6, row: 5 },
  { name: 'Nagano', region: 'Chubu', population: 2048011, areaKm2: 13561.56, col: 7, row: 5 },
  { name: 'Tochigi', region: 'Kanto', population: 1933146, areaKm2: 6408.09, col: 8, row: 5 },
  { name: 'Ibaraki', region: 'Kanto', population: 2867009, areaKm2: 6097.39, col: 9, row: 5 },
  { name: 'Fukui', region: 'Chubu', population: 766863, areaKm2: 4190.52, col: 5, row: 6 },
  { name: 'Gifu', region: 'Chubu', population: 1978742, areaKm2: 10621.29, col: 6, row: 6 },
  { name: 'Gunma', region: 'Kanto', population: 1939110, areaKm2: 6362.28, col: 7, row: 6 },
  { name: 'Saitama', region: 'Kanto', population: 7344765, areaKm2: 3797.75, col: 8, row: 6 },
  { name: 'Chiba', region: 'Kanto', population: 6284480, areaKm2: 5157.57, col: 9, row: 6 },
  { name: 'Shimane', region: 'Chugoku', population: 671126, areaKm2: 6707.89, col: 1, row: 7 },
  { name: 'Tottori', region: 'Chugoku', population: 553407, areaKm2: 3507.14, col: 2, row: 7 },
  { name: 'Hyogo', region: 'Kansai', population: 5465002, areaKm2: 8401.02, col: 3, row: 7 },
  { name: 'Kyoto', region: 'Kansai', population: 2578087, areaKm2: 4612.2, col: 4, row: 7 },
  { name: 'Shiga', region: 'Kansai', population: 1413610, areaKm2: 4017.38, col: 5, row: 7 },
  { name: 'Aichi', region: 'Chubu', population: 7542415, areaKm2: 5173.07, col: 6, row: 7 },
  { name: 'Yamanashi', region: 'Chubu', population: 809974, areaKm2: 4465.27, col: 7, row: 7 },
  { name: 'Tokyo', region: 'Kanto', population: 14047594, areaKm2: 2194.03, col: 8, row: 7 },
  { name: 'Okayama', region: 'Chugoku', population: 1888432, areaKm2: 7114.33, col: 3, row: 8 },
  { name: 'Osaka', region: 'Kansai', population: 8837685, areaKm2: 1905.32, col: 4, row: 8 },
  { name: 'Nara', region: 'Kansai', population: 1324473, areaKm2: 3690.94, col: 5, row: 8 },
  { name: 'Mie', region: 'Chubu', population: 1770254, areaKm2: 5774.49, col: 6, row: 8 },
  { name: 'Shizuoka', region: 'Chubu', population: 3633202, areaKm2: 7777.35, col: 7, row: 8 },
  { name: 'Kanagawa', region: 'Kanto', population: 9237337, areaKm2: 2416.11, col: 8, row: 8 },
  { name: 'Yamaguchi', region: 'Chugoku', population: 1342059, areaKm2: 6112.54, col: 2, row: 9 },
  { name: 'Hiroshima', region: 'Chugoku', population: 2799702, areaKm2: 8479.65, col: 3, row: 9 },
  { name: 'Wakayama', region: 'Kansai', population: 922584, areaKm2: 4724.65, col: 4, row: 9 },
  { name: 'Kagawa', region: 'Shikoku', population: 950244, areaKm2: 1876.78, col: 5, row: 9 },
  { name: 'Tokushima', region: 'Shikoku', population: 719559, areaKm2: 4146.75, col: 6, row: 9 },
  { name: 'Saga', region: 'Kyushu', population: 811442, areaKm2: 2440.69, col: 1, row: 10 },
  { name: 'Fukuoka', region: 'Kyushu', population: 5135214, areaKm2: 4986.51, col: 2, row: 10 },
  { name: 'Oita', region: 'Kyushu', population: 1123852, areaKm2: 6340.76, col: 3, row: 10 },
  { name: 'Ehime', region: 'Shikoku', population: 1334841, areaKm2: 5676.19, col: 4, row: 10 },
  { name: 'Kochi', region: 'Shikoku', population: 691527, areaKm2: 7103.63, col: 5, row: 10 },
  { name: 'Nagasaki', region: 'Kyushu', population: 1312317, areaKm2: 4130.98, col: 1, row: 11 },
  { name: 'Kumamoto', region: 'Kyushu', population: 1738301, areaKm2: 7409.46, col: 2, row: 11 },
  { name: 'Miyazaki', region: 'Kyushu', population: 1069576, areaKm2: 7735.22, col: 3, row: 11 },
  { name: 'Kagoshima', region: 'Kyushu', population: 1588256, areaKm2: 9187.06, col: 2, row: 12 },
  { name: 'Okinawa', region: 'Kyushu', population: 1467480, areaKm2: 2282.59, col: 0, row: 12 },
];

// The eight traditional regions, in the order the filter lists them.
export const prefectureRegions = ['Hokkaido', 'Tohoku', 'Kanto', 'Chubu', 'Kansai', 'Chugoku', 'Shikoku', 'Kyushu'];

// People per km², from the census count over the prefecture's area.
export function prefectureDensity(p) {
  return p.population / p.areaKm2;
}

// The five most populous prefectures, largest first.
export const largestPrefectures = [...allPrefectures].sort((a, b) => b.population - a.population).slice(0, 5);

export const prefecturesSource = 'Statistics Bureau, Population Census 2020; Geospatial Information Authority of Japan, Areas by Prefecture and Municipality 2020';

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
