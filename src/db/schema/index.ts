import * as conversations from "./conversations";
import * as exercises from "./exercises";
import * as fitnessTracks from "./fitness-tracks";
import * as subscriptionPlans from "./subscription-plans";
import * as users from "./users";
import * as workouts from "./workouts";

const schema = {
	...users,
	...workouts,
	...exercises,
	...conversations,
	...subscriptionPlans,
	...fitnessTracks,
};

export default schema;
