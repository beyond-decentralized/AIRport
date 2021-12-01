import { IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField, ForeignKey, ManyToOneElements, OneToManyElements } from '@airport/air-control';
import { VersionedApplicationObjectGraph, VersionedApplicationObjectEId, VersionedApplicationObjectEUpdateColumns, VersionedApplicationObjectEUpdateProperties, VersionedApplicationObjectESelect, QVersionedApplicationObjectQId, QVersionedApplicationObjectQRelation, QVersionedApplicationObject } from './qversionedapplicationobject';
import { ApplicationPropertyGraph, ApplicationPropertyEOptionalId, ApplicationPropertyESelect, QApplicationPropertyQRelation } from './qapplicationproperty';
import { ApplicationEntityGraph, ApplicationEntityEOptionalId, ApplicationEntityESelect, QApplicationEntityQRelation } from './qapplicationentity';
import { ApplicationRelationColumnGraph, ApplicationRelationColumnESelect, QApplicationRelationColumn } from './qapplicationrelationcolumn';
import { ApplicationRelationColumn } from '../../ddl/application/ApplicationRelationColumn';
import { ApplicationRelation } from '../../ddl/application/ApplicationRelation';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationRelationESelect extends VersionedApplicationObjectESelect, ApplicationRelationEOptionalId {
    index?: number | IQNumberField;
    foreignKey?: ForeignKey | IQStringField;
    manyToOneElems?: ManyToOneElements | IQStringField;
    oneToManyElems?: OneToManyElements | IQStringField;
    relationType?: string | IQStringField;
    isId?: boolean | IQBooleanField;
    property?: ApplicationPropertyESelect;
    entity?: ApplicationEntityESelect;
    relationEntity?: ApplicationEntityESelect;
    manyRelationColumns?: ApplicationRelationColumnESelect;
    oneRelationColumns?: ApplicationRelationColumnESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationRelationEId extends VersionedApplicationObjectEId {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationRelationEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationRelationEUpdateProperties extends VersionedApplicationObjectEUpdateProperties {
    index?: number | IQNumberField;
    foreignKey?: ForeignKey | IQStringField;
    manyToOneElems?: ManyToOneElements | IQStringField;
    oneToManyElems?: OneToManyElements | IQStringField;
    relationType?: string | IQStringField;
    isId?: boolean | IQBooleanField;
    property?: ApplicationPropertyEOptionalId;
    entity?: ApplicationEntityEOptionalId;
    relationEntity?: ApplicationEntityEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationRelationGraph extends ApplicationRelationEOptionalId, VersionedApplicationObjectGraph {
    index?: number | IQNumberField;
    foreignKey?: ForeignKey | IQStringField;
    manyToOneElems?: ManyToOneElements | IQStringField;
    oneToManyElems?: OneToManyElements | IQStringField;
    relationType?: string | IQStringField;
    isId?: boolean | IQBooleanField;
    property?: ApplicationPropertyGraph;
    entity?: ApplicationEntityGraph;
    relationEntity?: ApplicationEntityGraph;
    manyRelationColumns?: ApplicationRelationColumnGraph[];
    oneRelationColumns?: ApplicationRelationColumnGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationRelationEUpdateColumns extends VersionedApplicationObjectEUpdateColumns {
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
export interface ApplicationRelationECreateProperties extends Partial<ApplicationRelationEId>, ApplicationRelationEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationRelationECreateColumns extends ApplicationRelationEId, ApplicationRelationEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QApplicationRelation extends QVersionedApplicationObject<ApplicationRelation> {
    id: IQNumberField;
    index: IQNumberField;
    foreignKey: IQStringField;
    manyToOneElems: IQStringField;
    oneToManyElems: IQStringField;
    relationType: IQStringField;
    isId: IQBooleanField;
    property: QApplicationPropertyQRelation;
    entity: QApplicationEntityQRelation;
    relationEntity: QApplicationEntityQRelation;
    manyRelationColumns: IQOneToManyRelation<ApplicationRelationColumn, QApplicationRelationColumn>;
    oneRelationColumns: IQOneToManyRelation<ApplicationRelationColumn, QApplicationRelationColumn>;
}
export interface QApplicationRelationQId extends QVersionedApplicationObjectQId {
    id: IQNumberField;
}
export interface QApplicationRelationQRelation extends QVersionedApplicationObjectQRelation<ApplicationRelation, QApplicationRelation>, QApplicationRelationQId {
}
//# sourceMappingURL=qapplicationrelation.d.ts.map