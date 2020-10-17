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
    const dbEntity = dbSchema.currentVersion.entities[dbEntityId];
    return SEQ_GEN.exists(dbEntity);
}
export function duoDiSet(dbSchema, dbEntityId) {
    return dbSchema && dbSchema.currentVersion.entities[dbEntityId];
}
export async function getSysWideOpId(airDb, sequenceGenerator) {
    const sysWideOpIdGeneratedColumn = airDb.QM[repositoryEntity.SYS_WIDE_OP_ID_SCHEMA]
        .__dbSchema__.currentVersion
        .entityMapByName[repositoryEntity.SYS_WIDE_OP_ID_ENTITY].columnMap['ID'];
    const generatedNumWrapper = await sequenceGenerator
        .generateSequenceNumbers([sysWideOpIdGeneratedColumn], [1]);
    return generatedNumWrapper[0][0];
}
//# sourceMappingURL=SequenceGenerator.js.map