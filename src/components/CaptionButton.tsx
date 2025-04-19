import { Call, OwnCapability, useCallStateHooks } from '@stream-io/video-react-sdk';
import { Captions } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useState } from 'react';

interface CaptionButtonProps {
    call: Call;
    selectedLanguage?: string;
    handeleEvent: (e: string) => void;
}

const CaptionButton = ({ call, selectedLanguage, handeleEvent }: CaptionButtonProps) => {
    console.log(selectedLanguage);

    // here fix it
    const { useIsCallCaptioningInProgress, useHasPermissions } = useCallStateHooks();
    const isCaptioningInProgress = useIsCallCaptioningInProgress();
    const [selected, setSelected] = useState('none');
    const canToggleClosedCaptions = useHasPermissions(
        OwnCapability.START_CLOSED_CAPTIONS_CALL,
        OwnCapability.STOP_CLOSED_CAPTIONS_CALL,
    );

    return (
        <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <div className={`relative cursor-pointer  px-3 py-1 text-md  rounded-md bg-gray-800`}>
          <Captions
            className={`caption-top w-6 h-6 transition-colors ${
              isCaptioningInProgress? "invert" : ""
            }`}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
      className='bg-dark-2 w-48 max-h-60 overflow-y-auto text-white'
      >
        <DropdownMenuRadioGroup 
          
          value= {selected}
          onValueChange={(e)=>{
            console.log(e);
            setSelected(e);
            
            if(e === 'none'){
              call.stopClosedCaptions();
            } else {
              handeleEvent(e);
              if(!isCaptioningInProgress){
                call.startClosedCaptions();
              }
            }
          }}
        >
          <DropdownMenuRadioItem 
            value="none"
            className="data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700 text-white  hover:bg-blue-50 hover:text-blue-600 transition-colors h-10"
          >
            Disable Captions
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="en"
            className="data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            English
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="de"
            className="data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            German
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="es"
            className="data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            Spanish
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="fr"
            className="data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            French
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="hi"
            className="data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            Hindi
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="it"
            className="data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            Italian
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="ja"
            className="data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            Japanese
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="ko"
            className="data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            Korean
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="nl"
            className="data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            Dutch
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="ru"
            className="data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            Russian
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="tr"
            className="data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            Turkish
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="pt"
            className="data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            Portuguese
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="zh"
            className="data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            Chinese
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="ar"
            className="data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            Arabic
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="bn"
            className="data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            Bengali
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="pl"
            className="data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            Polish
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="uk"
            className="data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            Ukrainian
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="sv"
            className="data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            Swedish
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="fi"
            className="data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            Finnish
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="no"
            className="data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            Norwegian
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="da"
            className="data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            Danish
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    );
};

export default CaptionButton;


