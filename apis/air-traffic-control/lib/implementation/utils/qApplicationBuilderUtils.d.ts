import { QApplication } from '@airport/aviation-communication';
import { DbColumn, DbEntity, DbProperty, DbApplication, Application_Index, ApplicationEntity_TableIndex } from '@airport/ground-control';
import { IApplicationUtils, IQBooleanField, IQDateField, IQEntity, IQEntityInternal, IQNumberField, IQRelation, IQStringField, IQUntypedField, IRelationManager, QEntity, QRelation } from '@airport/tarmaq-query';
import { QApplicationInternal } from '../../definition/AirportDatabase';
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