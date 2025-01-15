import * as exercises from "./exercises";
import * as plans from "./plans";
import * as tags from "./tags";
import * as users from "./users";
import * as workouts from "./workouts";

const schema = { ...users, ...workouts, ...exercises, ...tags, ...plans };

export default schema;
