import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
    title: "VoxTrans",
    description: "A video calling app",
    icons: {
      icon: '/icons/logo.svg'
    }
  };

const HomeLayout = ( {children}: {children : ReactNode}) => {
    return (
        <main className='relative'>
            <NavBar />

            <div className="flex">
                <SideBar />

                <div className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'>
                    <div className='w-full'>
                        {children}
                    </div>

                </div>
            </div>


            
        </main>
    )
}
export default HomeLayout;

