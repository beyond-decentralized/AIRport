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
    async insert(schemaReferences) {
        let sr;
        const values = [];
        for (const schemaReference of schemaReferences) {
            values.push([
                schemaReference.ownSchemaVersion.id,
                schemaReference.referencedSchemaVersion.id,
                schemaReference.index,
                schemaReference.deprecatedSinceVersion ? schemaReference.deprecatedSinceVersion.id : null,
                schemaReference.removedInVersion ? schemaReference.removedInVersion.id : null,
                schemaReference.sinceVersion ? schemaReference.sinceVersion.id : null,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: sr = Q.SchemaReference,
            columns: [
                sr.ownSchemaVersion.id,
                sr.referencedSchemaVersion.id,
                sr.index,
                sr.deprecatedSinceVersion.id,
                sr.removedInVersion.id,
                sr.sinceVersion.id
            ],
            values
        });
    }
}
DI.set(SCHEMA_REFERENCE_DAO, SchemaReferenceDao);
//# sourceMappingURL=SchemaReferenceDao.js.map