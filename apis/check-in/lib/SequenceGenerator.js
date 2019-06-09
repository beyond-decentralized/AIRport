"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function diSet(dbSchema, dbEntityId // EntityId
) {
    if (!exports.SEQ_GEN
        || !dbSchema) {
        return false;
    }
    const dbEntity = dbSchema.currentVersion.entities[dbEntityId];
    return exports.SEQ_GEN.exists(dbEntity);
}
exports.diSet = diSet;
//# sourceMappingURL=SequenceGenerator.js.map