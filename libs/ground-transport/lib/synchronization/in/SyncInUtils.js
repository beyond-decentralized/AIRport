var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/air-control';
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
let SyncInUtils = class SyncInUtils {
    ensureRecordMapForRepoInTable(repositoryId, operationHistory, recordMapByApplicationTableAndRepository) {
        return ensureChildJsMap(ensureChildJsMap(ensureChildJsMap(recordMapByApplicationTableAndRepository, operationHistory.entity.applicationVersion.id), operationHistory.entity.index), repositoryId);
    }
};
SyncInUtils = __decorate([
    Injected()
], SyncInUtils);
export { SyncInUtils };
//# sourceMappingURL=SyncInUtils.js.map