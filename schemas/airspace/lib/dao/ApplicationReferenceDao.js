import { BaseApplicationReferenceDao, Q, } from '../generated/generated';
export class ApplicationReferenceDao extends BaseApplicationReferenceDao {
    async findAllForApplicationVersions(applicationVersionIds) {
        let sr;
        return await this.db.find.tree({
            select: {},
            from: [
                sr = Q.ApplicationReference
            ],
            where: sr.ownApplicationVersion.id.in(applicationVersionIds)
        });
    }
    async insert(applicationReferences) {
        let sr;
        const values = [];
        for (const applicationReference of applicationReferences) {
            values.push([
                applicationReference.ownApplicationVersion.id,
                applicationReference.referencedApplicationVersion.id,
                applicationReference.index,
                applicationReference.deprecatedSinceVersion ? applicationReference.deprecatedSinceVersion.id : null,
                applicationReference.removedInVersion ? applicationReference.removedInVersion.id : null,
                applicationReference.sinceVersion ? applicationReference.sinceVersion.id : null,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: sr = Q.ApplicationReference,
            columns: [
                sr.ownApplicationVersion.id,
                sr.referencedApplicationVersion.id,
                sr.index,
                sr.deprecatedSinceVersion.id,
                sr.removedInVersion.id,
                sr.sinceVersion.id
            ],
            values
        });
    }
}
//# sourceMappingURL=ApplicationReferenceDao.js.map