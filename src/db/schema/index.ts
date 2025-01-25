import * as conversations from "./conversations";
import * as exercises from "./exercises";
import * as plans from "./plans";
import * as users from "./users";
import * as workouts from "./workouts";

const schema = { ...users, ...workouts, ...exercises, ...conversations, ...plans };

export default schema;
