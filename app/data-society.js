// Births, deaths, families and long lives — the vital statistics of
// Japan, published by the Ministry of Health, Labour and Welfare.

// Live births a year, 2016-2023. 2016 was the first year below one
// million since records began in 1899.
export const birthsTrend = [
  { year: 2016, count: 976978 },
  { year: 2017, count: 946065 },
  { year: 2018, count: 918400 },
  { year: 2019, count: 865239 },
  { year: 2020, count: 840835 },
  { year: 2021, count: 811622 },
  { year: 2022, count: 770759 },
  { year: 2023, count: 727277 },
];

// Deaths a year, 2016-2023 — the same span as the births above, so
// the mirrored chart compares every year on equal terms.
export const deathsTrend = [
  { year: 2016, count: 1307748 },
  { year: 2017, count: 1340397 },
  { year: 2018, count: 1362470 },
  { year: 2019, count: 1381093 },
  { year: 2020, count: 1372755 },
  { year: 2021, count: 1439856 },
  { year: 2022, count: 1569050 },
  { year: 2023, count: 1575936 },
];

export const vitalSource = 'Ministry of Health, Labour and Welfare, Vital Statistics';

// Total fertility rate — the average number of children a woman bears.
// Every year 2015-2023, so the bars stand for equal steps in time.
export const fertilityTrend = [
  { year: 2015, rate: 1.45 },
  { year: 2016, rate: 1.44 },
  { year: 2017, rate: 1.43 },
  { year: 2018, rate: 1.42 },
  { year: 2019, rate: 1.36 },
  { year: 2020, rate: 1.33 },
  { year: 2021, rate: 1.3 },
  { year: 2022, rate: 1.26 },
  { year: 2023, rate: 1.2 },
];

export const fertilitySource = 'Ministry of Health, Labour and Welfare, Vital Statistics 2015-2023';

// Life expectancy at birth, years, men and women.
export const lifeExpectancyTrend = [
  { year: 1990, men: 75.92, women: 81.9 },
  { year: 2000, men: 77.72, women: 84.6 },
  { year: 2010, men: 79.55, women: 86.3 },
  { year: 2020, men: 81.56, women: 87.71 },
  { year: 2023, men: 81.09, women: 87.14 },
];

export const lifeExpectancySource = 'Ministry of Health, Labour and Welfare, Abridged Life Tables';

export const societyIndicators = [
  {
    label: 'Marriages',
    value: '474,741 couples',
    detail: 'Down from more than a million a year in the early 1970s',
    source: 'Ministry of Health, Labour and Welfare, Vital Statistics',
    year: 2023,
  },
  {
    label: 'Natural change',
    value: '−848,659 people',
    detail: 'Births minus deaths in 2023 — the largest natural fall ever recorded',
    source: 'Ministry of Health, Labour and Welfare, Vital Statistics',
    year: 2023,
  },
  {
    label: 'Centenarians',
    value: '92,139 people',
    detail: 'Residents aged 100 or over in September 2024, the 54th yearly rise in a row',
    source: 'Ministry of Health, Labour and Welfare',
    year: 2024,
  },
  {
    label: 'Fertility rate',
    value: '1.20 children',
    detail: 'The total fertility rate in 2023, the lowest since records began in 1947',
    source: 'Ministry of Health, Labour and Welfare, Vital Statistics',
    year: 2023,
  },
];
