"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../InjectionTokens");
let SchemaChecker = class SchemaChecker {
    async check(jsonSchema) {
        if (!jsonSchema) {
            throw new Error(`Json Schema not provided`);
        }
        if (!(jsonSchema.versions instanceof Array)) {
            throw new Error('schema.versions is not an array');
        }
        if (jsonSchema.versions.length !== 1) {
            // FIXME: add support for schema versioning
            throw new Error('Currently only 1 version of schema is supported');
        }
        await this.checkDomain(jsonSchema);
    }
    async checkDomain(jsonSchema) {
        // TODO: implement domain checking
    }
};
SchemaChecker = __decorate([
    typedi_1.Service(InjectionTokens_1.SchemaCheckerToken)
], SchemaChecker);
exports.SchemaChecker = SchemaChecker;
//# sourceMappingURL=SchemaChecker.js.map