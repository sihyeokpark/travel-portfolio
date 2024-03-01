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