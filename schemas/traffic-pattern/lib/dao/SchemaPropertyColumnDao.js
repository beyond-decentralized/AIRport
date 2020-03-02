"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const generated_1 = require("../generated/generated");
const tokens_1 = require("../tokens");
class SchemaPropertyColumnDao extends generated_1.BaseSchemaPropertyColumnDao {
    async findAllForColumns(columnIds) {
        let rc;
        return this.db.find.tree({
            select: {},
            from: [
                rc = generated_1.Q.SchemaPropertyColumn
            ],
            where: rc.column.id.in(columnIds)
        });
    }
}
exports.SchemaPropertyColumnDao = SchemaPropertyColumnDao;
di_1.DI.set(tokens_1.SCHEMA_PROPERTY_COLUMN_DAO, SchemaPropertyColumnDao);
//# sourceMappingURL=SchemaPropertyColumnDao.js.map