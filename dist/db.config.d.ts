import { Exhibit } from "./exhibits/exhibit.entity";
import { User } from "./users/user.entity";
import { Comment } from "./comments/comment.entity";
export declare const dbconfig: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    entities: (typeof Comment | typeof Exhibit | typeof User)[];
};
