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
}
DI.set(SCHEMA_PROPERTY_COLUMN_DAO, SchemaPropertyColumnDao);
//# sourceMappingURL=SchemaPropertyColumnDao.js.map