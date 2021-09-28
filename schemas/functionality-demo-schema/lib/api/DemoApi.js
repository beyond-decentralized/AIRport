var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { container, DI } from "@airport/di";
import { Api } from "@airport/check-in";
import { DEMO_API } from "../client";
import { LEVEL_1_DAO as LEVEL_1_DAO } from "../server-tokens";
export class DemoApi {
    async findAllLevel1WithLevel2() {
        const level1Dao = await container(this).get(LEVEL_1_DAO);
        return await level1Dao.findAllWithLevel2();
    }
    async saveChanges(records) {
        const level1Dao = await container(this).get(LEVEL_1_DAO);
        await level1Dao.saveChanges(records);
    }
    async updateAllBoolValues(newBoolValue) {
        const level1Dao = await container(this).get(LEVEL_1_DAO);
        await level1Dao.updateAllBoolValues(newBoolValue);
    }
    async updateAllNumValues(newNumValue) {
        const level1Dao = await container(this).get(LEVEL_1_DAO);
        await level1Dao.updateAllNumValues(newNumValue);
    }
    async updateAllStrValues(newStrValue) {
        const level1Dao = await container(this).get(LEVEL_1_DAO);
        await level1Dao.updateAllStrValues(newStrValue);
    }
}
__decorate([
    Api()
], DemoApi.prototype, "findAllLevel1WithLevel2", null);
__decorate([
    Api()
], DemoApi.prototype, "saveChanges", null);
__decorate([
    Api()
], DemoApi.prototype, "updateAllBoolValues", null);
__decorate([
    Api()
], DemoApi.prototype, "updateAllNumValues", null);
__decorate([
    Api()
], DemoApi.prototype, "updateAllStrValues", null);
DI.set(DEMO_API, DemoApi);
//# sourceMappingURL=DemoApi.js.map