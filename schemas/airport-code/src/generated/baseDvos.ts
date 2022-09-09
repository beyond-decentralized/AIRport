/* eslint-disable */
import {
	Sequence,
} from '../ddl/Sequence';
import {
	SequenceVDescriptor,
} from './validation/VSequence';
import {
	SystemWideOperationId,
} from '../ddl/SystemWideOperationId';
import {
	SystemWideOperationIdVDescriptor,
} from './validation/VSystemWideOperationId';
import {
	TerminalRun,
} from '../ddl/TerminalRun';
import {
	TerminalRunVDescriptor,
} from './validation/VTerminalRun';
import {
	IDvo,
	Dvo,
} from '@airbridge/validate';
import {
	ApplicationEntity_LocalId as DbEntityId,
} from '@airport/ground-control';
import {
	air____at_airport_slash_airport_dash_code_diSet,
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
