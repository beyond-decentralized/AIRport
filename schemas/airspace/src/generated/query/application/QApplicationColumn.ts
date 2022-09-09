import {
	IQEntityInternal,
	IEntityIdProperties,
	IEntityCascadeGraph,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IEntitySelectProperties,
	IQBooleanField,
	IQDateField,
	IQNumberField,
	IQOneToManyRelation,
	IQStringField,
	IQUntypedField,
	IQEntity,
	IQRelation,
	IQAirEntityOneToManyRelation,
	IQAirEntityRelation,
	RawDelete,
	RawUpdate,
} from '@airport/tarmaq-query';
import {
	VersionedApplicationObjectGraph,
	VersionedApplicationObjectEId,
	VersionedApplicationObjectEUpdateColumns,
	VersionedApplicationObjectEUpdateProperties,
	VersionedApplicationObjectESelect,
	QVersionedApplicationObjectQId,
	QVersionedApplicationObjectQRelation,
	QVersionedApplicationObject,
} from './QVersionedApplicationObject';
import {
	ApplicationEntityGraph,
	ApplicationEntityEId,
	ApplicationEntityEOptionalId,
	ApplicationEntityEUpdateProperties,
	ApplicationEntityESelect,
	QApplicationEntity,
	QApplicationEntityQId,
	QApplicationEntityQRelation,
} from './QApplicationEntity';
import {
	IApplicationEntity,
} from '../../entity/application/IApplicationEntity';
import {
	ApplicationPropertyColumnGraph,
	ApplicationPropertyColumnEId,
	ApplicationPropertyColumnEOptionalId,
	ApplicationPropertyColumnEUpdateProperties,
	ApplicationPropertyColumnESelect,
	QApplicationPropertyColumn,
	QApplicationPropertyColumnQId,
	QApplicationPropertyColumnQRelation,
} from './QApplicationPropertyColumn';
import {
	IApplicationPropertyColumn,
} from '../../entity/application/IApplicationPropertyColumn';
import {
	ApplicationRelationColumnGraph,
	ApplicationRelationColumnEId,
	ApplicationRelationColumnEOptionalId,
	ApplicationRelationColumnEUpdateProperties,
	ApplicationRelationColumnESelect,
	QApplicationRelationColumn,
	QApplicationRelationColumnQId,
	QApplicationRelationColumnQRelation,
} from './QApplicationRelationColumn';
import {
	IApplicationRelationColumn,
} from '../../entity/application/IApplicationRelationColumn';
import {
	IApplicationColumn,
} from '../../entity/application/IApplicationColumn';


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationColumnESelect
    extends VersionedApplicationObjectESelect, ApplicationColumnEOptionalId {
	// Non-Id Properties
	index?: number | IQNumberField;
	idIndex?: number | IQNumberField;
	isGenerated?: boolean | IQBooleanField;
	allocationSize?: number | IQNumberField;
	name?: string | IQStringField;
	notNull?: boolean | IQBooleanField;
	precision?: number | IQNumberField;
	scale?: number | IQNumberField;
	type?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	entity?: ApplicationEntityESelect;
	propertyColumns?: ApplicationPropertyColumnESelect;
	manyRelationColumns?: ApplicationRelationColumnESelect;
	oneRelationColumns?: ApplicationRelationColumnESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationColumnEId
    extends VersionedApplicationObjectEId {
	// Id Properties
	_localId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationColumnEOptionalId {
	// Id Properties
	_localId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationColumnEUpdateProperties
	extends VersionedApplicationObjectEUpdateProperties {
	// Non-Id Properties
	index?: number | IQNumberField;
	idIndex?: number | IQNumberField;
	isGenerated?: boolean | IQBooleanField;
	allocationSize?: number | IQNumberField;
	name?: string | IQStringField;
	notNull?: boolean | IQBooleanField;
	precision?: number | IQNumberField;
	scale?: number | IQNumberField;
	type?: string | IQStringField;

	// Non-Id Relations - _localIds only & no OneToMany's
	entity?: ApplicationEntityEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationColumnGraph
	extends ApplicationColumnEOptionalId, VersionedApplicationObjectGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	index?: number | IQNumberField;
	idIndex?: number | IQNumberField;
	isGenerated?: boolean | IQBooleanField;
	allocationSize?: number | IQNumberField;
	name?: string | IQStringField;
	notNull?: boolean | IQBooleanField;
	precision?: number | IQNumberField;
	scale?: number | IQNumberField;
	type?: string | IQStringField;

	// Relations
	entity?: ApplicationEntityGraph;
	propertyColumns?: ApplicationPropertyColumnGraph[];
	manyRelationColumns?: ApplicationRelationColumnGraph[];
	oneRelationColumns?: ApplicationRelationColumnGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationColumnEUpdateColumns
	extends VersionedApplicationObjectEUpdateColumns {
	// Non-Id Columns
	DEPRECATED_SINCE_APPLICATION_VERSION_LID?: number | IQNumberField;
	REMOVED_IN_APPLICATION_VERSION_LID?: number | IQNumberField;
	SINCE_APPLICATION_VERSION_LID?: number | IQNumberField;
	COLUMN_INDEX?: number | IQNumberField;
	ID_INDEX?: number | IQNumberField;
	IS_GENERATED?: boolean | IQBooleanField;
	ALLOCATION_SIZE?: number | IQNumberField;
	NAME?: string | IQStringField;
	NOT_NULL?: boolean | IQBooleanField;
	PRECISION?: number | IQNumberField;
	SCALE?: number | IQNumberField;
	TYPE?: string | IQStringField;
	APPLICATION_ENTITY_LID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationColumnECreateProperties
extends Partial<ApplicationColumnEId>, ApplicationColumnEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationColumnECreateColumns
extends ApplicationColumnEId, ApplicationColumnEUpdateColumns {
}


///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QApplicationColumn<IQE extends QApplicationColumn = any> extends QVersionedApplicationObject<IQE | QApplicationColumn>
{
	// Id Fields
	_localId: IQNumberField;

	// Id Relations

	// Non-Id Fields
	index: IQNumberField;
	idIndex: IQNumberField;
	isGenerated: IQBooleanField;
	allocationSize: IQNumberField;
	name: IQStringField;
	notNull: IQBooleanField;
	precision: IQNumberField;
	scale: IQNumberField;
	type: IQStringField;

	// Non-Id Relations
	entity: QApplicationEntityQRelation;
	propertyColumns: IQOneToManyRelation<QApplicationPropertyColumn>;
	manyRelationColumns: IQOneToManyRelation<QApplicationRelationColumn>;
	oneRelationColumns: IQOneToManyRelation<QApplicationRelationColumn>;

}

// Entity Id Interface
export interface QApplicationColumnQId extends QVersionedApplicationObjectQId
{
	
	// Id Fields
	_localId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QApplicationColumnQRelation
	extends QVersionedApplicationObjectQRelation<QApplicationColumn>, QApplicationColumnQId {
}