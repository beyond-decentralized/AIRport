import { QApp } from "@airport/aviation-communication";
import { extend, Injected, IOC } from "@airport/direction-indicator";
import { DbColumn, DbEntity, DbProperty, DbRelation, EntityRelationType, JoinType, SQLDataType } from "@airport/ground-control";
import { IQEntity, IQEntityInternal } from "../../definition/core/entity/Entity";
import { IRelationManager } from "../../definition/core/entity/IRelationManager";
import { IQRelation } from "../../definition/core/entity/Relation";
import { IQBooleanField } from "../../definition/core/field/BooleanField";
import { IQDateField } from "../../definition/core/field/DateField";
import { IQNumberField } from "../../definition/core/field/NumberField";
import { IQOperableFieldInternal } from "../../definition/core/field/OperableField";
import { IQStringField } from "../../definition/core/field/StringField";
import { IQUntypedField } from "../../definition/core/field/UntypedField";
import { IQEntityUtils } from "../../definition/utils/IQEntityUtils";
import { IApplicationUtils } from "../../definition/utils/IApplicationUtils";
import { Q_ENTITY_UTILS } from "../../tokens";
import { QEntity } from "../core/entity/Entity";
import { QAirEntityOneToManyRelation, QOneToManyRelation } from "../core/entity/OneToManyRelation";
import { QAirEntityRelation, QRelation } from "../core/entity/Relation";
import { QBooleanField } from "../core/field/BooleanField";
import { QDateField } from "../core/field/DateField";
import { QNumberField } from "../core/field/NumberField";
import { QStringField } from "../core/field/StringField";
import { QUntypedField } from "../core/field/UntypedField";

@Injected()
export class QEntityUtils implements IQEntityUtils {

    getColumnQField(
        entity: DbEntity,
        property: DbProperty,
        q: IQEntityInternal,
        column: DbColumn
    ): IQUntypedField | IQBooleanField | IQDateField | IQNumberField | IQStringField {
        switch (column.type) {
            case SQLDataType.ANY:
                return new QUntypedField(column, property, q)
            case SQLDataType.BOOLEAN:
                return new QBooleanField(column, property, q)
            case SQLDataType.DATE:
                return new QDateField(column, property, q)
            case SQLDataType.NUMBER:
                return new QNumberField(column, property, q)
            case SQLDataType.JSON:
            case SQLDataType.STRING:
                return new QStringField(column, property, q)
            default:
                throw new Error(`Unsupported data type for property ${entity.applicationVersion.application.name}.${entity.name}.${property.name}`)
        }
    }

    getQRelation(
        entity: DbEntity,
        property: DbProperty,
        q: IQEntityInternal,
        allQApps: QApp[],
        applicationUtils: IApplicationUtils,
        relationManager: IRelationManager
    ): IQRelation<typeof q> {
        const relation = property.relation[0]
        switch (relation.relationType) {
            case EntityRelationType.MANY_TO_ONE:
                const relationEntity = relation.relationEntity
                const relationApplication = relationEntity.applicationVersion.application
                const qIdRelationConstructor
                    = allQApps[relationApplication.index]
                        .__qIdRelationConstructors__[relationEntity.index]
                return new qIdRelationConstructor(
                    relation.relationEntity, relation, q, applicationUtils, relationManager)
            case EntityRelationType.ONE_TO_MANY:
                if (entity.isAirEntity) {
                    return new QAirEntityOneToManyRelation(relation, q,
                        applicationUtils, relationManager)
                } else {
                    return new QOneToManyRelation(relation, q,
                        applicationUtils, relationManager)
                }
            default:
                throw new Error(`Unknown EntityRelationType: ${relation.relationType}.`)
        }

    }

    getQEntityConstructor(
        allQApps: QApp[]
    ): typeof QEntity {
        // ChildQEntity refers to the constructor
        var ChildQEntity = function (
            entity: DbEntity,
            applicationUtils: IApplicationUtils,
            relationManager: IRelationManager,
            nextChildJoinPosition: number[],
            dbRelation: DbRelation,
            joinType: JoinType
        ) {
            (<any>ChildQEntity).base.constructor.call(
                this, entity, applicationUtils, relationManager,
                nextChildJoinPosition, dbRelation, joinType)

            const qEntityUtils = IOC.getSync(Q_ENTITY_UTILS)

            entity.properties.forEach((
                property: DbProperty
            ) => {
                let qFieldOrRelation

                if (property.relation && property.relation.length) {
                    qFieldOrRelation = qEntityUtils.getQRelation(entity, property,
                        this, allQApps, applicationUtils, relationManager)
                    for (const propertyColumn of property.propertyColumns) {
                        qEntityUtils.addColumnQField(entity, property, this, propertyColumn.column)
                    }
                } else {
                    qFieldOrRelation = qEntityUtils.addColumnQField(entity, property, this,
                        property.propertyColumns[0].column)
                }
                this[property.name] = qFieldOrRelation
            })
            // entity.__qConstructor__ = ChildQEntity
        }
        const childQEntityMethods = {
            /*
            yourMethodName: function() {},
            */
        }

        extend(QEntity, ChildQEntity, childQEntityMethods)


        return <any>ChildQEntity
    }

    addColumnQField(
        entity: DbEntity,
        property: DbProperty,
        q: IQEntityInternal,
        column: DbColumn
    ): IQUntypedField | IQBooleanField | IQDateField | IQNumberField | IQStringField {
        const qFieldOrRelation = this.getColumnQField(entity, property, q, column)
        q.__driver__.allColumns[column.index]
            = qFieldOrRelation as IQOperableFieldInternal<any, any, any, any>
        if (column.idIndex || column.idIndex === 0) {
            q.__driver__.idColumns[column.idIndex]
                = qFieldOrRelation as IQOperableFieldInternal<any, any, any, any>
        }

        return qFieldOrRelation
    }

    getQEntityIdRelationConstructor(
        dbEntity: DbEntity
    ): typeof QRelation {

        function QEntityIdRelation(
            entity: DbEntity,
            relation: DbRelation,
            qEntity: IQEntityInternal,
            appliationUtils: IApplicationUtils,
            relationManager: IRelationManager,
        ) {
            (<any>QEntityIdRelation).base.constructor.call(
                this, relation, qEntity, appliationUtils, relationManager)

            const qEntityUtils = IOC.getSync(Q_ENTITY_UTILS)

            qEntityUtils.getQEntityIdFields(this, entity, qEntity, relation.property)

            // (<any>entity).__qConstructor__.__qIdRelationConstructor__ = QEntityIdRelation
        }
        const qEntityIdRelationMethods = {
            /*
            yourMethodName: function() {},
            */
        }

        if (dbEntity.isAirEntity) {
            extend(QAirEntityRelation, QEntityIdRelation, qEntityIdRelationMethods)
        } else {
            extend(QRelation, QEntityIdRelation, qEntityIdRelationMethods)
        }

        return <any>QEntityIdRelation
    }

    /**
     * Set all fields behind an id relation.  For example
     *
     * QA.id
     *
     * or
     *
     * QA.rel1.id
     *
     * or
     *
     * QA.rel2.otherRel.id
     * QA.rel2.id
     *
     * @param addToObject  Object to add to (Ex: QA | QA.rel1 | QA.rel2.otherRel
     * @param relationEntity  Entity to which the fields belong (Ex: QA, QRel1, QRel2, QOtherRel)
     * @param utils
     * @param parentProperty  The parent property from which the current property was
     *    navigated to
     * @param relationColumnMap  DbColumn map for the current path of properties
     *  (QA.rel2.otherRel), keyed by the column from the One side of the relation
     */
    getQEntityIdFields(
        addToObject,
        relationEntity: DbEntity,
        qEntity: IQEntity,
        parentProperty: DbProperty,
        relationColumnMap?: Map<DbColumn, DbColumn>
    ): typeof addToObject {
        if (!relationColumnMap) {
            const parentRelation = parentProperty.relation[0]
            const relationColumns = parentRelation.manyRelationColumns
            relationColumnMap = new Map()
            for (const relationColumn of relationColumns) {
                relationColumnMap.set(relationColumn.oneColumn,
                    relationColumn.manyColumn)
            }
        }
        relationEntity.properties.forEach((
            property: DbProperty
        ) => {
            if (!property.isId && relationEntity.isAirEntity) {
                // Internal (non-AIR entity) relations may join by non-@Id()
                // Fields.  For example Repository.parentRepository
                // & RepositoryReference join across repositories on GUIDs.
                return
            }
            let qFieldOrRelation


            // If it's a relation property (and therefore has backing columns)
            if (property.relation && property.relation.length) {
                const relation = property.relation[0]
                const relationColumns = relation.manyRelationColumns
                let hasMatchingColumns = false
                for (const relationColumn of relationColumns) {
                    if (relationColumnMap.has(relationColumn.manyColumn)) {
                        hasMatchingColumns = true
                        const originalColumn = relationColumnMap.get(relationColumn.manyColumn)
                        // Remove the mapping of the parent relation
                        relationColumnMap.delete(relationColumn.manyColumn)
                        // And replace it with the nested relation
                        relationColumnMap.set(relationColumn.oneColumn,
                            originalColumn)
                    }
                }
                if (!hasMatchingColumns) {
                    return
                }
                qFieldOrRelation = this.getQEntityIdFields(
                    {}, relation.relationEntity, qEntity,
                    parentProperty, relationColumnMap)
            } else {
                if (!relationColumnMap.has(property.propertyColumns[0].column)) {
                    // Only happens in internal (non-AIR entity) relations that do not
                    // rely on @Id() fields
                    return
                }
                const originalColumn = relationColumnMap.get(property.propertyColumns[0].column)
                qFieldOrRelation = this.getColumnQField(relationEntity,
                    parentProperty, qEntity as IQEntityInternal, originalColumn)
            }
            addToObject[property.name] = qFieldOrRelation
        })

        return addToObject
    }

}
