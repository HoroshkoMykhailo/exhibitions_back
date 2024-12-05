"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const db_config_1 = require("./db.config");
exports.default = new typeorm_1.DataSource({
    ...db_config_1.dbconfig,
    type: 'postgres',
    migrations: ['./src/migrations/*.ts'],
});
//# sourceMappingURL=ormconfig.js.map