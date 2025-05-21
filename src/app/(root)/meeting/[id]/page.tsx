'use client';

import CaptionButton from '@/components/CaptionButton';
import ClosedCaptions from '@/components/ClosedCaptions';
import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { Call, StreamCall, StreamTheme, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react';

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
    const { user, isLoaded } = useUser();
    const [isSetupComplete, setIsSetupComplete] = useState(false);
    const { call, isCallLoading } = useGetCallById(id) as { call: Call; isCallLoading: boolean };
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [translateLanguage, setTranslateLanguage] = useState('none')
    
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(e.target.value);
        // console.log(selectedLanguage);
        
    };

    if (!isLoaded || isCallLoading) return <Loader />;

    return (
        <div className='h-screen w-full'>
            <StreamCall call={call}>
                <StreamTheme>
                    {!isSetupComplete ? (
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex items-center gap-2">
                                <label htmlFor="language-select" className="text-white">Select Call Language:</label>
                                <select
                                    id="language-select"
                                    value={selectedLanguage}
                                    onChange={handleLanguageChange}
                                    className="bg-gray-700 text-white p-2 rounded"
                                >
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                    <option value="fr">French</option>
                                    <option value="de">German</option>
                                    <option value="it">Italian</option>
                                    <option value="hi">Hindi</option>
                                    <option value="ja">Japanese</option>
                                    <option value="ko">Korean</option>
                                    <option value="nl">Dutch</option>
                                    <option value="ru">Russian</option>
                                    <option value="tr">Turkish</option>
                                </select>
                            </div>
                            <MeetingSetup 
                                setIsSetupComplete={setIsSetupComplete} 
                            
                            />
                        </div>
                    ) : (
                        <>
                            <MeetingRoom />
                            <div className="captions-container fixed top-4 right-4 flex flex-col items-end gap-2">
                                <div className="flex items-center gap-2">
                                    <CaptionButton
                                        handeleEvent={setTranslateLanguage}
                                        call={call}
                                        selectedLanguage={selectedLanguage}
                                    />
                                </div>
                                
                                {/* {selectedLanguage !== 'none' && transcription && (
                                    <div className="captions-display bg-black bg-opacity-70 text-white p-4 rounded-lg">
                                        <p className="text-center text-lg font-medium">
                                            {transcription.messages.map((msg, index) => (
                                                <span key={index}>
                                                    {msg.user.custom.fullname || msg.user.name}: {msg.text}<br />
                                                </span>
                                            ))}
                                        </p>
                                    </div>
                                )} */}
                            </div>
                            <ClosedCaptions 
                                callLanguage={selectedLanguage}
                                language={translateLanguage} className="bg-black bg-opacity-70 text-white p-4 rounded-lg max-w-7xl fixed bottom-[20%] left-1/2 transform -translate-x-1/2" />
                        </>
                    )}
                </StreamTheme>
            </StreamCall>
        </div>
    );
};

export default Meeting;