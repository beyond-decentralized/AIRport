import { QApp } from "@airport/aviation-communication";
import { DbColumn, DbEntity, DbProperty, IApplicationUtils } from "@airport/ground-control";
import { IQEntity } from "../core/entity/Entity";
import { IRelationManager } from "../core/entity/IRelationManager";
import { IQRelation } from "../core/entity/Relation";
import { IQBooleanField } from "../core/field/BooleanField";
import { IQDateField } from "../core/field/DateField";
import { IQNumberField } from "../core/field/NumberField";
import { IQStringField } from "../core/field/StringField";
import { IQUntypedField } from "../core/field/UntypedField";
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
        relationManager: IRelationManager
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