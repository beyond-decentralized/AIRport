import { DI } from '@airport/di';
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
}
DI.set(SCHEMA_RELATION_DAO, SchemaRelationDao);
//# sourceMappingURL=SchemaRelationDao.js.map