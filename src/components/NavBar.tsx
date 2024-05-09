import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import MobileNav from './MobileNav';
import { SignedIn, UserButton } from '@clerk/nextjs';

const NavBar = () => {
    return (
        <div className='flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
            <Link href='/' className='flex items-center gap-1'>
                <Image
                src='/icons/logo.svg'
                width={32}
                height={32}
                alt='Loggo'
                className='max-sm:size-10' />
                <p className='text-[26px] font-extrabold text-white max-sm:hidden'>Visconnect</p>
            </Link>

            <div className='flex-between gap-5'>
                <SignedIn>
                    <UserButton appearance={{
                        
                        variables: {
                            colorBackground: '#1C1F2E',
                            colorText: '#FFF',
                            colorTextSecondary: '#fff'
                            
                        }
                    }}></UserButton>
                </SignedIn>

                


                <MobileNav />
            </div>
        </div>
    )
}
export default NavBar;