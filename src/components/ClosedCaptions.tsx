import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { useState, useEffect } from 'react';

interface CaptionProps {
  className: string;
  callLanguage: string;
  language: string;
}

const translateText = async (text: string, from: string, to: string) => {
  const res = await fetch(`/api/translate?text=${encodeURIComponent(text)}&from=${from}&to=${to}`);
  const data = await res.json();
  return data.translation;
};

const ClosedCaptions = ({className, callLanguage, language}: CaptionProps) => {
  const { useCallClosedCaptions, useIsCallCaptioningInProgress } = useCallStateHooks();
  const closedCaptions = useCallClosedCaptions();
  const isCaptioningInProgress = useIsCallCaptioningInProgress();
  const [translatedCaptions, setTranslatedCaptions] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Reset translations when language changes
    setTranslatedCaptions({});
  }, [language]);

  useEffect(() => {
    const translateCaptions = async () => {
      const newTranslations: { [key: string]: string } = {};
      
      for (const caption of closedCaptions) {
        const key = `${caption.user.id}-${caption.start_time}`;
        if (!translatedCaptions[key]) {
          const translation = callLanguage === language 
            ? caption.text 
            : await translateText(caption.text, callLanguage, language);
          newTranslations[key] = translation;
        }
      }
      
      setTranslatedCaptions(prev => ({ ...prev, ...newTranslations }));
    };

    if (closedCaptions.length > 0) {
      translateCaptions();
    }
  }, [closedCaptions, callLanguage, language]);

  if (!isCaptioningInProgress) return null;

  return (
    <div className={`closed-captions ${className}`}>
      {closedCaptions
        .filter(({ user, start_time }) => {
          const key = `${user.id}-${start_time}`;
          return translatedCaptions[key] !== undefined;
        })
        .map(({ user, start_time }) => {
          const key = `${user.id}-${start_time}`;
          const translated = translatedCaptions[key];
          
          return (
            <p className="closed-captions__item" key={key}>
              <span className="closed-captions__speaker">{user.name}:</span>
              <span className="closed-captions__text" lang={language}>{translated}</span>
            </p>
          );
        })}
    </div>
  );
};

export default ClosedCaptions;