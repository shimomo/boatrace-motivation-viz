export type Programs = {
  programs: Program[];
};

export type Program = {
  stadium_number: number;
  race_number: number;
  closed_at: string;
  racers: Racer[];
};

export type Racer = {
  entry_number: number;
  name: string;
  number: number;
  weight: number | null;
};

export type ApiResponse = {
  programs: {
    stadiums: Record<string, {
      races: Record<string, {
        stadium_number: number;
        race_number: number;
        closed_at: string;
        racers: Record<string, {
          entry_number: number;
          name: string;
          number: number;
          weight: number | null;
        }>;
      }>;
    }>;
  };
};
