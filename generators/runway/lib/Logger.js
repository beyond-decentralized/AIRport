/**
 * Created by Papa on 3/26/2016.
 */
export class Logger {
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
//# sourceMappingURL=Logger.js.map