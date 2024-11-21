import "@/lib/config";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

import schema from "./schema";

export default drizzle(sql, { schema });
