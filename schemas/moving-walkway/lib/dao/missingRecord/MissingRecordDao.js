"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class MissingRecordDao extends generated_1.BaseMissingRecordDao {
    async setStatusWhereIdsInAndReturnIds(recordIdMap, status) {
        const ids = await this.findActualIdsByRecordIds(recordIdMap);
        if (!ids.length) {
            return ids;
        }
        let mr;
        await this.db.updateWhere({
            update: mr = generated_1.Q.MissingRecord,
            set: {
                status
            },
            where: mr.id.in(ids)
        });
        return ids;
    }
    async findActualIdsByRecordIds(recordIdMap) {
        const mr = generated_1.Q.MissingRecord;
        let numClauses = 0;
        let repositoryWhereFragments = [];
        for (const [repositoryId, recordIdsForRepository] of recordIdMap) {
            let schemaWhereFragments = [];
            for (const [schemaVersionId, recordIdsForSchema] of recordIdsForRepository) {
                let tableWhereFragments = [];
                for (const [tableIndex, recordIdsForTable] of recordIdsForSchema) {
                    let actorWhereFragments = [];
                    for (const [actorId, recordIdsForActor] of recordIdsForTable) {
                        numClauses++;
                        actorWhereFragments.push(air_control_1.and(mr.actorRecordId.in(Array.from(recordIdsForActor)), mr.actor.id.equals(actorId)));
                    }
                    tableWhereFragments.push(air_control_1.and(mr.entity.index.equals(tableIndex), air_control_1.or(...actorWhereFragments)));
                }
                schemaWhereFragments.push(air_control_1.and(mr.schemaVersion.id.equals(schemaVersionId), air_control_1.or(...tableWhereFragments)));
            }
            repositoryWhereFragments.push(air_control_1.and(mr.repository.id.equals(repositoryId), air_control_1.or(...schemaWhereFragments)));
        }
        if (!numClauses) {
            return [];
        }
        return await this.airDb.find.field({
            select: mr.id,
            from: [mr],
            where: air_control_1.or(...repositoryWhereFragments)
        });
    }
    async deleteWhereIdsIn(ids) {
        let mr;
        await this.db.deleteWhere({
            deleteFrom: mr = generated_1.Q.MissingRecord,
            where: mr.id.in(ids)
        });
    }
}
exports.MissingRecordDao = MissingRecordDao;
di_1.DI.set(diTokens_1.MISSING_RECORD_DAO, MissingRecordDao);
//# sourceMappingURL=MissingRecordDao.js.map