import * as conversations from "./conversations";
import * as exercises from "./exercises";
import * as subscriptionPlans from "./subscription_plans";
import * as users from "./users";
import * as workouts from "./workouts";

const schema = { ...users, ...workouts, ...exercises, ...conversations, ...subscriptionPlans };

export default schema;
