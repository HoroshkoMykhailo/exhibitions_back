import { Exhibit } from "./exhibits/exhibit.entity";
import { User } from "./users/user.entity";
import { Comment } from "./comments/comment.entity";
import * as dotenv from "dotenv";

dotenv.config();

export const dbconfig = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? "5432", 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.DB_SYNCHRONIZE === "true",
    entities: [User, Exhibit, Comment],
}