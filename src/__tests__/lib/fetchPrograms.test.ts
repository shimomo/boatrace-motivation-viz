import { fetchPrograms, toPrograms } from '@/lib/fetchPrograms';
import type { ApiResponse } from '@/types/program';

const apiResponse: ApiResponse = {
  programs: {
    stadiums: {
      '2': {
        races: {
          '1': {
            stadium_number: 2,
            race_number: 1,
            closed_at: '2025-11-01 15:00:00',
            racers: {
              '2': { entry_number: 2, name: '戸田二郎', number: 2222, weight: null },
              '1': { entry_number: 1, name: '戸田太郎', number: 1111, weight: 52.1 },
            },
          },
        },
      },
      '1': {
        races: {
          '10': { stadium_number: 1, race_number: 10, closed_at: '2025-11-01 16:00:00', racers: {} },
          '2': { stadium_number: 1, race_number: 2, closed_at: '2025-11-01 12:00:00', racers: {} },
        },
      },
    },
  },
};

describe('toPrograms', () => {
  it('flattens stadiums and races ordered by number', () => {
    const { programs } = toPrograms(apiResponse);

    expect(programs.map(p => [p.stadium_number, p.race_number])).toEqual([[1, 2], [1, 10], [2, 1]]);
  });

  it('keeps only the fields the app uses, ordered by entry number', () => {
    const { programs } = toPrograms(apiResponse);

    expect(programs[2]).toEqual({
      stadium_number: 2,
      race_number: 1,
      closed_at: '2025-11-01 15:00:00',
      racers: [
        { entry_number: 1, name: '戸田太郎', number: 1111, weight: 52.1 },
        { entry_number: 2, name: '戸田二郎', number: 2222, weight: null },
      ],
    });
  });

  it('returns no programs when the response has none', () => {
    expect(toPrograms({} as ApiResponse)).toEqual({ programs: [] });
  });
});

describe('fetchPrograms', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('fetches JSON for the past 7 days starting from the specified date', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(apiResponse),
    }) as jest.Mock;

    const baseDate = new Date('2025-11-07T00:00:00Z');
    const result = await fetchPrograms(baseDate);

    expect(global.fetch).toHaveBeenCalledTimes(7);

    const expectedDates = [
      '20251107',
      '20251106',
      '20251105',
      '20251104',
      '20251103',
      '20251102',
      '20251101',
    ];
    expectedDates.forEach((date, index) => {
      expect(global.fetch).toHaveBeenNthCalledWith(
        index + 1,
        `https://boatraceopenapi.github.io/api/v1/${date.substring(0, 4)}/${date}.json`
      );
    });

    expect(result).toEqual(Array(7).fill(toPrograms(apiResponse)));
  });

  it('treats a missing day (404) as a day without programs', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 404 }) as jest.Mock;

    const result = await fetchPrograms(new Date('2025-11-07T00:00:00Z'));

    expect(result).toEqual(Array(7).fill({ programs: [] }));
  });

  it('throws on other HTTP errors', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 }) as jest.Mock;

    await expect(fetchPrograms(new Date('2025-11-07T00:00:00Z'))).rejects.toThrow('HTTP 500');
  });
});
