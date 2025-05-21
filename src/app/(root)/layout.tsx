import StreamVideoProviders from '@/providers/StreamClientProvider';
import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
    title: "UniTalk",
    description: "A video calling app",
    icons: {
      icon: '/icons/logo.svg'
    }
  };
const RootLayOut = ( {children}: {children : ReactNode}) => {
    return (
        <main>
            <StreamVideoProviders>
                {children}
            </StreamVideoProviders>
            
        </main>
    )
}
export default RootLayOut;