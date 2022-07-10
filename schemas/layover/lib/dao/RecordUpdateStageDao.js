var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ACTOR_PROPERTY_NAME, ACTOR_RECORD_ID_PROPERTY_NAME, REPOSITORY_PROPERTY_NAME } from '@airport/air-traffic-control';
import { Injected } from '@airport/direction-indicator';
import { and, field, or, } from '@airport/tarmaq-query';
import { BaseRecordUpdateStageDao, Q } from '../generated/generated';
let RecordUpdateStageDao = class RecordUpdateStageDao extends BaseRecordUpdateStageDao {
    async insertValues(values) {
        const rus = Q.RecordUpdateStage;
        const columns = [
            rus.applicationVersion._localId,
            rus.entity._localId,
            rus.repository._localId,
            rus.actor._localId,
            rus._actorRecordId,
            rus.column._localId,
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
                actorEquals.push(and(qEntity[ACTOR_PROPERTY_NAME]._localId.equals(actorId), qEntity[ACTOR_RECORD_ID_PROPERTY_NAME].in(Array.from(idsForActor))));
            }
            repositoryEquals.push(and(qEntity[REPOSITORY_PROPERTY_NAME]._localId.equals(repositoryId), or(...actorEquals)));
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
                where: and(columnRus.applicationVersion._localId.equals(applicationVersionId), columnRus.entity._localId.equals(dbEntity.index), columnRus.repository._localId.equals(qEntity.repository._localId), columnRus.actor._localId.equals(qEntity.actor._localId), columnRus._actorRecordId.equals(qEntity._actorRecordId), columnRus.column._localId.equals(column.index))
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