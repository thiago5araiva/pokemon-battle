import PokemonPlate from './components/PokemonPlate'
import PokemonSprite from './components/PokemonSprite'
import useBattle from './hooks/useBattle'
export default function App() {
  const { me, foe, phase, log, draw, battle } = useBattle()

  let koSide: 'me' | 'foe' | null = null
  if (phase === 'done' && me && foe) {
    if (me.move.power > foe.move.power) koSide = 'foe'
    else if (foe.move.power > me.move.power) koSide = 'me'
  }

  return (
    <div className="flex min-h-screen justify-center bg-paper px-10 pt-16 pb-20 text-ink">
      <div className="flex w-full max-w-225 flex-col gap-14">
        <div className="grid min-h-105 grid-cols-2 grid-rows-2 items-center gap-x-12 gap-y-10">
          {me && foe && (
            <>
              <PokemonPlate pokemon={me} />
              <div className="flex justify-center">
                <PokemonSprite
                  pokemon={me}
                  side="me"
                  knockedOut={koSide === 'me'}
                />
              </div>
              <div className="flex justify-center">
                <PokemonSprite
                  pokemon={foe}
                  side="foe"
                  knockedOut={koSide === 'foe'}
                />
              </div>
              <div className="flex justify-end">
                <PokemonPlate pokemon={foe} />
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-[1fr_auto] items-start gap-12 border-t border-line pt-7">
          <div className="flex flex-col gap-3.5">
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-mute">
              Battle log
            </span>
            <div className="flex min-h-21 flex-col gap-2 text-base leading-relaxed text-body">
              {phase === 'loading' && <p>Drawing two random Pokemon...</p>}
              {log.map((entry) => (
                <p key={entry.id}>{entry.text}</p>
              ))}
            </div>
          </div>

          <div className="flex w-45 flex-col gap-2.5 pt-6">
            <button
              onClick={battle}
              disabled={phase !== 'ready'}
              className="rounded-full border border-ink bg-ink px-4 py-3 font-medium text-paper disabled:opacity-40">
              Start Battle!
            </button>
            <button
              onClick={() => void draw()}
              className="rounded-full border border-line px-4 py-3 text-mute hover:border-mute hover:text-ink">
              Draw again
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
