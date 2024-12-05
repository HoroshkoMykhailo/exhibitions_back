"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddExhibit1732726013507 = void 0;
class AddExhibit1732726013507 {
    constructor() {
        this.name = 'AddExhibit1732726013507';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "exhibit" ("id" SERIAL NOT NULL, "imageUrl" character varying NOT NULL, "description" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_cea6ca681dbeff3b69e0961a129" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "exhibit" ADD CONSTRAINT "FK_d6cee3785c355f9169d05cf9d8e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "exhibit" DROP CONSTRAINT "FK_d6cee3785c355f9169d05cf9d8e"`);
        await queryRunner.query(`DROP TABLE "exhibit"`);
    }
}
exports.AddExhibit1732726013507 = AddExhibit1732726013507;
//# sourceMappingURL=1732726013507-addExhibit.js.map