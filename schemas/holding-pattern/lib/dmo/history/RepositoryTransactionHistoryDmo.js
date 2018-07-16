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
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const ddl_1 = require("../../ddl/ddl");
const generated_1 = require("../../generated/generated");
const InjectionTokens_1 = require("../../InjectionTokens");
let RepositoryTransactionHistoryDmo = class RepositoryTransactionHistoryDmo extends generated_1.BaseRepositoryTransactionHistoryDmo {
    constructor(operationHistoryDmo) {
        super();
        this.operationHistoryDmo = operationHistoryDmo;
    }
    getNewRecord(repository, actor) {
        let transaction = new ddl_1.RepositoryTransactionHistory();
        let saveTimestamp = new Date();
        transaction.saveTimestamp = saveTimestamp;
        transaction.repository = repository;
        transaction.actor = actor;
        // transaction.syncStatus = SyncStatus.SYNC_PENDING;
        return transaction;
    }
    newRecord(data) {
        if (!data) {
            return null;
        }
        return Object.assign({}, data);
    }
    sortRepoTransHistories(repoTransHistories, actorMapById) {
        repoTransHistories.sort((repoTransHistory1, repoTransHistory2) => {
            const saveTimeComparison = this.compareDates(repoTransHistory1.saveTimestamp, repoTransHistory2.saveTimestamp);
            if (saveTimeComparison) {
                return saveTimeComparison;
            }
            const actor1 = actorMapById.get(repoTransHistory1.actor.id);
            const actor2 = actorMapById.get(repoTransHistory2.actor.id);
            const userIdComparison = actor1.user.uniqueId.localeCompare(actor2.user.uniqueId);
            if (userIdComparison) {
                return userIdComparison;
            }
            const databaseNameComparison = actor1.database.name.localeCompare(actor2.database.name);
            if (databaseNameComparison) {
                return databaseNameComparison;
            }
            const databaseSecondIdComparison = this.compareNumbers(actor1.database.secondId, actor2.database.secondId);
            if (databaseSecondIdComparison) {
                return databaseSecondIdComparison;
            }
            const databaseOwnerComparison = actor1.database.owner.uniqueId.localeCompare(actor2.database.owner.uniqueId);
            if (databaseOwnerComparison) {
                return databaseOwnerComparison;
            }
            const actorRandomIdComparison = this.compareNumbers(actor1.randomId, actor2.randomId);
            return actorRandomIdComparison;
        });
    }
    startOperation(repositoryTransactionHistory, entityChangeType, dbEntity) {
        let operationHistory = this.operationHistoryDmo.getNewRecord(entityChangeType, dbEntity, repositoryTransactionHistory);
        repositoryTransactionHistory.operationHistory.push(operationHistory);
        repositoryTransactionHistory
            .transactionHistory.allOperationHistory.push(operationHistory);
        return operationHistory;
    }
    compareDates(date1, date2) {
        const time1 = date1 ? date1.getTime() : -1;
        const time2 = date2 ? date2.getTime() : -1;
        return this.compareNumbers(time1, time2);
    }
    compareNumbers(number1, number2) {
        if (number1 < number2) {
            return -1;
        }
        if (number2 > number1) {
            return 1;
        }
        return 0;
    }
};
RepositoryTransactionHistoryDmo = __decorate([
    typedi_1.Service(InjectionTokens_1.RepositoryTransactionHistoryDmoToken),
    __param(0, typedi_1.Inject(_ => InjectionTokens_1.OperationHistoryDmoToken)),
    __metadata("design:paramtypes", [Object])
], RepositoryTransactionHistoryDmo);
exports.RepositoryTransactionHistoryDmo = RepositoryTransactionHistoryDmo;
//# sourceMappingURL=RepositoryTransactionHistoryDmo.js.map