import { RawEntityQuery } from '../../lingo/query/facade/EntityQuery';
import { IQuery, RawQuery } from '../../lingo/query/facade/Query';
import { IEntityUtils } from '../../lingo/utils/EntityUtils';
import { IUtils } from '../../lingo/Utils';
import { EntityQuery } from '../query/facade/EntityQuery';
import { ITreeEntity, RawTreeQuery } from '../../lingo/query/facade/TreeQuery';
import { IEntityAliases } from '../../lingo/core/entity/Aliases';
import { IEntityRelationFrom, IFrom, IQEntity, IQEntityDriver, IQTree } from '../../lingo/core/entity/Entity';
/**
 * Created by Papa on 6/14/2016.
 */
export declare class EntityUtils implements IEntityUtils {
    utils: IUtils;
    getObjectClassName(object: any): string;
    getClassName(clazz: Function): string;
    exists(object: any): boolean;
    isAppliable(object: any): boolean;
    getQuery<Q>(query: Q | {
        (...args: any[]): Q;
    }): Q;
    getRawQuery(rawQuery: RawQuery | {
        (...args: any[]): RawQuery;
    }): RawQuery;
    getEntityQuery(rawGraphQuery: RawEntityQuery<any> | {
        (...args: any[]): RawEntityQuery<any>;
    }): EntityQuery<any>;
    getTreeQuery<ITE extends ITreeEntity>(rawQuery: RawTreeQuery<ITE>, entityAliases: IEntityAliases): IQuery;
    isQEntity<IF extends IFrom>(qEntity: IF | IEntityRelationFrom | RawTreeQuery<any>): boolean;
    isQTree<IF extends IFrom>(qEntity: IQEntityDriver | IF | IEntityRelationFrom | RawTreeQuery<any>): boolean;
    getQTree(fromClausePosition: number[], subQuery: RawTreeQuery<any>): IQTree;
    isQField(qEntity: IQEntity): boolean;
}
//# sourceMappingURL=EntityUtils.d.ts.map