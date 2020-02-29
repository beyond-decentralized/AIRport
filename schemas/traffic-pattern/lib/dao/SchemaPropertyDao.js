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
}
DI.set(SCHEMA_PROPERTY_DAO, SchemaPropertyDao);
//# sourceMappingURL=SchemaPropertyDao.js.map