import type { Pokemon } from '../types/pokemon'

type Props = {
  pokemon: Pokemon
  side: 'me' | 'foe'
  knockedOut: boolean
}
export default function PokemonSprite({ pokemon, side, knockedOut }: Props) {
  const knockedOutStyle = knockedOut
    ? 'animate-shake opacity-25 grayscale'
    : 'animate-bob'
  return (
    <div className="flex flex-col items-center">
      <img
        src={side === 'foe' ? pokemon.front : pokemon.back}
        alt={pokemon.name}
        width={176}
        height={176}
        className={knockedOutStyle}
      />
    </div>
  )
}
