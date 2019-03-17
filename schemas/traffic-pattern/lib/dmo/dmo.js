"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../InjectionTokens");
__export(require("./SchemaVersionDmo"));
let AtAirport_TrafficPattern_Dmos = class AtAirport_TrafficPattern_Dmos {
};
AtAirport_TrafficPattern_Dmos = __decorate([
    typedi_1.Service(InjectionTokens_1.NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DMOS)
], AtAirport_TrafficPattern_Dmos);
//# sourceMappingURL=dmo.js.map