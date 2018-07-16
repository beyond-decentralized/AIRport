"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../../InjectionTokens");
let ErrorLogger = class ErrorLogger {
    async logError(log, errorType, terminalCredentials, erroneousEntityInfo) {
        log.error(`AGT error:
		Type:               {1}
		TerminalId:         {2}
		TerminalPassword:   {3}
		Entity w/ Error Id: {4}`, errorType, terminalCredentials[0], terminalCredentials[1], erroneousEntityInfo);
    }
};
ErrorLogger = __decorate([
    typedi_1.Service(InjectionTokens_1.ErrorLoggerToken)
], ErrorLogger);
exports.ErrorLogger = ErrorLogger;
//# sourceMappingURL=ErrorLogger.js.map