var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { and, field, or } from '@airport/air-traffic-control';
import { Injected } from '@airport/direction-indicator';
import { BaseRecordUpdateStageDao, Q } from '../generated/generated';
let RecordUpdateStageDao = class RecordUpdateStageDao extends BaseRecordUpdateStageDao {
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
};
RecordUpdateStageDao = __decorate([
    Injected()
], RecordUpdateStageDao);
export { RecordUpdateStageDao };
//# sourceMappingURL=RecordUpdateStageDao.js.map