import { DI } from '@airport/di';
import { BaseSchemaPropertyColumnDao, Q, } from '../generated/generated';
import { SCHEMA_PROPERTY_COLUMN_DAO } from '../tokens';
export class SchemaPropertyColumnDao extends BaseSchemaPropertyColumnDao {
    async findAllForColumns(columnIds) {
        let rc;
        return this.db.find.tree({
            select: {},
            from: [
                rc = Q.SchemaPropertyColumn
            ],
            where: rc.column.id.in(columnIds)
        });
    }
    async insert(schemaPropertyColumns) {
        let spc;
        const values = [];
        for (const schemaPropertyColumn of schemaPropertyColumns) {
            values.push([
                schemaPropertyColumn.column.id, schemaPropertyColumn.property.id,
                schemaPropertyColumn.deprecatedSinceVersion ? schemaPropertyColumn.deprecatedSinceVersion.id : null,
                schemaPropertyColumn.removedInVersion ? schemaPropertyColumn.removedInVersion.id : null,
                schemaPropertyColumn.sinceVersion ? schemaPropertyColumn.sinceVersion.id : null,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: spc = Q.SchemaPropertyColumn,
            columns: [
                spc.column.id,
                spc.property.id,
                spc.deprecatedSinceVersion.id,
                spc.removedInVersion.id,
                spc.sinceVersion.id
            ],
            values
        });
    }
}
DI.set(SCHEMA_PROPERTY_COLUMN_DAO, SchemaPropertyColumnDao);
//# sourceMappingURL=SchemaPropertyColumnDao.js.map