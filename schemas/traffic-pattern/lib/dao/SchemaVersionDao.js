"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("../diTokens");
const generated_1 = require("../generated/generated");
class SchemaVersionDao extends generated_1.BaseSchemaVersionDao {
    /*
    async findAllLatestForSchemaIndexes(
        schemaIndexes: SchemaIndex[]
    ): Promise<ISchemaVersion[]> {
        let sv: QSchemaVersion

        return await this.db.find.tree({
            from: [
                sv = Q.SchemaVersion
            ],
            select: {},
            where: and(
                sv.id.in(this.idsForMaxVersionSelect()),
                sv.schema.index.in(schemaIndexes)
            )
        })
    }
    */
    async findAllActiveOrderBySchemaIndexAndId() {
        let sv;
        // let s: QSchema
        return await this.db.find.tree({
            from: [
                sv = generated_1.Q.SchemaVersion,
            ],
            select: {},
            orderBy: [
                sv.schema.index.asc(),
                sv.id.desc()
            ]
        });
    }
}
exports.SchemaVersionDao = SchemaVersionDao;
di_1.DI.set(diTokens_1.SCHEMA_VERSION_DAO, SchemaVersionDao);
//# sourceMappingURL=SchemaVersionDao.js.map