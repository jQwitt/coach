import "@/lib/config";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

import schema from "./schema";

export default drizzle(sql, { schema });
