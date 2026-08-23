import Notes from "../models/notes.model.js";
import UserModel from "../models/user.model.js";
import { generateGeminiResponse } from "../Services/gemini.services.js";
import { buildPrompt } from "../utils/PromptBilder.js";

export const generateNotes = async (req, res) => {
    try {
        const {
            topic,
            classLevel,
            examType,
            revisionMode = false,
            includeDiagram = false,
            includeChart = false,
        } = req.body;

        // 1. Topic check
        if (!topic) {
            return res.status(400).json({
                message: "Topic is Required",
            });
        }

        // 2. Find logged-in user
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(400).json({
                message: "User Not Found",
            });
        }

        // 3. Check credits
        if (user.credits < 10) {
            user.isCreditAvailable = false;
            await user.save();

            return res.status(403).json({
                message: "Insufficient credits",
            });
        }

        // 4. Build AI prompt
        const prompt = buildPrompt({
            topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagram,
            includeChart,
        });

        // 5. Send prompt to Gemini
        const aiResponse = await generateGeminiResponse(prompt);

        // 6. Save generated notes
        const notes = await Notes.create({
            user: user._id,
            topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagram,
            includeChart,
            content: aiResponse,
        });

        // 7. Deduct credits
        user.credits -= 10;

        if (user.credits <= 0) {
            user.isCreditAvailable = false;
        }

        // 8. Add note ID to user's notes array
        if (!Array.isArray(user.notes)) {
            user.notes = [];
        }

        user.notes.push(notes._id);

        // 9. Save user
        await user.save();

        // 10. Send response to frontend
        return res.status(200).json({
            data: aiResponse,
            notesId: notes._id,
            creditLeft: user.credits,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "AI Generation Failed!",
            message: error.message,
        });
    }
};