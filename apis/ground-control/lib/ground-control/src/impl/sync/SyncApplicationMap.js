import { ApplicationMap } from "../query/ApplicationMap";
import { SyncTableMap } from "./SyncTableMap";
export class SyncApplicationMap extends ApplicationMap {
    constructor(applicationMap) {
        super(applicationMap);
    }
    ensureEntity(entity, allColumns = false) {
        return super.ensureEntity(entity, allColumns, SyncTableMap);
    }
    intersects(applicationMap) {
        for (const applicationIndex in this.applicationMap) {
            if (applicationMap.applicationMap[applicationIndex]) {
                const syncTableMap = new SyncTableMap(parseInt(applicationIndex), this.applicationMap[applicationIndex].tableMap);
                if (syncTableMap.intersects(applicationMap.applicationMap[applicationIndex])) {
                    return true;
                }
            }
        }
        return false;
    }
}
//# sourceMappingURL=SyncApplicationMap.js.map