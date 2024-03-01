import { atom } from 'recoil'

export const ContinentsTypeState = atom<number[][]>({
  key: 'ContinentsTypeState',
  default: []
})

export const TravelState = atom<number[][]>({
  key: 'TravelState',
  default: [[1360, 341]]
})