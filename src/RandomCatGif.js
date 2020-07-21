import React from 'react'
import * as catGifs from './cat-gifs'

export const RandomCatGif = ({ question }) => {
  React.useLayoutEffect(() => {
    catGifs.addCatImage(document.getElementById('cat-gif'))
  }, [question])

  return (
    <div id='cat-gif' className='done-row'>
      Loading...
    </div>
  )
}
