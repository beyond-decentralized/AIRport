import {
	AIR_DB,
	and,
	distinct,
	exists,
	not
}                                 from '@airport/air-control'
import {
	AgtRepositoryId,
	MessageToTMContentType,
	RepositoryTransactionBlockContents,
	RepoTransBlockMessageToTM,
	TerminalId,
	TmRepositoryTransactionBlockId
}                                 from '@airport/arrivals-n-departures'
import {container, DI}                       from '@airport/di'
import {ensureChildJsMap}         from '@airport/ground-control'
import {
	AgtRepositoryTransactionBlockAddDatetime,
	AgtRepositoryTransactionBlockArchivingStatus,
	AgtRepositoryTransactionBlockId,
	AgtRepositoryTransactionBlockIsRecent,
	AgtSharingMessageAcknowledged,
	ArchivingStatus,
	ServerId,
}                                 from '../../ddl/ddl'
import {AGT_REPO_TRANS_BLOCK_DAO} from '../../tokens'
import {
	BaseAgtRepositoryTransactionBlockDao,
	IBaseAgtRepositoryTransactionBlockDao,
	Q,
	QAgtRepositoryTransactionBlock,
	QAgtSharingMessage,
	QRepository,
	QSyncLog,
	QTerminalRepository
}                                 from '../../generated/generated'

export type ArchiveBatchRecord = [
	AgtRepositoryTransactionBlockId,
	AgtRepositoryId,
	RepositoryTransactionBlockContents
	];

export type InsertAgtRepositoryTransactionBlock = [
	AgtRepositoryId,
	TerminalId,
	AgtRepositoryTransactionBlockArchivingStatus,
	AgtRepositoryTransactionBlockAddDatetime,
	AgtRepositoryTransactionBlockIsRecent,
	TmRepositoryTransactionBlockId,
	RepositoryTransactionBlockContents
	];

export type AgtRepositoryTransactionBlockToArchive = [
	AgtRepositoryTransactionBlockAddDatetime,
	AgtRepositoryTransactionBlockId,
	RepositoryTransactionBlockContents
	];

export type RepositoryAgtRepoTransBlocksToArchive = [
	AgtRepositoryId,
	AgtRepositoryTransactionBlockToArchive[]
	];

export type AgtRepositoryTransactionBlocksToArchiveResult = [
	RepositoryAgtRepoTransBlocksToArchive[],
	AgtRepositoryTransactionBlockId[]
	];

export type NumberOfRTBsReservedToArchive = number;

export interface AugmentedRepoTransBlockMessageToTM
	extends RepoTransBlockMessageToTM {
	agtRepositoryTransactionBlockId: AgtRepositoryTransactionBlockId;
}

export interface IAgtRepositoryTransactionBlockDao
	extends IBaseAgtRepositoryTransactionBlockDao {

	findExistingDataIdMap(
		terminalIds: TerminalId[] | Set<TerminalId>,
		tmTransactionLogIds: TmRepositoryTransactionBlockId[] | Set<TmRepositoryTransactionBlockId>
	): Promise<Map<TerminalId, Map<TmRepositoryTransactionBlockId, [
		AgtRepositoryTransactionBlockId, AgtRepositoryTransactionBlockAddDatetime]>>>;

	insertValues(
		values: InsertAgtRepositoryTransactionBlock[]
	): Promise<AgtRepositoryTransactionBlockId[]>;

	getAllAgtRepositoryTransactionBlocksToSend(
		terminalIds: TerminalId[],
	): Promise<Map<TerminalId, AugmentedRepoTransBlockMessageToTM[]>>;

	reserveToArchive(
		fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime,
		toDateExclusive: AgtRepositoryTransactionBlockAddDatetime,
		serverId: ServerId,
		archivingStatus: AgtRepositoryTransactionBlockArchivingStatus,
		numRepositoriesToReserve: number
	): Promise<NumberOfRTBsReservedToArchive>;

	getAgtRepositoryTransactionBlocksToArchive(
		fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime,
		toDateExclusive: AgtRepositoryTransactionBlockAddDatetime,
		serverId: ServerId,
	): Promise<AgtRepositoryTransactionBlocksToArchiveResult>;

	getAllStuckChangesToArchive(
		toDateExclusive: AgtRepositoryTransactionBlockAddDatetime,
		cursorSize: number,
		callback: (
			batchData: [AgtRepositoryTransactionBlockId, AgtRepositoryId,
				AgtRepositoryTransactionBlockAddDatetime, RepositoryTransactionBlockContents][]
		) => void,
	): Promise<void>;

	markAllChangesAsArchived(
		fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime,
		toDateExclusive: AgtRepositoryTransactionBlockAddDatetime,
		repositoryIds: AgtRepositoryId[],
	): Promise<void>;

	markChangesAsArchived(
		repositoryTransactionBlockIds: AgtRepositoryTransactionBlockId[],
	): Promise<void>;

	deleteByIds(
		repositoryTransactionBlockIds: AgtRepositoryTransactionBlockId[],
	): Promise<number>;

}

export class AgtRepositoryTransactionBlockDao
	extends BaseAgtRepositoryTransactionBlockDao
	implements IAgtRepositoryTransactionBlockDao {

	async findExistingDataIdMap(
		terminalIds: TerminalId[] | Set<TerminalId>,
		tmTransactionLogIds: TmRepositoryTransactionBlockId[] | Set<TmRepositoryTransactionBlockId>
	): Promise<Map<TerminalId, Map<TmRepositoryTransactionBlockId, [
		AgtRepositoryTransactionBlockId, AgtRepositoryTransactionBlockAddDatetime]>>> {
		const existingDataIdMap: Map<TerminalId, Map<TmRepositoryTransactionBlockId, [
			AgtRepositoryTransactionBlockId, AgtRepositoryTransactionBlockAddDatetime]>>
			      = new Map()

		if (terminalIds instanceof Set) {
			terminalIds = Array.from(terminalIds)
		}
		if (tmTransactionLogIds instanceof Set) {
			tmTransactionLogIds = Array.from(tmTransactionLogIds)
		}

		let rtb: QAgtRepositoryTransactionBlock

		const airDb = await container(this).get(AIR_DB)

		const records = await airDb.find.sheet({
			from: [
				rtb = Q.AgtRepositoryTransactionBlock
			],
			select: [
				rtb.id,
				rtb.terminal.id,
				rtb.tmRepositoryTransactionBlockId,
				rtb.addDatetime
			],
			where: and(
				rtb.terminal.id.in(terminalIds),
				rtb.tmRepositoryTransactionBlockId.in(tmTransactionLogIds)
			)
		})

		for (const record of records) {
			ensureChildJsMap(existingDataIdMap, record[1]).set(record[2], [record[0], record[2]])
		}

		return existingDataIdMap
	}

	async insertValues(
		// values must be sorted by TerminalId [1]
		values: InsertAgtRepositoryTransactionBlock[]
	): Promise<AgtRepositoryTransactionBlockId[]> {
		const dbEntity = Q.db.currentVersion.entityMapByName.RealtimeAgtRepositoryTransactionBlock
		let rtb: QAgtRepositoryTransactionBlock

		const airDb = await container(this).get(AIR_DB)

		return <AgtRepositoryTransactionBlockId[]>await airDb
			.insertValuesGenerateIds({
				insertInto: rtb = Q.AgtRepositoryTransactionBlock,
				columns: [
					rtb.repository.id,
					rtb.terminal.id,
					rtb.archivingStatus,
					rtb.addDatetime,
					rtb.tmRepositoryTransactionBlockId,
					rtb.contents
				],
				values
			})
	}

	async getAllAgtRepositoryTransactionBlocksToSend(
		terminalIds: TerminalId[],
	): Promise<Map<TerminalId, AugmentedRepoTransBlockMessageToTM[]>> {
		const rtbToSendMapByTerminalId: Map<TerminalId,
			AugmentedRepoTransBlockMessageToTM[]> = new Map()

		let rtb: QAgtRepositoryTransactionBlock,
		    tr: QTerminalRepository,
		    sl: QSyncLog,
		    sm: QAgtSharingMessage
		// TODO: once CockroachDb supports optimized (non-nested loop) correlated
		// query, test against NOT EXISTS and see which is faster

		const airDb = await container(this).get(AIR_DB)

		const rtbsToSend = await airDb.find.tree({
			from: [
				rtb = Q.AgtRepositoryTransactionBlock,
				tr = rtb.terminalRepositories.innerJoin()
			],
			select: {
				contentType: MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK,
				agtAgtRepositoryTransactionBlockId: rtb.id,
				terminalId: tr.terminal.id,
				// agtRepositoryId: sr.repository.id,
				// addDatetime: sr.addDatetime,
				repositoryTransactionBlock: rtb.contents
			},
			where: and(
				// TODO: Need the fromDate to limit the number of partitions used in the query
				// sr.addDatetime.greaterThanOrEquals(fromDateInclusive),
				tr.terminal.id.in(terminalIds),
				rtb.id.notIn([{
					from: [
						sm = Q.AgtSharingMessage,
						sl = sm.syncLogs.innerJoin()
					],
					select: sl.repositoryTransactionBlock.id,
					where: and(
						// TODO: Need the fromDate to limit the number of partitions used in the
						// query
						// sl.repositoryTransactionBlockAddDatetime.greaterThanOrEquals(fromDateInclusive),
						sm.terminal.id.in(terminalIds),
						sm.acknowledged.equals(AgtSharingMessageAcknowledged.ACKNOWLEDGED)
					)
				}])
			)
		})

		for (const rtbToSend of rtbsToSend) {
			const terminalIdToSendTo: TerminalId = <any>rtbToSend.terminalId
			let rbsForTerminalId                 = rtbToSendMapByTerminalId.get(terminalIdToSendTo)
			if (!rbsForTerminalId) {
				rbsForTerminalId = <AugmentedRepoTransBlockMessageToTM[]>[]
				rtbToSendMapByTerminalId.set(terminalIdToSendTo, rbsForTerminalId)
			}
			rbsForTerminalId.push(<AugmentedRepoTransBlockMessageToTM><any>rtbToSend)
		}

		return rtbToSendMapByTerminalId
	}

	async getAllUnreadChangesNotExists(
		fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime,
		terminalIds: TerminalId[],
		isRealtime: AgtRepositoryTransactionBlockIsRecent,
		cursorSize: number,
		callback: (
			batchData: [TerminalId, AgtRepositoryId,
				AgtRepositoryTransactionBlockAddDatetime, RepositoryTransactionBlockContents][]
		) => void,
	): Promise<void> {
		let sr: QAgtRepositoryTransactionBlock,
		    r: QRepository,
		    dr: QTerminalRepository,
		    sl: QSyncLog,
		    dsl: QAgtSharingMessage
		// TODO: verify correctness of NOT EXISTS
		// TODO: test performance on CockroachDb vs TiDB for NOT EXISTS vs
		// NOT IN vs EXCEPT

		const airDb = await container(this).get(AIR_DB)

		await airDb.find.sheet({
			from: [
				sr = Q.AgtRepositoryTransactionBlock,
				r = sr.repository.innerJoin(),
				dr = r.terminalRepositories.innerJoin()
			],
			select: [
				dr.terminal.id,
				r.id,
				sr.addDatetime,
				sr.contents
			],
			where: and(
				// Need the fromDate to limit the number of partitions used in the query
				sr.addDatetime.greaterThanOrEquals(fromDateInclusive),
				dr.terminal.id.in(terminalIds),
				not(exists({
					from: [
						dsl = Q.AgtSharingMessage,
						sl = dsl.syncLogs.innerJoin()
					],
					select: [
						dsl.id
					],
					where: and(
						// Need the fromDate to limit the number of partitions used in the query
						// sl.repositoryTransactionBlockAddDatetime.greaterThanOrEquals(fromDateInclusive),

						sl.repositoryTransactionBlock.id.equals(sr.id),
						dsl.acknowledged.equals(AgtSharingMessageAcknowledged.ACKNOWLEDGED)
					)
				}))
			)
		}, cursorSize, (
			batchData: [TerminalId, AgtRepositoryId,
				AgtRepositoryTransactionBlockAddDatetime, RepositoryTransactionBlockContents][]
		) => {
			callback(batchData)
		})
	}

	async reserveToArchive(
		fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime,
		toDateExclusive: AgtRepositoryTransactionBlockAddDatetime,
		serverId: ServerId,
		archivingStatus: AgtRepositoryTransactionBlockArchivingStatus,
		numRepositoriesToReserve: number
	): Promise<NumberOfRTBsReservedToArchive> {
		let rtb: QAgtRepositoryTransactionBlock,
		    rtb2: QAgtRepositoryTransactionBlock
		return await this.db.updateWhere({
			update: rtb = Q.AgtRepositoryTransactionBlock,
			set: {
				archivingServer: {
					id: serverId
				},
				archivingStatus: ArchivingStatus.ARCHIVING_IN_PROGRESS,
			},
			where: and(
				rtb.addDatetime.greaterThanOrEquals(fromDateInclusive),
				rtb.addDatetime.lessThan(toDateExclusive),
				// sr.archivingStatus.equals(archivingStatus),
				rtb.repository.id.in({
					from: [
						rtb2 = Q.AgtRepositoryTransactionBlock
					],
					select: {
						repositoryId: distinct(rtb2.repository.id)
					},
					where: rtb2.archivingStatus.equals(archivingStatus),
					limit: numRepositoriesToReserve
				}))
		})
	}

	async getAgtRepositoryTransactionBlocksToArchive(
		fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime,
		toDateExclusive: AgtRepositoryTransactionBlockAddDatetime,
		serverId: ServerId
	): Promise<AgtRepositoryTransactionBlocksToArchiveResult> {
		const results: RepositoryAgtRepoTransBlocksToArchive[]                 = []
		const repositoryTransactionBlockIds: AgtRepositoryTransactionBlockId[] = []

		let rtb: QAgtRepositoryTransactionBlock

		const airDb = await container(this).get(AIR_DB)

		const rtbsToArchive = await airDb.find.sheet({
			from: [
				rtb = Q.AgtRepositoryTransactionBlock,
			],
			select: [
				rtb.repository.id,
				rtb.addDatetime,
				rtb.id,
				rtb.archivingStatus,
				rtb.contents,
			],
			where: and(
				rtb.addDatetime.greaterThanOrEquals(fromDateInclusive),
				rtb.addDatetime.lessThan(toDateExclusive),
				rtb.archivingServer.id.equals(serverId),
				rtb.archivingStatus.equals(ArchivingStatus.ARCHIVING_IN_PROGRESS)
			),
			orderBy: [
				rtb.repository.id.asc(),
				rtb.addDatetime.asc()
			]
		})

		let lastAgtRepositoryId   = rtbsToArchive[0][0]
		let currentRepositoryRtbs = []
		for (const rtbToArchive of rtbsToArchive) {
			const currentAgtRepositoryId = rtbToArchive[0]
			if (lastAgtRepositoryId !== currentAgtRepositoryId) {
				results.push([lastAgtRepositoryId, currentRepositoryRtbs])
				currentRepositoryRtbs = []
				lastAgtRepositoryId   = currentAgtRepositoryId
			}
			repositoryTransactionBlockIds.push(rtbToArchive[2])
			currentRepositoryRtbs.push(rtbToArchive.slice(1))
		}
		if (currentRepositoryRtbs.length) {
			results.push([lastAgtRepositoryId, currentRepositoryRtbs])
		}

		return [results, repositoryTransactionBlockIds]
	}


	async getAllStuckChangesToArchive(
		toDateExclusive: AgtRepositoryTransactionBlockAddDatetime,
		cursorSize: number,
		callback: (
			batchData: [AgtRepositoryTransactionBlockId, AgtRepositoryId,
				AgtRepositoryTransactionBlockAddDatetime, RepositoryTransactionBlockContents][]
		) => void,
	): Promise<void> {
		let rtb: QAgtRepositoryTransactionBlock

		const airDb = await container(this).get(AIR_DB)

		await airDb.find.sheet({
			from: [
				rtb = Q.AgtRepositoryTransactionBlock,
			],
			select: [
				rtb.id,
				rtb.repository.id,
				rtb.addDatetime,
				rtb.contents
			],
			where: and(
				rtb.addDatetime.lessThan(toDateExclusive),
				rtb.archivingStatus.equals(ArchivingStatus.ARCHIVING_IN_PROGRESS)
			),
			orderBy: [
				rtb.repository.id.asc(),
				rtb.addDatetime.asc()
			]
		})
	}

	async markAllChangesAsArchived(
		fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime,
		toDateExclusive: AgtRepositoryTransactionBlockAddDatetime,
		repositoryIds: AgtRepositoryId[],
	): Promise<void> {
		let rtb: QAgtRepositoryTransactionBlock
		await this.db.updateWhere({
			update: rtb = Q.AgtRepositoryTransactionBlock,
			set: {
				archivingStatus: ArchivingStatus.ARCHIVING_COMPLETE,
			},
			where: and(
				rtb.addDatetime.greaterThanOrEquals(fromDateInclusive),
				rtb.addDatetime.lessThan(toDateExclusive),
				rtb.archivingStatus.equals(ArchivingStatus.ARCHIVING_IN_PROGRESS),
				rtb.repository.id.in(repositoryIds)
			)
		})
	}

	async markChangesAsArchived(
		repositoryTransactionBlockIds: AgtRepositoryTransactionBlockId[],
	): Promise<void> {
		let rtb: QAgtRepositoryTransactionBlock

		await this.db.updateWhere({
			update: rtb = Q.AgtRepositoryTransactionBlock,
			set: {
				archivingStatus: ArchivingStatus.ARCHIVING_COMPLETE,
			},
			where: rtb.id.in(repositoryTransactionBlockIds)
		})
	}

	async deleteByIds(
		repositoryTransactionBlockIds: AgtRepositoryTransactionBlockId[],
	): Promise<number> {
		let rtb: QAgtRepositoryTransactionBlock

		return await this.db.deleteWhere({
			deleteFrom: rtb = Q.AgtRepositoryTransactionBlock,
			where: rtb.id.in(repositoryTransactionBlockIds)
		})
	}

}

DI.set(AGT_REPO_TRANS_BLOCK_DAO, AgtRepositoryTransactionBlockDao)
