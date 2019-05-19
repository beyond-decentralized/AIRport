"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qSchemaBuilderUtils_1 = require("../../utils/qSchemaBuilderUtils");
const Relation_1 = require("./Relation");
/**
 * Created by Papa on 10/25/2016.
 */
function QOneToManyRelation(dbRelation, parentQ) {
    QOneToManyRelation.base.constructor.call(this, dbRelation, parentQ);
}
exports.QOneToManyRelation = QOneToManyRelation;
qSchemaBuilderUtils_1.extend(Relation_1.QRelation, QOneToManyRelation, {});
//# sourceMappingURL=OneToManyRelation.js.map