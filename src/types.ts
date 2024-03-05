export type FunctionComponent<P = {}> = React.FC<
  {
    children?: React.ReactNode;
  } & P
>;

export type Workout = {
  date: Date;
  exercises: Array<Exercise>;
  notes: String;
};

export type Exercise = {
  name: String;
  sets: Array<Set>;
};

export type Set = {
  reps: Number;
  weight: Number;
};
