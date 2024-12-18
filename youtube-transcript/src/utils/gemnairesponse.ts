const { GoogleGenerativeAI } = require("@google/generative-ai");

const extract = require("extract-json-from-string");
// console.log(process.env.GEMNAI);
const genAI = new GoogleGenerativeAI(process.env.GEMNAI as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function genrate_summry(
  transcriptData: Array<{
    text: string;
    duration: number;
    offset: number;
    lang: string;
  }>
): Promise<any> {
  //   console.log(transcriptData);
  const formattedTranscript = transcriptData
    .map((item) => `- [${item.offset.toFixed(2)}s] ${item.text}`)
    .join("\n");

  const prompt = `
      Perform a comprehensive and nuanced analysis of the video transcript with the following detailed requirements:
      
      1. Break down the transcript into meaningful segments
      2. Provide precise timestamps
      3. Create descriptive, context-rich titles
      4. Write detailed descriptions that capture key insights, main points, and contextual significance
      
      JSON Output Structure:
      [
        {
          "timestamp": "hh:mm:ss ", 
          "title": "Concise, Informative Segment Title",
          "keyTopics": ["Topic1", "Topic2"], 
          "description": "Comprehensive segment description (minimum 400 characters)",
          
          
        }
      ]
      
      Analysis Guidelines:
      - Capture semantic meaning, not just literal transcription
      - Highlight critical information, transitions, and narrative arcs
      - Provide scholarly, objective analysis
      - Ensure JSON validity and comprehensive coverage
      
      Transcript: ${formattedTranscript}
      `;

  try {
    const result = await model.generateContent(prompt);

    const rawResponse = result.response.text();
    console.log("Raw AI Response:", rawResponse);

    // if (
    //   !rawResponse.trim().startsWith("[") &&
    //   !rawResponse.trim().startsWith("{")
    // ) {
    //   throw new Error("AI response is not in JSON format.");
    // }

    // const sanitizedResponse = rawResponse
    //   .replace(/,\s*]/g, "]")
    //   .replace(/,\s*}/g, "}");
    // const analysis = extract(rawResponse);

    return extract(rawResponse);
  } catch (error) {
    console.error("Error generating analysis:", error);
    throw new Error("Failed to generate detailed analysis.");
  }
}

export default genrate_summry;
