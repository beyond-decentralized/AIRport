import { repositoryEntity } from '@airport/ground-control';
export class QMetadataUtils {
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
            if (qEntity.__driver__.dbEntity.isRepositoryEntity) {
                switch (qField.dbColumn.name) {
                    case repositoryEntity.SYSTEM_WIDE_OPERATION_ID:
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
}
//# sourceMappingURL=QMetadataUtils.js.map