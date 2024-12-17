import React from 'react'
import { BellIcon} from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
const AlertsBox = () => {
  return (
    <div>
      <Button className='rounded-full border p-1 bg-default-50 hover:bg-primary/5' isIconOnly aria-label="bell" variant='bordered'>
     <BellIcon className='size-6 text-default-500 hover:text-primary'/>
      </Button>
    </div>
  )
}

export default AlertsBox
