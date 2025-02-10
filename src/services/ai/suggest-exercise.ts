import { MODEL, openai } from "@/lib/open-ai";

export type CreateExerciseListResult = {
	exercises: Exercise[];
};

type Exercise = { name: string; reps: number; description: string };

export const createExerciseList = async (
	muscleGroup: string,
): Promise<CreateExerciseListResult[] | null> => {
	if (!MODEL) {
		return null;
	}

	const response = await openai.chat.completions.create({
		model: "gpt-4o-mini",
		messages: [
			{
				role: "system",
				content: [
					{
						type: "text",
						text: "You are a fitness trainer helping a client find a new exercise. When they tell you a muscle group, you should recommend three exercises for them to target that muscle group best. Please make them distinct variations.",
					},
				],
			},
			{
				role: "user",
				content: [
					{
						type: "text",
						text: muscleGroup,
					},
				],
			},
		],
		response_format: {
			type: "text",
		},
		tools: [
			{
				type: "function",
				function: {
					name: "create_exercise_list",
					strict: true,
					parameters: {
						type: "object",
						required: ["exercises"],
						properties: {
							exercises: {
								type: "array",
								items: {
									type: "object",
									required: ["name", "description", "reps"],
									properties: {
										name: {
											type: "string",
											description: "The name of the exercise",
										},
										reps: {
											type: "number",
											description: "Recommended number of repetitions",
										},
										description: {
											type: "string",
											description: "A brief description of the exercise",
										},
									},
									additionalProperties: false,
								},
								description: "List of exercises",
							},
						},
						additionalProperties: false,
					},
					description: "A list of exercises, with a name, description, and recommended rep range",
				},
			},
		],
		tool_choice: {
			type: "function",
			function: {
				name: "create_exercise_list",
			},
		},
		temperature: 1,
		max_completion_tokens: 2048,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
	});

	const exercises: CreateExerciseListResult[] =
		response.choices[0].message.tool_calls
			?.filter(({ function: { name } }) => name === "create_exercise_list")
			.map((call) => ({ ...JSON.parse(call.function.arguments) }))[0].exercises ?? [];

	return exercises;
};
