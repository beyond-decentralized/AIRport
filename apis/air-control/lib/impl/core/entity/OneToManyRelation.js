import { extend } from '../../utils/qApplicationBuilderUtils';
import { QRelation, QRepositoryEntityRelation } from './Relation';
/**
 * Created by Papa on 10/25/2016.
 */
/*
 * Cannot use 'class' syntax because it brakes dynamic creation of subclasses.
 * With 'class' browser reports:
 *   Class constructor QRelation cannot be invoked without 'new'
 * When calling:
 *   Q...Relation.base.constructor.call(this, relation, qEntity)
 */
export function QOneToManyRelation(dbRelation, parentQ) {
    QOneToManyRelation.base.constructor.call(this, dbRelation, parentQ);
}
extend(QRelation, QOneToManyRelation, {});
export function QRepositoryEntityOneToManyRelation(dbRelation, parentQ) {
    QRepositoryEntityOneToManyRelation.base.constructor.call(this, dbRelation, parentQ);
}
extend(QRepositoryEntityRelation, QRepositoryEntityOneToManyRelation, {});
//# sourceMappingURL=OneToManyRelation.js.map