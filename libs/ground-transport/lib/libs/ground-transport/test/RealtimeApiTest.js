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
const Injectables_1 = require("./Injectables");
let RealtimeApiTest = class RealtimeApiTest {
    constructor(adaptor) {
        this.adaptor = adaptor;
    }
    setupTest() {
        this.handle = this.adaptor.startTest();
    }
    testAddRecord() {
        let record = {
            id: 'dsf',
            test: 'a',
            test2: 2,
            test3: true,
            test4: { a: 'b' }
        };
        this.handle.addChangeRecord(record);
    }
};
RealtimeApiTest = __decorate([
    Injectables_1.Injectable(),
    __metadata("design:paramtypes", [Injectables_1.NgGoogleRealtimeAdaptor])
], RealtimeApiTest);
exports.RealtimeApiTest = RealtimeApiTest;
//# sourceMappingURL=RealtimeApiTest.js.map