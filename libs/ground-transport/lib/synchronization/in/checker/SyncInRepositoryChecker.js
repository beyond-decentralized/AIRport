"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b;
const InjectionTokens_1 = require("@airport/air-control/lib/InjectionTokens");
const Utils_1 = require("@airport/air-control/lib/lingo/utils/Utils");
const moving_walkway_1 = require("@airport/moving-walkway");
const InjectionTokens_2 = require("@airport/moving-walkway/lib/InjectionTokens");
const typedi_1 = require("typedi");
const Inject_1 = require("typedi/decorators/Inject");
const InjectionTokens_3 = require("../../../../../apps/terminal/src/InjectionTokens");
let SyncInRepositoryChecker = class SyncInRepositoryChecker {
    constructor(sharingNodeRepositoryDao, utils) {
        this.sharingNodeRepositoryDao = sharingNodeRepositoryDao;
        this.utils = utils;
    }
    ensureRepositories(incomingMessages) {
        return __awaiter(this, void 0, void 0, function* () {
            const inconsistentMessages = [];
            const consistentMessages = [];
            // const dataMessageMapBySharingNodeAndAgtRepositoryId:
            // 	Map<SharingNodeId, Map<AgtRepositoryId, IDataToTM[]>>
            // 	= new Map();
            const dataMessageMapBySharingNodeId = new Map();
            // const agtRepositoryIds: Set<AgtRepositoryId> = new Set();
            const sharingNodeIds = new Set();
            const sharingNodeRepositoryMap = new Map();
            for (const message of incomingMessages) {
                if (this.areRepositoryIdsConsistentInMessage(message)) {
                    const sharingNodeId = message.sharingNode.id;
                    // const agtRepositoryId = message.agtRepositoryId;
                    sharingNodeIds.add(sharingNodeId);
                    // agtRepositoryIds.add(agtRepositoryId);
                    // Add the Data message from AGT into the datastructure
                    // this.utils.ensureChildArray(
                    // 	this.utils.ensureChildJsMap(
                    // 		dataMessageMapBySharingNodeAndAgtRepositoryId,
                    // 		sharingNodeId), agtRepositoryId).push();
                    this.utils.ensureChildArray(dataMessageMapBySharingNodeId, sharingNodeId)
                        .push(message);
                    this.utils.ensureChildJsSet(sharingNodeRepositoryMap, sharingNodeId)
                        .add(message.data.repository.id);
                    consistentMessages.push(message);
                }
                else {
                    inconsistentMessages.push(message);
                }
            }
            // const {dataMessages, sharingNodeRepositoryMap}
            // 	= await this.updateRepositoryIdsAndFilterOutMissingRepositoryMessages(
            // 	agtRepositoryIds, sharingNodeIds, dataMessageMapBySharingNodeAndAgtRepositoryId);
            return {
                // consistentMessages: dataMessages,
                consistentMessages,
                inconsistentMessages,
                sharingNodeRepositoryMap
            };
        });
    }
    areRepositoryIdsConsistentInMessage(message) {
        const data = message.data;
        const repositoryId = data.repository.id;
        for (const repoTransHistory of data.repoTransHistories) {
            if (repositoryId != repoTransHistory.repository.id) {
                return false;
            }
        }
        return true;
    }
};
SyncInRepositoryChecker = __decorate([
    typedi_1.Service(InjectionTokens_3.SyncInRepositoryCheckerToken),
    __param(0, Inject_1.Inject(InjectionTokens_2.SharingNodeRepositoryDaoToken)),
    __param(1, Inject_1.Inject(InjectionTokens_1.UtilsToken)),
    __metadata("design:paramtypes", [typeof (_a = typeof moving_walkway_1.ISharingNodeRepositoryDao !== "undefined" && moving_walkway_1.ISharingNodeRepositoryDao) === "function" ? _a : Object, typeof (_b = typeof Utils_1.IUtils !== "undefined" && Utils_1.IUtils) === "function" ? _b : Object])
], SyncInRepositoryChecker);
exports.SyncInRepositoryChecker = SyncInRepositoryChecker;
//# sourceMappingURL=SyncInRepositoryChecker.js.map