/*
import {
	GoogleApi,
	GoogleDrive,
	GoogleDriveAdaptor,
	GoogleRealtime,
	GoogleRealtimeAdaptor,
	GoogleSharingAdaptor,
	PlatformType,
	SharingAdaptor, SharedChangeList, ChangeListShareInfo, ChangeRecord, ChangeRecordIterator
} from "@airport/ground-control";
*/
import { PlatformType } from "@airport/ground-control";
import { Subscription } from "rxjs";
import {
	IDeltaStoreConfig,
	ChangeListShareInfo,
	SharingAdaptor,
	IChangeListConfig,
	ChangeRecord,
	ChangeRecordIterator,
	SharedChangeList,
} from "@airport/terminal-map";
import { UpdateState } from "../core/UpdateState";
import {
	GoogleSharingAdaptor,
	GoogleApi,
	GoogleDrive,
	GoogleDriveAdaptor,
	GoogleRealtime,
	GoogleRealtimeAdaptor,
	InMemorySharingAdaptor,
	StubSharingAdaptor
} from "@airport/ground-transport";
import { IRepositoryTransactionHistory } from "@airport/holding-pattern";

/**
 * Created by Papa on 5/27/2016.
 */
export interface IDeltaStore {

	config: IDeltaStoreConfig;
	sharingAdaptor: SharingAdaptor;
	updateState: UpdateState;

	addChanges<E>(
		changeListConfig: IChangeListConfig,
		changeRecords: E[]
	): Promise<void>;

	goOffline(): void;

	goOnline(
		remoteChangesCallback: { (transactions: IRepositoryTransactionHistory[]): Promise<void> }
	): Promise<void>;

	loadTransactionsSinceLastKnown(
		lastKnownChangeRecord: ChangeRecord
	): Promise<ChangeRecordIterator>;

}

export class DeltaStore
	implements IDeltaStore {

	protected changeList: SharedChangeList;
	protected remoteChangesSubscription: Subscription;
	protected lastKnownChangeRecord: ChangeRecord;
	updateState: UpdateState = UpdateState.LOCAL;

	constructor(
		public config: IDeltaStoreConfig,
		public sharingAdaptor: SharingAdaptor = null
	) {
	}

	async addChanges<E>(
		changeListConfig: IChangeListConfig,
		changeRecords: E[]
	): Promise<void> {
		await this.changeList.addChanges(changeRecords);
		this.lastKnownChangeRecord = changeRecords[changeRecords.length - 1];
	}

	goOffline(): void {
		if (this.remoteChangesSubscription) {
			this.remoteChangesSubscription.unsubscribe();
		}
	}

	async loadTransactionsSinceLastKnown(
		lastKnownChangeRecord: any
	): Promise<any> {
		this.lastKnownChangeRecord = lastKnownChangeRecord;
		return await this.changeList.loadFromRecord(this.lastKnownChangeRecord);
	}

	async goOnline(
		remoteChangesCallback: { (transactions: IRepositoryTransactionHistory[]): Promise<void> }
	): Promise<void> {
		await this.sharingAdaptor.initialize(this.config.setupInfo);
		await this.setupChangeList();

		this.remoteChangesSubscription = this.changeList.changesAddedRemotelySubject().subscribe((iterator: ChangeRecordIterator) => {
			let transactions: IRepositoryTransactionHistory[] = [];
			while (iterator.hasNext()) {
				transactions.push(<any>iterator.next());
			}
			remoteChangesCallback(transactions).then(() => {
				this.lastKnownChangeRecord = transactions[transactions.length - 1];
			});
		});
	}

	private async setupChangeList(): Promise<void> {

		await this.loadChangeList();

		let changeListConfig = this.config.changeListConfig;

		let remoteLoadOp;
		if (this.config.changeListConfig.exists) {
			remoteLoadOp = this.sharingAdaptor.loadChangeList(changeListConfig.changeListInfo, this.config.setupInfo);
		} else {
			remoteLoadOp = this.sharingAdaptor.createChangeList(changeListConfig.changeListInfo, this.config.setupInfo);
			this.config.changeListConfig.exists = true;
		}

		let loadResponse = await remoteLoadOp;

		this.changeList = <any>loadResponse;
	}

	private async loadChangeList(): Promise<void> {
		let changeLists: ChangeListShareInfo[] = await this.sharingAdaptor.findExistingChangeLists(this.config.setupInfo);
		let changeListConfig = this.config.changeListConfig;
		changeLists.some((
			changeListShareInfo: ChangeListShareInfo
		) => {
			if (changeListShareInfo.name === changeListConfig.changeListInfo.name) {
				changeListConfig.exists = true;
				return true;
			}
		});
	}

}

var IN_MEMORY_SHARING_ADAPTOR: SharingAdaptor;
var GOOGLE_SHARING_ADAPTOR: SharingAdaptor;

export function getSharingAdaptor(
	platformType: PlatformType
): SharingAdaptor {
	switch (platformType) {
		case PlatformType.GOOGLE_DOCS:
			if (!GOOGLE_SHARING_ADAPTOR) {
				GOOGLE_SHARING_ADAPTOR = getGooglesSharingAdaptor();
			}
			return GOOGLE_SHARING_ADAPTOR;
		case PlatformType.IN_MEMORY:
			if (!IN_MEMORY_SHARING_ADAPTOR) {
				IN_MEMORY_SHARING_ADAPTOR = new InMemorySharingAdaptor();
			}
			return IN_MEMORY_SHARING_ADAPTOR;
		case PlatformType.STUB:
			return new StubSharingAdaptor();
		default:
			throw `Unsupported PlatformType: ${platformType}`;
	}
}


export function getGooglesSharingAdaptor(): GoogleSharingAdaptor {
	let googleApi = getGoogleApi();
	let googleDrive = getGoogleDrive(googleApi);
	let googleDriveAdaptor = getGoogleDriveAdaptor(googleApi, googleDrive);
	let googleRealtime = getGoogleRealtime(googleDrive);
	let googleRealtimeAdaptor = getGoogleRealtimeAdaptor(googleRealtime);
	let googleSharingAdaptor = getGoogleSharingAdaptor(googleDrive, googleDriveAdaptor, googleRealtime, googleRealtimeAdaptor);

	return googleSharingAdaptor;
}

function getGoogleApi(): GoogleApi {
	return new GoogleApi();
}

function getGoogleDrive(
	googleApi: GoogleApi
): GoogleDrive {
	return new GoogleDrive(googleApi);
}

function getGoogleDriveAdaptor(
	googleApi: GoogleApi,
	googleDrive: GoogleDrive
): GoogleDriveAdaptor {
	return new GoogleDriveAdaptor(googleApi, googleDrive);
}

function getGoogleRealtime(
	googleDrive: GoogleDrive
): GoogleRealtime {
	return new GoogleRealtime(googleDrive);
}

function getGoogleRealtimeAdaptor(
	googleRealtime: GoogleRealtime
): GoogleRealtimeAdaptor {
	return new GoogleRealtimeAdaptor(googleRealtime);
}

function getGoogleSharingAdaptor(
	googleDrive: GoogleDrive,
	googleDriveAdaptor: GoogleDriveAdaptor,
	googleRealtime: GoogleRealtime,
	googleRealtimeAdaptor: GoogleRealtimeAdaptor
): GoogleSharingAdaptor {
	return new GoogleSharingAdaptor(googleDrive, googleDriveAdaptor, googleRealtime, googleRealtimeAdaptor);
}