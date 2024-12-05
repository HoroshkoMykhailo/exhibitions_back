"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1732715722529 = void 0;
class InitialMigration1732715722529 {
    constructor() {
        this.name = 'InitialMigration1732715722529';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
exports.InitialMigration1732715722529 = InitialMigration1732715722529;
//# sourceMappingURL=1732715722529-InitialMigration.js.map