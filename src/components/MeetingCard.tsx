import Image from 'next/image';
import React from 'react';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';


interface MeetingCardProps{
    title: string;
    date: string;
    icon: string;
    isPreviousMeeting?: boolean;
    buttonIcon1?: string;
    buttonText1?: string;
    buttonIcon2?: string;
    buttonText2?: string;
    handleClick1?: () => void;
    handleClick2?: () => void;

}

const MeetingCard = ({
    icon,
    title,
    date,
    isPreviousMeeting,
    buttonIcon1,
    handleClick1,

    buttonText1,
    handleClick2,
    buttonText2,
    buttonIcon2,
}: MeetingCardProps) => {

    

    return (
        <div className='flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]'>
            <div className='flex flex-col gap-5'>
                <Image
                src={icon}
                alt='upcoming'
                width={28}
                height={28} />
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">
                            {title}
                        </h1>
                        <p className="text-base font-normal">
                            {date}
                        </p>
                    </div>
                </div>
            </div>
            <div className={cn('flex justify-center relative', {})}>

                {!isPreviousMeeting && (
                    <div className="flex gap-2">
                        <Button onClick={handleClick1} className='rounded bg-blue-1 px-6'>
                            {buttonIcon1 && (
                                <Image src={buttonIcon1} alt='feature' width={20} height={20} />
                            )}
                            &nbsp; {buttonText1}
                        </Button>

                        <Button
                        onClick={handleClick2}
                        className='bg-dark-4 px-6' >
                            { buttonIcon2 && <Image
                            src={buttonIcon2}
                            alt='feature'
                            width={20}
                            height={20} />}
                            &nbsp; {buttonText2}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
export default MeetingCard;