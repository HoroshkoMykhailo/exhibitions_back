import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExhibitDate1732727359224 implements MigrationInterface {
    name = 'AddExhibitDate1732727359224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exhibit" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exhibit" DROP COLUMN "createdAt"`);
    }

}
