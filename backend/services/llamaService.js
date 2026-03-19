const axios = require("axios")

async function generateItinerary(userPrompt) {
    const systemPrompt = `
                You are a travel planner.

                STRICT RULES:
                - Return ONLY valid JSON
                - Do NOT add explanations
                - Do NOT add text outside JSON
                - Do NOT use markdown

                FORMAT:

                {
                "trip_summary": "string",
                "days": [
                {
                    "day": number,
                    "location": "string",
                    "activities": ["string"]
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
    const raw = response.data.response;
    console.log("RAW LLM OUTPUT:\n", raw);

    try {
        const clean = extractJSON(raw);
        const parsed = JSON.parse(clean);

        if (!parsed.days || !Array.isArray(parsed.days)) {
            throw new Error("Invalid AI response structure");
        }

        return parsed;
    } catch (parseError) {
        console.error("Extraction error:", parseError.message);
        throw new Error("Failed to parse AI response. The model output was not valid JSON or was missing the required fields.");
    }
}

function extractJSON(text) {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1) return text;
    return text.substring(start, end + 1);
}

module.exports = { generateItinerary }