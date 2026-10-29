import type { Programs } from '@/types/program';

export const findWeight = (data: Programs, racerNumber: number): number | null => {
  for (const program of data.programs) {
    for (const racer of program.racers) {
      if (racer.number === racerNumber) {
        return racer.weight;
      }
    }
  }

  return null;
};
