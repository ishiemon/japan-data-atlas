// Headline indicators and the long population story of Japan.
// Every figure names its publisher and the year it describes, so a reader
// can trace each number back to the official release it came from.

export const headlineIndicators = [
  {
    label: 'Population',
    value: '123.80 million',
    detail: 'Total population on 1 October 2024, down 898,000 in a year',
    source: 'Statistics Bureau, Population Estimates',
    year: 2024,
  },
  {
    label: 'Aged 65 and over',
    value: '29.3%',
    detail: '36.25 million people — the highest share of any large country',
    source: 'Statistics Bureau, Population Estimates',
    year: 2024,
  },
  {
    label: 'Households',
    value: '55.7 million',
    detail: 'Average household size has fallen to about 2.2 people',
    source: 'Statistics Bureau, Population Census',
    year: 2020,
  },
  {
    label: 'Land area',
    value: '377,976 km²',
    detail: '14,125 islands; about two-thirds of the land is forest',
    source: 'Geospatial Information Authority of Japan',
    year: 2023,
  },
  {
    label: 'Life expectancy',
    value: '81.1 / 87.1 years',
    detail: 'At birth, men / women — among the longest lives in the world',
    source: 'Ministry of Health, Labour and Welfare, Abridged Life Tables',
    year: 2023,
  },
  {
    label: 'Births',
    value: '727,277',
    detail: 'Against 1,575,936 deaths: a natural fall of 848,659 in one year',
    source: 'Ministry of Health, Labour and Welfare, Vital Statistics',
    year: 2023,
  },
];

// Total population at each census, millions of people, 1920-2020.
// The census has run every five years since 1920; these are the counts
// the Statistics Bureau published for the years shown.
export const censusTrend = [
  { year: 1920, millions: 56.0 },
  { year: 1930, millions: 64.5 },
  { year: 1940, millions: 73.1 },
  { year: 1950, millions: 83.2 },
  { year: 1960, millions: 94.3 },
  { year: 1970, millions: 103.7 },
  { year: 1980, millions: 117.1 },
  { year: 1990, millions: 123.6 },
  { year: 2000, millions: 126.9 },
  { year: 2010, millions: 128.1 },
  { year: 2020, millions: 126.1 },
];

export const censusTrendSource = 'Statistics Bureau, Population Census 1920-2020';

// The three broad age groups of the 2020 census. The counts sum to the
// census total of 126,146,099 people.
export const ageGroups = [
  { label: 'Aged 0-14', count: 15031602, colour: '#2e7d6b' },
  { label: 'Aged 15-64', count: 75087865, colour: '#1f4e79' },
  { label: 'Aged 65 and over', count: 36026632, colour: '#c0392b' },
];

export const ageGroupsSource = 'Statistics Bureau, Population Census 2020';

// Turning points a visitor usually asks about first.
export const populationMilestones = [
  {
    year: '2008',
    text: 'The population peaks at about 128.08 million (Population Estimates) and turns down the next year.',
  },
  {
    year: '2010',
    text: 'The census counts 128,057,352 people, the largest census count ever recorded in Japan.',
  },
  {
    year: '2020',
    text: 'The census counts 126,146,099 people; for the first time more than a quarter — 28.6% — are 65 or over.',
  },
  {
    year: '2024',
    text: 'Estimates put the population at 123.80 million on 1 October, the fourteenth yearly fall in a row.',
  },
];
