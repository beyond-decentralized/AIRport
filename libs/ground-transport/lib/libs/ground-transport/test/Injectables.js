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
const GoogleSharingAdaptor_1 = require("../src/google/GoogleSharingAdaptor");
const GoogleRealtimeAdaptor_1 = require("../src/google/realtime/GoogleRealtimeAdaptor");
const GoogleRealtime_1 = require("../src/google/realtime/GoogleRealtime");
const GoogleDriveAdaptor_1 = require("../src/google/drive/GoogleDriveAdaptor");
const GoogleDrive_1 = require("../src/google/drive/GoogleDrive");
const GoogleApi_1 = require("../src/google/GoogleApi");
/**
 * Created by Papa on 5/26/2016.
 */
/**
 * Replace with Angular 2 @Injectable or equivalent
 *
 * @returns {function(Function)}
 * @constructor
 */
function Injectable() {
    return function (constructor) {
    };
}
exports.Injectable = Injectable;
let NgGoogleApi = class NgGoogleApi extends GoogleApi_1.GoogleApi {
};
NgGoogleApi = __decorate([
    Injectable
], NgGoogleApi);
exports.NgGoogleApi = NgGoogleApi;
let NgGoogleDrive = class NgGoogleDrive extends GoogleDrive_1.GoogleDrive {
    constructor(googleApi) {
        super(googleApi);
        this.googleApi = googleApi;
    }
};
NgGoogleDrive = __decorate([
    Injectable,
    __metadata("design:paramtypes", [NgGoogleApi])
], NgGoogleDrive);
exports.NgGoogleDrive = NgGoogleDrive;
let NgGoogleDriveAdaptor = class NgGoogleDriveAdaptor extends GoogleDriveAdaptor_1.GoogleDriveAdaptor {
    constructor(googleApi, googleDrive) {
        super(googleApi, googleDrive);
        this.googleApi = googleApi;
        this.googleDrive = googleDrive;
    }
};
NgGoogleDriveAdaptor = __decorate([
    Injectable,
    __metadata("design:paramtypes", [NgGoogleApi,
        NgGoogleDrive])
], NgGoogleDriveAdaptor);
exports.NgGoogleDriveAdaptor = NgGoogleDriveAdaptor;
let NgGoogleRealtime = class NgGoogleRealtime extends GoogleRealtime_1.GoogleRealtime {
    constructor(googleDrive) {
        super(googleDrive);
        this.googleDrive = googleDrive;
    }
};
NgGoogleRealtime = __decorate([
    Injectable,
    __metadata("design:paramtypes", [NgGoogleDrive])
], NgGoogleRealtime);
exports.NgGoogleRealtime = NgGoogleRealtime;
let NgGoogleRealtimeAdaptor = class NgGoogleRealtimeAdaptor extends GoogleRealtimeAdaptor_1.GoogleRealtimeAdaptor {
    constructor(googleRealtime) {
        super(googleRealtime);
        this.googleRealtime = googleRealtime;
    }
};
NgGoogleRealtimeAdaptor = __decorate([
    Injectable,
    __metadata("design:paramtypes", [NgGoogleRealtime])
], NgGoogleRealtimeAdaptor);
exports.NgGoogleRealtimeAdaptor = NgGoogleRealtimeAdaptor;
let NgGoogleSharingAdaptor = class NgGoogleSharingAdaptor extends GoogleSharingAdaptor_1.GoogleSharingAdaptor {
    constructor(drive, driveAdaptor, realtime, realtimeAdaptor) {
        super(drive, driveAdaptor, realtime, realtimeAdaptor);
        this.drive = drive;
        this.driveAdaptor = driveAdaptor;
        this.realtime = realtime;
        this.realtimeAdaptor = realtimeAdaptor;
    }
};
NgGoogleSharingAdaptor = __decorate([
    Injectable,
    __metadata("design:paramtypes", [NgGoogleDrive,
        NgGoogleDriveAdaptor,
        NgGoogleRealtime,
        NgGoogleRealtimeAdaptor])
], NgGoogleSharingAdaptor);
exports.NgGoogleSharingAdaptor = NgGoogleSharingAdaptor;
//# sourceMappingURL=Injectables.js.map