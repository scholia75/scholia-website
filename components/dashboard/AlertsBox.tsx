import React from 'react'
import { BellIcon} from '@heroicons/react/24/outline';
import { Badge, Button } from '@nextui-org/react';
const AlertsBox = () => {
  return (
    <Badge color="danger" content="99+" shape="circle">
    <Button isIconOnly aria-label="bell" radius="full" variant="bordered" className='border'  >
    <BellIcon className='size-6 text-default-500'/>
    </Button>
  </Badge>
  )
}

export default AlertsBox
