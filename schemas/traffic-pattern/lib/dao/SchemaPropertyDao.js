"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const tokens_1 = require("../tokens");
const generated_1 = require("../generated/generated");
class SchemaPropertyDao extends generated_1.BaseSchemaPropertyDao {
    async findAllForEntities(entityIds) {
        let p;
        return this.db.find.tree({
            select: {},
            from: [
                p = generated_1.Q.SchemaProperty
            ],
            where: p.entity.id.in(entityIds)
        });
    }
}
exports.SchemaPropertyDao = SchemaPropertyDao;
di_1.DI.set(tokens_1.SCHEMA_PROPERTY_DAO, SchemaPropertyDao);
//# sourceMappingURL=SchemaPropertyDao.js.map