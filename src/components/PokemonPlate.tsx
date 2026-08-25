import type { Pokemon } from '../types/pokemon'

type Props = {
  pokemon: Pokemon
}

export default function PokemonPlate({ pokemon }: Props) {
  return (
    <div className="flex w-full max-w-90 items-baseline justify-between gap-5 border-y border-line py-4">
      <span className="text-2xl font-bold capitalize tracking-tight">
        {pokemon.name}
      </span>
      <span className="whitespace-nowrap text-sm capitalize text-mute">
        {pokemon.move.name} · {pokemon.move.power}
      </span>
    </div>
  )
}
