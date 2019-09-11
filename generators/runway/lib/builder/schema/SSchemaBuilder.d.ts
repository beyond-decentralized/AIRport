import { DbSchema } from '@airport/ground-control';
import { Configuration } from '../../options/Options';
import { EntityCandidate } from '../../parser/EntityCandidate';
import { SEntity } from './SEntity';
import { SIndexedSchema } from './SSchema';
export declare class SSchemaBuilder {
    private config;
    private entityMapByName;
    constructor(config: Configuration, entityMapByName: {
        [entityName: string]: EntityCandidate;
    });
    build(schemaMapByProjectName: {
        [projectName: string]: DbSchema;
    }): SIndexedSchema;
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
    getIdColumnIndex(entity: SEntity, columnName: string): number;
    getColumnIndex(entity: SEntity, idIndex: number | undefined): number;
}
export declare function entityExtendsRepositoryEntity(//
entityCandidate: EntityCandidate): [boolean, boolean];
