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
const air_control_1 = require("@airport/air-control");
const Dmo_1 = require("./Dmo");
/**
 * Created by Papa on 12/11/2016.
 */
class EntityDatabaseFacade {
    constructor(dbEntity, Q, utils) {
        this.dbEntity = dbEntity;
        this.Q = Q;
        this.utils = utils;
        this.dmo = new Dmo_1.Dmo(dbEntity);
    }
    get from() {
        return this.Q[this.dbEntity.name];
    }
    initialize(databaseFacade) {
        this.common = databaseFacade;
        this.find = new air_control_1.EntityFind(this.dbEntity, databaseFacade, this.utils);
        this.findOne = new air_control_1.EntityFindOne(this.dbEntity, databaseFacade, this.utils);
        this.search = new air_control_1.EntitySearch(this.dbEntity, databaseFacade, this.utils);
        this.searchOne = new air_control_1.EntitySearchOne(this.dbEntity, databaseFacade, this.utils);
    }
    releaseCachedForUpdate(updateCacheType, ...entities) {
        this.common.releaseCachedForUpdate(updateCacheType, this.dbEntity, ...entities);
    }
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.common.create(this.dbEntity, entity);
        });
    }
    bulkCreate(entities, checkIfProcessed = true, cascade = false) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.common.bulkCreate(this.dbEntity, entities, checkIfProcessed, cascade);
        });
    }
    insertColumnValues(rawInsertColumnValues) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.common.insertColumnValues(this.dbEntity, rawInsertColumnValues);
        });
    }
    insertValues(rawInsertValues) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.common.insertValues(this.dbEntity, rawInsertValues);
        });
    }
    insertColumnValuesGenerateIds(rawInsertColumnValues) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.common.insertColumnValuesGenerateIds(this.dbEntity, rawInsertColumnValues);
        });
    }
    insertValuesGenerateIds(rawInsertValues) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.common.insertValuesGenerateIds(this.dbEntity, rawInsertValues);
        });
    }
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.common.update(this.dbEntity, entity);
        });
    }
    updateColumnsWhere(rawUpdateColumns) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.common.updateColumnsWhere(this.dbEntity, rawUpdateColumns);
        });
    }
    updateWhere(rawUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.common.updateWhere(this.dbEntity, rawUpdate);
        });
    }
    delete(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.common.delete(this.dbEntity, entity);
        });
    }
    deleteWhere(rawDelete) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.common.deleteWhere(this.dbEntity, rawDelete);
        });
    }
    save(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.common.save(this.dbEntity, entity);
        });
    }
}
exports.EntityDatabaseFacade = EntityDatabaseFacade;
//# sourceMappingURL=EntityDatabaseFacade.js.map