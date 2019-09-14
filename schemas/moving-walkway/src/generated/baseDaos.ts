import {
	IDao,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control'
import {
	Dao
} from '@airport/check-in'
import {
	EntityId as DbEntityId
} from '@airport/ground-control'
import {
	Q,
	diSet
} from './qSchema'
import {
	IMissingRecord,
	MissingRecordESelect,
	MissingRecordECascadeGraph,
	MissingRecordECreateColumns,
	MissingRecordECreateProperties,
	MissingRecordEUpdateColumns,
	MissingRecordEUpdateProperties,
	MissingRecordEId,
	QMissingRecord
} from './missingrecord/qmissingrecord'
import {
	IMissingRecordRepoTransBlock,
	MissingRecordRepoTransBlockESelect,
	MissingRecordRepoTransBlockECascadeGraph,
	MissingRecordRepoTransBlockECreateColumns,
	MissingRecordRepoTransBlockECreateProperties,
	MissingRecordRepoTransBlockEUpdateColumns,
	MissingRecordRepoTransBlockEUpdateProperties,
	MissingRecordRepoTransBlockEId,
	QMissingRecordRepoTransBlock
} from './missingrecord/qmissingrecordrepotransblock'
import {
	IRecordUpdateStage,
	RecordUpdateStageESelect,
	RecordUpdateStageECascadeGraph,
	RecordUpdateStageECreateColumns,
	RecordUpdateStageECreateProperties,
	RecordUpdateStageEUpdateColumns,
	RecordUpdateStageEUpdateProperties,
	RecordUpdateStageEId,
	QRecordUpdateStage
} from './qrecordupdatestage'
import {
	IRepoTransBlockResponseStage,
	RepoTransBlockResponseStageESelect,
	RepoTransBlockResponseStageECascadeGraph,
	RepoTransBlockResponseStageECreateColumns,
	RepoTransBlockResponseStageECreateProperties,
	RepoTransBlockResponseStageEUpdateColumns,
	RepoTransBlockResponseStageEUpdateProperties,
	RepoTransBlockResponseStageEId,
	QRepoTransBlockResponseStage
} from './repositorytransactionblock/qrepotransblockresponsestage'
import {
	IRepoTransBlockSchemaToChange,
	RepoTransBlockSchemaToChangeESelect,
	RepoTransBlockSchemaToChangeECascadeGraph,
	RepoTransBlockSchemaToChangeECreateColumns,
	RepoTransBlockSchemaToChangeECreateProperties,
	RepoTransBlockSchemaToChangeEUpdateColumns,
	RepoTransBlockSchemaToChangeEUpdateProperties,
	RepoTransBlockSchemaToChangeEId,
	QRepoTransBlockSchemaToChange
} from './repositorytransactionblock/qrepotransblockschematochange'
import {
	IRepositoryTransactionBlock,
	RepositoryTransactionBlockESelect,
	RepositoryTransactionBlockECascadeGraph,
	RepositoryTransactionBlockECreateColumns,
	RepositoryTransactionBlockECreateProperties,
	RepositoryTransactionBlockEUpdateColumns,
	RepositoryTransactionBlockEUpdateProperties,
	RepositoryTransactionBlockEId,
	QRepositoryTransactionBlock
} from './repositorytransactionblock/qrepositorytransactionblock'
import {
	IRepositoryTransactionHistoryUpdateStage,
	RepositoryTransactionHistoryUpdateStageESelect,
	RepositoryTransactionHistoryUpdateStageECascadeGraph,
	RepositoryTransactionHistoryUpdateStageECreateColumns,
	RepositoryTransactionHistoryUpdateStageECreateProperties,
	RepositoryTransactionHistoryUpdateStageEUpdateColumns,
	RepositoryTransactionHistoryUpdateStageEUpdateProperties,
	RepositoryTransactionHistoryUpdateStageEId,
	QRepositoryTransactionHistoryUpdateStage
} from './repositorytransactionblock/qrepositorytransactionhistoryupdatestage'
import {
	ISharingMessage,
	SharingMessageESelect,
	SharingMessageECascadeGraph,
	SharingMessageECreateColumns,
	SharingMessageECreateProperties,
	SharingMessageEUpdateColumns,
	SharingMessageEUpdateProperties,
	SharingMessageEId,
	QSharingMessage
} from './sharingmessage/qsharingmessage'
import {
	ISharingMessageRepoTransBlock,
	SharingMessageRepoTransBlockESelect,
	SharingMessageRepoTransBlockECascadeGraph,
	SharingMessageRepoTransBlockECreateColumns,
	SharingMessageRepoTransBlockECreateProperties,
	SharingMessageRepoTransBlockEUpdateColumns,
	SharingMessageRepoTransBlockEUpdateProperties,
	SharingMessageRepoTransBlockEId,
	QSharingMessageRepoTransBlock
} from './sharingmessage/qsharingmessagerepotransblock'
import {
	ISharingNode,
	SharingNodeESelect,
	SharingNodeECascadeGraph,
	SharingNodeECreateColumns,
	SharingNodeECreateProperties,
	SharingNodeEUpdateColumns,
	SharingNodeEUpdateProperties,
	SharingNodeEId,
	QSharingNode
} from './sharingnode/qsharingnode'
import {
	ISharingNodeRepoTransBlock,
	SharingNodeRepoTransBlockESelect,
	SharingNodeRepoTransBlockECascadeGraph,
	SharingNodeRepoTransBlockECreateColumns,
	SharingNodeRepoTransBlockECreateProperties,
	SharingNodeRepoTransBlockEUpdateColumns,
	SharingNodeRepoTransBlockEUpdateProperties,
	SharingNodeRepoTransBlockEId,
	QSharingNodeRepoTransBlock
} from './sharingnode/qsharingnoderepotransblock'
import {
	ISharingNodeRepoTransBlockStage,
	SharingNodeRepoTransBlockStageESelect,
	SharingNodeRepoTransBlockStageECascadeGraph,
	SharingNodeRepoTransBlockStageECreateColumns,
	SharingNodeRepoTransBlockStageECreateProperties,
	SharingNodeRepoTransBlockStageEUpdateColumns,
	SharingNodeRepoTransBlockStageEUpdateProperties,
	SharingNodeRepoTransBlockStageEId,
	QSharingNodeRepoTransBlockStage
} from './sharingnode/qsharingnoderepotransblockstage'
import {
	ISharingNodeRepository,
	SharingNodeRepositoryESelect,
	SharingNodeRepositoryECascadeGraph,
	SharingNodeRepositoryECreateColumns,
	SharingNodeRepositoryECreateProperties,
	SharingNodeRepositoryEUpdateColumns,
	SharingNodeRepositoryEUpdateProperties,
	SharingNodeRepositoryEId,
	QSharingNodeRepository
} from './sharingnode/qsharingnoderepository'
import {
	ISharingNodeTerminal,
	SharingNodeTerminalESelect,
	SharingNodeTerminalECascadeGraph,
	SharingNodeTerminalECreateColumns,
	SharingNodeTerminalECreateProperties,
	SharingNodeTerminalEUpdateColumns,
	SharingNodeTerminalEUpdateProperties,
	SharingNodeTerminalEId,
	QSharingNodeTerminal
} from './sharingnode/qsharingnodeterminal'
import {
	ISynchronizationConflict,
	SynchronizationConflictESelect,
	SynchronizationConflictECascadeGraph,
	SynchronizationConflictECreateColumns,
	SynchronizationConflictECreateProperties,
	SynchronizationConflictEUpdateColumns,
	SynchronizationConflictEUpdateProperties,
	SynchronizationConflictEId,
	QSynchronizationConflict
} from './conflict/qsynchronizationconflict'
import {
	ISynchronizationConflictPendingNotification,
	SynchronizationConflictPendingNotificationESelect,
	SynchronizationConflictPendingNotificationECascadeGraph,
	SynchronizationConflictPendingNotificationECreateColumns,
	SynchronizationConflictPendingNotificationECreateProperties,
	SynchronizationConflictPendingNotificationEUpdateColumns,
	SynchronizationConflictPendingNotificationEUpdateProperties,
	SynchronizationConflictPendingNotificationEId,
	QSynchronizationConflictPendingNotification
} from './conflict/qsynchronizationconflictpendingnotification'
import {
	ISynchronizationConflictValues,
	SynchronizationConflictValuesESelect,
	SynchronizationConflictValuesECascadeGraph,
	SynchronizationConflictValuesECreateColumns,
	SynchronizationConflictValuesECreateProperties,
	SynchronizationConflictValuesEUpdateColumns,
	SynchronizationConflictValuesEUpdateProperties,
	SynchronizationConflictValuesEId,
	QSynchronizationConflictValues
} from './conflict/qsynchronizationconflictvalues'

// Schema Q object Dependency Injection readiness detection DAO
export class SQDIDao<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
	extends Dao<Entity,
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


export interface IBaseMissingRecordDao
  extends IDao<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateColumns, MissingRecordEUpdateProperties, MissingRecordEId, MissingRecordECascadeGraph, QMissingRecord> {
}

export class BaseMissingRecordDao
  extends SQDIDao<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateColumns, MissingRecordEUpdateProperties, MissingRecordEId, MissingRecordECascadeGraph, QMissingRecord>
	implements IBaseMissingRecordDao {

	static diSet(): boolean {
		return diSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseMissingRecordRepoTransBlockDao
  extends IDao<IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateColumns, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, MissingRecordRepoTransBlockECascadeGraph, QMissingRecordRepoTransBlock> {
}

export class BaseMissingRecordRepoTransBlockDao
  extends SQDIDao<IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateColumns, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, MissingRecordRepoTransBlockECascadeGraph, QMissingRecordRepoTransBlock>
	implements IBaseMissingRecordRepoTransBlockDao {

	static diSet(): boolean {
		return diSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseRecordUpdateStageDao
  extends IDao<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, RecordUpdateStageECascadeGraph, QRecordUpdateStage> {
}

export class BaseRecordUpdateStageDao
  extends SQDIDao<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, RecordUpdateStageECascadeGraph, QRecordUpdateStage>
	implements IBaseRecordUpdateStageDao {

	static diSet(): boolean {
		return diSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseRepoTransBlockResponseStageDao
  extends IDao<IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateColumns, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, RepoTransBlockResponseStageECascadeGraph, QRepoTransBlockResponseStage> {
}

export class BaseRepoTransBlockResponseStageDao
  extends SQDIDao<IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateColumns, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, RepoTransBlockResponseStageECascadeGraph, QRepoTransBlockResponseStage>
	implements IBaseRepoTransBlockResponseStageDao {

	static diSet(): boolean {
		return diSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseRepoTransBlockSchemaToChangeDao
  extends IDao<IRepoTransBlockSchemaToChange, RepoTransBlockSchemaToChangeESelect, RepoTransBlockSchemaToChangeECreateProperties, RepoTransBlockSchemaToChangeEUpdateColumns, RepoTransBlockSchemaToChangeEUpdateProperties, RepoTransBlockSchemaToChangeEId, RepoTransBlockSchemaToChangeECascadeGraph, QRepoTransBlockSchemaToChange> {
}

export class BaseRepoTransBlockSchemaToChangeDao
  extends SQDIDao<IRepoTransBlockSchemaToChange, RepoTransBlockSchemaToChangeESelect, RepoTransBlockSchemaToChangeECreateProperties, RepoTransBlockSchemaToChangeEUpdateColumns, RepoTransBlockSchemaToChangeEUpdateProperties, RepoTransBlockSchemaToChangeEId, RepoTransBlockSchemaToChangeECascadeGraph, QRepoTransBlockSchemaToChange>
	implements IBaseRepoTransBlockSchemaToChangeDao {

	static diSet(): boolean {
		return diSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseRepositoryTransactionBlockDao
  extends IDao<IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateColumns, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, RepositoryTransactionBlockECascadeGraph, QRepositoryTransactionBlock> {
}

export class BaseRepositoryTransactionBlockDao
  extends SQDIDao<IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateColumns, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, RepositoryTransactionBlockECascadeGraph, QRepositoryTransactionBlock>
	implements IBaseRepositoryTransactionBlockDao {

	static diSet(): boolean {
		return diSet(16)
	}
	
	constructor() {
		super(16)
	}
}


export interface IBaseRepositoryTransactionHistoryUpdateStageDao
  extends IDao<IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateColumns, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, RepositoryTransactionHistoryUpdateStageECascadeGraph, QRepositoryTransactionHistoryUpdateStage> {
}

export class BaseRepositoryTransactionHistoryUpdateStageDao
  extends SQDIDao<IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateColumns, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, RepositoryTransactionHistoryUpdateStageECascadeGraph, QRepositoryTransactionHistoryUpdateStage>
	implements IBaseRepositoryTransactionHistoryUpdateStageDao {

	static diSet(): boolean {
		return diSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseSharingMessageDao
  extends IDao<ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateColumns, SharingMessageEUpdateProperties, SharingMessageEId, SharingMessageECascadeGraph, QSharingMessage> {
}

export class BaseSharingMessageDao
  extends SQDIDao<ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateColumns, SharingMessageEUpdateProperties, SharingMessageEId, SharingMessageECascadeGraph, QSharingMessage>
	implements IBaseSharingMessageDao {

	static diSet(): boolean {
		return diSet(14)
	}
	
	constructor() {
		super(14)
	}
}


export interface IBaseSharingMessageRepoTransBlockDao
  extends IDao<ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateColumns, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, SharingMessageRepoTransBlockECascadeGraph, QSharingMessageRepoTransBlock> {
}

export class BaseSharingMessageRepoTransBlockDao
  extends SQDIDao<ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateColumns, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, SharingMessageRepoTransBlockECascadeGraph, QSharingMessageRepoTransBlock>
	implements IBaseSharingMessageRepoTransBlockDao {

	static diSet(): boolean {
		return diSet(15)
	}
	
	constructor() {
		super(15)
	}
}


export interface IBaseSharingNodeDao
  extends IDao<ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateColumns, SharingNodeEUpdateProperties, SharingNodeEId, SharingNodeECascadeGraph, QSharingNode> {
}

export class BaseSharingNodeDao
  extends SQDIDao<ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateColumns, SharingNodeEUpdateProperties, SharingNodeEId, SharingNodeECascadeGraph, QSharingNode>
	implements IBaseSharingNodeDao {

	static diSet(): boolean {
		return diSet(10)
	}
	
	constructor() {
		super(10)
	}
}


export interface IBaseSharingNodeRepoTransBlockDao
  extends IDao<ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateColumns, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, SharingNodeRepoTransBlockECascadeGraph, QSharingNodeRepoTransBlock> {
}

export class BaseSharingNodeRepoTransBlockDao
  extends SQDIDao<ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateColumns, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, SharingNodeRepoTransBlockECascadeGraph, QSharingNodeRepoTransBlock>
	implements IBaseSharingNodeRepoTransBlockDao {

	static diSet(): boolean {
		return diSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseSharingNodeRepoTransBlockStageDao
  extends IDao<ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateColumns, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, SharingNodeRepoTransBlockStageECascadeGraph, QSharingNodeRepoTransBlockStage> {
}

export class BaseSharingNodeRepoTransBlockStageDao
  extends SQDIDao<ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateColumns, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, SharingNodeRepoTransBlockStageECascadeGraph, QSharingNodeRepoTransBlockStage>
	implements IBaseSharingNodeRepoTransBlockStageDao {

	static diSet(): boolean {
		return diSet(11)
	}
	
	constructor() {
		super(11)
	}
}


export interface IBaseSharingNodeRepositoryDao
  extends IDao<ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateColumns, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, SharingNodeRepositoryECascadeGraph, QSharingNodeRepository> {
}

export class BaseSharingNodeRepositoryDao
  extends SQDIDao<ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateColumns, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, SharingNodeRepositoryECascadeGraph, QSharingNodeRepository>
	implements IBaseSharingNodeRepositoryDao {

	static diSet(): boolean {
		return diSet(12)
	}
	
	constructor() {
		super(12)
	}
}


export interface IBaseSharingNodeTerminalDao
  extends IDao<ISharingNodeTerminal, SharingNodeTerminalESelect, SharingNodeTerminalECreateProperties, SharingNodeTerminalEUpdateColumns, SharingNodeTerminalEUpdateProperties, SharingNodeTerminalEId, SharingNodeTerminalECascadeGraph, QSharingNodeTerminal> {
}

export class BaseSharingNodeTerminalDao
  extends SQDIDao<ISharingNodeTerminal, SharingNodeTerminalESelect, SharingNodeTerminalECreateProperties, SharingNodeTerminalEUpdateColumns, SharingNodeTerminalEUpdateProperties, SharingNodeTerminalEId, SharingNodeTerminalECascadeGraph, QSharingNodeTerminal>
	implements IBaseSharingNodeTerminalDao {

	static diSet(): boolean {
		return diSet(13)
	}
	
	constructor() {
		super(13)
	}
}


export interface IBaseSynchronizationConflictDao
  extends IDao<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, SynchronizationConflictECascadeGraph, QSynchronizationConflict> {
}

export class BaseSynchronizationConflictDao
  extends SQDIDao<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, SynchronizationConflictECascadeGraph, QSynchronizationConflict>
	implements IBaseSynchronizationConflictDao {

	static diSet(): boolean {
		return diSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseSynchronizationConflictPendingNotificationDao
  extends IDao<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateColumns, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, SynchronizationConflictPendingNotificationECascadeGraph, QSynchronizationConflictPendingNotification> {
}

export class BaseSynchronizationConflictPendingNotificationDao
  extends SQDIDao<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateColumns, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, SynchronizationConflictPendingNotificationECascadeGraph, QSynchronizationConflictPendingNotification>
	implements IBaseSynchronizationConflictPendingNotificationDao {

	static diSet(): boolean {
		return diSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseSynchronizationConflictValuesDao
  extends IDao<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, SynchronizationConflictValuesECascadeGraph, QSynchronizationConflictValues> {
}

export class BaseSynchronizationConflictValuesDao
  extends SQDIDao<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, SynchronizationConflictValuesECascadeGraph, QSynchronizationConflictValues>
	implements IBaseSynchronizationConflictValuesDao {

	static diSet(): boolean {
		return diSet(0)
	}
	
	constructor() {
		super(0)
	}
}
