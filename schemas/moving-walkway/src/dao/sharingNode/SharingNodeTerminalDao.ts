import {
	and,
	IUtils,
	UtilsToken
} from "@airport/air-control";
import {TerminalId}                  from "@airport/holding-pattern";
import {
	Inject,
	Service
} from "typedi";
import {SharingNodeId}               from "../../ddl/ddl";
import {
	BaseSharingNodeTerminalDao,
	IBaseSharingNodeTerminalDao,
	ISharingNodeTerminal,
	Q,
	QSharingNodeTerminal
}                                    from "../../generated/generated";
import {SharingNodeTerminalDaoToken} from "../../InjectionTokens";

export interface ISharingNodeTerminalDao
	extends IBaseSharingNodeTerminalDao {

	findBySharingNodeDbMapByTerminalIdAndSharingNodeIds(
		terminalId: TerminalId,
		sharingNodeIds: SharingNodeId[]
	): Promise<Map<SharingNodeId, ISharingNodeTerminal>>;

}

@Service(SharingNodeTerminalDaoToken)
export class SharingNodeTerminalDao
	extends BaseSharingNodeTerminalDao
	implements ISharingNodeTerminalDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

	async findBySharingNodeDbMapByTerminalIdAndSharingNodeIds(
		terminalId: TerminalId,
		sharingNodeIds: SharingNodeId[]
	): Promise<Map<SharingNodeId, ISharingNodeTerminal>> {
		const sharingNodeDbMapBySharingNodeId: Map<SharingNodeId, ISharingNodeTerminal> = new Map();

		let snd: QSharingNodeTerminal;
		const sharingNodeDbs = await this.db.find.tree({
			select: {},
			from: [snd = Q.SharingNodeTerminal],
			where: and(
				snd.terminal.id.equals(terminalId),
				snd.sharingNode.id.in(sharingNodeIds)
			)
		});

		for (const sharingNodeDb of sharingNodeDbs) {
			sharingNodeDbMapBySharingNodeId.set(sharingNodeDb.sharingNode.id, sharingNodeDb);
		}

		return sharingNodeDbMapBySharingNodeId;
	}

}