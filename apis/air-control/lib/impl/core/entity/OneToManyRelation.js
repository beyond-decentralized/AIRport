import { extend } from '../../utils/qApplicationBuilderUtils';
import { QRelation } from './Relation';
/**
 * Created by Papa on 10/25/2016.
 */
export function QOneToManyRelation(dbRelation, parentQ) {
    QOneToManyRelation.base.constructor.call(this, dbRelation, parentQ);
}
extend(QRelation, QOneToManyRelation, {});
//# sourceMappingURL=OneToManyRelation.js.map