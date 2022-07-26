import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	DomainVDescriptor,
} from './vdomain';
import {
	IDomain,
} from './domain';
import {
	ApplicationVersionVDescriptor,
} from './vapplicationversion';
import {
	IApplicationVersion,
} from './applicationversion';
import {
	ApplicationCurrentVersionVDescriptor,
} from './vapplicationcurrentversion';
import {
	IApplicationCurrentVersion,
} from './applicationcurrentversion';
import {
	IApplication,
} from './application';



////////////////////
//  API INTERFACE //
////////////////////

export interface ApplicationVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	index: number | IVNumberField;
	
	// Non-Id Properties
	GUID?: string | IVStringField;
	scope?: string | IVStringField;
	name?: string | IVStringField;
	fullName?: string | IVStringField;
	status?: string | IVStringField;
	signature?: string | IVStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	domain?: DomainVDescriptor;
	versions?: ApplicationVersionVDescriptor;
	currentVersion?: ApplicationCurrentVersionVDescriptor;

}


