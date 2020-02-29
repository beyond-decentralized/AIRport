import { and, or } from '@airport/air-control';
import { AIR_DB } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { MISSING_RECORD_DAO } from '../../tokens';
import { BaseMissingRecordDao, Q } from '../../generated/generated';
export class MissingRecordDao extends BaseMissingRecordDao {
    async setStatusWhereIdsInAndReturnIds(recordIdMap, status) {
        const ids = await this.findActualIdsByRecordIds(recordIdMap);
        if (!ids.length) {
            return ids;
        }
        let mr;
        await this.db.updateWhere({
            update: mr = Q.MissingRecord,
            set: {
                status
            },
            where: mr.id.in(ids)
        });
        return ids;
    }
    async findActualIdsByRecordIds(recordIdMap) {
        const mr = Q.MissingRecord;
        let numClauses = 0;
        const currentSchemaVersionMapById = {};
        const airDb = await container(this).get(AIR_DB);
        for (const schema of airDb.schemas) {
            const schemaVersion = schema.currentVersion;
            currentSchemaVersionMapById[schemaVersion.id] = schemaVersion;
        }
        let repositoryWhereFragments = [];
        for (const [repositoryId, recordIdsForRepository] of recordIdMap) {
            let schemaWhereFragments = [];
            for (const [schemaVersionId, recordIdsForSchema] of recordIdsForRepository) {
                let tableWhereFragments = [];
                for (const [tableIndex, recordIdsForTable] of recordIdsForSchema) {
                    const dbEntity = currentSchemaVersionMapById[schemaVersionId].entities[tableIndex];
                    let actorWhereFragments = [];
                    for (const [actorId, recordIdsForActor] of recordIdsForTable) {
                        numClauses++;
                        actorWhereFragments.push(and(mr.actorRecordId.in(Array.from(recordIdsForActor)), mr.actor.id.equals(actorId)));
                    }
                    tableWhereFragments.push(and(mr.entity.id.equals(dbEntity.id), or(...actorWhereFragments)));
                }
                schemaWhereFragments.push(and(mr.schemaVersion.id.equals(schemaVersionId), or(...tableWhereFragments)));
            }
            repositoryWhereFragments.push(and(mr.repository.id.equals(repositoryId), or(...schemaWhereFragments)));
        }
        if (!numClauses) {
            return [];
        }
        return await airDb.find.field({
            select: mr.id,
            from: [mr],
            where: or(...repositoryWhereFragments)
        });
    }
    async deleteWhereIdsIn(ids) {
        let mr;
        await this.db.deleteWhere({
            deleteFrom: mr = Q.MissingRecord,
            where: mr.id.in(ids)
        });
    }
}
DI.set(MISSING_RECORD_DAO, MissingRecordDao);
//# sourceMappingURL=MissingRecordDao.js.map