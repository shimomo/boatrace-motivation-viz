import { convertStadiumName } from '@/lib/convertStadium';
import { formatJapaneseDateTime } from '@/lib/formatJapaneseDateTime';
import { ProgramTable } from '@/components/ProgramTable';
import type { Programs } from '@/types/program';

type Props = {
  program: Programs['programs'][number];
  pastPrograms: Programs[];
};

export const ProgramCard = ({ program, pastPrograms }: Props) => {
  return (
    <div className={`grid place-items-center mt-6`}>
      <div className={`rounded overflow-hidden shadow-lg w-full`}>
        <div className={`px-4 py-2 text-lg font-semibold`}>
          <span className={`mr-2`}>{formatJapaneseDateTime(program.closed_at)}</span>
          <span className={`mr-2`}>{convertStadiumName(program.stadium_number)}</span>
          {program.race_number}R
        </div>

        <div className={`px-6 py-4`}>
          <ProgramTable racers={program.racers} pastPrograms={pastPrograms} />
        </div>
      </div>
    </div>
  );
};
