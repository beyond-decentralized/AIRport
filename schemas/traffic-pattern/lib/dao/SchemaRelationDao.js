import { DI } from '@airport/di';
import { undefinedToNull } from '@airport/ground-control';
import { SCHEMA_RELATION_DAO } from '../tokens';
import { BaseSchemaRelationDao, Q, } from '../generated/generated';
export class SchemaRelationDao extends BaseSchemaRelationDao {
    async findAllForProperties(propertyIds) {
        let r;
        return this.db.find.tree({
            select: {},
            from: [
                r = Q.SchemaRelation
            ],
            where: r.property.id.in(propertyIds)
        });
    }
    async insert(schemaRelations) {
        let sr;
        const values = [];
        for (const schemaRelation of schemaRelations) {
            values.push([
                schemaRelation.id, schemaRelation.index,
                schemaRelation.property.id,
                undefinedToNull(schemaRelation.foreignKey),
                undefinedToNull(schemaRelation.manyToOneElems),
                undefinedToNull(schemaRelation.oneToManyElems),
                schemaRelation.relationType, schemaRelation.isId,
                schemaRelation.entity.id, schemaRelation.relationEntity.id,
                schemaRelation.deprecatedSinceVersion ? schemaRelation.deprecatedSinceVersion.id : null,
                schemaRelation.removedInVersion ? schemaRelation.removedInVersion.id : null,
                schemaRelation.sinceVersion ? schemaRelation.sinceVersion.id : null,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: sr = Q.SchemaRelation,
            columns: [
                sr.id,
                sr.index,
                sr.property.id,
                sr.foreignKey,
                sr.manyToOneElems,
                sr.oneToManyElems,
                sr.relationType,
                sr.isId,
                sr.entity.id,
                sr.relationEntity.id,
                sr.deprecatedSinceVersion.id,
                sr.removedInVersion.id,
                sr.sinceVersion.id
            ],
            values
        });
    }
}
DI.set(SCHEMA_RELATION_DAO, SchemaRelationDao);
//# sourceMappingURL=SchemaRelationDao.js.map