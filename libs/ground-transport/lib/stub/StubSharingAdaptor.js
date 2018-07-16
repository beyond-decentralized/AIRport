"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const terminal_map_1 = require("@airport/terminal-map");
const StubChangeList_1 = require("./StubChangeList");
/**
 * Created by Papa on 12/14/2016.
 */
class StubSharingAdaptor {
    setupInfoBelongsTo(setupInfo, setupInfos) {
        if (setupInfo.platformType !== terminal_map_1.PlatformType.STUB) {
            return false;
        }
        return setupInfos.some((otherSetupInfo) => {
            if (otherSetupInfo.platformType === terminal_map_1.PlatformType.STUB) {
                return true;
            }
        });
    }
    initialize(setupInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            this.changeLists = [];
            return {
                platformType: terminal_map_1.PlatformType.STUB,
                recordIdField: 'id',
                dbIdField: 'dbId'
            };
        });
    }
    findExistingChangeLists(setupInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.changeLists.map((changeList) => {
                return changeList.shareInfo;
            });
        });
    }
    createChangeList(shareInfo, setupInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            let changeList = new StubChangeList_1.StubChangeList(shareInfo, setupInfo);
            this.changeLists.push(changeList);
            return changeList;
        });
    }
    loadChangeList(shareInfo, setupInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            let matchingChangeList;
            this.changeLists.some((changeList) => {
                if (shareInfo.name == changeList.shareInfo.name) {
                    matchingChangeList = changeList;
                    return true;
                }
            });
            if (!matchingChangeList) {
                matchingChangeList = yield this.createChangeList(shareInfo, setupInfo);
            }
            return matchingChangeList;
        });
    }
}
exports.StubSharingAdaptor = StubSharingAdaptor;
//# sourceMappingURL=StubSharingAdaptor.js.map