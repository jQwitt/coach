import * as tags from "./tags";
import * as users from "./users";
import * as workouts from "./workouts";

const schema = { ...users, ...workouts, ...tags };

export default schema;
