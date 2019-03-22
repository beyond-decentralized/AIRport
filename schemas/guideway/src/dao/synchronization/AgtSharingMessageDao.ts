import {
	AirportDatabaseToken,
	and,
	IAirportDatabase
}                                  from "@airport/air-control";
import {UtilsToken}                from "@airport/air-control/lib/InjectionTokens";
import {IUtils}                    from "@airport/air-control/lib/lingo/utils/Utils";
import {
	AgtRepositoryId,
	AgtSharingMessageId,
	TerminalId,
	TmSharingMessageId,
}                                from "@airport/arrivals-n-departures";
import {
	Inject,
	Service
}                                from "typedi";
import {
	AgtRepositoryTransactionBlockAddDatetime,
	AgtSharingMessageAcknowledged
}                                from "../../ddl/ddl";
import {
	BaseAgtSharingMessageDao,
	IBaseAgtSharingMessageDao,
	Q,
	QAgtSharingMessage
}                                from "../../generated/generated";
import {AGT_SHARING_MESSAGE_DAO} from "../../diTokens";

export type InsertAgtSharingMessage = [
	TerminalId, TmSharingMessageId, AgtSharingMessageAcknowledged
	]

export interface IAgtSharingMessageDao
	extends IBaseAgtSharingMessageDao {

	insertValues(
		values: InsertAgtSharingMessage[]
	): Promise<Map<TerminalId, AgtSharingMessageId>>;

	findNotSyncedByIdIn(
		agtSharingMessageIds: AgtSharingMessageId[]
	): Promise<Map<TerminalId, Set<AgtSharingMessageId>>>;

	updateToAcked(
		agtSharingMessageIds: AgtSharingMessageId[]
	): Promise<void>;

	findIdMapByTerminalIdAndTmSharingMessageId(
		terminalIds: TerminalId[],
		tmSharingMessageIds: TmSharingMessageId[]
	): Promise<Map<TerminalId, Map<TmSharingMessageId, AgtSharingMessageId>>>;

}

@Service(AGT_SHARING_MESSAGE_DAO)
export class AgtSharingMessageDao
	extends BaseAgtSharingMessageDao
	implements IAgtSharingMessageDao {

	constructor(
		@Inject(AirportDatabaseToken)
		private airportDb: IAirportDatabase,
		@Inject(UtilsToken)
			utils: IUtils,
	) {
		super(utils);
	}

	async insertValues(
		values: InsertAgtSharingMessage[]
	): Promise<Map<TerminalId, AgtSharingMessageId>> {
		const sharingMessageIdsByTerminalId: Map<TerminalId, AgtSharingMessageId> = new Map();

		const dbEntity     = Q.db.currentVersion.entityMapByName.AgtSharingMessage;
		let asm: QAgtSharingMessage;
		const sharingMessageIds = <number[]>await this.airportDb.db.insertValuesGenerateIds(dbEntity, {
			insertInto: asm = Q.AgtSharingMessage,
			columns: [
				asm.terminal.id,
				asm.tmSharingMessageId,
				asm.acknowledged,
			],
			values
		});

		for (let i = 0; i < sharingMessageIds.length; i++) {
			const insertedRecord: InsertAgtSharingMessage = values[i];
			sharingMessageIdsByTerminalId.set(insertedRecord[0], sharingMessageIds[i]);
		}

		return sharingMessageIdsByTerminalId;
	}

	async findNotSyncedByIdIn(
		agtSharingMessageIds: AgtSharingMessageId[]
	): Promise<Map<TerminalId, Set<AgtSharingMessageId>>> {
		const resultMapByTerminalId: Map<TerminalId, Set<AgtSharingMessageId>>
			      = new Map();

		let asm: QAgtSharingMessage;

		const dbSyncLogs =
			      await this.airportDb.db.find.sheet({
				      from: [
					      asm = Q.AgtSharingMessage
				      ],
				      select: [
					      asm.terminal.id,
					      asm.id
				      ],
				      where: and(
					      asm.id.in(agtSharingMessageIds),
					      asm.acknowledged.equals(AgtSharingMessageAcknowledged.NOT_ACKNOWLEDGED)
				      )
			      });

		for (const dbSyncLog of dbSyncLogs) {
			const terminalId = dbSyncLog[0];

			let syncLogMapForTerminal = resultMapByTerminalId.get(terminalId);

			if (!syncLogMapForTerminal) {
				syncLogMapForTerminal = new Set();
				resultMapByTerminalId.set(terminalId, syncLogMapForTerminal);
			}

			syncLogMapForTerminal.add(dbSyncLog[1]);
		}

		return resultMapByTerminalId;
	}

	async updateToAcked(
		agtSharingMessageIds: AgtSharingMessageId[]
	): Promise<void> {
		let asm: QAgtSharingMessage;
		// TODO: verify the query works as required
		await this.db.updateWhere({
			update: asm = Q.AgtSharingMessage,
			set: {
				acknowledged: AgtSharingMessageAcknowledged.ACKNOWLEDGED
			},
			where: asm.id.in(agtSharingMessageIds)

		});
	}

	async findIdMapByTerminalIdAndTmSharingMessageId(
		terminalIds: TerminalId[],
		tmSharingMessageIds: TmSharingMessageId[]
	): Promise<Map<TerminalId, Map<TmSharingMessageId, AgtSharingMessageId>>> {
		const idMapByTerminalIdAndTmSharingMessageId
			      : Map<TerminalId, Map<TmSharingMessageId, AgtSharingMessageId>>
			      = new Map();

		let asm: QAgtSharingMessage;
		const sharingMessages = await this.airportDb.db.find.sheet({
			from: [
				asm = Q.AgtSharingMessage
			],
			select: [
				asm.terminal.id,
				asm.tmSharingMessageId,
				asm.id,
			],
			where: and(
				asm.terminal.id.in(terminalIds),
				asm.tmSharingMessageId.in(tmSharingMessageIds)
			)
		});

		for (const sharingMessage of sharingMessages) {
			this.utils.ensureChildJsMap(idMapByTerminalIdAndTmSharingMessageId, sharingMessage[0])
				.set(sharingMessage[1], sharingMessage[2]);
		}

		return idMapByTerminalIdAndTmSharingMessageId;
	}

	/**
	 * AgtSharingMessage records are eventually aggregated into DailyAgtSharingMessage records,
	 * which represent sync status of a given repository for all records of a given repository
	 * on a given day.
	 *
	 * Terminals always sync to their Shard, and the Shard has all of the records needed by
	 * all terminals in that shard.  This is because during sync record creation the Shards
	 * owning the repository create those records in all Shards that have terminals pointing
	 * to those repositories.  Hence, deleting TerminalSLs never has to cross shard boundaries
	 *
	 * Deleting AgtSharingMessage records can be done in two ways.  First, it can be done
	 * on the bases of TerminalSLs not having any SyncLogs tied to them, this operation would still
	 * have to make queries to other nodes to find out which TerminalSL ids are not present.  This
	 * is not desired given that SyncLogs will be split be repository ids.
	 *
	 * A different version of this query is to delete TerminalSLs at the same time as SyncLogs,
	 * using foreign key constraints.  This query would provide the repository ids and should
	 * be quite a bit faster, given that it should go to targeted nodes for deletion of child
	 * SyncLog records.  Additional state management is not required for this version, since
	 * the query can also provide explicit SyncLogIds to be deleted as well (in theory).
	 *
	 * The second option can also only delete only TerminalSLs and leave SyncLogs alone, since they
	 * can just be dropped with the daily partition.
	 *
	 * Both ways can take in TerminalIds, which makes it easy to split the query if the
	 * AgtSharingMessage is split between nodes by terminal ids.
	 *
	 * TODO: inspect query plan
	 *
	 */
	async deleteForAgtRepositoryIdsOnDate(
		fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime,
		toDateExclusive: AgtRepositoryTransactionBlockAddDatetime,
		terminalIds: TerminalId[],
		repositoryIds: AgtRepositoryId[],
	): Promise<void> {
	}

}