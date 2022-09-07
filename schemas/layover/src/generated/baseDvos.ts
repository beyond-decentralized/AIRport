/* eslint-disable */
import {
	RecordUpdateStage,
} from '../ddl/recordupdatestage';
import {
	RecordUpdateStageVDescriptor,
} from './vrecordupdatestage';
import {
	SynchronizationConflict,
} from '../ddl/conflict/synchronizationconflict';
import {
	SynchronizationConflictVDescriptor,
} from './conflict/vsynchronizationconflict';
import {
	SynchronizationConflictValues,
} from '../ddl/conflict/synchronizationconflictvalues';
import {
	SynchronizationConflictValuesVDescriptor,
} from './conflict/vsynchronizationconflictvalues';
import {
	IDvo,
	Dvo,
} from '@airbridge/validate';
import {
	ApplicationEntity_LocalId as DbEntityId,
} from '@airport/ground-control';
import {
	air____at_airport_slash_layover_diSet,
} from './qApplication';

import Q from './qApplication'

// Application Q object Dependency Injection readiness detection Dvo
export class SQDIDvo<Entity, EntityVDescriptor>
	extends Dvo<Entity, EntityVDescriptor> {

	constructor(
		dbEntityId: DbEntityId
	) {
		super(dbEntityId, Q)
	}
}


export interface IBaseRecordUpdateStageDvo
  extends IDvo<RecordUpdateStage, RecordUpdateStageVDescriptor<RecordUpdateStage>> {
}

export class BaseRecordUpdateStageDvo
  extends SQDIDvo<RecordUpdateStage, RecordUpdateStageVDescriptor<RecordUpdateStage>>
	implements IBaseRecordUpdateStageDvo {

	static diSet(): boolean {
		return air____at_airport_slash_layover_diSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseSynchronizationConflictDvo
  extends IDvo<SynchronizationConflict, SynchronizationConflictVDescriptor<SynchronizationConflict>> {
}

export class BaseSynchronizationConflictDvo
  extends SQDIDvo<SynchronizationConflict, SynchronizationConflictVDescriptor<SynchronizationConflict>>
	implements IBaseSynchronizationConflictDvo {

	static diSet(): boolean {
		return air____at_airport_slash_layover_diSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseSynchronizationConflictValuesDvo
  extends IDvo<SynchronizationConflictValues, SynchronizationConflictValuesVDescriptor<SynchronizationConflictValues>> {
}

export class BaseSynchronizationConflictValuesDvo
  extends SQDIDvo<SynchronizationConflictValues, SynchronizationConflictValuesVDescriptor<SynchronizationConflictValues>>
	implements IBaseSynchronizationConflictValuesDvo {

	static diSet(): boolean {
		return air____at_airport_slash_layover_diSet(0)
	}
	
	constructor() {
		super(0)
	}
}
