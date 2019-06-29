"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setSeqGen(sequenceGenerator) {
    SEQ_GEN = sequenceGenerator;
}
exports.setSeqGen = setSeqGen;
var SEQ_GEN;
function diSet(dbSchema, dbEntityId // EntityId
) {
    if (!SEQ_GEN
        || !dbSchema) {
        return false;
    }
    const dbEntity = dbSchema.currentVersion.entities[dbEntityId];
    return SEQ_GEN.exists(dbEntity);
}
exports.diSet = diSet;
function duoDiSet(dbSchema, dbEntityId) {
    return dbSchema && dbSchema.currentVersion.entities[dbEntityId];
}
exports.duoDiSet = duoDiSet;
//# sourceMappingURL=SequenceGenerator.js.map