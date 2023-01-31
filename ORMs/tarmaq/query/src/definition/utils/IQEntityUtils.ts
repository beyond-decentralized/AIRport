import { QApp } from "@airport/aviation-communication";
import { DbColumn, DbEntity, DbProperty, IApplicationUtils } from "@airport/ground-control";
import { IQEntity } from "../core/entity/IQEntity";
import { IQueryRelationManager } from "../core/entity/IQueryRelationManager";
import { IQRelation } from "../core/entity/IQRelation";
import { IQBooleanField } from "../core/field/IQBooleanField";
import { IQDateField } from "../core/field/IQDateField";
import { IQNumberField } from "../core/field/IQNumberField";
import { IQStringField } from "../core/field/IQStringField";
import { IQUntypedField } from "../core/field/IQUntypedField";
import { QEntity } from "../../implementation/core/entity/QEntity";
import { QRelation } from "../../implementation/core/entity/Relation";
import { IQEntityInternal } from "../core/entity/IQEntityDriver";

export interface IQEntityUtils {

    getColumnQField(
        entity: DbEntity,
        property: DbProperty,
        q: IQEntityInternal,
        column: DbColumn
    ): IQUntypedField | IQBooleanField | IQDateField | IQNumberField | IQStringField

    getQRelation(
        entity: DbEntity,
        property: DbProperty,
        q: IQEntityInternal,
        allQApps: QApp[],
        applicationUtils: IApplicationUtils,
        relationManager: IQueryRelationManager
    ): IQRelation<typeof q>

    getQEntityConstructor(
        allQApps: QApp[]
    ): typeof QEntity

    addColumnQField(
        entity: DbEntity,
        property: DbProperty,
        q: IQEntityInternal,
        column: DbColumn
    ): IQUntypedField | IQBooleanField | IQDateField | IQNumberField | IQStringField

    getQEntityIdRelationConstructor(
        dbEntity: DbEntity
    ): typeof QRelation

    getQEntityIdFields(
        addToObject,
        relationEntity: DbEntity,
        qEntity: IQEntity,
        parentProperty: DbProperty,
        relationColumnMap?: Map<DbColumn, DbColumn>
    ): typeof addToObject

}