"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Relation_1 = require("./Relation");
/**
 * Created by Papa on 10/25/2016.
 */
class QOneToManyRelation extends Relation_1.QRelation {
    constructor(dbRelation, parentQ) {
        super(dbRelation, parentQ);
    }
}
exports.QOneToManyRelation = QOneToManyRelation;
//# sourceMappingURL=OneToManyRelation.js.map