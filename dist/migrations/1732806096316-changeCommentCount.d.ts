import { MigrationInterface, QueryRunner } from "typeorm";
export declare class ChangeCommentCount1732806096316 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
