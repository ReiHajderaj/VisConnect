'use client'

import React from 'react';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import { sideBarLinks } from '../constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const MobileNav = () => {

    const pathname = usePathname();
    return (
        <div className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger asChild>
                    <Image
                        src='/icons/hamburger.svg'
                        width={36}
                        height={36}
                        alt='hamburger icon'
                        className='cursor-pointer sm:hidden' />
                </SheetTrigger>
                <SheetContent side='left' className='border-none bg-dark-1'>
                    <Link href='/' className='flex items-center gap-1'>
                        <Image
                            src='/icons/logo.svg'
                            width={32}
                            height={32}
                            alt='Loggo'
                            className='max-sm:size-10' />
                        <p className='text-[26px] font-extrabold text-white'>VoxTrans</p>
                    </Link>

                    <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                        <SheetClose asChild>
                            <div className='flex h-full flex-col gap-6 pt-16 text-white'>
                                {sideBarLinks.map((link) => {
                                    const isActive = pathname ? (pathname === link.route || pathname.startsWith(`${link.route}/`)) : false;

                                    return (
                                        <SheetClose asChild key={link.route}>
                                            <Link
                                                href={link.route}
                                                key={link.lablel}
                                                className={cn('flex gap-4 items-center p-4 rounded-lg w-full max-w-60', {
                                                    'bg-blue-1': isActive,
                                                })}>
                                                <Image
                                                    src={link.imageUrl}
                                                    alt={link.lablel}
                                                    width={20}
                                                    height={20} />

                                                <p className="font-semibold">
                                                    {link.lablel}
                                                </p>
                                            </Link>
                                        </SheetClose>

                                    )
                                })}
                            </div>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
export default MobileNav;