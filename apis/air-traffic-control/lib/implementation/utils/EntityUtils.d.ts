import { EntityQuery, IEntityAliases, IEntityRelationFrom, IEntitySelectProperties, IEntityUtils, IFrom, IQEntity, IQEntityDriver, IQEntityInternal, IQTree, IQuery, ITreeEntity, RawEntityQuery, RawQuery, RawTreeQuery } from '@airport/tarmaq-query';
import { IUtils } from '../../definition/utils/Utils';
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
    ensureId<EntitySelect extends IEntitySelectProperties>(rawEntityQuery: RawEntityQuery<EntitySelect> | {
        (...args: any[]): RawEntityQuery<EntitySelect>;
    }): RawEntityQuery<EntitySelect>;
    private ensureIdAtLevel;
    ensureRepositoryAndActorJoin(qEntity: IQEntityInternal): {
        qActor: any;
        qRepository: any;
    };
    private findActorQEntity;
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