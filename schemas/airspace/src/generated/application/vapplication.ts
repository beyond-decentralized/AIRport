import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	DomainVDescriptor,
} from './vDomain';
import {
	Domain,
} from '../../ddl/application/Domain';
import {
	ApplicationVersionVDescriptor,
} from './vApplicationVersion';
import {
	ApplicationVersion,
} from '../../ddl/application/ApplicationVersion';
import {
	ApplicationCurrentVersionVDescriptor,
} from './vApplicationCurrentVersion';
import {
	ApplicationCurrentVersion,
} from '../../ddl/application/ApplicationCurrentVersion';
import {
	IApplication,
} from './Application';



////////////////////
//  API INTERFACE //
////////////////////

export interface ApplicationVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	index?: number | IVNumberField;
	
	// Non-Id Properties
	GUID?: string | IVStringField;
	scope?: string | IVStringField;
	name?: string | IVStringField;
	fullName?: string | IVStringField;
	status?: string | IVStringField;
	signature?: string | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	domain?: DomainVDescriptor<Domain>
	versions?: ApplicationVersionVDescriptor<ApplicationVersion>
	currentVersion?: ApplicationCurrentVersionVDescriptor<ApplicationCurrentVersion>

}


