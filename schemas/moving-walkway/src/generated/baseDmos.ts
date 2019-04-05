import {
	IDmo,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control';
import { Dmo } from "@airport/check-in";
import { Q } from './qSchema';
import {
	IMissingRecord,
	MissingRecordESelect,
	MissingRecordECreateColumns,
	MissingRecordECreateProperties,
	MissingRecordEUpdateColumns,
	MissingRecordEUpdateProperties,
	MissingRecordEId,
	QMissingRecord
} from './missingrecord/qmissingrecord';
import {
	IMissingRecordRepoTransBlock,
	MissingRecordRepoTransBlockESelect,
	MissingRecordRepoTransBlockECreateColumns,
	MissingRecordRepoTransBlockECreateProperties,
	MissingRecordRepoTransBlockEUpdateColumns,
	MissingRecordRepoTransBlockEUpdateProperties,
	MissingRecordRepoTransBlockEId,
	QMissingRecordRepoTransBlock
} from './missingrecord/qmissingrecordrepotransblock';
import {
	IRecordUpdateStage,
	RecordUpdateStageESelect,
	RecordUpdateStageECreateColumns,
	RecordUpdateStageECreateProperties,
	RecordUpdateStageEUpdateColumns,
	RecordUpdateStageEUpdateProperties,
	RecordUpdateStageEId,
	QRecordUpdateStage
} from './qrecordupdatestage';
import {
	IRepoTransBlockResponseStage,
	RepoTransBlockResponseStageESelect,
	RepoTransBlockResponseStageECreateColumns,
	RepoTransBlockResponseStageECreateProperties,
	RepoTransBlockResponseStageEUpdateColumns,
	RepoTransBlockResponseStageEUpdateProperties,
	RepoTransBlockResponseStageEId,
	QRepoTransBlockResponseStage
} from './repositorytransactionblock/qrepotransblockresponsestage';
import {
	IRepoTransBlockSchemaToChange,
	RepoTransBlockSchemaToChangeESelect,
	RepoTransBlockSchemaToChangeECreateColumns,
	RepoTransBlockSchemaToChangeECreateProperties,
	RepoTransBlockSchemaToChangeEUpdateColumns,
	RepoTransBlockSchemaToChangeEUpdateProperties,
	RepoTransBlockSchemaToChangeEId,
	QRepoTransBlockSchemaToChange
} from './repositorytransactionblock/qrepotransblockschematochange';
import {
	IRepositoryTransactionBlock,
	RepositoryTransactionBlockESelect,
	RepositoryTransactionBlockECreateColumns,
	RepositoryTransactionBlockECreateProperties,
	RepositoryTransactionBlockEUpdateColumns,
	RepositoryTransactionBlockEUpdateProperties,
	RepositoryTransactionBlockEId,
	QRepositoryTransactionBlock
} from './repositorytransactionblock/qrepositorytransactionblock';
import {
	IRepositoryTransactionHistoryUpdateStage,
	RepositoryTransactionHistoryUpdateStageESelect,
	RepositoryTransactionHistoryUpdateStageECreateColumns,
	RepositoryTransactionHistoryUpdateStageECreateProperties,
	RepositoryTransactionHistoryUpdateStageEUpdateColumns,
	RepositoryTransactionHistoryUpdateStageEUpdateProperties,
	RepositoryTransactionHistoryUpdateStageEId,
	QRepositoryTransactionHistoryUpdateStage
} from './repositorytransactionblock/qrepositorytransactionhistoryupdatestage';
import {
	ISharingMessage,
	SharingMessageESelect,
	SharingMessageECreateColumns,
	SharingMessageECreateProperties,
	SharingMessageEUpdateColumns,
	SharingMessageEUpdateProperties,
	SharingMessageEId,
	QSharingMessage
} from './sharingmessage/qsharingmessage';
import {
	ISharingMessageRepoTransBlock,
	SharingMessageRepoTransBlockESelect,
	SharingMessageRepoTransBlockECreateColumns,
	SharingMessageRepoTransBlockECreateProperties,
	SharingMessageRepoTransBlockEUpdateColumns,
	SharingMessageRepoTransBlockEUpdateProperties,
	SharingMessageRepoTransBlockEId,
	QSharingMessageRepoTransBlock
} from './sharingmessage/qsharingmessagerepotransblock';
import {
	ISharingNode,
	SharingNodeESelect,
	SharingNodeECreateColumns,
	SharingNodeECreateProperties,
	SharingNodeEUpdateColumns,
	SharingNodeEUpdateProperties,
	SharingNodeEId,
	QSharingNode
} from './sharingnode/qsharingnode';
import {
	ISharingNodeRepoTransBlock,
	SharingNodeRepoTransBlockESelect,
	SharingNodeRepoTransBlockECreateColumns,
	SharingNodeRepoTransBlockECreateProperties,
	SharingNodeRepoTransBlockEUpdateColumns,
	SharingNodeRepoTransBlockEUpdateProperties,
	SharingNodeRepoTransBlockEId,
	QSharingNodeRepoTransBlock
} from './sharingnode/qsharingnoderepotransblock';
import {
	ISharingNodeRepoTransBlockStage,
	SharingNodeRepoTransBlockStageESelect,
	SharingNodeRepoTransBlockStageECreateColumns,
	SharingNodeRepoTransBlockStageECreateProperties,
	SharingNodeRepoTransBlockStageEUpdateColumns,
	SharingNodeRepoTransBlockStageEUpdateProperties,
	SharingNodeRepoTransBlockStageEId,
	QSharingNodeRepoTransBlockStage
} from './sharingnode/qsharingnoderepotransblockstage';
import {
	ISharingNodeRepository,
	SharingNodeRepositoryESelect,
	SharingNodeRepositoryECreateColumns,
	SharingNodeRepositoryECreateProperties,
	SharingNodeRepositoryEUpdateColumns,
	SharingNodeRepositoryEUpdateProperties,
	SharingNodeRepositoryEId,
	QSharingNodeRepository
} from './sharingnode/qsharingnoderepository';
import {
	ISharingNodeTerminal,
	SharingNodeTerminalESelect,
	SharingNodeTerminalECreateColumns,
	SharingNodeTerminalECreateProperties,
	SharingNodeTerminalEUpdateColumns,
	SharingNodeTerminalEUpdateProperties,
	SharingNodeTerminalEId,
	QSharingNodeTerminal
} from './sharingnode/qsharingnodeterminal';
import {
	ISynchronizationConflict,
	SynchronizationConflictESelect,
	SynchronizationConflictECreateColumns,
	SynchronizationConflictECreateProperties,
	SynchronizationConflictEUpdateColumns,
	SynchronizationConflictEUpdateProperties,
	SynchronizationConflictEId,
	QSynchronizationConflict
} from './conflict/qsynchronizationconflict';
import {
	ISynchronizationConflictPendingNotification,
	SynchronizationConflictPendingNotificationESelect,
	SynchronizationConflictPendingNotificationECreateColumns,
	SynchronizationConflictPendingNotificationECreateProperties,
	SynchronizationConflictPendingNotificationEUpdateColumns,
	SynchronizationConflictPendingNotificationEUpdateProperties,
	SynchronizationConflictPendingNotificationEId,
	QSynchronizationConflictPendingNotification
} from './conflict/qsynchronizationconflictpendingnotification';
import {
	ISynchronizationConflictValues,
	SynchronizationConflictValuesESelect,
	SynchronizationConflictValuesECreateColumns,
	SynchronizationConflictValuesECreateProperties,
	SynchronizationConflictValuesEUpdateColumns,
	SynchronizationConflictValuesEUpdateProperties,
	SynchronizationConflictValuesEId,
	QSynchronizationConflictValues
} from './conflict/qsynchronizationconflictvalues';


// Schema Q object Dependency Injection readiness detection DAO
export class SQDIDmo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	IQE extends IQEntity>
	extends Dmo<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateProperties,
		EntityId,
		IQE> {

	static diSet(): boolean {
		return Q.db as any
	}

	constructor(
		dbEntityName: string
	) {
		super(dbEntityName, Q)
	}
}


export interface IBaseMissingRecordDmo
  extends IDmo<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateProperties, MissingRecordEId, QMissingRecord> {
}

export class BaseMissingRecordDmo
  extends SQDIDmo<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateProperties, MissingRecordEId, QMissingRecord>
	implements IBaseMissingRecordDmo {
	constructor() {
		super('MissingRecord');
	}
}


export interface IBaseMissingRecordRepoTransBlockDmo
  extends IDmo<IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, QMissingRecordRepoTransBlock> {
}

export class BaseMissingRecordRepoTransBlockDmo
  extends SQDIDmo<IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, QMissingRecordRepoTransBlock>
	implements IBaseMissingRecordRepoTransBlockDmo {
	constructor() {
		super('MissingRecordRepoTransBlock');
	}
}


export interface IBaseRecordUpdateStageDmo
  extends IDmo<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, QRecordUpdateStage> {
}

export class BaseRecordUpdateStageDmo
  extends SQDIDmo<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, QRecordUpdateStage>
	implements IBaseRecordUpdateStageDmo {
	constructor() {
		super('RecordUpdateStage');
	}
}


export interface IBaseRepoTransBlockResponseStageDmo
  extends IDmo<IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, QRepoTransBlockResponseStage> {
}

export class BaseRepoTransBlockResponseStageDmo
  extends SQDIDmo<IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, QRepoTransBlockResponseStage>
	implements IBaseRepoTransBlockResponseStageDmo {
	constructor() {
		super('RepoTransBlockResponseStage');
	}
}


export interface IBaseRepoTransBlockSchemaToChangeDmo
  extends IDmo<IRepoTransBlockSchemaToChange, RepoTransBlockSchemaToChangeESelect, RepoTransBlockSchemaToChangeECreateProperties, RepoTransBlockSchemaToChangeEUpdateProperties, RepoTransBlockSchemaToChangeEId, QRepoTransBlockSchemaToChange> {
}

export class BaseRepoTransBlockSchemaToChangeDmo
  extends SQDIDmo<IRepoTransBlockSchemaToChange, RepoTransBlockSchemaToChangeESelect, RepoTransBlockSchemaToChangeECreateProperties, RepoTransBlockSchemaToChangeEUpdateProperties, RepoTransBlockSchemaToChangeEId, QRepoTransBlockSchemaToChange>
	implements IBaseRepoTransBlockSchemaToChangeDmo {
	constructor() {
		super('RepoTransBlockSchemaToChange');
	}
}


export interface IBaseRepositoryTransactionBlockDmo
  extends IDmo<IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, QRepositoryTransactionBlock> {
}

export class BaseRepositoryTransactionBlockDmo
  extends SQDIDmo<IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, QRepositoryTransactionBlock>
	implements IBaseRepositoryTransactionBlockDmo {
	constructor() {
		super('RepositoryTransactionBlock');
	}
}


export interface IBaseRepositoryTransactionHistoryUpdateStageDmo
  extends IDmo<IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, QRepositoryTransactionHistoryUpdateStage> {
}

export class BaseRepositoryTransactionHistoryUpdateStageDmo
  extends SQDIDmo<IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, QRepositoryTransactionHistoryUpdateStage>
	implements IBaseRepositoryTransactionHistoryUpdateStageDmo {
	constructor() {
		super('RepositoryTransactionHistoryUpdateStage');
	}
}


export interface IBaseSharingMessageDmo
  extends IDmo<ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateProperties, SharingMessageEId, QSharingMessage> {
}

export class BaseSharingMessageDmo
  extends SQDIDmo<ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateProperties, SharingMessageEId, QSharingMessage>
	implements IBaseSharingMessageDmo {
	constructor() {
		super('SharingMessage');
	}
}


export interface IBaseSharingMessageRepoTransBlockDmo
  extends IDmo<ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, QSharingMessageRepoTransBlock> {
}

export class BaseSharingMessageRepoTransBlockDmo
  extends SQDIDmo<ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, QSharingMessageRepoTransBlock>
	implements IBaseSharingMessageRepoTransBlockDmo {
	constructor() {
		super('SharingMessageRepoTransBlock');
	}
}


export interface IBaseSharingNodeDmo
  extends IDmo<ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateProperties, SharingNodeEId, QSharingNode> {
}

export class BaseSharingNodeDmo
  extends SQDIDmo<ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateProperties, SharingNodeEId, QSharingNode>
	implements IBaseSharingNodeDmo {
	constructor() {
		super('SharingNode');
	}
}


export interface IBaseSharingNodeRepoTransBlockDmo
  extends IDmo<ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, QSharingNodeRepoTransBlock> {
}

export class BaseSharingNodeRepoTransBlockDmo
  extends SQDIDmo<ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, QSharingNodeRepoTransBlock>
	implements IBaseSharingNodeRepoTransBlockDmo {
	constructor() {
		super('SharingNodeRepoTransBlock');
	}
}


export interface IBaseSharingNodeRepoTransBlockStageDmo
  extends IDmo<ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, QSharingNodeRepoTransBlockStage> {
}

export class BaseSharingNodeRepoTransBlockStageDmo
  extends SQDIDmo<ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, QSharingNodeRepoTransBlockStage>
	implements IBaseSharingNodeRepoTransBlockStageDmo {
	constructor() {
		super('SharingNodeRepoTransBlockStage');
	}
}


export interface IBaseSharingNodeRepositoryDmo
  extends IDmo<ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, QSharingNodeRepository> {
}

export class BaseSharingNodeRepositoryDmo
  extends SQDIDmo<ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, QSharingNodeRepository>
	implements IBaseSharingNodeRepositoryDmo {
	constructor() {
		super('SharingNodeRepository');
	}
}


export interface IBaseSharingNodeTerminalDmo
  extends IDmo<ISharingNodeTerminal, SharingNodeTerminalESelect, SharingNodeTerminalECreateProperties, SharingNodeTerminalEUpdateProperties, SharingNodeTerminalEId, QSharingNodeTerminal> {
}

export class BaseSharingNodeTerminalDmo
  extends SQDIDmo<ISharingNodeTerminal, SharingNodeTerminalESelect, SharingNodeTerminalECreateProperties, SharingNodeTerminalEUpdateProperties, SharingNodeTerminalEId, QSharingNodeTerminal>
	implements IBaseSharingNodeTerminalDmo {
	constructor() {
		super('SharingNodeTerminal');
	}
}


export interface IBaseSynchronizationConflictDmo
  extends IDmo<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, QSynchronizationConflict> {
}

export class BaseSynchronizationConflictDmo
  extends SQDIDmo<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, QSynchronizationConflict>
	implements IBaseSynchronizationConflictDmo {
	constructor() {
		super('SynchronizationConflict');
	}
}


export interface IBaseSynchronizationConflictPendingNotificationDmo
  extends IDmo<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, QSynchronizationConflictPendingNotification> {
}

export class BaseSynchronizationConflictPendingNotificationDmo
  extends SQDIDmo<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, QSynchronizationConflictPendingNotification>
	implements IBaseSynchronizationConflictPendingNotificationDmo {
	constructor() {
		super('SynchronizationConflictPendingNotification');
	}
}


export interface IBaseSynchronizationConflictValuesDmo
  extends IDmo<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, QSynchronizationConflictValues> {
}

export class BaseSynchronizationConflictValuesDmo
  extends SQDIDmo<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, QSynchronizationConflictValues>
	implements IBaseSynchronizationConflictValuesDmo {
	constructor() {
		super('SynchronizationConflictValues');
	}
}
