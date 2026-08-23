const Gemini_URL =
    "https://generativelanguage.googleapis.com/v1beta/interactions";

export const generateGeminiResponse = async (prompt) => {
    try {
        const response = await fetch(Gemini_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": process.env.GEMINI_API_KEY
            },

            body: JSON.stringify({
                model: "gemini-3.6-flash",
                input: prompt
            })
        });

        if (!response.ok) {
            const err = await response.text();

            console.error("Gemini API Error:", err);

            throw new Error(err);
        }

        const data = await response.json();

        console.log("GEMINI RESPONSE:", data);

        // 🔥 Find model output step
        const modelOutputStep = data.steps?.find(
            (step) => step.type === "model_output"
        );

        // 🔥 Find text inside model output
        const textContent = modelOutputStep?.content?.find(
            (content) => content.type === "text"
        );

        const text = textContent?.text;

        if (!text) {
            throw new Error("No text returned from Gemini");
        }

        // Remove markdown JSON fences
        const cleanText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(cleanText);

    } catch (error) {
        console.error("Gemini Fetch Error:", error.message);

        throw new Error("Gemini API fetch failed!");
    }
};