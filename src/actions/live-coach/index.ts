import { MODEL, openai } from "@/lib/open-ai";
import { hasForbiddenCharacters } from "@/lib/utils";

export async function determineTrainingIntent(userMsg: string) {
	if (!MODEL) {
		return null;
	}

	if (hasForbiddenCharacters(userMsg)) {
		return null;
	}

	const response = await openai.chat.completions.create({
		model: MODEL,
		messages: [
			{
				role: "system",
				content: [
					{
						type: "text",
						text: 'You are a fitness coach trying to determine the intent of a client\'s quest, use "training_intent" and return valid JSON',
					},
				],
			},
			{
				role: "user",
				content: [
					{
						type: "text",
						text: userMsg,
					},
				],
			},
		],
		response_format: {
			type: "json_object",
		},
		tools: [
			{
				type: "function",
				function: {
					name: "training_intent",
					description: "Determine the user's intent, muscle group and exercise",
					parameters: {
						type: "object",
						properties: {
							intent: {
								type: "string",
								description:
									"The intent of the user, can be 'design a workout', 'view analytics', 'suggest an exercise', or 'determine exercise weight'",
							},
							muscleGroup: {
								type: "string",
								description: "Any muscle groups the user is asking about",
							},
							exercise: {
								type: "string",
								description: "The name of any specific exercise movements the user mentions",
							},
						},
						additionalProperties: false,
						required: ["intent", "muscleGroup", "exercise"],
					},
					strict: true,
				},
			},
		],
		temperature: 1,
		max_completion_tokens: 250,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
	});

	const trainingIntents = response.choices[0].message.tool_calls
		?.filter(({ function: { name } }) => name === "training_intent")
		.map((call) => ({ ...JSON.parse(call.function.arguments) }));

	return trainingIntents?.[0]; // return first intent for the time being
}
