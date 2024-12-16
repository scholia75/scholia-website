
'use client'
import React, { ReactNode } from 'react'
import {NextUIProvider} from "@nextui-org/react";
const NextUiProvider = ({children}:{children:ReactNode}) => {
  return (
   <>
    <NextUIProvider>
      {children}
    </NextUIProvider>
   </>
  )
}

export default NextUiProvider
