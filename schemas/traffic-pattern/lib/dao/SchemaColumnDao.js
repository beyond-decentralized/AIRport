import { DI } from '@airport/di';
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
}
DI.set(SCHEMA_COLUMN_DAO, SchemaColumnDao);
//# sourceMappingURL=SchemaColumnDao.js.map