"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("@airport/di/lib");
const tokens_1 = require("../../tokens");
class QMetadataUtils {
    getAllColumns(qEntity) {
        return qEntity.__driver__.allColumns;
    }
    getAllNonGeneratedColumns(qEntity) {
        return this.getAllColumns(qEntity).filter(qField => !qField.dbColumn.isGenerated);
    }
    getDbEntity(qEntity) {
        return qEntity.__driver__.dbEntity;
    }
    getNewEntity(qEntity, airDb) {
        const dbEntity = qEntity.__driver__.dbEntity;
        const entityConstructor = airDb.qSchemas[dbEntity.schemaVersion.schema.index].__constructors__[dbEntity.name];
        return new entityConstructor();
    }
}
exports.QMetadataUtils = QMetadataUtils;
lib_1.DI.set(tokens_1.Q_METADATA_UTILS, QMetadataUtils);
//# sourceMappingURL=QMetadataUtils.js.map