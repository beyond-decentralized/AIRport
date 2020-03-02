"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const tokens_1 = require("../tokens");
const generated_1 = require("../generated/generated");
class SchemaRelationColumnDao extends generated_1.BaseSchemaRelationColumnDao {
    async findAllForColumns(columnIds) {
        let rc;
        return this.db.find.tree({
            select: {},
            from: [
                rc = generated_1.Q.SchemaRelationColumn
            ],
            where: air_control_1.or(rc.oneColumn.id.in(columnIds), rc.manyColumn.id.in(columnIds))
        });
    }
}
exports.SchemaRelationColumnDao = SchemaRelationColumnDao;
di_1.DI.set(tokens_1.SCHEMA_RELATION_COLUMN_DAO, SchemaRelationColumnDao);
//# sourceMappingURL=SchemaRelationColumnDao.js.map