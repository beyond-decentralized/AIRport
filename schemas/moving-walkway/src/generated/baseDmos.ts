import { IDmo } from "@airport/air-control";
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


export interface IBaseMissingRecordDmo
  extends IDmo<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateProperties, MissingRecordEId, QMissingRecord> {
}

export class BaseMissingRecordDmo
  extends Dmo<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateProperties, MissingRecordEId, QMissingRecord>
	implements IBaseMissingRecordDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['MissingRecord']);
	}
}


export interface IBaseMissingRecordRepoTransBlockDmo
  extends IDmo<IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, QMissingRecordRepoTransBlock> {
}

export class BaseMissingRecordRepoTransBlockDmo
  extends Dmo<IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, QMissingRecordRepoTransBlock>
	implements IBaseMissingRecordRepoTransBlockDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['MissingRecordRepoTransBlock']);
	}
}


export interface IBaseRecordUpdateStageDmo
  extends IDmo<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, QRecordUpdateStage> {
}

export class BaseRecordUpdateStageDmo
  extends Dmo<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, QRecordUpdateStage>
	implements IBaseRecordUpdateStageDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RecordUpdateStage']);
	}
}


export interface IBaseRepoTransBlockResponseStageDmo
  extends IDmo<IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, QRepoTransBlockResponseStage> {
}

export class BaseRepoTransBlockResponseStageDmo
  extends Dmo<IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, QRepoTransBlockResponseStage>
	implements IBaseRepoTransBlockResponseStageDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepoTransBlockResponseStage']);
	}
}


export interface IBaseRepoTransBlockSchemaToChangeDmo
  extends IDmo<IRepoTransBlockSchemaToChange, RepoTransBlockSchemaToChangeESelect, RepoTransBlockSchemaToChangeECreateProperties, RepoTransBlockSchemaToChangeEUpdateProperties, RepoTransBlockSchemaToChangeEId, QRepoTransBlockSchemaToChange> {
}

export class BaseRepoTransBlockSchemaToChangeDmo
  extends Dmo<IRepoTransBlockSchemaToChange, RepoTransBlockSchemaToChangeESelect, RepoTransBlockSchemaToChangeECreateProperties, RepoTransBlockSchemaToChangeEUpdateProperties, RepoTransBlockSchemaToChangeEId, QRepoTransBlockSchemaToChange>
	implements IBaseRepoTransBlockSchemaToChangeDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepoTransBlockSchemaToChange']);
	}
}


export interface IBaseRepositoryTransactionBlockDmo
  extends IDmo<IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, QRepositoryTransactionBlock> {
}

export class BaseRepositoryTransactionBlockDmo
  extends Dmo<IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, QRepositoryTransactionBlock>
	implements IBaseRepositoryTransactionBlockDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepositoryTransactionBlock']);
	}
}


export interface IBaseRepositoryTransactionHistoryUpdateStageDmo
  extends IDmo<IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, QRepositoryTransactionHistoryUpdateStage> {
}

export class BaseRepositoryTransactionHistoryUpdateStageDmo
  extends Dmo<IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, QRepositoryTransactionHistoryUpdateStage>
	implements IBaseRepositoryTransactionHistoryUpdateStageDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepositoryTransactionHistoryUpdateStage']);
	}
}


export interface IBaseSharingMessageDmo
  extends IDmo<ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateProperties, SharingMessageEId, QSharingMessage> {
}

export class BaseSharingMessageDmo
  extends Dmo<ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateProperties, SharingMessageEId, QSharingMessage>
	implements IBaseSharingMessageDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SharingMessage']);
	}
}


export interface IBaseSharingMessageRepoTransBlockDmo
  extends IDmo<ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, QSharingMessageRepoTransBlock> {
}

export class BaseSharingMessageRepoTransBlockDmo
  extends Dmo<ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, QSharingMessageRepoTransBlock>
	implements IBaseSharingMessageRepoTransBlockDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SharingMessageRepoTransBlock']);
	}
}


export interface IBaseSharingNodeDmo
  extends IDmo<ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateProperties, SharingNodeEId, QSharingNode> {
}

export class BaseSharingNodeDmo
  extends Dmo<ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateProperties, SharingNodeEId, QSharingNode>
	implements IBaseSharingNodeDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SharingNode']);
	}
}


export interface IBaseSharingNodeRepoTransBlockDmo
  extends IDmo<ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, QSharingNodeRepoTransBlock> {
}

export class BaseSharingNodeRepoTransBlockDmo
  extends Dmo<ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, QSharingNodeRepoTransBlock>
	implements IBaseSharingNodeRepoTransBlockDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SharingNodeRepoTransBlock']);
	}
}


export interface IBaseSharingNodeRepoTransBlockStageDmo
  extends IDmo<ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, QSharingNodeRepoTransBlockStage> {
}

export class BaseSharingNodeRepoTransBlockStageDmo
  extends Dmo<ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, QSharingNodeRepoTransBlockStage>
	implements IBaseSharingNodeRepoTransBlockStageDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SharingNodeRepoTransBlockStage']);
	}
}


export interface IBaseSharingNodeRepositoryDmo
  extends IDmo<ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, QSharingNodeRepository> {
}

export class BaseSharingNodeRepositoryDmo
  extends Dmo<ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, QSharingNodeRepository>
	implements IBaseSharingNodeRepositoryDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SharingNodeRepository']);
	}
}


export interface IBaseSharingNodeTerminalDmo
  extends IDmo<ISharingNodeTerminal, SharingNodeTerminalESelect, SharingNodeTerminalECreateProperties, SharingNodeTerminalEUpdateProperties, SharingNodeTerminalEId, QSharingNodeTerminal> {
}

export class BaseSharingNodeTerminalDmo
  extends Dmo<ISharingNodeTerminal, SharingNodeTerminalESelect, SharingNodeTerminalECreateProperties, SharingNodeTerminalEUpdateProperties, SharingNodeTerminalEId, QSharingNodeTerminal>
	implements IBaseSharingNodeTerminalDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SharingNodeTerminal']);
	}
}


export interface IBaseSynchronizationConflictDmo
  extends IDmo<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, QSynchronizationConflict> {
}

export class BaseSynchronizationConflictDmo
  extends Dmo<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, QSynchronizationConflict>
	implements IBaseSynchronizationConflictDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SynchronizationConflict']);
	}
}


export interface IBaseSynchronizationConflictPendingNotificationDmo
  extends IDmo<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, QSynchronizationConflictPendingNotification> {
}

export class BaseSynchronizationConflictPendingNotificationDmo
  extends Dmo<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, QSynchronizationConflictPendingNotification>
	implements IBaseSynchronizationConflictPendingNotificationDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SynchronizationConflictPendingNotification']);
	}
}


export interface IBaseSynchronizationConflictValuesDmo
  extends IDmo<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, QSynchronizationConflictValues> {
}

export class BaseSynchronizationConflictValuesDmo
  extends Dmo<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, QSynchronizationConflictValues>
	implements IBaseSynchronizationConflictValuesDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SynchronizationConflictValues']);
	}
}
