import { DI } from '@airport/di';
import { undefinedToNull } from '@airport/ground-control';
import { BaseSchemaColumnDao, Q } from '../generated/generated';
import { SCHEMA_COLUMN_DAO } from '../tokens';
export class SchemaColumnDao extends BaseSchemaColumnDao {
    async findAllForEntities(entityIds) {
        let c;
        return this.db.find.tree({
            select: {},
            from: [
                c = Q.SchemaColumn
            ],
            where: c.entity.id.in(entityIds)
        });
    }
    async insert(schemaColumns) {
        let sc;
        const values = [];
        for (const schemaColumn of schemaColumns) {
            values.push([
                schemaColumn.id, schemaColumn.index,
                undefinedToNull(schemaColumn.idIndex),
                schemaColumn.isGenerated,
                undefinedToNull(schemaColumn.allocationSize),
                schemaColumn.name,
                schemaColumn.notNull,
                undefinedToNull(schemaColumn.precision),
                undefinedToNull(schemaColumn.scale),
                schemaColumn.type,
                schemaColumn.entity.id,
                schemaColumn.deprecatedSinceVersion ? schemaColumn.deprecatedSinceVersion.id : null,
                schemaColumn.removedInVersion ? schemaColumn.removedInVersion.id : null,
                schemaColumn.sinceVersion ? schemaColumn.sinceVersion.id : null,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: sc = Q.SchemaColumn,
            columns: [
                sc.id,
                sc.index,
                sc.idIndex,
                sc.isGenerated,
                sc.allocationSize,
                sc.name,
                sc.notNull,
                sc.precision,
                sc.scale,
                sc.type,
                sc.entity.id,
                sc.deprecatedSinceVersion.id,
                sc.removedInVersion.id,
                sc.sinceVersion.id
            ],
            values
        });
    }
}
DI.set(SCHEMA_COLUMN_DAO, SchemaColumnDao);
//# sourceMappingURL=SchemaColumnDao.js.map