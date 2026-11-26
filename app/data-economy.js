// Prices, work and household spending. Annual averages throughout, so
// the years compare like with like.

// All-items consumer price index, change from the year before, percent.
// Statistics Bureau, Consumer Price Index, annual average.
export const cpiTrend = [
  { year: 2019, percent: 0.5 },
  { year: 2020, percent: 0.0 },
  { year: 2021, percent: -0.2 },
  { year: 2022, percent: 2.5 },
  { year: 2023, percent: 3.2 },
  { year: 2024, percent: 2.7 },
];

export const cpiSource = 'Statistics Bureau, Consumer Price Index (annual average, all items)';

// Unemployment rate, percent of the labour force, annual average.
// Statistics Bureau, Labour Force Survey.
export const unemploymentTrend = [
  { year: 2019, percent: 2.4 },
  { year: 2020, percent: 2.8 },
  { year: 2021, percent: 2.8 },
  { year: 2022, percent: 2.6 },
  { year: 2023, percent: 2.6 },
  { year: 2024, percent: 2.5 },
];

export const unemploymentSource = 'Statistics Bureau, Labour Force Survey (annual average)';

export const economyIndicators = [
  {
    label: 'People in work',
    value: '67.47 million',
    detail: 'Employed persons averaged over 2023, a record high even as the population falls',
    source: 'Statistics Bureau, Labour Force Survey',
    year: 2023,
  },
  {
    label: 'Household spending',
    value: '¥293,997 a month',
    detail: 'Average consumption expenditure of households of two or more people',
    source: 'Statistics Bureau, Family Income and Expenditure Survey',
    year: 2023,
  },
  {
    label: 'Minimum wage',
    value: '¥1,055 an hour',
    detail: 'National weighted average from October 2024, up ¥51 on the year before',
    source: 'Ministry of Health, Labour and Welfare',
    year: 2024,
  },
  {
    label: 'Price rise',
    value: '+3.2% in 2023',
    detail: 'The fastest consumer price rise since 1982, easing to +2.7% in 2024',
    source: 'Statistics Bureau, Consumer Price Index',
    year: 2023,
  },
];

export const economyNotes = [
  'Prices barely moved for two decades: the consumer price index fell in nine of the years between 1999 and 2021, then rose 2.5% in 2022 and 3.2% in 2023 as import costs climbed.',
  'Work stayed tight through the price shock. Unemployment never rose above 2.8% in the pandemic years and stood at 2.5% in 2024, with more people in work than ever before.',
  'The minimum wage has risen every year since 2002. The 2024 rise of ¥51 an hour, to a weighted average of ¥1,055, was the largest on record.',
];
