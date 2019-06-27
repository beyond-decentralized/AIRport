"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const arrivals_n_departures_1 = require("@airport/arrivals-n-departures");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const ddl_1 = require("../../ddl/ddl");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class AgtRepositoryTransactionBlockDao extends generated_1.BaseAgtRepositoryTransactionBlockDao {
    async findExistingDataIdMap(terminalIds, tmTransactionLogIds) {
        const existingDataIdMap = new Map();
        if (terminalIds instanceof Set) {
            terminalIds = Array.from(terminalIds);
        }
        if (tmTransactionLogIds instanceof Set) {
            tmTransactionLogIds = Array.from(tmTransactionLogIds);
        }
        let rtb;
        const airDb = await di_1.DI.get(air_control_1.AIR_DB);
        const records = await airDb.find.sheet({
            from: [
                rtb = generated_1.Q.AgtRepositoryTransactionBlock
            ],
            select: [
                rtb.id,
                rtb.terminal.id,
                rtb.tmRepositoryTransactionBlockId,
                rtb.addDatetime
            ],
            where: air_control_1.and(rtb.terminal.id.in(terminalIds), rtb.tmRepositoryTransactionBlockId.in(tmTransactionLogIds))
        });
        for (const record of records) {
            ground_control_1.ensureChildJsMap(existingDataIdMap, record[1]).set(record[2], [record[0], record[2]]);
        }
        return existingDataIdMap;
    }
    async insertValues(
    // values must be sorted by TerminalId [1]
    values) {
        const dbEntity = generated_1.Q.db.currentVersion.entityMapByName.RealtimeAgtRepositoryTransactionBlock;
        let rtb;
        const airDb = await di_1.DI.get(air_control_1.AIR_DB);
        return await airDb
            .insertValuesGenerateIds(dbEntity, {
            insertInto: rtb = generated_1.Q.AgtRepositoryTransactionBlock,
            columns: [
                rtb.repository.id,
                rtb.terminal.id,
                rtb.archivingStatus,
                rtb.addDatetime,
                rtb.tmRepositoryTransactionBlockId,
                rtb.contents
            ],
            values
        });
    }
    async getAllAgtRepositoryTransactionBlocksToSend(terminalIds) {
        const rtbToSendMapByTerminalId = new Map();
        let rtb, tr, sl, sm;
        // TODO: once CockroachDb supports optimized (non-nested loop) correlated
        // query, test against NOT EXISTS and see which is faster
        const airDb = await di_1.DI.get(air_control_1.AIR_DB);
        const rtbsToSend = await airDb.find.tree({
            from: [
                rtb = generated_1.Q.AgtRepositoryTransactionBlock,
                tr = rtb.terminalRepositories.innerJoin()
            ],
            select: {
                contentType: arrivals_n_departures_1.MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK,
                agtAgtRepositoryTransactionBlockId: rtb.id,
                terminalId: tr.terminal.id,
                // agtRepositoryId: sr.repository.id,
                // addDatetime: sr.addDatetime,
                repositoryTransactionBlock: rtb.contents
            },
            where: air_control_1.and(
            // TODO: Need the fromDate to limit the number of partitions used in the query
            // sr.addDatetime.greaterThanOrEquals(fromDateInclusive),
            tr.terminal.id.in(terminalIds), rtb.id.notIn([{
                    from: [
                        sm = generated_1.Q.AgtSharingMessage,
                        sl = sm.syncLogs.innerJoin()
                    ],
                    select: sl.repositoryTransactionBlock.id,
                    where: air_control_1.and(
                    // TODO: Need the fromDate to limit the number of partitions used in the
                    // query
                    // sl.repositoryTransactionBlockAddDatetime.greaterThanOrEquals(fromDateInclusive),
                    sm.terminal.id.in(terminalIds), sm.acknowledged.equals(ddl_1.AgtSharingMessageAcknowledged.ACKNOWLEDGED))
                }]))
        });
        for (const rtbToSend of rtbsToSend) {
            const terminalIdToSendTo = rtbToSend.terminalId;
            let rbsForTerminalId = rtbToSendMapByTerminalId.get(terminalIdToSendTo);
            if (!rbsForTerminalId) {
                rbsForTerminalId = [];
                rtbToSendMapByTerminalId.set(terminalIdToSendTo, rbsForTerminalId);
            }
            rbsForTerminalId.push(rtbToSend);
        }
        return rtbToSendMapByTerminalId;
    }
    async getAllUnreadChangesNotExists(fromDateInclusive, terminalIds, isRealtime, cursorSize, callback) {
        let sr, r, dr, sl, dsl;
        // TODO: verify correctness of NOT EXISTS
        // TODO: test performance on CockroachDb vs TiDB for NOT EXISTS vs
        // NOT IN vs EXCEPT
        const airDb = await di_1.DI.get(air_control_1.AIR_DB);
        await airDb.find.sheet({
            from: [
                sr = generated_1.Q.AgtRepositoryTransactionBlock,
                r = sr.repository.innerJoin(),
                dr = r.terminalRepositories.innerJoin()
            ],
            select: [
                dr.terminal.id,
                r.id,
                sr.addDatetime,
                sr.contents
            ],
            where: air_control_1.and(
            // Need the fromDate to limit the number of partitions used in the query
            sr.addDatetime.greaterThanOrEquals(fromDateInclusive), dr.terminal.id.in(terminalIds), air_control_1.not(air_control_1.exists({
                from: [
                    dsl = generated_1.Q.AgtSharingMessage,
                    sl = dsl.syncLogs.innerJoin()
                ],
                select: [
                    dsl.id
                ],
                where: air_control_1.and(
                // Need the fromDate to limit the number of partitions used in the query
                // sl.repositoryTransactionBlockAddDatetime.greaterThanOrEquals(fromDateInclusive),
                sl.repositoryTransactionBlock.id.equals(sr.id), dsl.acknowledged.equals(ddl_1.AgtSharingMessageAcknowledged.ACKNOWLEDGED))
            })))
        }, cursorSize, (batchData) => {
            callback(batchData);
        });
    }
    async reserveToArchive(fromDateInclusive, toDateExclusive, serverId, archivingStatus, numRepositoriesToReserve) {
        let rtb, rtb2;
        return await this.db.updateWhere({
            update: rtb = generated_1.Q.AgtRepositoryTransactionBlock,
            set: {
                archivingServer: {
                    id: serverId
                },
                archivingStatus: ddl_1.ArchivingStatus.ARCHIVING_IN_PROGRESS,
            },
            where: air_control_1.and(rtb.addDatetime.greaterThanOrEquals(fromDateInclusive), rtb.addDatetime.lessThan(toDateExclusive), 
            // sr.archivingStatus.equals(archivingStatus),
            rtb.repository.id.in({
                from: [
                    rtb2 = generated_1.Q.AgtRepositoryTransactionBlock
                ],
                select: {
                    repositoryId: air_control_1.distinct(rtb2.repository.id)
                },
                where: rtb2.archivingStatus.equals(archivingStatus),
                limit: numRepositoriesToReserve
            }))
        });
    }
    async getAgtRepositoryTransactionBlocksToArchive(fromDateInclusive, toDateExclusive, serverId) {
        const results = [];
        const repositoryTransactionBlockIds = [];
        let rtb;
        const airDb = await di_1.DI.get(air_control_1.AIR_DB);
        const rtbsToArchive = await airDb.find.sheet({
            from: [
                rtb = generated_1.Q.AgtRepositoryTransactionBlock,
            ],
            select: [
                rtb.repository.id,
                rtb.addDatetime,
                rtb.id,
                rtb.archivingStatus,
                rtb.contents,
            ],
            where: air_control_1.and(rtb.addDatetime.greaterThanOrEquals(fromDateInclusive), rtb.addDatetime.lessThan(toDateExclusive), rtb.archivingServer.id.equals(serverId), rtb.archivingStatus.equals(ddl_1.ArchivingStatus.ARCHIVING_IN_PROGRESS)),
            orderBy: [
                rtb.repository.id.asc(),
                rtb.addDatetime.asc()
            ]
        });
        let lastAgtRepositoryId = rtbsToArchive[0][0];
        let currentRepositoryRtbs = [];
        for (const rtbToArchive of rtbsToArchive) {
            const currentAgtRepositoryId = rtbToArchive[0];
            if (lastAgtRepositoryId !== currentAgtRepositoryId) {
                results.push([lastAgtRepositoryId, currentRepositoryRtbs]);
                currentRepositoryRtbs = [];
                lastAgtRepositoryId = currentAgtRepositoryId;
            }
            repositoryTransactionBlockIds.push(rtbToArchive[2]);
            currentRepositoryRtbs.push(rtbToArchive.slice(1));
        }
        if (currentRepositoryRtbs.length) {
            results.push([lastAgtRepositoryId, currentRepositoryRtbs]);
        }
        return [results, repositoryTransactionBlockIds];
    }
    async getAllStuckChangesToArchive(toDateExclusive, cursorSize, callback) {
        let rtb;
        const airDb = await di_1.DI.get(air_control_1.AIR_DB);
        await airDb.find.sheet({
            from: [
                rtb = generated_1.Q.AgtRepositoryTransactionBlock,
            ],
            select: [
                rtb.id,
                rtb.repository.id,
                rtb.addDatetime,
                rtb.contents
            ],
            where: air_control_1.and(rtb.addDatetime.lessThan(toDateExclusive), rtb.archivingStatus.equals(ddl_1.ArchivingStatus.ARCHIVING_IN_PROGRESS)),
            orderBy: [
                rtb.repository.id.asc(),
                rtb.addDatetime.asc()
            ]
        });
    }
    async markAllChangesAsArchived(fromDateInclusive, toDateExclusive, repositoryIds) {
        let rtb;
        await this.db.updateWhere({
            update: rtb = generated_1.Q.AgtRepositoryTransactionBlock,
            set: {
                archivingStatus: ddl_1.ArchivingStatus.ARCHIVING_COMPLETE,
            },
            where: air_control_1.and(rtb.addDatetime.greaterThanOrEquals(fromDateInclusive), rtb.addDatetime.lessThan(toDateExclusive), rtb.archivingStatus.equals(ddl_1.ArchivingStatus.ARCHIVING_IN_PROGRESS), rtb.repository.id.in(repositoryIds))
        });
    }
    async markChangesAsArchived(repositoryTransactionBlockIds) {
        let rtb;
        await this.db.updateWhere({
            update: rtb = generated_1.Q.AgtRepositoryTransactionBlock,
            set: {
                archivingStatus: ddl_1.ArchivingStatus.ARCHIVING_COMPLETE,
            },
            where: rtb.id.in(repositoryTransactionBlockIds)
        });
    }
    async deleteByIds(repositoryTransactionBlockIds) {
        let rtb;
        return await this.db.deleteWhere({
            deleteFrom: rtb = generated_1.Q.AgtRepositoryTransactionBlock,
            where: rtb.id.in(repositoryTransactionBlockIds)
        });
    }
}
exports.AgtRepositoryTransactionBlockDao = AgtRepositoryTransactionBlockDao;
di_1.DI.set(diTokens_1.AGT_REPO_TRANS_BLOCK_DAO, AgtRepositoryTransactionBlockDao);
//# sourceMappingURL=AgtRepositoryTransactionBlockDao.js.map