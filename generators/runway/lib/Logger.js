"use strict";
/**
 * Created by Papa on 3/26/2016.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    error(message) {
        this.log('ERROR', message);
    }
    log(severity, message) {
        console.log(`${this.getNowStamp()} [${severity}]: ${message}`);
    }
    getNowStamp() {
        let date = new Date();
        return this.getTimeStamp(date);
    }
    getTimeStamp(date) {
        return date.toISOString();
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map