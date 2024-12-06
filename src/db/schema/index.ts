import * as exercises from "./exercises";
import * as tags from "./tags";
import * as users from "./users";
import * as workouts from "./workouts";

const schema = { ...users, ...workouts, ...exercises, ...tags };

export default schema;
