var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, Entity, GeneratedValue, Id, Table } from '@airport/air-control';
let Address = class Address {
};
__decorate([
    GeneratedValue(),
    Id(),
    Column({ name: 'ADDRESS_ID' })
], Address.prototype, "id", void 0);
__decorate([
    Column({ name: 'LATITUDE' })
], Address.prototype, "latitude", void 0);
__decorate([
    Column({ name: 'LONGITUDE' })
], Address.prototype, "longitude", void 0);
__decorate([
    Column({ name: 'STREET_NUMBER' })
], Address.prototype, "streetNumber", void 0);
__decorate([
    Column({ name: 'STREET' })
], Address.prototype, "street", void 0);
__decorate([
    Column({ name: 'TOWN' })
], Address.prototype, "town", void 0);
__decorate([
    Column({ name: 'REGION' })
], Address.prototype, "region", void 0);
__decorate([
    Column({ name: 'COUNTRY' })
], Address.prototype, "country", void 0);
__decorate([
    Column({ name: 'POSTAL_CODE' })
], Address.prototype, "postalCode", void 0);
Address = __decorate([
    Entity(),
    Table({ name: 'ADDRESSES' })
], Address);
export { Address };
//# sourceMappingURL=Address.js.map