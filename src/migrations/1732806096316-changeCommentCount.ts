import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeCommentCount1732806096316 implements MigrationInterface {
    name = 'ChangeCommentCount1732806096316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exhibit" ADD "commentCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exhibit" DROP COLUMN "commentCount"`);
    }

}
