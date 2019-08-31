"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const generated_1 = require("../generated/generated");
const diTokens_1 = require("../diTokens");
class SchemaEntityDao extends generated_1.BaseSchemaEntityDao {
    async findAllForSchemaVersions(schemaVersionIds) {
        let se;
        return await this.db.find.tree({
            select: {},
            from: [
                se = generated_1.Q.SchemaEntity
            ],
            where: se.schemaVersion.id.in(schemaVersionIds)
        });
    }
}
exports.SchemaEntityDao = SchemaEntityDao;
di_1.DI.set(diTokens_1.SCHEMA_ENTITY_DAO, SchemaEntityDao);
//# sourceMappingURL=SchemaEntityDao.js.map