import {
	IDuo,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control'
import { Duo } from "@airport/check-in"
import {
	EntityId as DbEntityId
} from '@airport/ground-control'
import {
	Q,
	duoDiSet
} from './qSchema'
import {
	IMissingRecord,
	MissingRecordESelect,
	MissingRecordECreateColumns,
	MissingRecordECreateProperties,
	MissingRecordEUpdateColumns,
	MissingRecordEUpdateProperties,
	MissingRecordEId,
	MissingRecordECascadeGraph,
	QMissingRecord
} from './missingRecord/qmissingrecord'
import {
	IMissingRecordRepoTransBlock,
	MissingRecordRepoTransBlockESelect,
	MissingRecordRepoTransBlockECreateColumns,
	MissingRecordRepoTransBlockECreateProperties,
	MissingRecordRepoTransBlockEUpdateColumns,
	MissingRecordRepoTransBlockEUpdateProperties,
	MissingRecordRepoTransBlockEId,
	MissingRecordRepoTransBlockECascadeGraph,
	QMissingRecordRepoTransBlock
} from './missingRecord/qmissingrecordrepotransblock'
import {
	IRecordUpdateStage,
	RecordUpdateStageESelect,
	RecordUpdateStageECreateColumns,
	RecordUpdateStageECreateProperties,
	RecordUpdateStageEUpdateColumns,
	RecordUpdateStageEUpdateProperties,
	RecordUpdateStageEId,
	RecordUpdateStageECascadeGraph,
	QRecordUpdateStage
} from './qrecordupdatestage'
import {
	IRepoTransBlockResponseStage,
	RepoTransBlockResponseStageESelect,
	RepoTransBlockResponseStageECreateColumns,
	RepoTransBlockResponseStageECreateProperties,
	RepoTransBlockResponseStageEUpdateColumns,
	RepoTransBlockResponseStageEUpdateProperties,
	RepoTransBlockResponseStageEId,
	RepoTransBlockResponseStageECascadeGraph,
	QRepoTransBlockResponseStage
} from './repositoryTransactionBlock/qrepotransblockresponsestage'
import {
	IRepoTransBlockSchemaToChange,
	RepoTransBlockSchemaToChangeESelect,
	RepoTransBlockSchemaToChangeECreateColumns,
	RepoTransBlockSchemaToChangeECreateProperties,
	RepoTransBlockSchemaToChangeEUpdateColumns,
	RepoTransBlockSchemaToChangeEUpdateProperties,
	RepoTransBlockSchemaToChangeEId,
	RepoTransBlockSchemaToChangeECascadeGraph,
	QRepoTransBlockSchemaToChange
} from './repositoryTransactionBlock/qrepotransblockschematochange'
import {
	IRepositoryTransactionBlock,
	RepositoryTransactionBlockESelect,
	RepositoryTransactionBlockECreateColumns,
	RepositoryTransactionBlockECreateProperties,
	RepositoryTransactionBlockEUpdateColumns,
	RepositoryTransactionBlockEUpdateProperties,
	RepositoryTransactionBlockEId,
	RepositoryTransactionBlockECascadeGraph,
	QRepositoryTransactionBlock
} from './repositoryTransactionBlock/qrepositorytransactionblock'
import {
	IRepositoryTransactionHistoryUpdateStage,
	RepositoryTransactionHistoryUpdateStageESelect,
	RepositoryTransactionHistoryUpdateStageECreateColumns,
	RepositoryTransactionHistoryUpdateStageECreateProperties,
	RepositoryTransactionHistoryUpdateStageEUpdateColumns,
	RepositoryTransactionHistoryUpdateStageEUpdateProperties,
	RepositoryTransactionHistoryUpdateStageEId,
	RepositoryTransactionHistoryUpdateStageECascadeGraph,
	QRepositoryTransactionHistoryUpdateStage
} from './repositoryTransactionBlock/qrepositorytransactionhistoryupdatestage'
import {
	ISharingMessage,
	SharingMessageESelect,
	SharingMessageECreateColumns,
	SharingMessageECreateProperties,
	SharingMessageEUpdateColumns,
	SharingMessageEUpdateProperties,
	SharingMessageEId,
	SharingMessageECascadeGraph,
	QSharingMessage
} from './sharingMessage/qsharingmessage'
import {
	ISharingMessageRepoTransBlock,
	SharingMessageRepoTransBlockESelect,
	SharingMessageRepoTransBlockECreateColumns,
	SharingMessageRepoTransBlockECreateProperties,
	SharingMessageRepoTransBlockEUpdateColumns,
	SharingMessageRepoTransBlockEUpdateProperties,
	SharingMessageRepoTransBlockEId,
	SharingMessageRepoTransBlockECascadeGraph,
	QSharingMessageRepoTransBlock
} from './sharingMessage/qsharingmessagerepotransblock'
import {
	ISharingNode,
	SharingNodeESelect,
	SharingNodeECreateColumns,
	SharingNodeECreateProperties,
	SharingNodeEUpdateColumns,
	SharingNodeEUpdateProperties,
	SharingNodeEId,
	SharingNodeECascadeGraph,
	QSharingNode
} from './sharingNode/qsharingnode'
import {
	ISharingNodeRepoTransBlock,
	SharingNodeRepoTransBlockESelect,
	SharingNodeRepoTransBlockECreateColumns,
	SharingNodeRepoTransBlockECreateProperties,
	SharingNodeRepoTransBlockEUpdateColumns,
	SharingNodeRepoTransBlockEUpdateProperties,
	SharingNodeRepoTransBlockEId,
	SharingNodeRepoTransBlockECascadeGraph,
	QSharingNodeRepoTransBlock
} from './sharingNode/qsharingnoderepotransblock'
import {
	ISharingNodeRepoTransBlockStage,
	SharingNodeRepoTransBlockStageESelect,
	SharingNodeRepoTransBlockStageECreateColumns,
	SharingNodeRepoTransBlockStageECreateProperties,
	SharingNodeRepoTransBlockStageEUpdateColumns,
	SharingNodeRepoTransBlockStageEUpdateProperties,
	SharingNodeRepoTransBlockStageEId,
	SharingNodeRepoTransBlockStageECascadeGraph,
	QSharingNodeRepoTransBlockStage
} from './sharingNode/qsharingnoderepotransblockstage'
import {
	ISharingNodeRepository,
	SharingNodeRepositoryESelect,
	SharingNodeRepositoryECreateColumns,
	SharingNodeRepositoryECreateProperties,
	SharingNodeRepositoryEUpdateColumns,
	SharingNodeRepositoryEUpdateProperties,
	SharingNodeRepositoryEId,
	SharingNodeRepositoryECascadeGraph,
	QSharingNodeRepository
} from './sharingNode/qsharingnoderepository'
import {
	ISharingNodeTerminal,
	SharingNodeTerminalESelect,
	SharingNodeTerminalECreateColumns,
	SharingNodeTerminalECreateProperties,
	SharingNodeTerminalEUpdateColumns,
	SharingNodeTerminalEUpdateProperties,
	SharingNodeTerminalEId,
	SharingNodeTerminalECascadeGraph,
	QSharingNodeTerminal
} from './sharingNode/qsharingnodeterminal'
import {
	ISynchronizationConflict,
	SynchronizationConflictESelect,
	SynchronizationConflictECreateColumns,
	SynchronizationConflictECreateProperties,
	SynchronizationConflictEUpdateColumns,
	SynchronizationConflictEUpdateProperties,
	SynchronizationConflictEId,
	SynchronizationConflictECascadeGraph,
	QSynchronizationConflict
} from './conflict/qsynchronizationconflict'
import {
	ISynchronizationConflictPendingNotification,
	SynchronizationConflictPendingNotificationESelect,
	SynchronizationConflictPendingNotificationECreateColumns,
	SynchronizationConflictPendingNotificationECreateProperties,
	SynchronizationConflictPendingNotificationEUpdateColumns,
	SynchronizationConflictPendingNotificationEUpdateProperties,
	SynchronizationConflictPendingNotificationEId,
	SynchronizationConflictPendingNotificationECascadeGraph,
	QSynchronizationConflictPendingNotification
} from './conflict/qsynchronizationconflictpendingnotification'
import {
	ISynchronizationConflictValues,
	SynchronizationConflictValuesESelect,
	SynchronizationConflictValuesECreateColumns,
	SynchronizationConflictValuesECreateProperties,
	SynchronizationConflictValuesEUpdateColumns,
	SynchronizationConflictValuesEUpdateProperties,
	SynchronizationConflictValuesEId,
	SynchronizationConflictValuesECascadeGraph,
	QSynchronizationConflictValues
} from './conflict/qsynchronizationconflictvalues'


// Schema Q object Dependency Injection readiness detection DAO
export class SQDIDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
	extends Duo<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateProperties,
		EntityId,
		EntityCascadeGraph,
		IQE> {

	constructor(
		dbEntityId: DbEntityId
	) {
		super(dbEntityId, Q)
	}
}


export interface IBaseMissingRecordDuo
  extends IDuo<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateProperties, MissingRecordEId, MissingRecordECascadeGraph, QMissingRecord> {
}

export class BaseMissingRecordDuo
  extends SQDIDuo<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateProperties, MissingRecordEId, MissingRecordECascadeGraph, QMissingRecord>
	implements IBaseMissingRecordDuo {

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseMissingRecordRepoTransBlockDuo
  extends IDuo<IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, MissingRecordRepoTransBlockECascadeGraph, QMissingRecordRepoTransBlock> {
}

export class BaseMissingRecordRepoTransBlockDuo
  extends SQDIDuo<IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, MissingRecordRepoTransBlockECascadeGraph, QMissingRecordRepoTransBlock>
	implements IBaseMissingRecordRepoTransBlockDuo {

	static diSet(): boolean {
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseRecordUpdateStageDuo
  extends IDuo<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, RecordUpdateStageECascadeGraph, QRecordUpdateStage> {
}

export class BaseRecordUpdateStageDuo
  extends SQDIDuo<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, RecordUpdateStageECascadeGraph, QRecordUpdateStage>
	implements IBaseRecordUpdateStageDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseRepoTransBlockResponseStageDuo
  extends IDuo<IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, RepoTransBlockResponseStageECascadeGraph, QRepoTransBlockResponseStage> {
}

export class BaseRepoTransBlockResponseStageDuo
  extends SQDIDuo<IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, RepoTransBlockResponseStageECascadeGraph, QRepoTransBlockResponseStage>
	implements IBaseRepoTransBlockResponseStageDuo {

	static diSet(): boolean {
		return duoDiSet(13)
	}
	
	constructor() {
		super(13)
	}
}


export interface IBaseRepoTransBlockSchemaToChangeDuo
  extends IDuo<IRepoTransBlockSchemaToChange, RepoTransBlockSchemaToChangeESelect, RepoTransBlockSchemaToChangeECreateProperties, RepoTransBlockSchemaToChangeEUpdateProperties, RepoTransBlockSchemaToChangeEId, RepoTransBlockSchemaToChangeECascadeGraph, QRepoTransBlockSchemaToChange> {
}

export class BaseRepoTransBlockSchemaToChangeDuo
  extends SQDIDuo<IRepoTransBlockSchemaToChange, RepoTransBlockSchemaToChangeESelect, RepoTransBlockSchemaToChangeECreateProperties, RepoTransBlockSchemaToChangeEUpdateProperties, RepoTransBlockSchemaToChangeEId, RepoTransBlockSchemaToChangeECascadeGraph, QRepoTransBlockSchemaToChange>
	implements IBaseRepoTransBlockSchemaToChangeDuo {

	static diSet(): boolean {
		return duoDiSet(10)
	}
	
	constructor() {
		super(10)
	}
}


export interface IBaseRepositoryTransactionBlockDuo
  extends IDuo<IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, RepositoryTransactionBlockECascadeGraph, QRepositoryTransactionBlock> {
}

export class BaseRepositoryTransactionBlockDuo
  extends SQDIDuo<IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, RepositoryTransactionBlockECascadeGraph, QRepositoryTransactionBlock>
	implements IBaseRepositoryTransactionBlockDuo {

	static diSet(): boolean {
		return duoDiSet(11)
	}
	
	constructor() {
		super(11)
	}
}


export interface IBaseRepositoryTransactionHistoryUpdateStageDuo
  extends IDuo<IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, RepositoryTransactionHistoryUpdateStageECascadeGraph, QRepositoryTransactionHistoryUpdateStage> {
}

export class BaseRepositoryTransactionHistoryUpdateStageDuo
  extends SQDIDuo<IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, RepositoryTransactionHistoryUpdateStageECascadeGraph, QRepositoryTransactionHistoryUpdateStage>
	implements IBaseRepositoryTransactionHistoryUpdateStageDuo {

	static diSet(): boolean {
		return duoDiSet(12)
	}
	
	constructor() {
		super(12)
	}
}


export interface IBaseSharingMessageDuo
  extends IDuo<ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateProperties, SharingMessageEId, SharingMessageECascadeGraph, QSharingMessage> {
}

export class BaseSharingMessageDuo
  extends SQDIDuo<ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateProperties, SharingMessageEId, SharingMessageECascadeGraph, QSharingMessage>
	implements IBaseSharingMessageDuo {

	static diSet(): boolean {
		return duoDiSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseSharingMessageRepoTransBlockDuo
  extends IDuo<ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, SharingMessageRepoTransBlockECascadeGraph, QSharingMessageRepoTransBlock> {
}

export class BaseSharingMessageRepoTransBlockDuo
  extends SQDIDuo<ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, SharingMessageRepoTransBlockECascadeGraph, QSharingMessageRepoTransBlock>
	implements IBaseSharingMessageRepoTransBlockDuo {

	static diSet(): boolean {
		return duoDiSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseSharingNodeDuo
  extends IDuo<ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateProperties, SharingNodeEId, SharingNodeECascadeGraph, QSharingNode> {
}

export class BaseSharingNodeDuo
  extends SQDIDuo<ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateProperties, SharingNodeEId, SharingNodeECascadeGraph, QSharingNode>
	implements IBaseSharingNodeDuo {

	static diSet(): boolean {
		return duoDiSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseSharingNodeRepoTransBlockDuo
  extends IDuo<ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, SharingNodeRepoTransBlockECascadeGraph, QSharingNodeRepoTransBlock> {
}

export class BaseSharingNodeRepoTransBlockDuo
  extends SQDIDuo<ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, SharingNodeRepoTransBlockECascadeGraph, QSharingNodeRepoTransBlock>
	implements IBaseSharingNodeRepoTransBlockDuo {

	static diSet(): boolean {
		return duoDiSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseSharingNodeRepoTransBlockStageDuo
  extends IDuo<ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, SharingNodeRepoTransBlockStageECascadeGraph, QSharingNodeRepoTransBlockStage> {
}

export class BaseSharingNodeRepoTransBlockStageDuo
  extends SQDIDuo<ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, SharingNodeRepoTransBlockStageECascadeGraph, QSharingNodeRepoTransBlockStage>
	implements IBaseSharingNodeRepoTransBlockStageDuo {

	static diSet(): boolean {
		return duoDiSet(16)
	}
	
	constructor() {
		super(16)
	}
}


export interface IBaseSharingNodeRepositoryDuo
  extends IDuo<ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, SharingNodeRepositoryECascadeGraph, QSharingNodeRepository> {
}

export class BaseSharingNodeRepositoryDuo
  extends SQDIDuo<ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, SharingNodeRepositoryECascadeGraph, QSharingNodeRepository>
	implements IBaseSharingNodeRepositoryDuo {

	static diSet(): boolean {
		return duoDiSet(15)
	}
	
	constructor() {
		super(15)
	}
}


export interface IBaseSharingNodeTerminalDuo
  extends IDuo<ISharingNodeTerminal, SharingNodeTerminalESelect, SharingNodeTerminalECreateProperties, SharingNodeTerminalEUpdateProperties, SharingNodeTerminalEId, SharingNodeTerminalECascadeGraph, QSharingNodeTerminal> {
}

export class BaseSharingNodeTerminalDuo
  extends SQDIDuo<ISharingNodeTerminal, SharingNodeTerminalESelect, SharingNodeTerminalECreateProperties, SharingNodeTerminalEUpdateProperties, SharingNodeTerminalEId, SharingNodeTerminalECascadeGraph, QSharingNodeTerminal>
	implements IBaseSharingNodeTerminalDuo {

	static diSet(): boolean {
		return duoDiSet(14)
	}
	
	constructor() {
		super(14)
	}
}


export interface IBaseSynchronizationConflictDuo
  extends IDuo<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, SynchronizationConflictECascadeGraph, QSynchronizationConflict> {
}

export class BaseSynchronizationConflictDuo
  extends SQDIDuo<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, SynchronizationConflictECascadeGraph, QSynchronizationConflict>
	implements IBaseSynchronizationConflictDuo {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseSynchronizationConflictPendingNotificationDuo
  extends IDuo<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, SynchronizationConflictPendingNotificationECascadeGraph, QSynchronizationConflictPendingNotification> {
}

export class BaseSynchronizationConflictPendingNotificationDuo
  extends SQDIDuo<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, SynchronizationConflictPendingNotificationECascadeGraph, QSynchronizationConflictPendingNotification>
	implements IBaseSynchronizationConflictPendingNotificationDuo {

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseSynchronizationConflictValuesDuo
  extends IDuo<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, SynchronizationConflictValuesECascadeGraph, QSynchronizationConflictValues> {
}

export class BaseSynchronizationConflictValuesDuo
  extends SQDIDuo<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, SynchronizationConflictValuesECascadeGraph, QSynchronizationConflictValues>
	implements IBaseSynchronizationConflictValuesDuo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}
