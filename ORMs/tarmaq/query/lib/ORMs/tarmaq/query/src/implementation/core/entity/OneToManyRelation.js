import { extend } from '@airport/direction-indicator';
import { QRelation, QAirEntityRelation } from './Relation';
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
export function QAirEntityOneToManyRelation(dbRelation, parentQ, applicationUtils, repationManager) {
    QAirEntityOneToManyRelation.base.constructor.call(this, dbRelation, parentQ, applicationUtils, repationManager);
}
const qAirEntityOneToManyRelationMethods = {
/*
yourMethodName: function() {},
*/
};
extend(QAirEntityRelation, QAirEntityOneToManyRelation, qAirEntityOneToManyRelationMethods);
//# sourceMappingURL=OneToManyRelation.js.map