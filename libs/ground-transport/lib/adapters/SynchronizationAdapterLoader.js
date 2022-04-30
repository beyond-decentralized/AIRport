var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from "@airport/air-control";
let SynchronizationAdapterLoader = class SynchronizationAdapterLoader {
    async load(synchronizationSource) {
        switch (synchronizationSource) {
            case 'IPFS': {
                throw new Error(`Not Implemented`);
            }
            case 'localhost:9000': {
                return this.debugSynchronizationAdapter;
            }
            default:
                throw new Error(`Unexpected synchronization source: ${synchronizationSource}`);
        }
    }
};
__decorate([
    Inject()
], SynchronizationAdapterLoader.prototype, "debugSynchronizationAdapter", void 0);
SynchronizationAdapterLoader = __decorate([
    Injected()
], SynchronizationAdapterLoader);
export { SynchronizationAdapterLoader };
//# sourceMappingURL=SynchronizationAdapterLoader.js.map