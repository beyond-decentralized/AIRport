/**
 * Data Validation object.
 */
export class Dvo {
    constructor(dbEntityId, qApplication) {
        if (typeof dbEntityId === 'number') {
            this.dbEntity = qApplication.__dbApplication__.currentVersion[0]
                .applicationVersion.entities[dbEntityId];
        }
        else {
            this.dbEntity = dbEntityId;
        }
    }
    async validate(entity, rules) {
        return null;
    }
}
//# sourceMappingURL=Dvo.js.map