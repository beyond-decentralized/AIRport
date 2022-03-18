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
	IQRepositoryEntityRelation,
	RawDelete,
	RawUpdate,
	ForeignKey,
	ManyToOneElements,
	OneToManyElements,
} from '@airport/air-control';
import {
	VersionedApplicationObjectGraph,
	VersionedApplicationObjectEId,
	VersionedApplicationObjectEUpdateColumns,
	VersionedApplicationObjectEUpdateProperties,
	VersionedApplicationObjectESelect,
	QVersionedApplicationObjectQId,
	QVersionedApplicationObjectQRelation,
	QVersionedApplicationObject,
} from './qversionedapplicationobject';
import {
	ApplicationPropertyGraph,
	ApplicationPropertyEId,
	ApplicationPropertyEOptionalId,
	ApplicationPropertyEUpdateProperties,
	ApplicationPropertyESelect,
	QApplicationProperty,
	QApplicationPropertyQId,
	QApplicationPropertyQRelation,
} from './qapplicationproperty';
import {
	ApplicationProperty,
} from '../../ddl/application/ApplicationProperty';
import {
	ApplicationEntityGraph,
	ApplicationEntityEId,
	ApplicationEntityEOptionalId,
	ApplicationEntityEUpdateProperties,
	ApplicationEntityESelect,
	QApplicationEntity,
	QApplicationEntityQId,
	QApplicationEntityQRelation,
} from './qapplicationentity';
import {
	ApplicationEntity,
} from '../../ddl/application/ApplicationEntity';
import {
	ApplicationRelationColumnGraph,
	ApplicationRelationColumnEId,
	ApplicationRelationColumnEOptionalId,
	ApplicationRelationColumnEUpdateProperties,
	ApplicationRelationColumnESelect,
	QApplicationRelationColumn,
	QApplicationRelationColumnQId,
	QApplicationRelationColumnQRelation,
} from './qapplicationrelationcolumn';
import {
	ApplicationRelationColumn,
} from '../../ddl/application/ApplicationRelationColumn';
import {
	ApplicationRelation,
} from '../../ddl/application/ApplicationRelation';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationRelationESelect
    extends VersionedApplicationObjectESelect, ApplicationRelationEOptionalId {
	// Non-Id Properties
	index?: number | IQNumberField;
	foreignKey?: ForeignKey | IQStringField;
	manyToOneElems?: ManyToOneElements | IQStringField;
	oneToManyElems?: OneToManyElements | IQStringField;
	relationType?: string | IQStringField;
	isId?: boolean | IQBooleanField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	property?: ApplicationPropertyESelect;
	entity?: ApplicationEntityESelect;
	relationEntity?: ApplicationEntityESelect;
	manyRelationColumns?: ApplicationRelationColumnESelect;
	oneRelationColumns?: ApplicationRelationColumnESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationRelationEId
    extends VersionedApplicationObjectEId {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationRelationEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationRelationEUpdateProperties
	extends VersionedApplicationObjectEUpdateProperties {
	// Non-Id Properties
	index?: number | IQNumberField;
	foreignKey?: ForeignKey | IQStringField;
	manyToOneElems?: ManyToOneElements | IQStringField;
	oneToManyElems?: OneToManyElements | IQStringField;
	relationType?: string | IQStringField;
	isId?: boolean | IQBooleanField;

	// Non-Id Relations - ids only & no OneToMany's
	property?: ApplicationPropertyEOptionalId;
	entity?: ApplicationEntityEOptionalId;
	relationEntity?: ApplicationEntityEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationRelationGraph
	extends ApplicationRelationEOptionalId, VersionedApplicationObjectGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	index?: number | IQNumberField;
	foreignKey?: ForeignKey | IQStringField;
	manyToOneElems?: ManyToOneElements | IQStringField;
	oneToManyElems?: OneToManyElements | IQStringField;
	relationType?: string | IQStringField;
	isId?: boolean | IQBooleanField;

	// Relations
	property?: ApplicationPropertyGraph;
	entity?: ApplicationEntityGraph;
	relationEntity?: ApplicationEntityGraph;
	manyRelationColumns?: ApplicationRelationColumnGraph[];
	oneRelationColumns?: ApplicationRelationColumnGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationRelationEUpdateColumns
	extends VersionedApplicationObjectEUpdateColumns {
	// Non-Id Columns
	DEPRECATED_SINCE_APPLICATION_VERSION_ID?: number | IQNumberField;
	REMOVED_IN_APPLICATION_VERSION_ID?: number | IQNumberField;
	SINCE_APPLICATION_VERSION_ID?: number | IQNumberField;
	RELATION_INDEX?: number | IQNumberField;
	FOREIGN_KEY?: string | IQStringField;
	MANY_TO_ONE_ELEMENTS?: string | IQStringField;
	ONE_TO_MANY_ELEMENTS?: string | IQStringField;
	RELATION_TYPE?: string | IQStringField;
	IS_ID?: boolean | IQBooleanField;
	APPLICATION_PROPERTY_ID?: number | IQNumberField;
	APPLICATION_TABLE_ID?: number | IQNumberField;
	RELATION_APPLICATION_TABLE_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationRelationECreateProperties
extends Partial<ApplicationRelationEId>, ApplicationRelationEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationRelationECreateColumns
extends ApplicationRelationEId, ApplicationRelationEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QApplicationRelation extends QVersionedApplicationObject<ApplicationRelation>
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	index: IQNumberField;
	foreignKey: IQStringField;
	manyToOneElems: IQStringField;
	oneToManyElems: IQStringField;
	relationType: IQStringField;
	isId: IQBooleanField;

	// Non-Id Relations
	property: QApplicationPropertyQRelation;
	entity: QApplicationEntityQRelation;
	relationEntity: QApplicationEntityQRelation;
	manyRelationColumns: IQOneToManyRelation<ApplicationRelationColumn, QApplicationRelationColumn>;
	oneRelationColumns: IQOneToManyRelation<ApplicationRelationColumn, QApplicationRelationColumn>;

}


// Entity Id Interface
export interface QApplicationRelationQId extends QVersionedApplicationObjectQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QApplicationRelationQRelation
	extends QVersionedApplicationObjectQRelation<ApplicationRelation, QApplicationRelation>, QApplicationRelationQId {
}

