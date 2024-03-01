import { atom } from 'recoil'


export interface IContinents {
  continents: number[][]
}

export const ContinentsState = atom<IContinents>({
  key: 'ContinentsState',
  default: {
    continents: []
  }
});

export const TravelState = atom<IContinents>({
  key: 'TravelState',
  default: {
    continents: [[1360, 341]]
  }
});