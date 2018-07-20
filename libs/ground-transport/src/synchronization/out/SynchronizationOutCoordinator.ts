import {withLatestFrom} from "rxjs/operators/withLatestFrom";
import {ISharingNode, SharingNodeSyncFrequency} from "@airport/moving-walkway";
import {ITerminal} from "@airport/holding-pattern";
import {
	SynchronizationOutCoordinatorToken,
	SynchronizationOutManagerToken,
	SyncNodeManagerToken,
	TerminalStoreToken
} from "../../../../apps/terminal/src/InjectionTokens";
import {ISyncNodeManager} from "../SyncNodeManager";
import {ITerminalStore} from "../../../../apps/terminal/src/+state/TerminalStore";
import {Inject} from "typedi/decorators/Inject";
import {AbstractCompletable} from "../../../../apps/terminal/src/core/AbstractCompletable";
import {ISynchronizationOutManager} from "./SynchronizationOutManager";
import {Service} from "typedi";

export interface ISynchronizationOutCoordinator {

	initialize(): Promise<void>;

}

@Service(SynchronizationOutCoordinatorToken)
export class SynchronizationOutCoordinator
	extends AbstractCompletable
	implements ISynchronizationOutCoordinator {

	private nodesBySyncFrequency: Map<SharingNodeSyncFrequency, ISharingNode[]>
		= new Map();

	constructor(
		@Inject(SynchronizationOutManagerToken)
		private synchronizationOutManager: ISynchronizationOutManager,
		@Inject(SyncNodeManagerToken)
		private syncNodeManager: ISyncNodeManager,
		@Inject(TerminalStoreToken)
		private terminalStore: ITerminalStore,
	) {
		super();
	}


	async initialize(): Promise<void> {
		await this.syncNodeManager.initialize();

		this.record(this.terminalStore.nodesBySyncFrequency.pipe(
			withLatestFrom(this.terminalStore.terminal),
		).subscribe((
			[nodesBySyncFrequency, terminal]
		) => {
			if (!terminal) {
				return;
			}
			this.updateSyncPool(nodesBySyncFrequency, terminal);
		}));
	}

	private updateSyncPool(
		nodesBySyncFrequency: Map<SharingNodeSyncFrequency, ISharingNode[]>,
		terminal: ITerminal,
	) {
		const lastNodesBySyncFrequency = this.nodesBySyncFrequency;
		this.nodesBySyncFrequency = nodesBySyncFrequency;
		for (const [frequency, sharingNodes] of this.nodesBySyncFrequency) {
			// If in the new map there are sync node frequency that weren't in
			// the old map then kick off syncs for those frequencies
			if (!lastNodesBySyncFrequency.get(frequency)) {
				this.scheduleSyncsForFrequency(frequency, sharingNodes, terminal);
			}
		}

	}

	private returnToSyncPool(
		frequency: SharingNodeSyncFrequency,
		terminal: ITerminal,
	): void {
		const sharingNodes = this.nodesBySyncFrequency.get(frequency);
		if (!sharingNodes) {
			return;
		}
		this.scheduleSyncsForFrequency(frequency, sharingNodes, terminal);
	}

	private scheduleSyncsForFrequency(
		frequency: SharingNodeSyncFrequency,
		sharingNodes: ISharingNode[],
		terminal: ITerminal,
	): void {
		setTimeout(async () => {
			await this.synchronizationOutManager.synchronize(sharingNodes, terminal).then();
			this.returnToSyncPool(frequency, terminal);
		}, frequency);
	}

}