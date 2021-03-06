const nextRandom = (max) => Math.floor(Math.random() * max) + 1

let hours = nextRandom(12)
let minutes = nextRandom(59)
let seconds = nextRandom(59)

export const triggerNext = () => {
  hours = nextRandom(12)
  minutes = nextRandom(59)
  seconds = nextRandom(59)
  return read()
}

export const checkAnswer = (a, includeSeconds) => {
  const skipOrCheckSeconds = !includeSeconds || a.seconds === seconds
  const allMatch = a.hours === hours && a.minutes === minutes && skipOrCheckSeconds
  console.log({
    checking: a,
    correct: read(),
    includeSeconds,
    allMatch
  })
  return allMatch
}
export const read = () => ({ hours, minutes, seconds })

console.log({ time: read() })
