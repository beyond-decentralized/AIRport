/* eslint-disable */
import {
	Application,
} from '../ddl/application/Application';
import {
	ApplicationVDescriptor,
} from './validation/application/VApplication';
import {
	ApplicationColumn,
} from '../ddl/application/ApplicationColumn';
import {
	ApplicationColumnVDescriptor,
} from './validation/application/VApplicationColumn';
import {
	ApplicationCurrentVersion,
} from '../ddl/application/ApplicationCurrentVersion';
import {
	ApplicationCurrentVersionVDescriptor,
} from './validation/application/VApplicationCurrentVersion';
import {
	ApplicationEntity,
} from '../ddl/application/ApplicationEntity';
import {
	ApplicationEntityVDescriptor,
} from './validation/application/VApplicationEntity';
import {
	ApplicationOperation,
} from '../ddl/application/ApplicationOperation';
import {
	ApplicationOperationVDescriptor,
} from './validation/application/VApplicationOperation';
import {
	ApplicationProperty,
} from '../ddl/application/ApplicationProperty';
import {
	ApplicationPropertyVDescriptor,
} from './validation/application/VApplicationProperty';
import {
	ApplicationPropertyColumn,
} from '../ddl/application/ApplicationPropertyColumn';
import {
	ApplicationPropertyColumnVDescriptor,
} from './validation/application/VApplicationPropertyColumn';
import {
	ApplicationReference,
} from '../ddl/application/ApplicationReference';
import {
	ApplicationReferenceVDescriptor,
} from './validation/application/VApplicationReference';
import {
	ApplicationRelation,
} from '../ddl/application/ApplicationRelation';
import {
	ApplicationRelationVDescriptor,
} from './validation/application/VApplicationRelation';
import {
	ApplicationRelationColumn,
} from '../ddl/application/ApplicationRelationColumn';
import {
	ApplicationRelationColumnVDescriptor,
} from './validation/application/VApplicationRelationColumn';
import {
	ApplicationVersion,
} from '../ddl/application/ApplicationVersion';
import {
	ApplicationVersionVDescriptor,
} from './validation/application/VApplicationVersion';
import {
	Domain,
} from '../ddl/application/Domain';
import {
	DomainVDescriptor,
} from './validation/application/VDomain';
import {
	IDvo,
	Dvo,
} from '@airbridge/validate';
import {
	ApplicationEntity_LocalId as DbEntityId,
} from '@airport/ground-control';
import {
	airport____at_airport_slash_airspace_diSet,
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


export interface IBaseApplicationDvo
  extends IDvo<Application, ApplicationVDescriptor<Application>> {
}

export class BaseApplicationDvo
  extends SQDIDvo<Application, ApplicationVDescriptor<Application>>
	implements IBaseApplicationDvo {

	static diSet(): boolean {
		return airport____at_airport_slash_airspace_diSet(10)
	}
	
	constructor() {
		super(10)
	}
}


export interface IBaseApplicationColumnDvo
  extends IDvo<ApplicationColumn, ApplicationColumnVDescriptor<ApplicationColumn>> {
}

export class BaseApplicationColumnDvo
  extends SQDIDvo<ApplicationColumn, ApplicationColumnVDescriptor<ApplicationColumn>>
	implements IBaseApplicationColumnDvo {

	static diSet(): boolean {
		return airport____at_airport_slash_airspace_diSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseApplicationCurrentVersionDvo
  extends IDvo<ApplicationCurrentVersion, ApplicationCurrentVersionVDescriptor<ApplicationCurrentVersion>> {
}

export class BaseApplicationCurrentVersionDvo
  extends SQDIDvo<ApplicationCurrentVersion, ApplicationCurrentVersionVDescriptor<ApplicationCurrentVersion>>
	implements IBaseApplicationCurrentVersionDvo {

	static diSet(): boolean {
		return airport____at_airport_slash_airspace_diSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseApplicationEntityDvo
  extends IDvo<ApplicationEntity, ApplicationEntityVDescriptor<ApplicationEntity>> {
}

export class BaseApplicationEntityDvo
  extends SQDIDvo<ApplicationEntity, ApplicationEntityVDescriptor<ApplicationEntity>>
	implements IBaseApplicationEntityDvo {

	static diSet(): boolean {
		return airport____at_airport_slash_airspace_diSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseApplicationOperationDvo
  extends IDvo<ApplicationOperation, ApplicationOperationVDescriptor<ApplicationOperation>> {
}

export class BaseApplicationOperationDvo
  extends SQDIDvo<ApplicationOperation, ApplicationOperationVDescriptor<ApplicationOperation>>
	implements IBaseApplicationOperationDvo {

	static diSet(): boolean {
		return airport____at_airport_slash_airspace_diSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseApplicationPropertyDvo
  extends IDvo<ApplicationProperty, ApplicationPropertyVDescriptor<ApplicationProperty>> {
}

export class BaseApplicationPropertyDvo
  extends SQDIDvo<ApplicationProperty, ApplicationPropertyVDescriptor<ApplicationProperty>>
	implements IBaseApplicationPropertyDvo {

	static diSet(): boolean {
		return airport____at_airport_slash_airspace_diSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseApplicationPropertyColumnDvo
  extends IDvo<ApplicationPropertyColumn, ApplicationPropertyColumnVDescriptor<ApplicationPropertyColumn>> {
}

export class BaseApplicationPropertyColumnDvo
  extends SQDIDvo<ApplicationPropertyColumn, ApplicationPropertyColumnVDescriptor<ApplicationPropertyColumn>>
	implements IBaseApplicationPropertyColumnDvo {

	static diSet(): boolean {
		return airport____at_airport_slash_airspace_diSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseApplicationReferenceDvo
  extends IDvo<ApplicationReference, ApplicationReferenceVDescriptor<ApplicationReference>> {
}

export class BaseApplicationReferenceDvo
  extends SQDIDvo<ApplicationReference, ApplicationReferenceVDescriptor<ApplicationReference>>
	implements IBaseApplicationReferenceDvo {

	static diSet(): boolean {
		return airport____at_airport_slash_airspace_diSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseApplicationRelationDvo
  extends IDvo<ApplicationRelation, ApplicationRelationVDescriptor<ApplicationRelation>> {
}

export class BaseApplicationRelationDvo
  extends SQDIDvo<ApplicationRelation, ApplicationRelationVDescriptor<ApplicationRelation>>
	implements IBaseApplicationRelationDvo {

	static diSet(): boolean {
		return airport____at_airport_slash_airspace_diSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseApplicationRelationColumnDvo
  extends IDvo<ApplicationRelationColumn, ApplicationRelationColumnVDescriptor<ApplicationRelationColumn>> {
}

export class BaseApplicationRelationColumnDvo
  extends SQDIDvo<ApplicationRelationColumn, ApplicationRelationColumnVDescriptor<ApplicationRelationColumn>>
	implements IBaseApplicationRelationColumnDvo {

	static diSet(): boolean {
		return airport____at_airport_slash_airspace_diSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseApplicationVersionDvo
  extends IDvo<ApplicationVersion, ApplicationVersionVDescriptor<ApplicationVersion>> {
}

export class BaseApplicationVersionDvo
  extends SQDIDvo<ApplicationVersion, ApplicationVersionVDescriptor<ApplicationVersion>>
	implements IBaseApplicationVersionDvo {

	static diSet(): boolean {
		return airport____at_airport_slash_airspace_diSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseDomainDvo
  extends IDvo<Domain, DomainVDescriptor<Domain>> {
}

export class BaseDomainDvo
  extends SQDIDvo<Domain, DomainVDescriptor<Domain>>
	implements IBaseDomainDvo {

	static diSet(): boolean {
		return airport____at_airport_slash_airspace_diSet(11)
	}
	
	constructor() {
		super(11)
	}
}
