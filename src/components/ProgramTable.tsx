import { applyBoatNumberColor } from '@/lib/applyBoatNumberColor';
import { applyWeightColor } from '@/lib/applyWeightColor';
import { findWeight } from '@/lib/findWeight';
import type { Programs } from '@/types/program';

type Props = {
  racers: Programs['programs'][number]['racers'];
  pastPrograms: Programs[];
};

export const ProgramTable = ({ racers, pastPrograms }: Props) => {
  return (
    <div className={`overflow-x-auto`}>
      <table className={`table-fixed w-full border border-gray-300 bg-white shadow rounded`}>
        <thead className={`bg-gray-100 text-gray-700 text-sm uppercase`}>
          <tr>
            <th className={`px-4 py-2 border w-[72px]`}>枠番</th>
            <th className={`px-4 py-2 border w-[120px]`}>選手名</th>
            <th className={`px-4 py-2 border w-[96px]`}>登録番号</th>
            <th className={`px-4 py-2 border w-[96px]`}>体重<br />(6日前)</th>
            {[5, 4, 3, 2, 1].map(i => (
              <th key={i} className={`px-4 py-2 border w-[96px]`}>体重<br />（{i}日前）</th>
            ))}
            <th className={`px-4 py-2 border w-[96px]`}>体重</th>
          </tr>
        </thead>

        <tbody className={`text-sm`}>
          {racers.map(racer => (
            <tr key={racer.number} className={`bg-white`}>
              <td className={`px-4 py-2 border text-center font-bold ${applyBoatNumberColor(racer.entry_number)}`}>{racer.entry_number}</td>
              <td className={`px-4 py-2 border`}>{racer.name}</td>
              <td className={`px-4 py-2 border text-center`}>{racer.number}</td>
              <td className={`px-4 py-2 border text-center`}>
                {(findWeight(pastPrograms[6], racer.number) ?? 0).toFixed(1)}kg
              </td>
              {[5, 4, 3, 2, 1].map(i => {
                const weight = findWeight(pastPrograms[i], racer.number) ?? 0;
                const previousWeight = findWeight(pastPrograms[i + 1], racer.number) ?? 0;
                return (
                  <td key={i} className={`px-4 py-2 border text-center ${applyWeightColor(weight, previousWeight)}`}>
                    {weight.toFixed(1)}kg
                  </td>
                );
              })}
              <td className={`px-4 py-2 border text-center ${applyWeightColor(racer.weight ?? 0, findWeight(pastPrograms[1], racer.number) ?? 0)}`}>
                {(racer.weight ?? 0).toFixed(1)}kg
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
