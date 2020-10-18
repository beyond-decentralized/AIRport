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
import { Dao } from '@airport/check-in'
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
	MissingRecordGraph,
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
	MissingRecordRepoTransBlockGraph,
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
	RecordUpdateStageGraph,
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
	RepoTransBlockResponseStageGraph,
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
	RepoTransBlockSchemaToChangeGraph,
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
	RepositoryTransactionBlockGraph,
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
	RepositoryTransactionHistoryUpdateStageGraph,
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
	SharingMessageGraph,
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
	SharingMessageRepoTransBlockGraph,
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
	SharingNodeGraph,
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
	SharingNodeRepoTransBlockGraph,
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
	SharingNodeRepoTransBlockStageGraph,
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
	SharingNodeRepositoryGraph,
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
	SharingNodeTerminalGraph,
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
	SynchronizationConflictGraph,
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
	SynchronizationConflictPendingNotificationGraph,
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
	SynchronizationConflictValuesGraph,
	QSynchronizationConflictValues
} from './conflict/qsynchronizationconflictvalues'


// Schema Q object Dependency Injection readiness detection Dao
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
  extends IDao<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateColumns, MissingRecordEUpdateProperties, MissingRecordEId, MissingRecordGraph, QMissingRecord> {
}

export class BaseMissingRecordDao
  extends SQDIDao<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateColumns, MissingRecordEUpdateProperties, MissingRecordEId, MissingRecordGraph, QMissingRecord>
	implements IBaseMissingRecordDao {

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseMissingRecordRepoTransBlockDao
  extends IDao<IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateColumns, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, MissingRecordRepoTransBlockGraph, QMissingRecordRepoTransBlock> {
}

export class BaseMissingRecordRepoTransBlockDao
  extends SQDIDao<IMissingRecordRepoTransBlock, MissingRecordRepoTransBlockESelect, MissingRecordRepoTransBlockECreateProperties, MissingRecordRepoTransBlockEUpdateColumns, MissingRecordRepoTransBlockEUpdateProperties, MissingRecordRepoTransBlockEId, MissingRecordRepoTransBlockGraph, QMissingRecordRepoTransBlock>
	implements IBaseMissingRecordRepoTransBlockDao {

	static diSet(): boolean {
		return duoDiSet(10)
	}
	
	constructor() {
		super(10)
	}
}


export interface IBaseRecordUpdateStageDao
  extends IDao<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, RecordUpdateStageGraph, QRecordUpdateStage> {
}

export class BaseRecordUpdateStageDao
  extends SQDIDao<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, RecordUpdateStageGraph, QRecordUpdateStage>
	implements IBaseRecordUpdateStageDao {

	static diSet(): boolean {
		return duoDiSet(16)
	}
	
	constructor() {
		super(16)
	}
}


export interface IBaseRepoTransBlockResponseStageDao
  extends IDao<IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateColumns, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, RepoTransBlockResponseStageGraph, QRepoTransBlockResponseStage> {
}

export class BaseRepoTransBlockResponseStageDao
  extends SQDIDao<IRepoTransBlockResponseStage, RepoTransBlockResponseStageESelect, RepoTransBlockResponseStageECreateProperties, RepoTransBlockResponseStageEUpdateColumns, RepoTransBlockResponseStageEUpdateProperties, RepoTransBlockResponseStageEId, RepoTransBlockResponseStageGraph, QRepoTransBlockResponseStage>
	implements IBaseRepoTransBlockResponseStageDao {

	static diSet(): boolean {
		return duoDiSet(12)
	}
	
	constructor() {
		super(12)
	}
}


export interface IBaseRepoTransBlockSchemaToChangeDao
  extends IDao<IRepoTransBlockSchemaToChange, RepoTransBlockSchemaToChangeESelect, RepoTransBlockSchemaToChangeECreateProperties, RepoTransBlockSchemaToChangeEUpdateColumns, RepoTransBlockSchemaToChangeEUpdateProperties, RepoTransBlockSchemaToChangeEId, RepoTransBlockSchemaToChangeGraph, QRepoTransBlockSchemaToChange> {
}

export class BaseRepoTransBlockSchemaToChangeDao
  extends SQDIDao<IRepoTransBlockSchemaToChange, RepoTransBlockSchemaToChangeESelect, RepoTransBlockSchemaToChangeECreateProperties, RepoTransBlockSchemaToChangeEUpdateColumns, RepoTransBlockSchemaToChangeEUpdateProperties, RepoTransBlockSchemaToChangeEId, RepoTransBlockSchemaToChangeGraph, QRepoTransBlockSchemaToChange>
	implements IBaseRepoTransBlockSchemaToChangeDao {

	static diSet(): boolean {
		return duoDiSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseRepositoryTransactionBlockDao
  extends IDao<IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateColumns, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, RepositoryTransactionBlockGraph, QRepositoryTransactionBlock> {
}

export class BaseRepositoryTransactionBlockDao
  extends SQDIDao<IRepositoryTransactionBlock, RepositoryTransactionBlockESelect, RepositoryTransactionBlockECreateProperties, RepositoryTransactionBlockEUpdateColumns, RepositoryTransactionBlockEUpdateProperties, RepositoryTransactionBlockEId, RepositoryTransactionBlockGraph, QRepositoryTransactionBlock>
	implements IBaseRepositoryTransactionBlockDao {

	static diSet(): boolean {
		return duoDiSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseRepositoryTransactionHistoryUpdateStageDao
  extends IDao<IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateColumns, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, RepositoryTransactionHistoryUpdateStageGraph, QRepositoryTransactionHistoryUpdateStage> {
}

export class BaseRepositoryTransactionHistoryUpdateStageDao
  extends SQDIDao<IRepositoryTransactionHistoryUpdateStage, RepositoryTransactionHistoryUpdateStageESelect, RepositoryTransactionHistoryUpdateStageECreateProperties, RepositoryTransactionHistoryUpdateStageEUpdateColumns, RepositoryTransactionHistoryUpdateStageEUpdateProperties, RepositoryTransactionHistoryUpdateStageEId, RepositoryTransactionHistoryUpdateStageGraph, QRepositoryTransactionHistoryUpdateStage>
	implements IBaseRepositoryTransactionHistoryUpdateStageDao {

	static diSet(): boolean {
		return duoDiSet(11)
	}
	
	constructor() {
		super(11)
	}
}


export interface IBaseSharingMessageDao
  extends IDao<ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateColumns, SharingMessageEUpdateProperties, SharingMessageEId, SharingMessageGraph, QSharingMessage> {
}

export class BaseSharingMessageDao
  extends SQDIDao<ISharingMessage, SharingMessageESelect, SharingMessageECreateProperties, SharingMessageEUpdateColumns, SharingMessageEUpdateProperties, SharingMessageEId, SharingMessageGraph, QSharingMessage>
	implements IBaseSharingMessageDao {

	static diSet(): boolean {
		return duoDiSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseSharingMessageRepoTransBlockDao
  extends IDao<ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateColumns, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, SharingMessageRepoTransBlockGraph, QSharingMessageRepoTransBlock> {
}

export class BaseSharingMessageRepoTransBlockDao
  extends SQDIDao<ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, SharingMessageRepoTransBlockECreateProperties, SharingMessageRepoTransBlockEUpdateColumns, SharingMessageRepoTransBlockEUpdateProperties, SharingMessageRepoTransBlockEId, SharingMessageRepoTransBlockGraph, QSharingMessageRepoTransBlock>
	implements IBaseSharingMessageRepoTransBlockDao {

	static diSet(): boolean {
		return duoDiSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseSharingNodeDao
  extends IDao<ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateColumns, SharingNodeEUpdateProperties, SharingNodeEId, SharingNodeGraph, QSharingNode> {
}

export class BaseSharingNodeDao
  extends SQDIDao<ISharingNode, SharingNodeESelect, SharingNodeECreateProperties, SharingNodeEUpdateColumns, SharingNodeEUpdateProperties, SharingNodeEId, SharingNodeGraph, QSharingNode>
	implements IBaseSharingNodeDao {

	static diSet(): boolean {
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseSharingNodeRepoTransBlockDao
  extends IDao<ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateColumns, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, SharingNodeRepoTransBlockGraph, QSharingNodeRepoTransBlock> {
}

export class BaseSharingNodeRepoTransBlockDao
  extends SQDIDao<ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, SharingNodeRepoTransBlockECreateProperties, SharingNodeRepoTransBlockEUpdateColumns, SharingNodeRepoTransBlockEUpdateProperties, SharingNodeRepoTransBlockEId, SharingNodeRepoTransBlockGraph, QSharingNodeRepoTransBlock>
	implements IBaseSharingNodeRepoTransBlockDao {

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseSharingNodeRepoTransBlockStageDao
  extends IDao<ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateColumns, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, SharingNodeRepoTransBlockStageGraph, QSharingNodeRepoTransBlockStage> {
}

export class BaseSharingNodeRepoTransBlockStageDao
  extends SQDIDao<ISharingNodeRepoTransBlockStage, SharingNodeRepoTransBlockStageESelect, SharingNodeRepoTransBlockStageECreateProperties, SharingNodeRepoTransBlockStageEUpdateColumns, SharingNodeRepoTransBlockStageEUpdateProperties, SharingNodeRepoTransBlockStageEId, SharingNodeRepoTransBlockStageGraph, QSharingNodeRepoTransBlockStage>
	implements IBaseSharingNodeRepoTransBlockStageDao {

	static diSet(): boolean {
		return duoDiSet(15)
	}
	
	constructor() {
		super(15)
	}
}


export interface IBaseSharingNodeRepositoryDao
  extends IDao<ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateColumns, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, SharingNodeRepositoryGraph, QSharingNodeRepository> {
}

export class BaseSharingNodeRepositoryDao
  extends SQDIDao<ISharingNodeRepository, SharingNodeRepositoryESelect, SharingNodeRepositoryECreateProperties, SharingNodeRepositoryEUpdateColumns, SharingNodeRepositoryEUpdateProperties, SharingNodeRepositoryEId, SharingNodeRepositoryGraph, QSharingNodeRepository>
	implements IBaseSharingNodeRepositoryDao {

	static diSet(): boolean {
		return duoDiSet(14)
	}
	
	constructor() {
		super(14)
	}
}


export interface IBaseSharingNodeTerminalDao
  extends IDao<ISharingNodeTerminal, SharingNodeTerminalESelect, SharingNodeTerminalECreateProperties, SharingNodeTerminalEUpdateColumns, SharingNodeTerminalEUpdateProperties, SharingNodeTerminalEId, SharingNodeTerminalGraph, QSharingNodeTerminal> {
}

export class BaseSharingNodeTerminalDao
  extends SQDIDao<ISharingNodeTerminal, SharingNodeTerminalESelect, SharingNodeTerminalECreateProperties, SharingNodeTerminalEUpdateColumns, SharingNodeTerminalEUpdateProperties, SharingNodeTerminalEId, SharingNodeTerminalGraph, QSharingNodeTerminal>
	implements IBaseSharingNodeTerminalDao {

	static diSet(): boolean {
		return duoDiSet(13)
	}
	
	constructor() {
		super(13)
	}
}


export interface IBaseSynchronizationConflictDao
  extends IDao<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, SynchronizationConflictGraph, QSynchronizationConflict> {
}

export class BaseSynchronizationConflictDao
  extends SQDIDao<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, SynchronizationConflictGraph, QSynchronizationConflict>
	implements IBaseSynchronizationConflictDao {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseSynchronizationConflictPendingNotificationDao
  extends IDao<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateColumns, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, SynchronizationConflictPendingNotificationGraph, QSynchronizationConflictPendingNotification> {
}

export class BaseSynchronizationConflictPendingNotificationDao
  extends SQDIDao<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateColumns, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, SynchronizationConflictPendingNotificationGraph, QSynchronizationConflictPendingNotification>
	implements IBaseSynchronizationConflictPendingNotificationDao {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseSynchronizationConflictValuesDao
  extends IDao<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, SynchronizationConflictValuesGraph, QSynchronizationConflictValues> {
}

export class BaseSynchronizationConflictValuesDao
  extends SQDIDao<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, SynchronizationConflictValuesGraph, QSynchronizationConflictValues>
	implements IBaseSynchronizationConflictValuesDao {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}
