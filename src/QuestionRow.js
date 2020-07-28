import React from 'react'
// noinspection ES6UnusedImports
import css from './clock.css' // eslint-disable-line no-unused-vars
import { toHandPosition } from './fromTime'

const getRotation = selector => document.querySelector(selector) &&
  document.querySelector(selector).getAttribute('data-rotation')

const cssRotation = hours => `rotateZ(${hours}deg)`

const setRotation = (elementId, rotation) => (document.getElementById(elementId)
  .style.transform = cssRotation(rotation))

export const QuestionRow = ({ hours, minutes, seconds, includeSeconds, showRow }) => {
  const hands = toHandPosition({ hours, minutes, seconds })

  React.useLayoutEffect(() => {
    // on hydrate React won't update the DOM.
    // this runs only once and forces the DOM to update
    const hoursRotation = getRotation('#hours')
    const minutesRotation = getRotation('#minutes')
    const secondsRotation = getRotation('#seconds')
    console.log('checking if should force render to update dom on hydration')
    if (hoursRotation !== hands.hours &&
      minutesRotation !== hands.minutes &&
      secondsRotation !== hands.seconds) {
      console.log({
        hours,
        minutes,
        seconds,
        hands
      }, 'forcing render')
      setRotation('hours-hand', hands.hours)
      setRotation('minutes-hand', hands.minutes)
      setRotation('seconds-hand', hands.seconds)
    }
  }, [])

  return (
    <div
      id='question-row' className='row'
      style={{ display: showRow }}
    >
      <div className='clock'>
        <div className='hours-container'>
          <div
            id='hours-hand'
            data-rotation={hands.hours}
            style={{ transform: cssRotation(hands.hours) }}
          />
        </div>
        <div className='minutes-container'>
          <div
            id='minutes-hand'
            data-rotation={hands.minutes}
            style={{ transform: cssRotation(hands.minutes) }}
          />
        </div>
        {
          includeSeconds &&
            <div className='seconds-container'>
              <div
                id='seconds-hand'
                data-rotation={hands.seconds}
                style={{ transform: cssRotation(hands.seconds) }}
              />
            </div>
        }
      </div>
    </div>
  )
}
