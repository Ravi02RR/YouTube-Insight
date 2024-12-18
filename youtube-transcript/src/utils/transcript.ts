import { YoutubeTranscript } from "youtube-transcript";

// YoutubeTranscript.fetchTranscript(
//   "https://www.youtube.com/watch?v=S2vA1h95_OwL"
// ).then(console.log);

async function getTranscript(
  url: string
): Promise<{ text: string; duration: number; offset: number; lang: string }[]> {
  const transcript = await YoutubeTranscript.fetchTranscript(url);
  return transcript.map((item) => ({
    text: item.text,
    duration: item.duration,
    offset: item.offset,
    lang: item.lang || "",
  }));
}

export default getTranscript;
