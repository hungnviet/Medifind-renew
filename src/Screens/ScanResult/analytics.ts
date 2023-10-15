import { IScanResult } from "@/Services";

export const getAntibioticsData = (data: IScanResult[]) => {
  const antiBiotics = [];
  const sideEffects: { [effect: string]: number } = {};

  for (const res of data) {
    if (res.medicine.item.antibioticsData) {
      antiBiotics.push(res.medicine);
      for (const sideEffect of res.medicine.item.antibioticsData.sideEffects) {
        if (sideEffects[sideEffect]) sideEffects[sideEffect] += 1;
        else sideEffects[sideEffect] = 1;
      }
    }
  }
  return {
    antiBiotics,
    sideEffects,
  };
};