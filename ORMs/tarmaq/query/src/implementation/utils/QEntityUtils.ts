import { QApp } from "@airport/aviation-communication";
import { extend, Inject, Injected, IOC } from "@airport/direction-indicator";
import { DbColumn, DbEntity, DbProperty, DbRelation, EntityRelationType, IApplicationUtils, JoinType, SQLDataType } from "@airport/ground-control";
import { IQEntity } from "../../definition/core/entity/IQEntity";
import { IQueryRelationManager } from "../../definition/core/entity/IQueryRelationManager";
import { IQRelation } from "../../definition/core/entity/IQRelation";
import { IQBooleanField } from "../../definition/core/field/IQBooleanField";
import { IQDateField } from "../../definition/core/field/IQDateField";
import { IQNumberField } from "../../definition/core/field/IQNumberField";
import { IQOperableFieldInternal } from "../../definition/core/field/IQOperableField";
import { IQStringField } from "../../definition/core/field/IQStringField";
import { IQUntypedField } from "../../definition/core/field/IQUntypedField";
import { IQEntityUtils } from "../../definition/utils/IQEntityUtils";
import { QEntity } from "../core/entity/QEntity";
import { QAirEntityOneToManyRelation, QOneToManyRelation } from "../core/entity/QOneToManyRelation";
import { QManyToOneAirEntityRelation, QManyToOneInternalRelation, QRelation } from "../core/entity/QRelation";
import { QBooleanField } from "../core/field/QBooleanField";
import { QDateField } from "../core/field/QDateField";
import { QNumberField } from "../core/field/QNumberField";
import { QStringField } from "../core/field/QStringField";
import { QUntypedField } from "../core/field/QUntypedField";
import { IQEntityInternal } from "../../definition/core/entity/IQEntityDriver";
import { IQueryUtils } from "../../definition/utils/IQueryUtils";
import { QENTITY_UTILS } from "../../tarmaq.query.tokens";

@Injected()
export class QEntityUtils implements IQEntityUtils {

    @Inject()
    applicationUtils: IApplicationUtils

    @Inject()
    queryRelationManager: IQueryRelationManager

    @Inject()
    queryUtils: IQueryUtils

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
        allQApps: QApp[]
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
                    relation.relationEntity, relation, q, this.applicationUtils, 
                    this.queryRelationManager, this.queryUtils)
            case EntityRelationType.ONE_TO_MANY:
                if (entity.isAirEntity) {
                    return new QAirEntityOneToManyRelation(relation, q,
                        this.applicationUtils, this.queryRelationManager, this.queryUtils)
                } else {
                    return new QOneToManyRelation(relation, q,
                        this.applicationUtils, this.queryRelationManager, this.queryUtils)
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
            queryRelationManager: IQueryRelationManager,
            nextChildJoinPosition: number[],
            dbRelation: DbRelation,
            joinType: JoinType
        ) {
            (<any>ChildQEntity).base.constructor.call(
                this, entity, applicationUtils, queryRelationManager,
                nextChildJoinPosition, dbRelation, joinType)

            const qEntityUtils = IOC.getSync(QENTITY_UTILS)

            entity.properties.forEach((
                property: DbProperty
            ) => {
                let qFieldOrRelation

                if (property.relation && property.relation.length) {
                    qFieldOrRelation = qEntityUtils.getQRelation(entity, property,
                        this, allQApps)
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
            queryRelationManager: IQueryRelationManager,
            queryUtils: IQueryUtils
        ) {
            (<any>QEntityIdRelation).base.constructor.call(
                this, relation, qEntity, appliationUtils,
                queryRelationManager, queryUtils)

            const qEntityUtils = IOC.getSync(QENTITY_UTILS)

            qEntityUtils.getQEntityIdFields(this, entity, qEntity, relation.property)

            // (<any>entity).__qConstructor__.__qIdRelationConstructor__ = QEntityIdRelation
        }
        const qEntityIdRelationMethods = {
            /*
            yourMethodName: function() {},
            */
        }

        if (dbEntity.isAirEntity) {
            extend(QManyToOneAirEntityRelation, QEntityIdRelation, qEntityIdRelationMethods)
        } else {
            extend(QManyToOneInternalRelation, QEntityIdRelation, qEntityIdRelationMethods)
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
                // Fields.  For example RepositoryReference join across 
                // repositories on GUIDs.
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
