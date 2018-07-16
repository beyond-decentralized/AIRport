import {withLatestFrom} from "rxjs/operators/withLatestFrom";
import {ISharingNode, SharingNodeSyncFrequency} from "@airport/moving-walkway";
import {IDatabase} from "@airport/holding-pattern";
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
			withLatestFrom(this.terminalStore.database),
		).subscribe((
			[nodesBySyncFrequency, database]
		) => {
			if (!database) {
				return;
			}
			this.updateSyncPool(nodesBySyncFrequency, database);
		}));
	}

	private updateSyncPool(
		nodesBySyncFrequency: Map<SharingNodeSyncFrequency, ISharingNode[]>,
		database: IDatabase,
	) {
		const lastNodesBySyncFrequency = this.nodesBySyncFrequency;
		this.nodesBySyncFrequency = nodesBySyncFrequency;
		for (const [frequency, sharingNodes] of this.nodesBySyncFrequency) {
			// If in the new map there are sync node frequency that weren't in
			// the old map then kick off syncs for those frequencies
			if (!lastNodesBySyncFrequency.get(frequency)) {
				this.scheduleSyncsForFrequency(frequency, sharingNodes, database);
			}
		}

	}

	private returnToSyncPool(
		frequency: SharingNodeSyncFrequency,
		database: IDatabase,
	): void {
		const sharingNodes = this.nodesBySyncFrequency.get(frequency);
		if (!sharingNodes) {
			return;
		}
		this.scheduleSyncsForFrequency(frequency, sharingNodes, database);
	}

	private scheduleSyncsForFrequency(
		frequency: SharingNodeSyncFrequency,
		sharingNodes: ISharingNode[],
		database: IDatabase,
	): void {
		setTimeout(async () => {
			await this.synchronizationOutManager.synchronize(sharingNodes, database).then();
			this.returnToSyncPool(frequency, database);
		}, frequency);
	}

}