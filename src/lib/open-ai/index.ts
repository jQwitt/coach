import OpenAI from "openai";
import "@/lib/config";

export const openai = new OpenAI({
	apiKey: process.env.OPEN_AI_KEY,
});
export const MODEL = process.env.OPEN_AI_MODEL;
