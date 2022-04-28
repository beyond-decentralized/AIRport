import { BaseApplicationPropertyDao, Q, } from '../generated/generated';
export class ApplicationPropertyDao extends BaseApplicationPropertyDao {
    async findAllForEntities(entityIds) {
        let p;
        return this.db.find.tree({
            select: {},
            from: [
                p = Q.ApplicationProperty
            ],
            where: p.entity.id.in(entityIds)
        });
    }
    async insert(applicationProperties) {
        let sp;
        const values = [];
        for (const applicationProperty of applicationProperties) {
            values.push([
                applicationProperty.id, applicationProperty.index,
                applicationProperty.name, applicationProperty.isId,
                applicationProperty.entity.id,
                applicationProperty.deprecatedSinceVersion ? applicationProperty.deprecatedSinceVersion.id : null,
                applicationProperty.removedInVersion ? applicationProperty.removedInVersion.id : null,
                applicationProperty.sinceVersion ? applicationProperty.sinceVersion.id : null,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: sp = Q.ApplicationProperty,
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
//# sourceMappingURL=ApplicationPropertyDao.js.map