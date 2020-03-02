"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const tokens_1 = require("../tokens");
const generated_1 = require("../generated/generated");
class SchemaReferenceDao extends generated_1.BaseSchemaReferenceDao {
    async findAllForSchemaVersions(schemaVersionIds) {
        let sr;
        return await this.db.find.tree({
            select: {},
            from: [
                sr = generated_1.Q.SchemaReference
            ],
            where: sr.ownSchemaVersion.id.in(schemaVersionIds)
        });
    }
}
exports.SchemaReferenceDao = SchemaReferenceDao;
di_1.DI.set(tokens_1.SCHEMA_REFERENCE_DAO, SchemaReferenceDao);
//# sourceMappingURL=SchemaReferenceDao.js.map