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
export function QOneToManyRelation(dbRelation, parentQ, applicationUtils, repationManager) {
    QOneToManyRelation.base.constructor.call(this, dbRelation, parentQ, applicationUtils, repationManager);
}
const qOneToManyRelationMethods = {
/*
yourMethodName: function() {},
*/
};
extend(QRelation, QOneToManyRelation, qOneToManyRelationMethods);
export function QRepositoryEntityOneToManyRelation(dbRelation, parentQ, applicationUtils, repationManager) {
    QRepositoryEntityOneToManyRelation.base.constructor.call(this, dbRelation, parentQ, applicationUtils, repationManager);
}
const qRepositoryEntityOneToManyRelationMethods = {
/*
yourMethodName: function() {},
*/
};
extend(QRepositoryEntityRelation, QRepositoryEntityOneToManyRelation, qRepositoryEntityOneToManyRelationMethods);
//# sourceMappingURL=OneToManyRelation.js.map