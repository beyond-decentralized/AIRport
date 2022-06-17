var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DbString, Entity, Id } from "@airport/air-traffic-control";
let Client = class Client {
};
__decorate([
    Id()
], Client.prototype, "id", void 0);
__decorate([
    DbString()
], Client.prototype, "uuId", void 0);
Client = __decorate([
    Entity()
], Client);
export { Client };
//# sourceMappingURL=Client.js.map