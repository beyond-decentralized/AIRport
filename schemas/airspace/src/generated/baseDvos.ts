/* eslint-disable */
import {
	Application,
} from '../ddl/application/application';
import {
	ApplicationVDescriptor,
} from './application/vapplication';
import {
	ApplicationColumn,
} from '../ddl/application/applicationcolumn';
import {
	ApplicationColumnVDescriptor,
} from './application/vapplicationcolumn';
import {
	ApplicationCurrentVersion,
} from '../ddl/application/applicationcurrentversion';
import {
	ApplicationCurrentVersionVDescriptor,
} from './application/vapplicationcurrentversion';
import {
	ApplicationEntity,
} from '../ddl/application/applicationentity';
import {
	ApplicationEntityVDescriptor,
} from './application/vapplicationentity';
import {
	ApplicationOperation,
} from '../ddl/application/applicationoperation';
import {
	ApplicationOperationVDescriptor,
} from './application/vapplicationoperation';
import {
	ApplicationProperty,
} from '../ddl/application/applicationproperty';
import {
	ApplicationPropertyVDescriptor,
} from './application/vapplicationproperty';
import {
	ApplicationPropertyColumn,
} from '../ddl/application/applicationpropertycolumn';
import {
	ApplicationPropertyColumnVDescriptor,
} from './application/vapplicationpropertycolumn';
import {
	ApplicationReference,
} from '../ddl/application/applicationreference';
import {
	ApplicationReferenceVDescriptor,
} from './application/vapplicationreference';
import {
	ApplicationRelation,
} from '../ddl/application/applicationrelation';
import {
	ApplicationRelationVDescriptor,
} from './application/vapplicationrelation';
import {
	ApplicationRelationColumn,
} from '../ddl/application/applicationrelationcolumn';
import {
	ApplicationRelationColumnVDescriptor,
} from './application/vapplicationrelationcolumn';
import {
	ApplicationVersion,
} from '../ddl/application/applicationversion';
import {
	ApplicationVersionVDescriptor,
} from './application/vapplicationversion';
import {
	Domain,
} from '../ddl/application/domain';
import {
	DomainVDescriptor,
} from './application/vdomain';
import {
	IDvo,
	Dvo,
} from '@airbridge/validate';
import {
	ApplicationEntity_LocalId as DbEntityId,
} from '@airport/ground-control';
import {
	Q,
	duoDiSet,
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


export interface IBaseApplicationDvo
  extends IDvo<Application, ApplicationVDescriptor<Application>> {
}

export class BaseApplicationDvo
  extends SQDIDvo<Application, ApplicationVDescriptor<Application>>
	implements IBaseApplicationDvo {

	static diSet(): boolean {
		return duoDiSet(10)
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
		return duoDiSet(4)
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
		return duoDiSet(9)
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
		return duoDiSet(6)
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
		return duoDiSet(5)
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
		return duoDiSet(2)
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
		return duoDiSet(3)
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
		return duoDiSet(7)
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
		return duoDiSet(1)
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
		return duoDiSet(0)
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
		return duoDiSet(8)
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
		return duoDiSet(11)
	}
	
	constructor() {
		super(11)
	}
}
