"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const generated_1 = require("../generated/generated");
const tokens_1 = require("../tokens");
class SchemaColumnDao extends generated_1.BaseSchemaColumnDao {
    async findAllForEntities(entityIds) {
        let c;
        return this.db.find.tree({
            select: {},
            from: [
                c = generated_1.Q.SchemaColumn
            ],
            where: c.entity.id.in(entityIds)
        });
    }
}
exports.SchemaColumnDao = SchemaColumnDao;
di_1.DI.set(tokens_1.SCHEMA_COLUMN_DAO, SchemaColumnDao);
//# sourceMappingURL=SchemaColumnDao.js.map