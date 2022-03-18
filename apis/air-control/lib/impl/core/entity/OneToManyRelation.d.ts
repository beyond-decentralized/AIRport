import { DbRelation } from '@airport/ground-control';
import { IQEntity, IQEntityInternal } from '../../../lingo/core/entity/Entity';
import { QRelation, QRepositoryEntityRelation } from './Relation';
/**
 * Created by Papa on 10/25/2016.
 */
export declare class QOneToManyRelation<Entity, IQ extends IQEntity<Entity>> extends QRelation<Entity, IQ> {
    constructor(dbRelation: DbRelation, parentQ: IQEntityInternal<any>);
}
export declare class QRepositoryEntityOneToManyRelation<Entity, IQ extends IQEntity<Entity>> extends QRepositoryEntityRelation<Entity, IQ> {
    constructor(dbRelation: DbRelation, parentQ: IQEntityInternal<any>);
}
//# sourceMappingURL=OneToManyRelation.d.ts.map