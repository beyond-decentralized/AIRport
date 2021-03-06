import { IUtils } from '@airport/air-traffic-control';
import { DbEntity, IEntityStateManager, SQLDataType } from '@airport/ground-control';
import { IApplicationUtils, ReferencedColumnData } from '@airport/tarmaq-query';
import { IFuelHydrantContext } from '../../FuelHydrantContext';
import { GraphMtoMapper, ManyToOneStubReference } from './GraphMtoMapper';
import { GraphOtmMapper, OneToManyStubReference } from './GraphOtmMapper';
import { AbstractObjectResultParser, GraphQueryConfiguration, IEntityResultParser } from './IEntityResultParser';
/**
 * Created by Papa on 10/16/2016.
 */
/**
 * The goal of this parser to to bridge all entity references and arrive at an
 * inter-connected graph (where possible).
 */
export declare class EntityGraphResultParser extends AbstractObjectResultParser implements IEntityResultParser {
    private config;
    private rootDbEntity;
    entityMapByApplicationAndTableIndexes: {
        [entityId: string]: any;
    }[][];
    otmMapper: GraphOtmMapper;
    mtoMapper: GraphMtoMapper;
    otmStubBuffer: OneToManyStubReference[];
    mtoStubBuffer: ManyToOneStubReference[];
    currentResultRow: any[];
    constructor(config: GraphQueryConfiguration, rootDbEntity: DbEntity, applicationUtils: IApplicationUtils, entityStateManager: IEntityStateManager, utils: IUtils);
    addEntity(entityAlias: string, dbEntity: DbEntity, context: IFuelHydrantContext): any;
    addProperty(entityAlias: string, resultObject: any, dataType: SQLDataType, propertyName: string, propertyValue: any): boolean;
    bufferManyToOneStub(entityAlias: string, dbEntity: DbEntity, resultObject: any, propertyName: string, relationDbEntity: DbEntity, relationInfos: ReferencedColumnData[], context: IFuelHydrantContext): void;
    bufferBlankManyToOneStub(entityAlias: string, resultObject: any, propertyName: string): void;
    bufferManyToOneObject(entityAlias: string, dbEntity: DbEntity, resultObject: any, propertyName: string, relationDbEntity: DbEntity, childResultObject: any, context: IFuelHydrantContext): any;
    bufferBlankManyToOneObject(entityAlias: string, resultObject: any, propertyName: string): void;
    bufferOneToManyStub(otmDbEntity: DbEntity, otmPropertyName: string): void;
    bufferOneToManyCollection(entityAlias: string, resultObject: any, otmDbEntity: DbEntity, propertyName: string, relationDbEntity: DbEntity, childResultObject: any, context: IFuelHydrantContext): void;
    bufferBlankOneToMany(entityAlias: string, resultObject: any, otmEntityName: string, propertyName: string, relationDbEntity: DbEntity, context: IFuelHydrantContext): void;
    flushEntity(entityAlias: string, dbEntity: DbEntity, selectClauseFragment: any, entityIdValue: string, resultObject: any, context: IFuelHydrantContext): any;
    flushRow(): void;
    bridge(parsedResults: any[], selectClauseFragment: any, context: IFuelHydrantContext): any[];
    private bufferManyToOne;
    private bufferOneToMany;
    private getEntityToFlush;
    /**
     * Merge entities with of the same class and with the same Id
     *
     * @param source
     * @param target
     * @param qEntity
     * @param selectClauseFragment
     * @param entityPropertyTypeMap
     * @param entityRelationMap
     * @returns {any}
     */
    private mergeEntities;
    private flushRelationStubBuffers;
}
//# sourceMappingURL=EntityGraphResultParser.d.ts.map