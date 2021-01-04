import {
	IQEntityInternal,
	IEntityIdProperties,
	IEntityCascadeGraph,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IEntitySelectProperties,
	IEntityDatabaseFacade,
	IEntityFind,
	IEntityFindOne,
	IEntitySearch,
	IEntitySearchOne,
	IQBooleanField,
	IQDateField,
	IQNumberField,
	IQOneToManyRelation,
	IQStringField,
	IQUntypedField,
	IQEntity,
	IQRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	ApplicationGraph,
	ApplicationEId,
	ApplicationEOptionalId,
	ApplicationEUpdateProperties,
	ApplicationESelect,
	QApplication,
	QApplicationQId,
	QApplicationQRelation,
} from './qapplication';
import {
	Application,
} from '../ddl/Application';
import {
	PackageGraph,
	PackageEId,
	PackageEOptionalId,
	PackageEUpdateProperties,
	PackageESelect,
	QPackage,
	QPackageQId,
	QPackageQRelation,
} from './qpackage';
import {
	Package,
} from '../ddl/Package';
import {
	ApplicationPackage,
} from '../ddl/ApplicationPackage';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationPackageESelect
    extends IEntitySelectProperties, ApplicationPackageEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	application?: ApplicationESelect;
	package?: PackageESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationPackageEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationPackageEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationPackageEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's
	application?: ApplicationEOptionalId;
	package?: PackageEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationPackageGraph
	extends ApplicationPackageEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	application?: ApplicationGraph;
	package?: PackageGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationPackageEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	APPLICATION_ID?: number | IQNumberField;
	PACKAGE_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationPackageECreateProperties
extends Partial<ApplicationPackageEId>, ApplicationPackageEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationPackageECreateColumns
extends ApplicationPackageEId, ApplicationPackageEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QApplicationPackage extends IQEntity<ApplicationPackage>
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields

	// Non-Id Relations
	application: QApplicationQRelation;
	package: QPackageQRelation;

}


// Entity Id Interface
export interface QApplicationPackageQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QApplicationPackageQRelation
	extends IQRelation<ApplicationPackage, QApplicationPackage>, QApplicationPackageQId {
}

