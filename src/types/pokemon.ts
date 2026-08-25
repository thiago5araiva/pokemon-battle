export type Move = { name: string; power: number }
export type Pokemon = {
  id: number
  name: string
  front: string
  back: string
  types: string[]
  move: Move
}
export type BattlePhase = 'loading' | 'ready' | 'fighting' | 'done' | 'error'
export type LogLine = { id: string; text: string }
