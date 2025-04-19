import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { text, from = 'en', to = 'fr' } = req.query;

  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text as string
      )}&langpair=${from}|${to}`
    );
    const data = await response.json();
    res.status(200).json({ translation: data.responseData.translatedText });
  } catch (error) {
    res.status(500).json({ error: 'Translation failed.' });
  }
}
