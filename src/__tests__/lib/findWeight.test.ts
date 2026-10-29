import { findWeight } from '@/lib/findWeight';
import type { Programs } from '@/types/program';

describe('findWeight', () => {
  let programs: Programs;

  beforeEach(() => {
    programs = {
      programs: [
        {
          stadium_number: 1,
          race_number: 1,
          closed_at: '2025-08-01 12:00:00',
          racers: [
            {
              entry_number: 4,
              name: '桐生順平',
              number: 4444,
              weight: 52.1,
            },
          ],
        },
      ],
    };
  });

  it('returns the correct racer weight when racer number exists', () => {
    expect(findWeight(programs, 4444)).toBe(52.1);
  });

  it('returns null when racer number does not exist', () => {
    expect(findWeight(programs, 4000)).toBeNull();
  });
});
