import { and, field, or } from '@airport/air-control';
import { BaseRecordUpdateStageDao, Q } from '../generated/generated';
export class RecordUpdateStageDao extends BaseRecordUpdateStageDao {
    async insertValues(values) {
        const rus = Q.RecordUpdateStage;
        const columns = [
            rus.applicationVersion.id,
            rus.entity.id,
            rus.repository.id,
            rus.actor.id,
            rus.actorRecordId,
            rus.column.id,
            rus.updatedValue
        ];
        return await this.db.insertValuesGenerateIds({
            insertInto: rus,
            columns,
            values
        }, {
            generateOnSync: true
        });
    }
    async updateEntityWhereIds(applicationIndex, applicationVersionId, tableIndex, idMap, updatedColumnIndexes) {
        const dbEntity = this.airportDatabase.applications[applicationIndex].currentVersion[0]
            .applicationVersion.entities[tableIndex];
        const qEntity = this.airportDatabase.qApplications[applicationIndex][dbEntity.name];
        const repositoryEquals = [];
        for (const [repositoryId, idsForRepository] of idMap) {
            const actorEquals = [];
            for (const [actorId, idsForActor] of idsForRepository) {
                actorEquals.push(and(qEntity['actor'].id.equals(actorId), qEntity['actorRecordId'].in(Array.from(idsForActor))));
            }
            repositoryEquals.push(and(qEntity['repository'].id.equals(repositoryId), or(...actorEquals)));
        }
        const setClause = {};
        for (const columnIndex of updatedColumnIndexes) {
            const column = dbEntity.columns[columnIndex];
            let columnRus = Q.RecordUpdateStage;
            let columnSetClause = field({
                from: [
                    columnRus
                ],
                select: columnRus.updatedValue,
                where: and(columnRus.applicationVersion.id.equals(applicationVersionId), columnRus.entity.id.equals(dbEntity.index), columnRus.repository.id.equals(qEntity.repository.id), columnRus.actor.id.equals(qEntity.actor.id), columnRus.actorRecordId.equals(qEntity.actorRecordId), columnRus.column.id.equals(column.index))
            });
            setClause[column.name] = columnSetClause;
        }
        await this.db.updateColumnsWhere({
            update: qEntity,
            set: setClause,
            where: or(...repositoryEquals)
        });
    }
    async delete( //
    ) {
        return await this.db.deleteWhere({
            deleteFrom: Q.RecordUpdateStage
        });
    }
}
//# sourceMappingURL=RecordUpdateStageDao.js.map