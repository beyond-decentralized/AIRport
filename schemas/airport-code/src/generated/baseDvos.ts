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
} from '@airbridge/validate';
import {
	ApplicationEntity_LocalId as DbEntityId,
} from '@airport/ground-control';
import {
	Q,
	air____at_airport_slash_airport_dash_code_diSet,
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
  extends IDvo<Sequence, SequenceVDescriptor<Sequence>> {
}

export class BaseSequenceDvo
  extends SQDIDvo<Sequence, SequenceVDescriptor<Sequence>>
	implements IBaseSequenceDvo {

	static diSet(): boolean {
		return air____at_airport_slash_airport_dash_code_diSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseSystemWideOperationIdDvo
  extends IDvo<SystemWideOperationId, SystemWideOperationIdVDescriptor<SystemWideOperationId>> {
}

export class BaseSystemWideOperationIdDvo
  extends SQDIDvo<SystemWideOperationId, SystemWideOperationIdVDescriptor<SystemWideOperationId>>
	implements IBaseSystemWideOperationIdDvo {

	static diSet(): boolean {
		return air____at_airport_slash_airport_dash_code_diSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseTerminalRunDvo
  extends IDvo<TerminalRun, TerminalRunVDescriptor<TerminalRun>> {
}

export class BaseTerminalRunDvo
  extends SQDIDvo<TerminalRun, TerminalRunVDescriptor<TerminalRun>>
	implements IBaseTerminalRunDvo {

	static diSet(): boolean {
		return air____at_airport_slash_airport_dash_code_diSet(2)
	}
	
	constructor() {
		super(2)
	}
}
