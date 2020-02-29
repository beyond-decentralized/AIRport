import { DI } from '@airport/di';
import { SCHEMA_VERSION_DAO } from '../tokens';
import { BaseSchemaVersionDao, Q } from '../generated/generated';
export class SchemaVersionDao extends BaseSchemaVersionDao {
    /*
    async findAllLatestForSchemaIndexes(
        schemaIndexes: SchemaIndex[]
    ): Promise<ISchemaVersion[]> {
        let sv: QSchemaVersion

        return await this.db.find.tree({
            from: [
                sv = Q.SchemaVersion
            ],
            select: {},
            where: and(
                sv.id.in(this.idsForMaxVersionSelect()),
                sv.schema.index.in(schemaIndexes)
            )
        })
    }
    */
    async findAllActiveOrderBySchemaIndexAndId() {
        let sv;
        // let s: QSchema
        return await this.db.find.tree({
            from: [
                sv = Q.SchemaVersion,
            ],
            select: {},
            orderBy: [
                sv.schema.index.asc(),
                sv.id.desc()
            ]
        });
    }
}
DI.set(SCHEMA_VERSION_DAO, SchemaVersionDao);
//# sourceMappingURL=SchemaVersionDao.js.map