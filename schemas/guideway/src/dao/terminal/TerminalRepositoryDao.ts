import {
	AirportDatabaseToken,
	and,
	IAirportDatabase,
	IUtils
}                                     from "@airport/air-control";
import {UtilsToken}                   from "@airport/air-control/lib/InjectionTokens";
import {
	TerminalId,
	AgtRepositoryId
}                                     from "@airport/arrivals-n-departures";
import {
	Inject,
	Service
}                                     from "typedi";
import {TerminalRepositoryPermission} from "../../ddl/ddl";
import {
	BaseTerminalRepositoryDao,
	QTerminalRepository
}                                     from "../../generated/generated";
import {Q}                            from "../../generated/qSchema";
import {TerminalRepositoryDaoToken}   from "../../InjectionTokens";

export interface ITerminalRepositoryDao {

	findByTerminalIdInAndRepositoryIdIn(
		terminalIds: TerminalId[],
		repositoryIds: AgtRepositoryId[]
	): Promise<Map<TerminalId, Map<AgtRepositoryId, TerminalRepositoryPermission>>>;

}

@Service(TerminalRepositoryDaoToken)
export class TerminalRepositoryDao
	extends BaseTerminalRepositoryDao
	implements ITerminalRepositoryDao {

	constructor(
		@Inject(AirportDatabaseToken)
		private airportDb: IAirportDatabase,
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

	async findByTerminalIdInAndRepositoryIdIn(
		terminalIds: TerminalId[],
		repositoryIds: AgtRepositoryId[]
	): Promise<Map<TerminalId, Map<AgtRepositoryId, TerminalRepositoryPermission>>> {
		const resultMapByTerminalId: Map<TerminalId, Map<AgtRepositoryId, TerminalRepositoryPermission>>
			      = new Map();

		let tr: QTerminalRepository;
		const results = await this.airportDb.find.sheet({
			from: [
				tr = Q.TerminalRepository
			],
			select: [
				tr.terminal.id,
				tr.repository.id,
				tr.permission,
			],
			where: and(
				tr.terminal.id.in(terminalIds),
				tr.repository.id.in(repositoryIds)
			)
		});

		for (const result of results) {
			const terminalId = result[0];
			let repoMapForTerminal = resultMapByTerminalId.get(terminalId);
			if (!repoMapForTerminal) {
				repoMapForTerminal = new Map();
				resultMapByTerminalId.set(terminalId, repoMapForTerminal);
			}
			repoMapForTerminal.set(result[1], result[2]);
		}

		return resultMapByTerminalId;
	}

}