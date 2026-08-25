import { useCallback, useEffect, useState } from 'react'
import { drawRandomPokemon } from '../api/pokemon'
import type { BattlePhase, LogLine, Pokemon } from '../types/pokemon'

function line(text: string): LogLine {
  return { id: crypto.randomUUID(), text }
}

export default function useBattle() {
  const [me, setMe] = useState<Pokemon | null>(null)
  const [foe, setFoe] = useState<Pokemon | null>(null)
  const [phase, setPhase] = useState<BattlePhase>('loading')
  const [log, setLog] = useState<LogLine[]>([])

  const draw = useCallback(async () => {
    setPhase('loading')
    setLog([])
    try {
      const [nextMe, nextFoe] = await Promise.all([
        drawRandomPokemon(),
        drawRandomPokemon(),
      ])
      setMe(nextMe)
      setFoe(nextFoe)
      setPhase('ready')
      setLog([line(`${nextMe.name} vs ${nextFoe.name}. Ready to battle!`)])
    } catch {
      setPhase('error')
      setLog([line(`Could not reach the Pokemon API. Try again.`)])
    }
  }, [])

  const battle = useCallback(() => {
    if (!me || !foe) return
    const lines = [
      line(`${me.name} attacks with ${me.move.name} (${me.move.power})`),
      line(`${foe.name} attacks with ${foe.move.name} (${foe.move.power})`),
    ]
    if (me.move.power === foe.move.power) {
      lines.push(line('Draw'))
    } else {
      const winner = me.move.power > foe.move.power ? me : foe
      const loser = winner === me ? foe : me
      lines.push(
        line(
          `${winner.name} lands a decisive blow with ${winner.move.name} knocking out ${loser.name}!`,
        ),
      )
    }
    setLog((prev) => [...prev, ...lines])
    setPhase('done')
  }, [me, foe])

  useEffect(() => {
    void draw()
  }, [draw])

  return { me, foe, phase, log, draw, battle }
}
