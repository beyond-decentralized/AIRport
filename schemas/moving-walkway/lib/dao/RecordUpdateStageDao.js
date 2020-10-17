import { AIR_DB, and, field, or } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { RECORD_UPDATE_STAGE_DAO } from '../tokens';
import { BaseRecordUpdateStageDao, Q } from '../generated/generated';
export class RecordUpdateStageDao extends BaseRecordUpdateStageDao {
    async insertValues(values) {
        const rus = Q.RecordUpdateStage;
        const columns = [
            rus.schemaVersion.id,
            rus.entity.id,
            rus.repository.id,
            rus.actor.id,
            rus.actorRecordId,
            rus.column.id,
            rus.updatedValue
        ];
        for (let i = 1; i <= 50; i++) {
            columns.push(rus[`updatedColumn${i}Value`]);
        }
        return await this.db.insertValues({
            insertInto: rus,
            columns,
            values
        });
    }
    async updateEntityWhereIds(schemaIndex, schemaVersionId, tableIndex, idMap, updatedColumnIndexes) {
        const airDb = await container(this).get(AIR_DB);
        const dbEntity = airDb.schemas[schemaIndex].currentVersion.entities[tableIndex];
        const qEntity = airDb.qSchemas[schemaIndex][dbEntity.name];
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
                where: and(columnRus.schemaVersion.id.equals(schemaVersionId), columnRus.entity.id.equals(dbEntity.id), columnRus.repository.id.equals(qEntity.repository.id), columnRus.actor.id.equals(qEntity.actor.id), columnRus.actorRecordId.equals(qEntity.actorRecordId), columnRus.column.id.equals(column.id))
            });
            const propertyName = column
                .propertyColumns[0].property.name;
            setClause[propertyName] = columnSetClause;
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
DI.set(RECORD_UPDATE_STAGE_DAO, RecordUpdateStageDao);
//# sourceMappingURL=RecordUpdateStageDao.js.map