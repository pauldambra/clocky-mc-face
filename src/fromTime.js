export function toHandPosition ({ hours, minutes, seconds }) {
  return {
    hours: (hours * 30) + (minutes / 2),
    minutes: (minutes * 6),
    seconds: (seconds * 6)
  }
}
