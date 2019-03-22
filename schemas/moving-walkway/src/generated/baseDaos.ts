import {
	IDao, 
	IUtils 
} from '@airport/air-control';
import { Dao } from '@airport/check-in';
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


export interface IBaseMissingRecordDao
  extends IDao<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateColumns, MissingRecordEUpdateProperties, MissingRecordEId, QMissingRecord> {
}

export class BaseMissingRecordDao
  extends Dao<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateColumns, MissingRecordEUpdateProperties, MissingRecordEId, QMissingRecord>
	implements IBaseMissingRecordDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['MissingRecord'], Q)
	}
}


export interface IBaseMissingRecordRepoTransBlockDao
  extends IDao<IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateColumns, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, QMissingRecordRepoTransBlock> {
}

export class BaseMissingRecordRepoTransBlockDao
  extends Dao<IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateColumns, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, QMissingRecordRepoTransBlock>
	implements IBaseMissingRecordRepoTransBlockDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['MissingRecordRepoTransBlock'], Q)
	}
}


export interface IBaseRecordUpdateStageDao
  extends IDao<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, QRecordUpdateStage> {
}

export class BaseRecordUpdateStageDao
  extends Dao<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, QRecordUpdateStage>
	implements IBaseRecordUpdateStageDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RecordUpdateStage'], Q)
	}
}


export interface IBaseRepoTransBlockResponseStageDao
  extends IDao<IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateColumns, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, QRepoTransBlockResponseStage> {
}

export class BaseRepoTransBlockResponseStageDao
  extends Dao<IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateColumns, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, QRepoTransBlockResponseStage>
	implements IBaseRepoTransBlockResponseStageDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepoTransBlockResponseStage'], Q)
	}
}


export interface IBaseRepoTransBlockSchemaToChangeDao
  extends IDao<IRepoTransBlockSchemaToChange, RepoTransBlockSchemaToChangeESelect, RepoTransBlockSchemaToChangeECreateProperties, RepoTransBlockSchemaToChangeEUpdateColumns, RepoTransBlockSchemaToChangeEUpdateProperties, RepoTransBlockSchemaToChangeEId, QRepoTransBlockSchemaToChange> {
}

export class BaseRepoTransBlockSchemaToChangeDao
  extends Dao<IRepoTransBlockSchemaToChange, RepoTransBlockSchemaToChangeESelect, RepoTransBlockSchemaToChangeECreateProperties, RepoTransBlockSchemaToChangeEUpdateColumns, RepoTransBlockSchemaToChangeEUpdateProperties, RepoTransBlockSchemaToChangeEId, QRepoTransBlockSchemaToChange>
	implements IBaseRepoTransBlockSchemaToChangeDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepoTransBlockSchemaToChange'], Q)
	}
}


export interface IBaseRepositoryTransactionBlockDao
  extends IDao<IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateColumns, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, QRepositoryTransactionBlock> {
}

export class BaseRepositoryTransactionBlockDao
  extends Dao<IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateColumns, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, QRepositoryTransactionBlock>
	implements IBaseRepositoryTransactionBlockDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepositoryTransactionBlock'], Q)
	}
}


export interface IBaseRepositoryTransactionHistoryUpdateStageDao
  extends IDao<IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateColumns, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, QRepositoryTransactionHistoryUpdateStage> {
}

export class BaseRepositoryTransactionHistoryUpdateStageDao
  extends Dao<IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateColumns, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, QRepositoryTransactionHistoryUpdateStage>
	implements IBaseRepositoryTransactionHistoryUpdateStageDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepositoryTransactionHistoryUpdateStage'], Q)
	}
}


export interface IBaseSharingMessageDao
  extends IDao<ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateColumns, SharingMessageEUpdateProperties, SharingMessageEId, QSharingMessage> {
}

export class BaseSharingMessageDao
  extends Dao<ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateColumns, SharingMessageEUpdateProperties, SharingMessageEId, QSharingMessage>
	implements IBaseSharingMessageDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SharingMessage'], Q)
	}
}


export interface IBaseSharingMessageRepoTransBlockDao
  extends IDao<ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateColumns, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, QSharingMessageRepoTransBlock> {
}

export class BaseSharingMessageRepoTransBlockDao
  extends Dao<ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateColumns, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, QSharingMessageRepoTransBlock>
	implements IBaseSharingMessageRepoTransBlockDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SharingMessageRepoTransBlock'], Q)
	}
}


export interface IBaseSharingNodeDao
  extends IDao<ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateColumns, SharingNodeEUpdateProperties, SharingNodeEId, QSharingNode> {
}

export class BaseSharingNodeDao
  extends Dao<ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateColumns, SharingNodeEUpdateProperties, SharingNodeEId, QSharingNode>
	implements IBaseSharingNodeDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SharingNode'], Q)
	}
}


export interface IBaseSharingNodeRepoTransBlockDao
  extends IDao<ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateColumns, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, QSharingNodeRepoTransBlock> {
}

export class BaseSharingNodeRepoTransBlockDao
  extends Dao<ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateColumns, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, QSharingNodeRepoTransBlock>
	implements IBaseSharingNodeRepoTransBlockDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SharingNodeRepoTransBlock'], Q)
	}
}


export interface IBaseSharingNodeRepoTransBlockStageDao
  extends IDao<ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateColumns, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, QSharingNodeRepoTransBlockStage> {
}

export class BaseSharingNodeRepoTransBlockStageDao
  extends Dao<ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateColumns, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, QSharingNodeRepoTransBlockStage>
	implements IBaseSharingNodeRepoTransBlockStageDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SharingNodeRepoTransBlockStage'], Q)
	}
}


export interface IBaseSharingNodeRepositoryDao
  extends IDao<ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateColumns, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, QSharingNodeRepository> {
}

export class BaseSharingNodeRepositoryDao
  extends Dao<ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateColumns, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, QSharingNodeRepository>
	implements IBaseSharingNodeRepositoryDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SharingNodeRepository'], Q)
	}
}


export interface IBaseSharingNodeTerminalDao
  extends IDao<ISharingNodeTerminal, SharingNodeTerminalESelect, SharingNodeTerminalECreateProperties, SharingNodeTerminalEUpdateColumns, SharingNodeTerminalEUpdateProperties, SharingNodeTerminalEId, QSharingNodeTerminal> {
}

export class BaseSharingNodeTerminalDao
  extends Dao<ISharingNodeTerminal, SharingNodeTerminalESelect, SharingNodeTerminalECreateProperties, SharingNodeTerminalEUpdateColumns, SharingNodeTerminalEUpdateProperties, SharingNodeTerminalEId, QSharingNodeTerminal>
	implements IBaseSharingNodeTerminalDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SharingNodeTerminal'], Q)
	}
}


export interface IBaseSynchronizationConflictDao
  extends IDao<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, QSynchronizationConflict> {
}

export class BaseSynchronizationConflictDao
  extends Dao<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, QSynchronizationConflict>
	implements IBaseSynchronizationConflictDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SynchronizationConflict'], Q)
	}
}


export interface IBaseSynchronizationConflictPendingNotificationDao
  extends IDao<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateColumns, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, QSynchronizationConflictPendingNotification> {
}

export class BaseSynchronizationConflictPendingNotificationDao
  extends Dao<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateColumns, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, QSynchronizationConflictPendingNotification>
	implements IBaseSynchronizationConflictPendingNotificationDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SynchronizationConflictPendingNotification'], Q)
	}
}


export interface IBaseSynchronizationConflictValuesDao
  extends IDao<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, QSynchronizationConflictValues> {
}

export class BaseSynchronizationConflictValuesDao
  extends Dao<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, QSynchronizationConflictValues>
	implements IBaseSynchronizationConflictValuesDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SynchronizationConflictValues'], Q)
	}
}
