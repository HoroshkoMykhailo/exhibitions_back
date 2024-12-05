import { MigrationInterface, QueryRunner } from "typeorm";
export declare class InitialMigration1732715722529 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
