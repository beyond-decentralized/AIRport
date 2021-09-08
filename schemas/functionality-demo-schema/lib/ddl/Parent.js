var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, GeneratedValue, Id, OneToMany } from '@airport/air-control';
let Parent = class Parent {
};
__decorate([
    Id(),
    GeneratedValue()
], Parent.prototype, "id", void 0);
__decorate([
    OneToMany()
], Parent.prototype, "children", void 0);
Parent = __decorate([
    Entity()
], Parent);
export { Parent };
//# sourceMappingURL=Parent.js.map