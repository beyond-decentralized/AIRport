import {
	IQEntityInternal,
	IEntityIdProperties,
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
	QEntity,
	QRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	ISharingNode,
	SharingNodeEId,
	SharingNodeEOptionalId,
	SharingNodeEUpdateProperties,
	SharingNodeESelect,
	QSharingNode,
	QSharingNodeQId,
	QSharingNodeQRelation,
} from './qsharingnode';
import {
	IDatabase,
	DatabaseEId,
	DatabaseEOptionalId,
	DatabaseEUpdateProperties,
	DatabaseESelect,
	QDatabase,
	QDatabaseQId,
	QDatabaseQRelation,
} from '@airport/holding-pattern';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISharingNodeDatabase {
	
	// Id Properties

	// Id Relations
	sharingNode?: ISharingNode;
	database?: IDatabase;

	// Non-Id Properties
	agtDatabaseId?: number;
	agtDatabaseHash?: string;
	databaseSyncStatus?: number;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SharingNodeDatabaseESelect
    extends IEntitySelectProperties, SharingNodeDatabaseEOptionalId, SharingNodeDatabaseEUpdateProperties {
	// Id Relations - full property interfaces
	sharingNode?: SharingNodeESelect;
	database?: DatabaseESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SharingNodeDatabaseEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	sharingNode: SharingNodeEId;
	database: DatabaseEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface SharingNodeDatabaseEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	sharingNode?: SharingNodeEOptionalId;
	database?: DatabaseEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SharingNodeDatabaseEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	agtDatabaseId?: number | IQNumberField;
	agtDatabaseHash?: string | IQStringField;
	databaseSyncStatus?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingNodeDatabaseEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	AGT_DATABASE_ID?: number | IQNumberField;
	AGT_DATABASE_HASH?: string | IQStringField;
	DATABASE_SYNC_STATUS?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingNodeDatabaseECreateProperties
extends SharingNodeDatabaseEId, SharingNodeDatabaseEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingNodeDatabaseECreateColumns
extends SharingNodeDatabaseEId, SharingNodeDatabaseEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingNodeDatabase extends QEntity
{
	// Id Fields

	// Id Relations
	sharingNode: QSharingNodeQRelation;
	database: QDatabaseQRelation;

	// Non-Id Fields
	agtDatabaseId: IQNumberField;
	agtDatabaseHash: IQStringField;
	databaseSyncStatus: IQNumberField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QSharingNodeDatabaseQId
{
	
	// Id Fields

	// Id Relations
	sharingNode: QSharingNodeQId;
	database: QDatabaseQId;


}

// Entity Relation Interface
export interface QSharingNodeDatabaseQRelation
	extends QRelation<QSharingNodeDatabase>, QSharingNodeDatabaseQId {
}

