import React from 'react'
import { SunIcon} from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
const ModeToggle = () => {
  return (
    <div>
        <Button isIconOnly variant='bordered' aria-label="mode"  className='rounded-full border p-1 ' >
        <SunIcon className='size-6 text-default-500'/>
      </Button>
    </div>
  )
}

export default ModeToggle
