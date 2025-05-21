
// @ts-nocheck 

'use client';

import { useGetCalls } from '@/hooks/useGetCalls';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import MeetingCard from './MeetingCard';
import Loader from './Loader';
import { toast, useToast } from './ui/use-toast';

const CallList = ({ type }: ({ type: 'ended' | 'upcoming' | 'recordings' })) => {
    const { endedCalls, upcomingCalls, callRecordings, isLoding } = useGetCalls();
    const router = useRouter();

    const { toast } = useToast();



    const [recordings, setRecordings] = useState<CallRecording[]>([]);

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'recordings':
                return recordings;
            case 'upcoming':
                return upcomingCalls;
            default:
                return [];

        }
    }
    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return 'No Previous Calls';
            case 'recordings':
                return 'No Recordings from the past 2 weeks';
            case 'upcoming':
                return 'No Upcoming Calls';
            default:
                return '';

        }
    }

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const callData = await Promise.all(callRecordings.map((meeting) => meeting.queryRecordings()));
                // callData.map((call) =>{
                //     console.log(call.recordings[0]);
                    
                // })
                
                
                const recordings = callData.filter(
                    (call) => 
                        call.recordings.length > 0
                             && new Date(call.recordings[0]?.start_time) > new Date(Date.now()-14*24*60*60*1000)
                            
                ).flatMap(call => call.recordings);
                // recordings.map((call) =>{
                //     console.log( await  call);
                    
                // })

                setRecordings(recordings);
                // console.log(recordings);
                
            } catch (error) {
                toast({title: 'Try again later'})
            }

        }

        if (type === 'recordings') fetchRecordings();
    }, [toast,type, callRecordings])

    const calls = getCalls();
    // console.log(calls);
    
    const noCallMessage = getNoCallsMessage();

    if (isLoding) return <Loader />
    return (
        <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
            {calls && calls.length > 0 ? calls.map(
                (meeting: Call | CallRecording) => {
                // console.log(meeting);
                
                return(
                    <MeetingCard
                        key={(meeting as Call)?.id}
                        icon={
                            type === 'ended' ?
                                '/icons/previous.svg'
                                : type === 'upcoming' ?
                                    '/icons/upcoming.svg' :
                                    '/icons/recordings.svg'
                        }
                        title={(meeting as Call).state?.custom?.description?.substring(0, 26) || meeting?.filename?.substring(0, 20) || 'Personal Call'}
                        date={meeting.state?.startsAt.toLocaleString() || new Date(meeting.start_time)?.toLocaleString()}
                        isPreviousMeeting={type === 'ended'}
                        buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
                        buttonText1={type === 'recordings' ? 'Play' : 'Start'}
                        handleClick1={type === 'recordings' ?
                            () => router.push(`${meeting.url}`) :
                            () => router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`)
                        }
                        buttonIcon2={type === 'recordings' ? '/icons/download.svg': '/icons/copy.svg'}
                        buttonText2={type === 'recordings' ? 'Download': 'Copy Link'}
                        handleClick2={type === 'recordings' ? 
                            () =>{
                                // Automatically download the file from the meeting.url without creating an <a> element
                                fetch(meeting.url)
                                    .then(response => response.blob())
                                    .then(blob => {
                                        const url = window.URL.createObjectURL(blob);
                                        const filename = meeting.filename || 'recording.mp4';
                                        // Use the FileSaver API if available, otherwise fallback to programmatic download
                                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                                            window.navigator.msSaveOrOpenBlob(blob, filename);
                                        } else {
                                            const tempLink = document.createElement('a');
                                            tempLink.style.display = 'none';
                                            tempLink.href = url;
                                            tempLink.download = filename;
                                            document.body.appendChild(tempLink);
                                            tempLink.click();
                                            document.body.removeChild(tempLink);
                                            window.URL.revokeObjectURL(url);
                                        }
                                    });
                                
                            }:
                            () => {

                                navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`);
                                toast({title:'Link Copied',})
                            }
                        }
                        // link={type === 'recordings' ? meeting.url : `}
                    />
                )}
            ) : (
                <h1>{noCallMessage}</h1>
            )}

        </div>
    )
}
export default CallList;