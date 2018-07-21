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

	findBySharingNodeTmMapByTerminalIdAndSharingNodeIds(
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

	async findBySharingNodeTmMapByTerminalIdAndSharingNodeIds(
		terminalId: TerminalId,
		sharingNodeIds: SharingNodeId[]
	): Promise<Map<SharingNodeId, ISharingNodeTerminal>> {
		const sharingNodeTmMapBySharingNodeId: Map<SharingNodeId, ISharingNodeTerminal> = new Map();

		let snd: QSharingNodeTerminal;
		const sharingNodeTerminals = await this.db.find.tree({
			select: {},
			from: [snd = Q.SharingNodeTerminal],
			where: and(
				snd.terminal.id.equals(terminalId),
				snd.sharingNode.id.in(sharingNodeIds)
			)
		});

		for (const sharingNodeTerminal of sharingNodeTerminals) {
			sharingNodeTmMapBySharingNodeId.set(sharingNodeTerminal.sharingNode.id, sharingNodeTerminal);
		}

		return sharingNodeTmMapBySharingNodeId;
	}

}