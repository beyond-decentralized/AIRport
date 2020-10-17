import { DI } from '@airport/di';
import { SCHEMA_REFERENCE_DAO } from '../tokens';
import { BaseSchemaReferenceDao, Q, } from '../generated/generated';
export class SchemaReferenceDao extends BaseSchemaReferenceDao {
    async findAllForSchemaVersions(schemaVersionIds) {
        let sr;
        return await this.db.find.tree({
            select: {},
            from: [
                sr = Q.SchemaReference
            ],
            where: sr.ownSchemaVersion.id.in(schemaVersionIds)
        });
    }
}
DI.set(SCHEMA_REFERENCE_DAO, SchemaReferenceDao);
//# sourceMappingURL=SchemaReferenceDao.js.map