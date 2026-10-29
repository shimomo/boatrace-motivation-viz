import type { ApiResponse, Programs } from '@/types/program';

const formatDate = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
};

const getPastDates = (baseDate: Date, days: number = 7) => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    return formatDate(date);
  });
};

const byNumber = (a: [string, unknown], b: [string, unknown]) => Number(a[0]) - Number(b[0]);

export const toPrograms = (response: ApiResponse): Programs => ({
  programs: Object.entries(response.programs?.stadiums ?? {}).sort(byNumber).flatMap(([, stadium]) =>
    Object.entries(stadium.races).sort(byNumber).map(([, race]) => ({
      stadium_number: race.stadium_number,
      race_number: race.race_number,
      closed_at: race.closed_at,
      racers: Object.entries(race.racers ?? {}).sort(byNumber).map(([, racer]) => ({
        entry_number: racer.entry_number,
        name: racer.name,
        number: racer.number,
        weight: racer.weight,
      })),
    }))
  ),
});

const getJson = async (date: string): Promise<Programs> => {
  const response = await fetch(`https://boatraceopenapi.github.io/api/v1/${date.substring(0, 4)}/${date}.json`);
  if (response.status === 404) {
    return { programs: [] };
  }
  if (!response.ok) {
    throw new Error(`${date}: HTTP ${response.status}`);
  }
  return toPrograms(await response.json());
};

export const fetchPrograms = async (baseDate = new Date()) => {
  const dates = getPastDates(baseDate);
  return await Promise.all(dates.map(getJson));
};
