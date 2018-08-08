import {and}              from "@airport/air-control/lib/impl/core/operation/LogicalOperation";
import {UtilsToken}       from "@airport/air-control/lib/InjectionTokens";
import {IUtils}           from "@airport/air-control/lib/lingo/utils/Utils";
import {
	TerminalName,
	TerminalSecondId
}                         from '@airport/arrivals-n-departures'
import {Inject}           from "typedi/decorators/Inject";
import {Service}          from "typedi/decorators/Service";
import {
	UserId
}                         from "../ddl/ddl";
import {
	BaseTerminalDao,
	IBaseTerminalDao,
	ITerminal,
	Q,
	QTerminal
}                         from "../generated/generated";
import {TerminalDaoToken} from "../InjectionTokens";

export interface ITerminalDao
	extends IBaseTerminalDao {

	findMapByIds(
		ownerUniqueIds: UserId[],
		names: TerminalName[],
		secondIds: TerminalSecondId[]
	): Promise<Map<UserId, Map<TerminalName, Map<TerminalSecondId, ITerminal>>>>;

	findByIds(
		ownerIds: UserId[],
		names: TerminalName[],
		secondIds: TerminalSecondId[]
	): Promise<ITerminal[]>;

}

@Service(TerminalDaoToken)
export class TerminalDao
	extends BaseTerminalDao
	implements ITerminalDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

	async findMapByIds(
		ownerIds: UserId[],
		names: TerminalName[],
		secondIds: TerminalSecondId[]
	): Promise<Map<UserId, Map<TerminalName, Map<TerminalSecondId, ITerminal>>>> {
		const terminalMap: Map<UserId,
			Map<TerminalName, Map<TerminalSecondId, ITerminal>>> = new Map();

		const terminals = await this.findByIds(ownerIds, names, secondIds);
		for (const terminal of terminals) {
			this.utils.ensureChildJsMap(
				this.utils.ensureChildJsMap(terminalMap,
					terminal.owner.id),
				terminal.name)
				.set(terminal.secondId, terminal);
		}

		return terminalMap;
	}

	async findByIds(
		ownerIds: UserId[],
		names: TerminalName[],
		secondIds: TerminalSecondId[]
	): Promise<ITerminal[]> {
		let d: QTerminal;
		return await this.db.find.tree({
			select: {},
			from: [
				d = Q.Terminal
			],
			where: and(
				d.owner.id.in(ownerIds),
				d.name.in(names),
				d.secondId.in(secondIds)
			)
		})
	}

}