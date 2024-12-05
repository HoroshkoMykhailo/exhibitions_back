"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeCommentCount1732806096316 = void 0;
class ChangeCommentCount1732806096316 {
    constructor() {
        this.name = 'ChangeCommentCount1732806096316';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "exhibit" ADD "commentCount" integer NOT NULL DEFAULT '0'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "exhibit" DROP COLUMN "commentCount"`);
    }
}
exports.ChangeCommentCount1732806096316 = ChangeCommentCount1732806096316;
//# sourceMappingURL=1732806096316-changeCommentCount.js.map