import { airEntity } from '@airport/ground-control';
export function setSeqGen(sequenceGenerator) {
    SEQ_GEN = sequenceGenerator;
}
var SEQ_GEN;
export function diSet(dbApplication, dbEntityId // ApplicationEntity_LocalId
) {
    if (!SEQ_GEN
        || !dbApplication) {
        return false;
    }
    const dbEntity = dbApplication.currentVersion[0]
        .applicationVersion.entities[dbEntityId];
    return SEQ_GEN.exists(dbEntity);
}
export function duoDiSet(dbApplication, dbEntityId) {
    return dbApplication && dbApplication.currentVersion[0]
        .applicationVersion.entities[dbEntityId];
}
export async function getSysWideOpId(airDb, sequenceGenerator) {
    const sequences = await getSysWideOpIds(1, airDb, sequenceGenerator);
    return sequences[0];
}
export async function getSysWideOpIds(numSequencesNeeded, airportDatabase, sequenceGenerator) {
    if (!numSequencesNeeded) {
        return [];
    }
    const sysWideOpIdGeneratedColumn = airportDatabase.QM[airEntity.SYS_WIDE_OP_ID_APPLICATION]
        .__dbApplication__.currentVersion[0].applicationVersion
        .entityMapByName[airEntity.SYS_WIDE_OP_ID_ENTITY]
        .columnMap['SYSTEM_WIDE_OPERATION_LID'];
    const generatedNumWrapper = await sequenceGenerator
        .generateSequenceNumbers([sysWideOpIdGeneratedColumn], [numSequencesNeeded]);
    return generatedNumWrapper[0];
}
//# sourceMappingURL=SequenceGenerator.js.map