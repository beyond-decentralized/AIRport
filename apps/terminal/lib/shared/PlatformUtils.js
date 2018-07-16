"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Papa on 6/30/2016.
 */
var startTime = new Date().getTime();
// Invoke the random algorithm (?change the seed?)
Math.random();
class PlatformUtils {
    static async getNewDatabaseId() {
        return new Date().getTime().toString(36) + await this.createNonce(7, true);
    }
    static async createNonce(length, sleep) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        // Sleep a random number of milliseconds to ensure different random characters
        await this.randomize();
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    static async randomize() {
        for (let i = 0; i < startTime % 1000; i++) {
            Math.random();
        }
        /*
        return new Promise((
            resolve,
            reject
        ) => {
            setTimeout(() => {
                resolve();
            }, startTime % 1000);
        });
        */
    }
}
exports.PlatformUtils = PlatformUtils;
//# sourceMappingURL=PlatformUtils.js.map