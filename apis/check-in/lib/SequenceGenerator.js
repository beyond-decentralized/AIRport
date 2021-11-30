import { repositoryEntity } from '@airport/ground-control';
export function setSeqGen(sequenceGenerator) {
    SEQ_GEN = sequenceGenerator;
}
var SEQ_GEN;
export function diSet(dbSchema, dbEntityId // EntityId
) {
    if (!SEQ_GEN
        || !dbSchema) {
        return false;
    }
    const dbEntity = dbSchema.currentVersion[0]
        .schemaVersion.entities[dbEntityId];
    return SEQ_GEN.exists(dbEntity);
}
export function duoDiSet(dbSchema, dbEntityId) {
    return dbSchema && dbSchema.currentVersion[0]
        .schemaVersion.entities[dbEntityId];
}
export async function getSysWideOpId(airDb, sequenceGenerator) {
    return getSysWideOpIds(1, airDb, sequenceGenerator)[0];
}
export async function getSysWideOpIds(numSequencesNeeded, airDb, sequenceGenerator) {
    if (!numSequencesNeeded) {
        return [];
    }
    const sysWideOpIdGeneratedColumn = airDb.QM[repositoryEntity.SYS_WIDE_OP_ID_SCHEMA]
        .__dbSchema__.currentVersion[0].schemaVersion
        .entityMapByName[repositoryEntity.SYS_WIDE_OP_ID_ENTITY].columnMap['ID'];
    const generatedNumWrapper = await sequenceGenerator
        .generateSequenceNumbers([sysWideOpIdGeneratedColumn], [numSequencesNeeded]);
    return generatedNumWrapper[0];
}
//# sourceMappingURL=SequenceGenerator.js.map