import { atom } from "jotai";

export const unlockedLevelsAtom = atom<string[]>(["easy"]);
export const scoreAtom = atom<number>(0);
