import { TreeResultParser } from './TreeResultParser';
/**
 * Created by Papa on 11/8/2016.
 */
export declare class TreeQueryResultParser extends TreeResultParser {
    addEntity(entityAlias: string): any;
    bufferOneToManyCollection(entityAlias: string, resultObject: any, propertyName: string, childResultObject: any): void;
    flushEntity(entityAlias: string, resultObject: any): any;
}
//# sourceMappingURL=TreeQueryResultParser.d.ts.map