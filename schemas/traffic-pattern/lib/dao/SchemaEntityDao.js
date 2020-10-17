import { DI } from '@airport/di';
import { BaseSchemaEntityDao, Q, } from '../generated/generated';
import { SCHEMA_ENTITY_DAO } from '../tokens';
export class SchemaEntityDao extends BaseSchemaEntityDao {
    async findAllForSchemaVersions(schemaVersionIds) {
        let se;
        return await this.db.find.tree({
            select: {},
            from: [
                se = Q.SchemaEntity
            ],
            where: se.schemaVersion.id.in(schemaVersionIds)
        });
    }
}
DI.set(SCHEMA_ENTITY_DAO, SchemaEntityDao);
//# sourceMappingURL=SchemaEntityDao.js.map