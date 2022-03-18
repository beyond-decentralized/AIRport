import { QRelation, QRepositoryEntityRelation } from './Relation';
/**
 * Created by Papa on 10/25/2016.
 */
export class QOneToManyRelation extends QRelation {
    constructor(dbRelation, parentQ) {
        super(dbRelation, parentQ);
    }
}
export class QRepositoryEntityOneToManyRelation extends QRepositoryEntityRelation {
    constructor(dbRelation, parentQ) {
        super(dbRelation, parentQ);
    }
}
//# sourceMappingURL=OneToManyRelation.js.map