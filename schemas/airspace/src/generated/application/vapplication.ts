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
	Domain,
} from '../../ddl/application/domain';
import {
	ApplicationVersionVDescriptor,
} from './vapplicationversion';
import {
	ApplicationVersion,
} from '../../ddl/application/applicationversion';
import {
	ApplicationCurrentVersionVDescriptor,
} from './vapplicationcurrentversion';
import {
	ApplicationCurrentVersion,
} from '../../ddl/application/applicationcurrentversion';
import {
	IApplication,
} from './application';



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


