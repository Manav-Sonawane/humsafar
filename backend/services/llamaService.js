const axios = require("axios")

async function generateItinerary(userPrompt) {
    const systemPrompt = `
You are an AI travel planner.

Return ONLY JSON.

Format:

{
 "trip_summary": "",
 "days": [
   {
     "day": 1,
     "location": "",
     "activities": []
   }
 ]
}
`
    console.log("Generating itinerary for:", userPrompt);
    const response = await axios.post("http://localhost:11434/api/generate", {
        model: "llama3",
        prompt: systemPrompt + userPrompt,
        stream: false,
        format: "json"
    })
    console.log("Ollama response received.");
    const text = response.data.response;

    try {
        // Extract JSON block using regex if it's wrapped in conversational text
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const jsonString = jsonMatch ? jsonMatch[0] : text;
        return JSON.parse(jsonString);
    } catch (parseError) {
        console.error("Original text from AI:", text);
        throw new Error("Failed to parse AI response as JSON. The model may have returned conversational text instead of raw JSON.");
    }
}

module.exports = { generateItinerary }