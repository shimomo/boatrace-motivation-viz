'use client';

import { useEffect, useState } from 'react';
import { Loader } from '@/components/Loader';
import { ProgramCard } from '@/components/ProgramCard';
import { StadiumSelector } from '@/components/StadiumSelector';
import { fetchPrograms } from '@/lib/fetchPrograms';
import type { Programs } from '@/types/program';

export default function Page() {
  const [programs, setPrograms] = useState<Programs[]>([]);
  const [selectedStadiumNumber, setSelectedStadiumNumber] = useState<number | null>(null);
  const [isSelectorVisible, setIsSelectorVisible] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPrograms();
        setPrograms(data);

        const firstStadiumNumber = data?.[0]?.programs?.[0]?.stadium_number ?? null;
        setSelectedStadiumNumber(firstStadiumNumber);
      } catch (err) {
        if (err instanceof Error) {
          console.error('Fetch error:', err);
          setError(`データ取得に失敗しました: ${err.message}`);
        } else {
          console.error('Unknown error:', err);
          setError('予期しないエラーが発生しました');
        }
      }
    })();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!programs[0]) {
    return <Loader />;
  }

  const uniqueStadiumNumbers = Array.from(
    new Set(programs[0].programs.map(program => program.stadium_number))
  );

  const filteredPrograms = selectedStadiumNumber
    ? programs[0].programs.filter(program => program.stadium_number === selectedStadiumNumber)
    : programs[0].programs.filter(program => program.stadium_number === programs[0].programs[0]?.stadium_number);

  return (
    <div className={`flex min-h-screen`}>
      <aside className={`w-48 bg-gray-100 p-4`}>
        <h2 className={`text-xl text-center font-bold mb-4`}>Motivation Viz</h2>
        <StadiumSelector
          stadiumNumbers={uniqueStadiumNumbers}
          selectedStadiumNumber={selectedStadiumNumber}
          setSelectedStadiumNumber={setSelectedStadiumNumber}
          isSelectorVisible={isSelectorVisible}
          toggleSelectorVisible={() => setIsSelectorVisible(!isSelectorVisible)}
        />
      </aside>

      <main className={`flex-1 p-6 bg-white`}>
        <h1 className={`text-2xl font-bold mb-4`}>本日のボートレース（体重の増減表）</h1>
        {filteredPrograms.map(program => (
          <ProgramCard
            key={`${program.stadium_number}-${program.race_number}`}
            program={program}
            pastPrograms={programs}
          />
        ))}
      </main>
    </div>
  );
};
