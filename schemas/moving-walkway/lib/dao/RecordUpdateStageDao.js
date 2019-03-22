"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const diTokens_1 = require("../diTokens");
const generated_1 = require("../generated/generated");
class RecordUpdateStageDao extends generated_1.BaseRecordUpdateStageDao {
    async insertValues(values) {
        const rus = generated_1.Q.RecordUpdateStage;
        const columns = [
            rus.schemaVersion.id,
            rus.entity.index,
            rus.repository.id,
            rus.actor.id,
            rus.actorRecordId,
            rus.column.index,
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
        const dbEntity = this.airDb.schemas[schemaIndex].currentVersion.entities[tableIndex];
        const qEntity = this.airDb.qSchemas[schemaIndex][dbEntity.name];
        const repositoryEquals = [];
        for (const [repositoryId, idsForRepository] of idMap) {
            const actorEquals = [];
            for (const [actorId, idsForActor] of idsForRepository) {
                actorEquals.push(air_control_1.and(qEntity['actor'].id.equals(actorId), qEntity['actorRecordId'].in(Array.from(idsForActor))));
            }
            repositoryEquals.push(air_control_1.and(qEntity['repository'].id.equals(repositoryId), air_control_1.or(...actorEquals)));
        }
        const setClause = {};
        for (const columnIndex of updatedColumnIndexes) {
            let columnRus = generated_1.Q.RecordUpdateStage;
            let columnSetClause = air_control_1.field({
                from: [
                    columnRus
                ],
                select: columnRus.updatedValue,
                where: air_control_1.and(columnRus.schemaVersion.id.equals(schemaVersionId), columnRus.entity.index.equals(tableIndex), columnRus.repository.id.equals(qEntity.repository.id), columnRus.actor.id.equals(qEntity.actor.id), columnRus.actorRecordId.equals(qEntity.actorRecordId), columnRus.column.index.equals(columnIndex))
            });
            const propertyName = dbEntity.columns[columnIndex]
                .propertyColumns[0].property.name;
            setClause[propertyName] = columnSetClause;
        }
        await this.db.updateColumnsWhere({
            update: qEntity,
            set: setClause,
            where: air_control_1.or(...repositoryEquals)
        });
    }
    async delete( //
    ) {
        return await this.db.deleteWhere({
            deleteFrom: generated_1.Q.RecordUpdateStage
        });
    }
}
exports.RecordUpdateStageDao = RecordUpdateStageDao;
di_1.DI.set(diTokens_1.RECORD_UPDATE_STAGE_DAO, RecordUpdateStageDao);
//# sourceMappingURL=RecordUpdateStageDao.js.map