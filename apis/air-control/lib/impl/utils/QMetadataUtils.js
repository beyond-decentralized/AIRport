"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("@airport/di/lib");
const diTokens_1 = require("../../diTokens");
class QMetadataUtils {
    constructor() {
        lib_1.DI.get((airportDb) => {
            this.airportDb = airportDb;
        }, diTokens_1.AIR_DB);
    }
    getAllColumns(qEntity) {
        return qEntity.__driver__.allColumns;
    }
    getDbEntity(qEntity) {
        return qEntity.__driver__.dbEntity;
    }
    getNewEntity(qEntity) {
        const dbEntity = qEntity.__driver__.dbEntity;
        const entityConstructor = this.airportDb.qSchemas[dbEntity.schemaVersion.schema.index].__constructors__[dbEntity.name];
        return new entityConstructor();
    }
}
exports.QMetadataUtils = QMetadataUtils;
lib_1.DI.set(diTokens_1.Q_METADATA_UTILS, QMetadataUtils);
//# sourceMappingURL=QMetadataUtils.js.map