"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
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
async function getSysWideOpId(airDb, sequenceGenerator) {
    const sysWideOpIdGeneratedColumn = airDb.QM[ground_control_1.repositoryEntity.SYS_WIDE_OP_ID_SCHEMA]
        .__dbSchema__.currentVersion
        .entityMapByName[ground_control_1.repositoryEntity.SYS_WIDE_OP_ID_ENTITY].columnMap['ID'];
    const generatedNumWrapper = await sequenceGenerator
        .generateSequenceNumbers([sysWideOpIdGeneratedColumn], [1]);
    return generatedNumWrapper[0][0];
}
exports.getSysWideOpId = getSysWideOpId;
//# sourceMappingURL=SequenceGenerator.js.map