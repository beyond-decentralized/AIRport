import {
	IDuo,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control'
import { Duo } from '@airport/check-in'
import {
	EntityId as DbEntityId
} from '@airport/ground-control'
import {
	Q,
	duoDiSet
} from './qSchema'
import {
	IMissingRecord
} from './missingrecord/missingrecord'
import {
	MissingRecordESelect,
	MissingRecordECreateColumns,
	MissingRecordECreateProperties,
	MissingRecordEUpdateColumns,
	MissingRecordEUpdateProperties,
	MissingRecordEId,
	MissingRecordECascadeGraph,
	QMissingRecord
} from './missingrecord/qmissingrecord'
import {
	IMissingRecordRepoTransBlock
} from './missingrecord/missingrecordrepotransblock'
import {
	MissingRecordRepoTransBlockESelect,
	MissingRecordRepoTransBlockECreateColumns,
	MissingRecordRepoTransBlockECreateProperties,
	MissingRecordRepoTransBlockEUpdateColumns,
	MissingRecordRepoTransBlockEUpdateProperties,
	MissingRecordRepoTransBlockEId,
	MissingRecordRepoTransBlockECascadeGraph,
	QMissingRecordRepoTransBlock
} from './missingrecord/qmissingrecordrepotransblock'
import {
	IRecordUpdateStage
} from './recordupdatestage'
import {
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
	IRepoTransBlockResponseStage
} from './repositorytransactionblock/repotransblockresponsestage'
import {
	RepoTransBlockResponseStageESelect,
	RepoTransBlockResponseStageECreateColumns,
	RepoTransBlockResponseStageECreateProperties,
	RepoTransBlockResponseStageEUpdateColumns,
	RepoTransBlockResponseStageEUpdateProperties,
	RepoTransBlockResponseStageEId,
	RepoTransBlockResponseStageECascadeGraph,
	QRepoTransBlockResponseStage
} from './repositorytransactionblock/qrepotransblockresponsestage'
import {
	IRepoTransBlockSchemaToChange
} from './repositorytransactionblock/repotransblockschematochange'
import {
	RepoTransBlockSchemaToChangeESelect,
	RepoTransBlockSchemaToChangeECreateColumns,
	RepoTransBlockSchemaToChangeECreateProperties,
	RepoTransBlockSchemaToChangeEUpdateColumns,
	RepoTransBlockSchemaToChangeEUpdateProperties,
	RepoTransBlockSchemaToChangeEId,
	RepoTransBlockSchemaToChangeECascadeGraph,
	QRepoTransBlockSchemaToChange
} from './repositorytransactionblock/qrepotransblockschematochange'
import {
	IRepositoryTransactionBlock
} from './repositorytransactionblock/repositorytransactionblock'
import {
	RepositoryTransactionBlockESelect,
	RepositoryTransactionBlockECreateColumns,
	RepositoryTransactionBlockECreateProperties,
	RepositoryTransactionBlockEUpdateColumns,
	RepositoryTransactionBlockEUpdateProperties,
	RepositoryTransactionBlockEId,
	RepositoryTransactionBlockECascadeGraph,
	QRepositoryTransactionBlock
} from './repositorytransactionblock/qrepositorytransactionblock'
import {
	IRepositoryTransactionHistoryUpdateStage
} from './repositorytransactionblock/repositorytransactionhistoryupdatestage'
import {
	RepositoryTransactionHistoryUpdateStageESelect,
	RepositoryTransactionHistoryUpdateStageECreateColumns,
	RepositoryTransactionHistoryUpdateStageECreateProperties,
	RepositoryTransactionHistoryUpdateStageEUpdateColumns,
	RepositoryTransactionHistoryUpdateStageEUpdateProperties,
	RepositoryTransactionHistoryUpdateStageEId,
	RepositoryTransactionHistoryUpdateStageECascadeGraph,
	QRepositoryTransactionHistoryUpdateStage
} from './repositorytransactionblock/qrepositorytransactionhistoryupdatestage'
import {
	ISharingMessage
} from './sharingmessage/sharingmessage'
import {
	SharingMessageESelect,
	SharingMessageECreateColumns,
	SharingMessageECreateProperties,
	SharingMessageEUpdateColumns,
	SharingMessageEUpdateProperties,
	SharingMessageEId,
	SharingMessageECascadeGraph,
	QSharingMessage
} from './sharingmessage/qsharingmessage'
import {
	ISharingMessageRepoTransBlock
} from './sharingmessage/sharingmessagerepotransblock'
import {
	SharingMessageRepoTransBlockESelect,
	SharingMessageRepoTransBlockECreateColumns,
	SharingMessageRepoTransBlockECreateProperties,
	SharingMessageRepoTransBlockEUpdateColumns,
	SharingMessageRepoTransBlockEUpdateProperties,
	SharingMessageRepoTransBlockEId,
	SharingMessageRepoTransBlockECascadeGraph,
	QSharingMessageRepoTransBlock
} from './sharingmessage/qsharingmessagerepotransblock'
import {
	ISharingNode
} from './sharingnode/sharingnode'
import {
	SharingNodeESelect,
	SharingNodeECreateColumns,
	SharingNodeECreateProperties,
	SharingNodeEUpdateColumns,
	SharingNodeEUpdateProperties,
	SharingNodeEId,
	SharingNodeECascadeGraph,
	QSharingNode
} from './sharingnode/qsharingnode'
import {
	ISharingNodeRepoTransBlock
} from './sharingnode/sharingnoderepotransblock'
import {
	SharingNodeRepoTransBlockESelect,
	SharingNodeRepoTransBlockECreateColumns,
	SharingNodeRepoTransBlockECreateProperties,
	SharingNodeRepoTransBlockEUpdateColumns,
	SharingNodeRepoTransBlockEUpdateProperties,
	SharingNodeRepoTransBlockEId,
	SharingNodeRepoTransBlockECascadeGraph,
	QSharingNodeRepoTransBlock
} from './sharingnode/qsharingnoderepotransblock'
import {
	ISharingNodeRepoTransBlockStage
} from './sharingnode/sharingnoderepotransblockstage'
import {
	SharingNodeRepoTransBlockStageESelect,
	SharingNodeRepoTransBlockStageECreateColumns,
	SharingNodeRepoTransBlockStageECreateProperties,
	SharingNodeRepoTransBlockStageEUpdateColumns,
	SharingNodeRepoTransBlockStageEUpdateProperties,
	SharingNodeRepoTransBlockStageEId,
	SharingNodeRepoTransBlockStageECascadeGraph,
	QSharingNodeRepoTransBlockStage
} from './sharingnode/qsharingnoderepotransblockstage'
import {
	ISharingNodeRepository
} from './sharingnode/sharingnoderepository'
import {
	SharingNodeRepositoryESelect,
	SharingNodeRepositoryECreateColumns,
	SharingNodeRepositoryECreateProperties,
	SharingNodeRepositoryEUpdateColumns,
	SharingNodeRepositoryEUpdateProperties,
	SharingNodeRepositoryEId,
	SharingNodeRepositoryECascadeGraph,
	QSharingNodeRepository
} from './sharingnode/qsharingnoderepository'
import {
	ISharingNodeTerminal
} from './sharingnode/sharingnodeterminal'
import {
	SharingNodeTerminalESelect,
	SharingNodeTerminalECreateColumns,
	SharingNodeTerminalECreateProperties,
	SharingNodeTerminalEUpdateColumns,
	SharingNodeTerminalEUpdateProperties,
	SharingNodeTerminalEId,
	SharingNodeTerminalECascadeGraph,
	QSharingNodeTerminal
} from './sharingnode/qsharingnodeterminal'
import {
	ISynchronizationConflict
} from './conflict/synchronizationconflict'
import {
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
	ISynchronizationConflictPendingNotification
} from './conflict/synchronizationconflictpendingnotification'
import {
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
	ISynchronizationConflictValues
} from './conflict/synchronizationconflictvalues'
import {
	SynchronizationConflictValuesESelect,
	SynchronizationConflictValuesECreateColumns,
	SynchronizationConflictValuesECreateProperties,
	SynchronizationConflictValuesEUpdateColumns,
	SynchronizationConflictValuesEUpdateProperties,
	SynchronizationConflictValuesEId,
	SynchronizationConflictValuesECascadeGraph,
	QSynchronizationConflictValues
} from './conflict/qsynchronizationconflictvalues'


// Schema Q object Dependency Injection readiness detection Duo
export class SQDIDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
  EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
	extends Duo<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateColumns,
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
  extends IDuo<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateColumns, MissingRecordEUpdateProperties, MissingRecordEId, MissingRecordECascadeGraph, QMissingRecord> {
}

export class BaseMissingRecordDuo
  extends SQDIDuo<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateColumns, MissingRecordEUpdateProperties, MissingRecordEId, MissingRecordECascadeGraph, QMissingRecord>
	implements IBaseMissingRecordDuo {

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseMissingRecordRepoTransBlockDuo
  extends IDuo<IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateColumns, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, MissingRecordRepoTransBlockECascadeGraph, QMissingRecordRepoTransBlock> {
}

export class BaseMissingRecordRepoTransBlockDuo
  extends SQDIDuo<IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateColumns, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, MissingRecordRepoTransBlockECascadeGraph, QMissingRecordRepoTransBlock>
	implements IBaseMissingRecordRepoTransBlockDuo {

	static diSet(): boolean {
		return duoDiSet(16)
	}
	
	constructor() {
		super(16)
	}
}


export interface IBaseRecordUpdateStageDuo
  extends IDuo<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, RecordUpdateStageECascadeGraph, QRecordUpdateStage> {
}

export class BaseRecordUpdateStageDuo
  extends SQDIDuo<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, RecordUpdateStageECascadeGraph, QRecordUpdateStage>
	implements IBaseRecordUpdateStageDuo {

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseRepoTransBlockResponseStageDuo
  extends IDuo<IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateColumns, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, RepoTransBlockResponseStageECascadeGraph, QRepoTransBlockResponseStage> {
}

export class BaseRepoTransBlockResponseStageDuo
  extends SQDIDuo<IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateColumns, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, RepoTransBlockResponseStageECascadeGraph, QRepoTransBlockResponseStage>
	implements IBaseRepoTransBlockResponseStageDuo {

	static diSet(): boolean {
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseRepoTransBlockSchemaToChangeDuo
  extends IDuo<IRepoTransBlockSchemaToChange, RepoTransBlockSchemaToChangeESelect, RepoTransBlockSchemaToChangeECreateProperties, RepoTransBlockSchemaToChangeEUpdateColumns, RepoTransBlockSchemaToChangeEUpdateProperties, RepoTransBlockSchemaToChangeEId, RepoTransBlockSchemaToChangeECascadeGraph, QRepoTransBlockSchemaToChange> {
}

export class BaseRepoTransBlockSchemaToChangeDuo
  extends SQDIDuo<IRepoTransBlockSchemaToChange, RepoTransBlockSchemaToChangeESelect, RepoTransBlockSchemaToChangeECreateProperties, RepoTransBlockSchemaToChangeEUpdateColumns, RepoTransBlockSchemaToChangeEUpdateProperties, RepoTransBlockSchemaToChangeEId, RepoTransBlockSchemaToChangeECascadeGraph, QRepoTransBlockSchemaToChange>
	implements IBaseRepoTransBlockSchemaToChangeDuo {

	static diSet(): boolean {
		return duoDiSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseRepositoryTransactionBlockDuo
  extends IDuo<IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateColumns, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, RepositoryTransactionBlockECascadeGraph, QRepositoryTransactionBlock> {
}

export class BaseRepositoryTransactionBlockDuo
  extends SQDIDuo<IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateColumns, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, RepositoryTransactionBlockECascadeGraph, QRepositoryTransactionBlock>
	implements IBaseRepositoryTransactionBlockDuo {

	static diSet(): boolean {
		return duoDiSet(15)
	}
	
	constructor() {
		super(15)
	}
}


export interface IBaseRepositoryTransactionHistoryUpdateStageDuo
  extends IDuo<IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateColumns, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, RepositoryTransactionHistoryUpdateStageECascadeGraph, QRepositoryTransactionHistoryUpdateStage> {
}

export class BaseRepositoryTransactionHistoryUpdateStageDuo
  extends SQDIDuo<IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateColumns, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, RepositoryTransactionHistoryUpdateStageECascadeGraph, QRepositoryTransactionHistoryUpdateStage>
	implements IBaseRepositoryTransactionHistoryUpdateStageDuo {

	static diSet(): boolean {
		return duoDiSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseSharingMessageDuo
  extends IDuo<ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateColumns, SharingMessageEUpdateProperties, SharingMessageEId, SharingMessageECascadeGraph, QSharingMessage> {
}

export class BaseSharingMessageDuo
  extends SQDIDuo<ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateColumns, SharingMessageEUpdateProperties, SharingMessageEId, SharingMessageECascadeGraph, QSharingMessage>
	implements IBaseSharingMessageDuo {

	static diSet(): boolean {
		return duoDiSet(13)
	}
	
	constructor() {
		super(13)
	}
}


export interface IBaseSharingMessageRepoTransBlockDuo
  extends IDuo<ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateColumns, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, SharingMessageRepoTransBlockECascadeGraph, QSharingMessageRepoTransBlock> {
}

export class BaseSharingMessageRepoTransBlockDuo
  extends SQDIDuo<ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateColumns, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, SharingMessageRepoTransBlockECascadeGraph, QSharingMessageRepoTransBlock>
	implements IBaseSharingMessageRepoTransBlockDuo {

	static diSet(): boolean {
		return duoDiSet(14)
	}
	
	constructor() {
		super(14)
	}
}


export interface IBaseSharingNodeDuo
  extends IDuo<ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateColumns, SharingNodeEUpdateProperties, SharingNodeEId, SharingNodeECascadeGraph, QSharingNode> {
}

export class BaseSharingNodeDuo
  extends SQDIDuo<ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateColumns, SharingNodeEUpdateProperties, SharingNodeEId, SharingNodeECascadeGraph, QSharingNode>
	implements IBaseSharingNodeDuo {

	static diSet(): boolean {
		return duoDiSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseSharingNodeRepoTransBlockDuo
  extends IDuo<ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateColumns, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, SharingNodeRepoTransBlockECascadeGraph, QSharingNodeRepoTransBlock> {
}

export class BaseSharingNodeRepoTransBlockDuo
  extends SQDIDuo<ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateColumns, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, SharingNodeRepoTransBlockECascadeGraph, QSharingNodeRepoTransBlock>
	implements IBaseSharingNodeRepoTransBlockDuo {

	static diSet(): boolean {
		return duoDiSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseSharingNodeRepoTransBlockStageDuo
  extends IDuo<ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateColumns, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, SharingNodeRepoTransBlockStageECascadeGraph, QSharingNodeRepoTransBlockStage> {
}

export class BaseSharingNodeRepoTransBlockStageDuo
  extends SQDIDuo<ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateColumns, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, SharingNodeRepoTransBlockStageECascadeGraph, QSharingNodeRepoTransBlockStage>
	implements IBaseSharingNodeRepoTransBlockStageDuo {

	static diSet(): boolean {
		return duoDiSet(10)
	}
	
	constructor() {
		super(10)
	}
}


export interface IBaseSharingNodeRepositoryDuo
  extends IDuo<ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateColumns, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, SharingNodeRepositoryECascadeGraph, QSharingNodeRepository> {
}

export class BaseSharingNodeRepositoryDuo
  extends SQDIDuo<ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateColumns, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, SharingNodeRepositoryECascadeGraph, QSharingNodeRepository>
	implements IBaseSharingNodeRepositoryDuo {

	static diSet(): boolean {
		return duoDiSet(11)
	}
	
	constructor() {
		super(11)
	}
}


export interface IBaseSharingNodeTerminalDuo
  extends IDuo<ISharingNodeTerminal, SharingNodeTerminalESelect, SharingNodeTerminalECreateProperties, SharingNodeTerminalEUpdateColumns, SharingNodeTerminalEUpdateProperties, SharingNodeTerminalEId, SharingNodeTerminalECascadeGraph, QSharingNodeTerminal> {
}

export class BaseSharingNodeTerminalDuo
  extends SQDIDuo<ISharingNodeTerminal, SharingNodeTerminalESelect, SharingNodeTerminalECreateProperties, SharingNodeTerminalEUpdateColumns, SharingNodeTerminalEUpdateProperties, SharingNodeTerminalEId, SharingNodeTerminalECascadeGraph, QSharingNodeTerminal>
	implements IBaseSharingNodeTerminalDuo {

	static diSet(): boolean {
		return duoDiSet(12)
	}
	
	constructor() {
		super(12)
	}
}


export interface IBaseSynchronizationConflictDuo
  extends IDuo<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, SynchronizationConflictECascadeGraph, QSynchronizationConflict> {
}

export class BaseSynchronizationConflictDuo
  extends SQDIDuo<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, SynchronizationConflictECascadeGraph, QSynchronizationConflict>
	implements IBaseSynchronizationConflictDuo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseSynchronizationConflictPendingNotificationDuo
  extends IDuo<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateColumns, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, SynchronizationConflictPendingNotificationECascadeGraph, QSynchronizationConflictPendingNotification> {
}

export class BaseSynchronizationConflictPendingNotificationDuo
  extends SQDIDuo<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateColumns, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, SynchronizationConflictPendingNotificationECascadeGraph, QSynchronizationConflictPendingNotification>
	implements IBaseSynchronizationConflictPendingNotificationDuo {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseSynchronizationConflictValuesDuo
  extends IDuo<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, SynchronizationConflictValuesECascadeGraph, QSynchronizationConflictValues> {
}

export class BaseSynchronizationConflictValuesDuo
  extends SQDIDuo<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, SynchronizationConflictValuesECascadeGraph, QSynchronizationConflictValues>
	implements IBaseSynchronizationConflictValuesDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}
