import { Request, Response } from "express";

import getTranscriptText from "../utils/transcript";
import genrate_summry from "../utils/gemnairesponse";

export const getTranscript = async (req: Request, res: Response) => {
  try {
    const videoUrl = req.query.url as string;

    const transcript = await getTranscriptText(videoUrl);

    const transcriptData = transcript.map((item) => ({
      text: item.text,
      duration: item.duration,
      offset: item.offset,
      lang: item.lang,
    }));

    const summary = await genrate_summry(transcriptData);

    res.send({
      //   transcript: transcriptData,
      summary,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
};
