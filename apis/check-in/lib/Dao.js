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
const EntityDatabaseFacade_1 = require("./EntityDatabaseFacade");
/**
 * Created by Papa on 8/26/2017.
 */
class Dao {
    constructor(dbEntity, Q, utils) {
        this.utils = utils;
        this.db = new EntityDatabaseFacade_1.EntityDatabaseFacade(dbEntity, Q, utils);
    }
    get find() {
        return this.db.find;
    }
    get findOne() {
        return this.db.findOne;
    }
    get search() {
        return this.db.search;
    }
    get searchOne() {
        return this.db.searchOne;
    }
    releaseCachedForUpdate(updateCacheType, ...entities) {
        return this.db.releaseCachedForUpdate(updateCacheType, ...entities);
    }
    bulkCreate(entities, cascade = false, checkIfProcessed = true) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.bulkCreate(entities, cascade, checkIfProcessed);
        });
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            throw `Not Implemented`;
        });
    }
    create(entityInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (entityInfo instanceof Array) {
                return yield this.bulkCreate(entityInfo);
            }
            else {
                return yield this.db.create(entityInfo);
            }
        });
    }
    delete(entityIdInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (entityIdInfo instanceof Array) {
                throw `Not Implemented`;
            }
            else {
                return yield this.db.delete(entityIdInfo);
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            throw `Not Implemented`;
        });
    }
    exists(entityId) {
        throw `Not Implemented`;
    }
    findAll(entityIds, cacheForUpdate = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (entityIds) {
                throw `Not implemented`;
            }
            return yield this.db.find.graph({
                select: {},
                from: [this.db.from],
            });
        });
    }
    findAllAsTrees(entityIds, cacheForUpdate = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (entityIds) {
                throw `Not implemented`;
            }
            return yield this.db.find.tree({
                select: {},
                from: [this.db.from],
            });
        });
    }
    findById(entityId, cacheForUpdate = false) {
        throw `Not implemented`;
    }
    save(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            if (entity instanceof Array) {
                throw `Not Implemented`;
            }
            else {
                return yield this.db.save(entity);
            }
        });
    }
    update(entityInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (entityInfo instanceof Array) {
                throw `Not Implemented`;
            }
            else {
                return yield this.db.update(entityInfo);
            }
        });
    }
}
exports.Dao = Dao;
//# sourceMappingURL=Dao.js.map