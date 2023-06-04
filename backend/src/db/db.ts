import {Pool} from "pg"
export const db = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "97120",
    database: "foodie2_pos_db",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis:2000
})