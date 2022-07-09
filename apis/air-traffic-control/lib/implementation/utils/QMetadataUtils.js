var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
import { airEntity } from '@airport/ground-control';
let QMetadataUtils = class QMetadataUtils {
    getAllColumns(qEntity) {
        return qEntity.__driver__.allColumns;
    }
    getAllNonGeneratedColumns(qEntity) {
        return this.getAllColumns(qEntity).filter(qField => !qField.dbColumn.isGenerated);
    }
    getAllInsertableColumns(qEntity) {
        return this.getAllColumns(qEntity).filter(qField => {
            if (qField.dbColumn.isGenerated) {
                return false;
            }
            if (qEntity.__driver__.dbEntity.isAirEntity) {
                switch (qField.dbColumn.name) {
                    case airEntity.SYSTEM_WIDE_OPERATION_ID:
                        return false;
                }
            }
            return true;
        });
    }
    getDbEntity(qEntity) {
        return qEntity.__driver__.dbEntity;
    }
    getNewEntity(qEntity, airDb) {
        const dbEntity = qEntity.__driver__.dbEntity;
        const entityConstructor = airDb.qApplications[dbEntity.applicationVersion.application.index].__constructors__[dbEntity.name];
        if (!entityConstructor) {
            return {};
        }
        return new entityConstructor();
    }
};
QMetadataUtils = __decorate([
    Injected()
], QMetadataUtils);
export { QMetadataUtils };
//# sourceMappingURL=QMetadataUtils.js.map