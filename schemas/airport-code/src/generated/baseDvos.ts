/* eslint-disable */
import {
	Sequence,
} from '../ddl/sequence';
import {
	SequenceVDescriptor,
} from './vsequence';
import {
	SystemWideOperationId,
} from '../ddl/systemwideoperationid';
import {
	SystemWideOperationIdVDescriptor,
} from './vsystemwideoperationid';
import {
	TerminalRun,
} from '../ddl/terminalrun';
import {
	TerminalRunVDescriptor,
} from './vterminalrun';
import {
	IDvo,
	Dvo,
} from '@airport/airbridge-validate';
import {
	ApplicationEntity_LocalId as DbEntityId,
} from '@airport/ground-control';
import {
	Q,
	diSet,
} from './qApplication';


// Application Q object Dependency Injection readiness detection Dvo
export class SQDIDvo<Entity, EntityVDescriptor>
	extends Dvo<Entity, EntityVDescriptor> {

	constructor(
		dbEntityId: DbEntityId
	) {
		super(dbEntityId, Q)
	}
}


export interface IBaseSequenceDvo
  extends IDvo<Sequence, SequenceVDescriptor> {
}

export class BaseSequenceDvo
  extends SQDIDvo<Sequence, SequenceVDescriptor>
	implements IBaseSequenceDvo {

	static diSet(): boolean {
		return diSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseSystemWideOperationIdDvo
  extends IDvo<SystemWideOperationId, SystemWideOperationIdVDescriptor> {
}

export class BaseSystemWideOperationIdDvo
  extends SQDIDvo<SystemWideOperationId, SystemWideOperationIdVDescriptor>
	implements IBaseSystemWideOperationIdDvo {

	static diSet(): boolean {
		return diSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseTerminalRunDvo
  extends IDvo<TerminalRun, TerminalRunVDescriptor> {
}

export class BaseTerminalRunDvo
  extends SQDIDvo<TerminalRun, TerminalRunVDescriptor>
	implements IBaseTerminalRunDvo {

	static diSet(): boolean {
		return diSet(2)
	}
	
	constructor() {
		super(2)
	}
}
