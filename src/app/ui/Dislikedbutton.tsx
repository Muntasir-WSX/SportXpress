'use client'

import React from 'react'

const Dislikedbutton = ({blogSlug}:{blogSlug: string []}) => {
  return (
    <button onClick={() => console.log(`Disliking blog: ${blogSlug}`)}>Dislike</button>
  )
}

export default Dislikedbutton