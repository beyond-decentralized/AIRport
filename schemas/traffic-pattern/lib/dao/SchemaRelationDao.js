"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const tokens_1 = require("../tokens");
const generated_1 = require("../generated/generated");
class SchemaRelationDao extends generated_1.BaseSchemaRelationDao {
    async findAllForProperties(propertyIds) {
        let r;
        return this.db.find.tree({
            select: {},
            from: [
                r = generated_1.Q.SchemaRelation
            ],
            where: r.property.id.in(propertyIds)
        });
    }
}
exports.SchemaRelationDao = SchemaRelationDao;
di_1.DI.set(tokens_1.SCHEMA_RELATION_DAO, SchemaRelationDao);
//# sourceMappingURL=SchemaRelationDao.js.map