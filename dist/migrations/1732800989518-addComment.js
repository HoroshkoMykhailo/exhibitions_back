"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddComment1732800989518 = void 0;
class AddComment1732800989518 {
    constructor() {
        this.name = 'AddComment1732800989518';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "exhibitId" integer NOT NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c3ccea5d3778b018c3ba010d96c" FOREIGN KEY ("exhibitId") REFERENCES "exhibit"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c3ccea5d3778b018c3ba010d96c"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }
}
exports.AddComment1732800989518 = AddComment1732800989518;
//# sourceMappingURL=1732800989518-addComment.js.map