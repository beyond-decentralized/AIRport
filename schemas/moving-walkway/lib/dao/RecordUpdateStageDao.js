"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const tokens_1 = require("../tokens");
const generated_1 = require("../generated/generated");
class RecordUpdateStageDao extends generated_1.BaseRecordUpdateStageDao {
    async insertValues(values) {
        const rus = generated_1.Q.RecordUpdateStage;
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
        const airDb = await di_1.container(this).get(air_control_1.AIR_DB);
        const dbEntity = airDb.schemas[schemaIndex].currentVersion.entities[tableIndex];
        const qEntity = airDb.qSchemas[schemaIndex][dbEntity.name];
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
            const column = dbEntity.columns[columnIndex];
            let columnRus = generated_1.Q.RecordUpdateStage;
            let columnSetClause = air_control_1.field({
                from: [
                    columnRus
                ],
                select: columnRus.updatedValue,
                where: air_control_1.and(columnRus.schemaVersion.id.equals(schemaVersionId), columnRus.entity.id.equals(dbEntity.id), columnRus.repository.id.equals(qEntity.repository.id), columnRus.actor.id.equals(qEntity.actor.id), columnRus.actorRecordId.equals(qEntity.actorRecordId), columnRus.column.id.equals(column.id))
            });
            const propertyName = column
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
di_1.DI.set(tokens_1.RECORD_UPDATE_STAGE_DAO, RecordUpdateStageDao);
//# sourceMappingURL=RecordUpdateStageDao.js.map