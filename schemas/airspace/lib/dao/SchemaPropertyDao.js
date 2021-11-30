import { DI } from '@airport/di';
import { SCHEMA_PROPERTY_DAO } from '../tokens';
import { BaseSchemaPropertyDao, Q, } from '../generated/generated';
export class SchemaPropertyDao extends BaseSchemaPropertyDao {
    async findAllForEntities(entityIds) {
        let p;
        return this.db.find.tree({
            select: {},
            from: [
                p = Q.SchemaProperty
            ],
            where: p.entity.id.in(entityIds)
        });
    }
    async insert(schemaProperties) {
        let sp;
        const values = [];
        for (const schemaProperty of schemaProperties) {
            values.push([
                schemaProperty.id, schemaProperty.index,
                schemaProperty.name, schemaProperty.isId,
                schemaProperty.entity.id,
                schemaProperty.deprecatedSinceVersion ? schemaProperty.deprecatedSinceVersion.id : null,
                schemaProperty.removedInVersion ? schemaProperty.removedInVersion.id : null,
                schemaProperty.sinceVersion ? schemaProperty.sinceVersion.id : null,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: sp = Q.SchemaProperty,
            columns: [
                sp.id,
                sp.index,
                sp.name,
                sp.isId,
                sp.entity.id,
                sp.deprecatedSinceVersion.id,
                sp.removedInVersion.id,
                sp.sinceVersion.id
            ],
            values
        });
    }
}
DI.set(SCHEMA_PROPERTY_DAO, SchemaPropertyDao);
//# sourceMappingURL=SchemaPropertyDao.js.map