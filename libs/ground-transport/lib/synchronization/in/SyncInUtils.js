import { DI } from '@airport/di';
import { ensureChildJsMap } from '@airport/ground-control';
import { SYNC_IN_UTILS } from '../../tokens';
/**
 * Result of comparing to versions of a given schema.
 */
export var SchemaComparisonResult;
(function (SchemaComparisonResult) {
    // Version specified in the message is lower than it's version in the receiving
    // Terminal (TM)
    SchemaComparisonResult[SchemaComparisonResult["MESSAGE_SCHEMA_VERSION_IS_LOWER"] = -1] = "MESSAGE_SCHEMA_VERSION_IS_LOWER";
    // Version of the schema used i the message is the same as that in the receiving
    // Terminal (TM)
    SchemaComparisonResult[SchemaComparisonResult["MESSAGE_SCHEMA_VERSION_IS_EQUAL"] = 0] = "MESSAGE_SCHEMA_VERSION_IS_EQUAL";
    // Version specified in the message in higher than it's version in the receiving
    // Terminal (TM)
    SchemaComparisonResult[SchemaComparisonResult["MESSAGE_SCHEMA_VERSION_IS_HIGHER"] = 1] = "MESSAGE_SCHEMA_VERSION_IS_HIGHER";
})(SchemaComparisonResult || (SchemaComparisonResult = {}));
export class SyncInUtils {
    ensureRecordMapForRepoInTable(repositoryId, operationHistory, recordMapBySchemaTableAndRepository) {
        return ensureChildJsMap(ensureChildJsMap(ensureChildJsMap(recordMapBySchemaTableAndRepository, operationHistory.entity.schemaVersion.id), operationHistory.entity.id), repositoryId);
    }
}
DI.set(SYNC_IN_UTILS, SyncInUtils);
//# sourceMappingURL=SyncInUtils.js.map