import {
	IDuo,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control';
import { Duo } from "@airport/check-in";
import { Q } from './qSchema';
import {
	IActor,
	ActorESelect,
	ActorECreateColumns,
	ActorECreateProperties,
	ActorEUpdateColumns,
	ActorEUpdateProperties,
	ActorEId,
	QActor
} from './infrastructure/qactor';
import {
	IActorApplication,
	ActorApplicationESelect,
	ActorApplicationECreateColumns,
	ActorApplicationECreateProperties,
	ActorApplicationEUpdateColumns,
	ActorApplicationEUpdateProperties,
	ActorApplicationEId,
	QActorApplication
} from './infrastructure/qactorapplication';
import {
	IApplication,
	ApplicationESelect,
	ApplicationECreateColumns,
	ApplicationECreateProperties,
	ApplicationEUpdateColumns,
	ApplicationEUpdateProperties,
	ApplicationEId,
	QApplication
} from './infrastructure/qapplication';
import {
	IChildRepoRow,
	ChildRepoRowESelect,
	ChildRepoRowECreateColumns,
	ChildRepoRowECreateProperties,
	ChildRepoRowEUpdateColumns,
	ChildRepoRowEUpdateProperties,
	ChildRepoRowEId,
	QChildRepoRow
} from './traditional/qchildreporow';
import {
	IChildRow,
	ChildRowESelect,
	ChildRowECreateColumns,
	ChildRowECreateProperties,
	ChildRowEUpdateColumns,
	ChildRowEUpdateProperties,
	ChildRowEId,
	QChildRow
} from './traditional/qchildrow';
import {
	IImmutableRepoRow,
	ImmutableRepoRowESelect,
	ImmutableRepoRowECreateColumns,
	ImmutableRepoRowECreateProperties,
	ImmutableRepoRowEUpdateColumns,
	ImmutableRepoRowEUpdateProperties,
	ImmutableRepoRowEId,
	QImmutableRepoRow
} from './traditional/qimmutablereporow';
import {
	IImmutableRow,
	ImmutableRowESelect,
	ImmutableRowECreateColumns,
	ImmutableRowECreateProperties,
	ImmutableRowEUpdateColumns,
	ImmutableRowEUpdateProperties,
	ImmutableRowEId,
	QImmutableRow
} from './traditional/qimmutablerow';
import {
	IMutableRepoRow,
	MutableRepoRowESelect,
	MutableRepoRowECreateColumns,
	MutableRepoRowECreateProperties,
	MutableRepoRowEUpdateColumns,
	MutableRepoRowEUpdateProperties,
	MutableRepoRowEId,
	QMutableRepoRow
} from './traditional/qmutablereporow';
import {
	IMutableRow,
	MutableRowESelect,
	MutableRowECreateColumns,
	MutableRowECreateProperties,
	MutableRowEUpdateColumns,
	MutableRowEUpdateProperties,
	MutableRowEId,
	QMutableRow
} from './traditional/qmutablerow';
import {
	IOperationHistory,
	OperationHistoryESelect,
	OperationHistoryECreateColumns,
	OperationHistoryECreateProperties,
	OperationHistoryEUpdateColumns,
	OperationHistoryEUpdateProperties,
	OperationHistoryEId,
	QOperationHistory
} from './history/qoperationhistory';
import {
	IRecordHistory,
	RecordHistoryESelect,
	RecordHistoryECreateColumns,
	RecordHistoryECreateProperties,
	RecordHistoryEUpdateColumns,
	RecordHistoryEUpdateProperties,
	RecordHistoryEId,
	QRecordHistory
} from './history/qrecordhistory';
import {
	IRecordHistoryNewValue,
	RecordHistoryNewValueESelect,
	RecordHistoryNewValueECreateColumns,
	RecordHistoryNewValueECreateProperties,
	RecordHistoryNewValueEUpdateColumns,
	RecordHistoryNewValueEUpdateProperties,
	RecordHistoryNewValueEId,
	QRecordHistoryNewValue
} from './history/qrecordhistorynewvalue';
import {
	IRecordHistoryOldValue,
	RecordHistoryOldValueESelect,
	RecordHistoryOldValueECreateColumns,
	RecordHistoryOldValueECreateProperties,
	RecordHistoryOldValueEUpdateColumns,
	RecordHistoryOldValueEUpdateProperties,
	RecordHistoryOldValueEId,
	QRecordHistoryOldValue
} from './history/qrecordhistoryoldvalue';
import {
	IReferenceRow,
	ReferenceRowESelect,
	ReferenceRowECreateColumns,
	ReferenceRowECreateProperties,
	ReferenceRowEUpdateColumns,
	ReferenceRowEUpdateProperties,
	ReferenceRowEId,
	QReferenceRow
} from './traditional/qreferencerow';
import {
	IRepoTransHistoryChangedRepositoryActor,
	RepoTransHistoryChangedRepositoryActorESelect,
	RepoTransHistoryChangedRepositoryActorECreateColumns,
	RepoTransHistoryChangedRepositoryActorECreateProperties,
	RepoTransHistoryChangedRepositoryActorEUpdateColumns,
	RepoTransHistoryChangedRepositoryActorEUpdateProperties,
	RepoTransHistoryChangedRepositoryActorEId,
	QRepoTransHistoryChangedRepositoryActor
} from './history/qrepotranshistorychangedrepositoryactor';
import {
	IRepository,
	RepositoryESelect,
	RepositoryECreateColumns,
	RepositoryECreateProperties,
	RepositoryEUpdateColumns,
	RepositoryEUpdateProperties,
	RepositoryEId,
	QRepository
} from './repository/qrepository';
import {
	IRepositoryActor,
	RepositoryActorESelect,
	RepositoryActorECreateColumns,
	RepositoryActorECreateProperties,
	RepositoryActorEUpdateColumns,
	RepositoryActorEUpdateProperties,
	RepositoryActorEId,
	QRepositoryActor
} from './repository/qrepositoryactor';
import {
	IRepositoryApplication,
	RepositoryApplicationESelect,
	RepositoryApplicationECreateColumns,
	RepositoryApplicationECreateProperties,
	RepositoryApplicationEUpdateColumns,
	RepositoryApplicationEUpdateProperties,
	RepositoryApplicationEId,
	QRepositoryApplication
} from './repository/qrepositoryapplication';
import {
	IRepositoryEntity,
	RepositoryEntityESelect,
	RepositoryEntityECreateColumns,
	RepositoryEntityECreateProperties,
	RepositoryEntityEUpdateColumns,
	RepositoryEntityEUpdateProperties,
	RepositoryEntityEId,
	QRepositoryEntity
} from './repository/qrepositoryentity';
import {
	IRepositorySchema,
	RepositorySchemaESelect,
	RepositorySchemaECreateColumns,
	RepositorySchemaECreateProperties,
	RepositorySchemaEUpdateColumns,
	RepositorySchemaEUpdateProperties,
	RepositorySchemaEId,
	QRepositorySchema
} from './repository/qrepositoryschema';
import {
	IRepositoryTransactionHistory,
	RepositoryTransactionHistoryESelect,
	RepositoryTransactionHistoryECreateColumns,
	RepositoryTransactionHistoryECreateProperties,
	RepositoryTransactionHistoryEUpdateColumns,
	RepositoryTransactionHistoryEUpdateProperties,
	RepositoryTransactionHistoryEId,
	QRepositoryTransactionHistory
} from './history/qrepositorytransactionhistory';
import {
	IStageable,
	StageableESelect,
	StageableECreateColumns,
	StageableECreateProperties,
	StageableEUpdateColumns,
	StageableEUpdateProperties,
	StageableEId,
	QStageable
} from './infrastructure/qstageable';
import {
	ITransactionHistory,
	TransactionHistoryESelect,
	TransactionHistoryECreateColumns,
	TransactionHistoryECreateProperties,
	TransactionHistoryEUpdateColumns,
	TransactionHistoryEUpdateProperties,
	TransactionHistoryEId,
	QTransactionHistory
} from './history/qtransactionhistory';


// Schema Q object Dependency Injection readiness detection DAO
export class SQDIDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	IQE extends IQEntity>
	extends Duo<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateProperties,
		EntityId,
		IQE> {

	static diSet(): boolean {
		return Q.__dbSchema__ as any
	}

	constructor(
		dbEntityName: string
	) {
		super(dbEntityName, Q)
	}
}


export interface IBaseActorDuo
  extends IDuo<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateProperties, ActorEId, QActor> {
}

export class BaseActorDuo
  extends SQDIDuo<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateProperties, ActorEId, QActor>
	implements IBaseActorDuo {
	constructor() {
		super('Actor');
	}
}


export interface IBaseActorApplicationDuo
  extends IDuo<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateProperties, ActorApplicationEId, QActorApplication> {
}

export class BaseActorApplicationDuo
  extends SQDIDuo<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateProperties, ActorApplicationEId, QActorApplication>
	implements IBaseActorApplicationDuo {
	constructor() {
		super('ActorApplication');
	}
}


export interface IBaseApplicationDuo
  extends IDuo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, QApplication> {
}

export class BaseApplicationDuo
  extends SQDIDuo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, QApplication>
	implements IBaseApplicationDuo {
	constructor() {
		super('Application');
	}
}


export interface IBaseChildRepoRowDuo
  extends IDuo<IChildRepoRow, ChildRepoRowESelect, ChildRepoRowECreateProperties, ChildRepoRowEUpdateProperties, ChildRepoRowEId, QChildRepoRow> {
}

export class BaseChildRepoRowDuo
  extends SQDIDuo<IChildRepoRow, ChildRepoRowESelect, ChildRepoRowECreateProperties, ChildRepoRowEUpdateProperties, ChildRepoRowEId, QChildRepoRow>
	implements IBaseChildRepoRowDuo {
	constructor() {
		super('ChildRepoRow');
	}
}


export interface IBaseChildRowDuo
  extends IDuo<IChildRow, ChildRowESelect, ChildRowECreateProperties, ChildRowEUpdateProperties, ChildRowEId, QChildRow> {
}

export class BaseChildRowDuo
  extends SQDIDuo<IChildRow, ChildRowESelect, ChildRowECreateProperties, ChildRowEUpdateProperties, ChildRowEId, QChildRow>
	implements IBaseChildRowDuo {
	constructor() {
		super('ChildRow');
	}
}


export interface IBaseImmutableRepoRowDuo
  extends IDuo<IImmutableRepoRow, ImmutableRepoRowESelect, ImmutableRepoRowECreateProperties, ImmutableRepoRowEUpdateProperties, ImmutableRepoRowEId, QImmutableRepoRow> {
}

export class BaseImmutableRepoRowDuo
  extends SQDIDuo<IImmutableRepoRow, ImmutableRepoRowESelect, ImmutableRepoRowECreateProperties, ImmutableRepoRowEUpdateProperties, ImmutableRepoRowEId, QImmutableRepoRow>
	implements IBaseImmutableRepoRowDuo {
	constructor() {
		super('ImmutableRepoRow');
	}
}


export interface IBaseImmutableRowDuo
  extends IDuo<IImmutableRow, ImmutableRowESelect, ImmutableRowECreateProperties, ImmutableRowEUpdateProperties, ImmutableRowEId, QImmutableRow> {
}

export class BaseImmutableRowDuo
  extends SQDIDuo<IImmutableRow, ImmutableRowESelect, ImmutableRowECreateProperties, ImmutableRowEUpdateProperties, ImmutableRowEId, QImmutableRow>
	implements IBaseImmutableRowDuo {
	constructor() {
		super('ImmutableRow');
	}
}


export interface IBaseMutableRepoRowDuo
  extends IDuo<IMutableRepoRow, MutableRepoRowESelect, MutableRepoRowECreateProperties, MutableRepoRowEUpdateProperties, MutableRepoRowEId, QMutableRepoRow> {
}

export class BaseMutableRepoRowDuo
  extends SQDIDuo<IMutableRepoRow, MutableRepoRowESelect, MutableRepoRowECreateProperties, MutableRepoRowEUpdateProperties, MutableRepoRowEId, QMutableRepoRow>
	implements IBaseMutableRepoRowDuo {
	constructor() {
		super('MutableRepoRow');
	}
}


export interface IBaseMutableRowDuo
  extends IDuo<IMutableRow, MutableRowESelect, MutableRowECreateProperties, MutableRowEUpdateProperties, MutableRowEId, QMutableRow> {
}

export class BaseMutableRowDuo
  extends SQDIDuo<IMutableRow, MutableRowESelect, MutableRowECreateProperties, MutableRowEUpdateProperties, MutableRowEId, QMutableRow>
	implements IBaseMutableRowDuo {
	constructor() {
		super('MutableRow');
	}
}


export interface IBaseOperationHistoryDuo
  extends IDuo<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateProperties, OperationHistoryEId, QOperationHistory> {
}

export class BaseOperationHistoryDuo
  extends SQDIDuo<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateProperties, OperationHistoryEId, QOperationHistory>
	implements IBaseOperationHistoryDuo {
	constructor() {
		super('OperationHistory');
	}
}


export interface IBaseRecordHistoryDuo
  extends IDuo<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateProperties, RecordHistoryEId, QRecordHistory> {
}

export class BaseRecordHistoryDuo
  extends SQDIDuo<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateProperties, RecordHistoryEId, QRecordHistory>
	implements IBaseRecordHistoryDuo {
	constructor() {
		super('RecordHistory');
	}
}


export interface IBaseRecordHistoryNewValueDuo
  extends IDuo<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, QRecordHistoryNewValue> {
}

export class BaseRecordHistoryNewValueDuo
  extends SQDIDuo<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, QRecordHistoryNewValue>
	implements IBaseRecordHistoryNewValueDuo {
	constructor() {
		super('RecordHistoryNewValue');
	}
}


export interface IBaseRecordHistoryOldValueDuo
  extends IDuo<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, QRecordHistoryOldValue> {
}

export class BaseRecordHistoryOldValueDuo
  extends SQDIDuo<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, QRecordHistoryOldValue>
	implements IBaseRecordHistoryOldValueDuo {
	constructor() {
		super('RecordHistoryOldValue');
	}
}


export interface IBaseReferenceRowDuo
  extends IDuo<IReferenceRow, ReferenceRowESelect, ReferenceRowECreateProperties, ReferenceRowEUpdateProperties, ReferenceRowEId, QReferenceRow> {
}

export class BaseReferenceRowDuo
  extends SQDIDuo<IReferenceRow, ReferenceRowESelect, ReferenceRowECreateProperties, ReferenceRowEUpdateProperties, ReferenceRowEId, QReferenceRow>
	implements IBaseReferenceRowDuo {
	constructor() {
		super('ReferenceRow');
	}
}


export interface IBaseRepoTransHistoryChangedRepositoryActorDuo
  extends IDuo<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, QRepoTransHistoryChangedRepositoryActor> {
}

export class BaseRepoTransHistoryChangedRepositoryActorDuo
  extends SQDIDuo<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, QRepoTransHistoryChangedRepositoryActor>
	implements IBaseRepoTransHistoryChangedRepositoryActorDuo {
	constructor() {
		super('RepoTransHistoryChangedRepositoryActor');
	}
}


export interface IBaseRepositoryDuo
  extends IDuo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, QRepository> {
}

export class BaseRepositoryDuo
  extends SQDIDuo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, QRepository>
	implements IBaseRepositoryDuo {
	constructor() {
		super('Repository');
	}
}


export interface IBaseRepositoryActorDuo
  extends IDuo<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateProperties, RepositoryActorEId, QRepositoryActor> {
}

export class BaseRepositoryActorDuo
  extends SQDIDuo<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateProperties, RepositoryActorEId, QRepositoryActor>
	implements IBaseRepositoryActorDuo {
	constructor() {
		super('RepositoryActor');
	}
}


export interface IBaseRepositoryApplicationDuo
  extends IDuo<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, QRepositoryApplication> {
}

export class BaseRepositoryApplicationDuo
  extends SQDIDuo<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, QRepositoryApplication>
	implements IBaseRepositoryApplicationDuo {
	constructor() {
		super('RepositoryApplication');
	}
}


export interface IBaseRepositoryEntityDuo
  extends IDuo<IRepositoryEntity, RepositoryEntityESelect, RepositoryEntityECreateProperties, RepositoryEntityEUpdateProperties, RepositoryEntityEId, QRepositoryEntity> {
}

export class BaseRepositoryEntityDuo
  extends SQDIDuo<IRepositoryEntity, RepositoryEntityESelect, RepositoryEntityECreateProperties, RepositoryEntityEUpdateProperties, RepositoryEntityEId, QRepositoryEntity>
	implements IBaseRepositoryEntityDuo {
	constructor() {
		super('RepositoryEntity');
	}
}


export interface IBaseRepositorySchemaDuo
  extends IDuo<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateProperties, RepositorySchemaEId, QRepositorySchema> {
}

export class BaseRepositorySchemaDuo
  extends SQDIDuo<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateProperties, RepositorySchemaEId, QRepositorySchema>
	implements IBaseRepositorySchemaDuo {
	constructor() {
		super('RepositorySchema');
	}
}


export interface IBaseRepositoryTransactionHistoryDuo
  extends IDuo<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, QRepositoryTransactionHistory> {
}

export class BaseRepositoryTransactionHistoryDuo
  extends SQDIDuo<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, QRepositoryTransactionHistory>
	implements IBaseRepositoryTransactionHistoryDuo {
	constructor() {
		super('RepositoryTransactionHistory');
	}
}


export interface IBaseStageableDuo
  extends IDuo<IStageable, StageableESelect, StageableECreateProperties, StageableEUpdateProperties, StageableEId, QStageable> {
}

export class BaseStageableDuo
  extends SQDIDuo<IStageable, StageableESelect, StageableECreateProperties, StageableEUpdateProperties, StageableEId, QStageable>
	implements IBaseStageableDuo {
	constructor() {
		super('Stageable');
	}
}


export interface IBaseTransactionHistoryDuo
  extends IDuo<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateProperties, TransactionHistoryEId, QTransactionHistory> {
}

export class BaseTransactionHistoryDuo
  extends SQDIDuo<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateProperties, TransactionHistoryEId, QTransactionHistory>
	implements IBaseTransactionHistoryDuo {
	constructor() {
		super('TransactionHistory');
	}
}
