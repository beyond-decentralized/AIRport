import { DbApplication } from '@airport/ground-control';
import { Configuration } from '../../options/Options';
import { Decorator, PropertyDocEntry } from '../../parser/DocEntry';
import { EntityCandidate } from '../../parser/EntityCandidate';
import { SEntity } from './SEntity';
import { SIndexedApplication } from './SApplication';
export declare class SApplicationBuilder {
    private config;
    private entityMapByName;
    constructor(config: Configuration, entityMapByName: {
        [entityName: string]: EntityCandidate;
    });
    build(applicationMapByProjectName: {
        [projectName: string]: DbApplication;
    }): SIndexedApplication;
    getIdColumnIndex(entity: SEntity, columnName: string): number;
    getColumnIndex(entity: SEntity, idIndex: number | undefined): number;
    private buildEntity;
    private buildColumnsWithParentEntities;
    private buildColumns;
    private processRelationProperty;
    private getTableNameFromEntity;
    private isManyToOnePropertyNotNull;
    private processPrimitiveColumns;
    private processPrimitiveColumn;
    /**
     * Relation column joins can be:
     *
     * Id Index     to  Id Index
     * Column Name  to  Column Name
     * Id Index     to  Column Name
     * Column Name  to  Id Index
     *
     * For Id Indexes, do not add them as references if they don't
     * yet exist.
     *
     * @param {string} ownColumnReference
     * @param {boolean} isIdProperty
     * @param {SEntity} entity
     * @param {{[p: string]: SColumn}} relationColumnMapByName
     * @param {{[p: string]: SColumn}} primitiveColumnMapByName
     * @returns {SColumn}
     */
    private processRelationColumn;
}
export declare function entityExtendsRepositoryEntity(//
entityCandidate: EntityCandidate): [boolean, boolean];
export declare function isManyToOnePropertyNotNull(aProperty: PropertyDocEntry): boolean;
export declare function getManyToOneDecorator(aProperty: PropertyDocEntry): Decorator;
//# sourceMappingURL=SApplicationBuilder.d.ts.map