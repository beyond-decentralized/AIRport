import { airEntity } from '@airport/ground-control';
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
//# sourceMappingURL=SystemWideOperationIds.js.map