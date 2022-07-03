import { QApplication } from '@airport/aviation-communication';
import { DbColumn, DbEntity, DbProperty, DbApplication, Application_Index, ApplicationEntity_TableIndex } from '@airport/ground-control';
import { QApplicationInternal } from '../../lingo/AirportDatabase';
import { IQEntity, IQEntityInternal } from '../../lingo/core/entity/Entity';
import { IQRelation } from '../../lingo/core/entity/Relation';
import { IQBooleanField } from '../../lingo/core/field/BooleanField';
import { IQDateField } from '../../lingo/core/field/DateField';
import { IQNumberField } from '../../lingo/core/field/NumberField';
import { IQStringField } from '../../lingo/core/field/StringField';
import { IQUntypedField } from '../../lingo/core/field/UntypedField';
import { IApplicationUtils } from '../../lingo/utils/ApplicationUtils';
import { QEntity } from '../core/entity/Entity';
import { QRelation } from '../core/entity/Relation';
import { IRelationManager } from '../core/entity/RelationManager';
/**
 * From:
 * http://js-bits.blogspot.com/2010/08/javascript-inheritance-done-right.html
 * Via:
 * https://stackoverflow.com/questions/6617780/how-to-call-parent-constructor
 */
export declare function extend(base: any, sub: any, methods: any): any;
export declare function getColumnQField(entity: DbEntity, property: DbProperty, q: IQEntityInternal, column: DbColumn): IQUntypedField | IQBooleanField | IQDateField | IQNumberField | IQStringField;
export declare function getQRelation(entity: DbEntity, property: DbProperty, q: IQEntityInternal, allQApplications: QApplication[], applicationUtils: IApplicationUtils, relationManager: IRelationManager): IQRelation<typeof q>;
export declare function getQEntityConstructor(allQApplications: QApplication[]): typeof QEntity;
export declare function addColumnQField(entity: DbEntity, property: DbProperty, q: IQEntityInternal, column: DbColumn): IQUntypedField | IQBooleanField | IQDateField | IQNumberField | IQStringField;
export declare function getQEntityIdRelationConstructor(dbEntity: DbEntity): typeof QRelation;
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
export declare function getQEntityIdFields(addToObject: any, relationEntity: DbEntity, qEntity: IQEntity, parentProperty: DbProperty, relationColumnMap?: Map<DbColumn, DbColumn>): any;
export declare function setQApplicationEntities(application: DbApplication, qApplication: QApplicationInternal, allQApplications: QApplication[], appliationUtils: IApplicationUtils, relationManager: IRelationManager): void;
export interface DbApplicationWithDependencies {
    application: DbApplication;
    dependencies: Set<Application_Index>;
}
export declare function orderApplicationsInOrderOfPrecedence(applications: DbApplication[]): DbApplication[];
export declare function applicationDependsOn(dependantApplication: DbApplicationWithDependencies, dependsOnApplication_Index: Application_Index, applicationWithDepsMap: Map<Application_Index, DbApplicationWithDependencies>): boolean;
export interface DbEntityWithDependencies {
    entity: DbEntity;
    dependencies: Set<ApplicationEntity_TableIndex>;
}
//# sourceMappingURL=qApplicationBuilderUtils.d.ts.map