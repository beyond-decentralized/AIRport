"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const Sequence_1 = require("./Sequence");
const SequenceConsumer_1 = require("./SequenceConsumer");
let SequenceBlock = class SequenceBlock {
};
__decorate([
    air_control_1.Id(),
    air_control_1.GeneratedValue(),
    air_control_1.SequenceGenerator({ allocationSize: 1000 }),
    __metadata("design:type", Number)
], SequenceBlock.prototype, "id", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'SEQUENCE_ID', referencedColumnName: 'ID', nullable: false }),
    __metadata("design:type", Sequence_1.Sequence)
], SequenceBlock.prototype, "sequence", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'CONSUMER_ID', referencedColumnName: 'ID', nullable: false }),
    __metadata("design:type", SequenceConsumer_1.SequenceConsumer)
], SequenceBlock.prototype, "sequenceConsumer", void 0);
__decorate([
    air_control_1.Column({ name: 'SIZE', nullable: false }),
    __metadata("design:type", Number)
], SequenceBlock.prototype, "size", void 0);
__decorate([
    air_control_1.Column({ name: 'LAST_RESERVED_ID', nullable: false }),
    __metadata("design:type", Number)
], SequenceBlock.prototype, "lastReservedId", void 0);
__decorate([
    air_control_1.Column({ name: 'RESERVATION_MILLIS', nullable: false }),
    __metadata("design:type", Number)
], SequenceBlock.prototype, "reservationMillis", void 0);
__decorate([
    air_control_1.Transient(),
    __metadata("design:type", Number)
], SequenceBlock.prototype, "currentNumber", void 0);
SequenceBlock = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: 'SEQUENCE_BLOCKS' })
], SequenceBlock);
exports.SequenceBlock = SequenceBlock;
//# sourceMappingURL=SequenceBlock.js.map