"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
let SequenceBlock = class SequenceBlock {
};
__decorate([
    air_control_1.Id(),
    air_control_1.GeneratedValue(),
    air_control_1.SequenceGenerator({ allocationSize: 1000 })
], SequenceBlock.prototype, "id", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumns([{
            name: 'SCHEMA_INDEX', nullable: false
        }, {
            name: 'TABLE_INDEX', nullable: false
        }, {
            name: 'COLUMN_INDEX', nullable: false
        }])
], SequenceBlock.prototype, "sequence", void 0);
__decorate([
    air_control_1.Column({ name: 'SIZE', nullable: false })
], SequenceBlock.prototype, "size", void 0);
__decorate([
    air_control_1.Column({ name: 'LAST_RESERVED_ID', nullable: false })
], SequenceBlock.prototype, "lastReservedId", void 0);
__decorate([
    air_control_1.Column({ name: 'RESERVATION_MILLIS', nullable: false })
], SequenceBlock.prototype, "reservationMillis", void 0);
__decorate([
    air_control_1.Transient()
], SequenceBlock.prototype, "currentNumber", void 0);
SequenceBlock = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: 'SEQUENCE_BLOCKS' })
], SequenceBlock);
exports.SequenceBlock = SequenceBlock;
//# sourceMappingURL=SequenceBlock.js.map