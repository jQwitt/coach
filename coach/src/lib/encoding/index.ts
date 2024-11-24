import { Exercise, ExerciseSet } from "../types";

const SPLIT = "$";
const SET_SPLIT = "#";

export const encodeExercisesAsStrings = (exercises: Exercise[]): string[] => {
  const encoded = exercises.map((exercise) => {
    const { name, sets } = exercise;
    let result = `${name}`;

    sets.forEach((set) => {
      const { count, reps, weight } = set;
      result += `${SPLIT}${count}${SET_SPLIT}${reps}${SET_SPLIT}${weight}`;
    });

    return result;
  });

  if (encoded.length === exercises.length) {
    return encoded;
  }

  return [];
};

export const decodeStringsToExercises = (
  exercises: string[] | null
): Exercise[] => {
  if (!exercises?.length) {
    return [];
  }

  const decoded = exercises.map((exercise) => {
    const [name, ...sets] = exercise.split(SPLIT);

    return {
      name,
      sets: sets.map((set) => {
        const [count, reps, weight] = set.split(SET_SPLIT);

        return {
          count: Number(count),
          reps: Number(reps),
          weight: Number(weight),
          metadata: {},
        } satisfies ExerciseSet;
      }),
    } satisfies Exercise;
  });

  if (decoded.length === exercises.length) {
    return decoded;
  }

  return [];
};
