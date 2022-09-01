var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Api } from '@airport/check-in';
import { Inject, Injected } from "@airport/direction-indicator";
let RepositoryApi = class RepositoryApi {
    async findAll() {
        return await this.repositoryDao.findAll();
    }
    async create(repositoryName) {
        return await this.repositoryManager.createRepository(repositoryName);
    }
};
__decorate([
    Inject()
], RepositoryApi.prototype, "repositoryDao", void 0);
__decorate([
    Inject()
], RepositoryApi.prototype, "repositoryManager", void 0);
__decorate([
    Api()
], RepositoryApi.prototype, "findAll", null);
__decorate([
    Api()
], RepositoryApi.prototype, "create", null);
RepositoryApi = __decorate([
    Injected()
], RepositoryApi);
export { RepositoryApi };
//# sourceMappingURL=RepositoryApi.js.map