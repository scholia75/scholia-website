import React, { ReactNode } from 'react'

const Card = ({children}:{children:ReactNode}) => {
  return (
    <div className='rounded-lg bg-background shadow-sm border border-border'>
      {children}
    </div>
  )
}

export default Card
