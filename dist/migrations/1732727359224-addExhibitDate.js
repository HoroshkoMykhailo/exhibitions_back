"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddExhibitDate1732727359224 = void 0;
class AddExhibitDate1732727359224 {
    constructor() {
        this.name = 'AddExhibitDate1732727359224';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "exhibit" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "exhibit" DROP COLUMN "createdAt"`);
    }
}
exports.AddExhibitDate1732727359224 = AddExhibitDate1732727359224;
//# sourceMappingURL=1732727359224-addExhibitDate.js.map