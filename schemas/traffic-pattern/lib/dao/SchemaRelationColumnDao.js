import { or } from '@airport/air-control';
import { DI } from '@airport/di';
import { SCHEMA_RELATION_COLUMN_DAO } from '../tokens';
import { BaseSchemaRelationColumnDao, Q, } from '../generated/generated';
export class SchemaRelationColumnDao extends BaseSchemaRelationColumnDao {
    async findAllForColumns(columnIds) {
        let rc;
        return this.db.find.tree({
            select: {},
            from: [
                rc = Q.SchemaRelationColumn
            ],
            where: or(rc.oneColumn.id.in(columnIds), rc.manyColumn.id.in(columnIds))
        });
    }
}
DI.set(SCHEMA_RELATION_COLUMN_DAO, SchemaRelationColumnDao);
//# sourceMappingURL=SchemaRelationColumnDao.js.map