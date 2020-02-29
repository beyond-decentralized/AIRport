var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, DbString, Entity, GeneratedValue, Id, OneToMany } from '@airport/air-control';
let User = class User {
};
__decorate([
    Id(),
    GeneratedValue(),
    DbNumber()
], User.prototype, "id", void 0);
__decorate([
    Column({ name: "UNIQUE_IDENTIFIER", nullable: false }),
    DbString()
], User.prototype, "uniqueId", void 0);
__decorate([
    Column({ name: "FIRST_NAME" }),
    DbString()
], User.prototype, "firstName", void 0);
__decorate([
    Column({ name: "LAST_NAME" }),
    DbString()
], User.prototype, "lastName", void 0);
__decorate([
    Column({ name: "MIDDLE_NAME" }),
    DbString()
], User.prototype, "middleName", void 0);
__decorate([
    DbString()
], User.prototype, "phone", void 0);
__decorate([
    OneToMany({ mappedBy: 'user' })
], User.prototype, "userTerminal", void 0);
__decorate([
    OneToMany({ mappedBy: 'user' })
], User.prototype, "userTerminalAgts", void 0);
User = __decorate([
    Entity()
], User);
export { User };
//# sourceMappingURL=User.js.map