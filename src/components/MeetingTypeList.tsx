'use client'

// import Image from 'next/image';
import React, { useState } from 'react';
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from './ui/use-toast';
import { Textarea } from './ui/textarea';

import { Input } from './ui/input';

import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
// import 'react-calendar/dist/Calendar.css';
// import 'react-clock/dist/Clock.css';

const MeetingTypeList = () => {

    const router = useRouter();
    
    

    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();

    const { user } = useUser();
    // console.log(user?.fullName);
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: '',
    });

    const [callDetails, setCallDetails] = useState<Call>();
    const { toast } = useToast();


    const createMeeting = async () => {
        if (!client || !user) return;

        try {

            if (!values.dateTime) {
                toast({
                    title: 'Select date and time',
                })
                return;
            }
            const id = crypto.randomUUID();
            const call = client.call('default', id);

            if (!call) throw new Error('Failed to create call');

            const startsAt = values.dateTime.toISOString();



            const description = values.description || 'Instant meeting';

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                }
            })

            setCallDetails(call);

            if (!values.description) {
                router.push(`/meeting/${call.id}`);
            }

            toast({
                title: 'Meating Created',
            })
        } catch (error) {
            // console.log(error)
            toast({
                title: 'Failed to create meeting',
            })
        }
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

    return (
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCard
                img='/icons/add-meeting.svg'
                title='New Meeting'
                description='Start an instant meeting'
                handleClick={() => { setMeetingState('isInstantMeeting') }}
                className='bg-yellow-1' />
            <HomeCard
                img='/icons/schedule.svg'
                title='Schedule Meeting'
                description='Plan your meeting'
                handleClick={() => { setMeetingState('isScheduleMeeting') }}
                className='bg-purple-1' />
            <HomeCard
                img='/icons/recordings.svg'
                title='View Records'
                description='Check out your recordings'
                handleClick={() => { router.push('/recordings') }}
                className='bg-orange-1' />
            <HomeCard
                img='/icons/join-meeting.svg'
                title='Join Meeting'
                description='Join meeting with a link'
                handleClick={() => { setMeetingState('isJoiningMeeting') }}
                className='bg-blue-1' />

            {!callDetails ? (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title='Create meeting'
                    handleClick={createMeeting}  >
                    <div className="flex flex-col gap-2.5">
                        <label className='text-base text-normal leading-[22px] text-sky-2'>
                            Add a description
                            <Textarea className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0 '
                                onChange={(e) => {
                                    setValues({ ...values, description: e.target.value })
                                }} />


                        </label>
                    </div>
                    <div className="flex w-full flex-col gap-2.5">
                        <label className='text-base text-normal leading-[22px] text-sky-2'>
                            Select date and time
                            <DateTimePicker
                                value={values.dateTime}
                                onChange={(date) => {
                                    setValues({ ...values, dateTime: date as Date })
                                }}
                                format="y-M-dd h:mm a"
                                clearIcon={null}
                                calendarIcon={null}
                                disableClock={true}
                                minDate={new Date()}
                                className="w-full rounded bg-dark-3 p-2 focus:outline-none "
                            />
                        </label>

                    </div> </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title='Meeting Created'
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        toast({ title: 'Link copied' })
                    }}
                    image='/icons/checked.svg'
                    buttonIcon='/icons/copy.svg'
                    buttonText='Copy Meeting link'
                />



            )}

            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title='Start an Instant Meeting'
                className='text-center'
                buttonText='Start Meeting'
                handleClick={createMeeting} />

            <MeetingModal
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(undefined)}
                title='Type link here'
                handleClick={() => {
                 router.push(values.link)}}
                
                image='/icons/checked.svg'
                buttonIcon='/icons/copy.svg'
                buttonText='Join Meeting'
            > 
                <Input placeholder='Meeting link' className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
                onChange={(e) => setValues({...values, link: e.target.value})} />
            </MeetingModal>
        </div>
    )
}
export default MeetingTypeList;