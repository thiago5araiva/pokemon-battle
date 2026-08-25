import type { Move, Pokemon } from '../types/pokemon'

const BASE_URL = 'https://pokeapi.co/api/v2'
const LIMIT = 151
const MOVE_TRIES = 12
const FALLBACK_MOVE: Move = { name: 'struggle', power: 50 }

type PokemonApiResponse = {
  id: number
  name: string
  sprites: { front_default: string | null; back_default: string | null }
  types: { type: { name: string } }[]
  moves: { move: { name: string; url: string } }[]
}
type MoveApiResponse = {
  name: string
  power: number | null
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`PokeAPI response ${res.status} em ${url}`)
  return res.json() as Promise<T>
}

function normalize(value: string): string {
  return value.replace(/-/g, ' ')
}

function suffle<T>(items: readonly T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = copy[i]
    copy[i] = copy[j]
    copy[j] = tmp
  }
  return copy
}

async function fetchMove(url: string): Promise<Move | null> {
  const data = await fetchJson<MoveApiResponse>(url)
  if (data.power === null) return null
  return { name: normalize(data.name), power: data.power }
}

async function drawMove(moves: PokemonApiResponse['moves']): Promise<Move> {
  const candidates = suffle(moves).slice(0, MOVE_TRIES)
  for (const entry of candidates) {
    const move = await fetchMove(entry.move.url)
    if (move) return move
  }
  return FALLBACK_MOVE
}

export async function drawRandomPokemon(): Promise<Pokemon> {
  const id = 1 + Math.floor(Math.random() * LIMIT)
  const data = await fetchJson<PokemonApiResponse>(`${BASE_URL}/pokemon/${id}`)
  const front = data.sprites.front_default ?? ''
  const move = await drawMove(data.moves)

  return {
    id: data.id,
    name: normalize(data.name),
    front,
    move,
    back: data.sprites.back_default ?? front,
    types: data.types.map((entry) => entry.type.name),
  }
}
