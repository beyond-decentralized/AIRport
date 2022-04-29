import { ensureChildJsMap } from '@airport/ground-control';
/**
 * Result of comparing to versions of a given application.
 */
export var ApplicationComparisonResult;
(function (ApplicationComparisonResult) {
    // Version specified in the message is lower than it's version in the receiving
    // Terminal (TM)
    ApplicationComparisonResult[ApplicationComparisonResult["MESSAGE_APPLICATION_VERSION_IS_LOWER"] = -1] = "MESSAGE_APPLICATION_VERSION_IS_LOWER";
    // Version of the application used i the message is the same as that in the receiving
    // Terminal (TM)
    ApplicationComparisonResult[ApplicationComparisonResult["MESSAGE_APPLICATION_VERSION_IS_EQUAL"] = 0] = "MESSAGE_APPLICATION_VERSION_IS_EQUAL";
    // Version specified in the message in higher than it's version in the receiving
    // Terminal (TM)
    ApplicationComparisonResult[ApplicationComparisonResult["MESSAGE_APPLICATION_VERSION_IS_HIGHER"] = 1] = "MESSAGE_APPLICATION_VERSION_IS_HIGHER";
})(ApplicationComparisonResult || (ApplicationComparisonResult = {}));
export class SyncInUtils {
    ensureRecordMapForRepoInTable(repositoryId, operationHistory, recordMapByApplicationTableAndRepository) {
        return ensureChildJsMap(ensureChildJsMap(ensureChildJsMap(recordMapByApplicationTableAndRepository, operationHistory.entity.applicationVersion.id), operationHistory.entity.index), repositoryId);
    }
}
//# sourceMappingURL=SyncInUtils.js.map