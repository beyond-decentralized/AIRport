"use strict";
/**
 * Created by Papa on 1/3/2016.
 */
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
// import * as JXON from 'jxon/index.js';
const RealtimeApiTest_1 = require("./RealtimeApiTest");
const Injectables_1 = require("./Injectables");
// let jxon = <any>JXON;
// jxon.config({});
let Test = class Test {
    constructor(adaptor, apiTest) {
        this.adaptor = adaptor;
        this.apiTest = apiTest;
        this.original = `
		<entry xmlns="http:// www.w3.org/2005/Atom"
			xmlns:gsx="http:// schemas.google.com/spreadsheets/2006/extended">
		<gsx:hours>1</gsx:hours>
		<gsx:ipm>1</gsx:ipm>
		<gsx:items>60</gsx:items>
		<gsx:name>Artem</gsx:name>
		</entry>
		`;
        // console.log('ORIGINAL:');
        // console.log(this.original);
        // let json = jxon.stringToJs(this.original);
        // console.log('JSON:');
        // console.log(json);
        // let xml = jxon.jsToString(json);
        // console.log('XML:');
        // console.log(xml);
    }
    test() {
        let setupInfo = {
            apiKey: undefined,
            clientId: '510562956378-us0ctkm6happ44lrhpunmv9tqhol0omd.apps.googleusercontent.com'
        };
        this.adaptor.initialize(setupInfo)
            .then((setupInfo) => {
            this.adaptor.findExistingChangeLists(setupInfo).then((listings) => {
                listings.forEach((listing) => {
                    this.adaptor.loadChangeList(listing).then((changeList) => {
                        console.log(changeList);
                    });
                });
            });
            /*
             this.adaptor.createPlanner('Test ChangeList', setupInfo).then((
             changeList
             ) => {
             console.log('ChangeList:');
             console.log(changeList);
             });
             */
        });
    }
};
Test = __decorate([
    Injectables_1.Injectable(),
    __metadata("design:paramtypes", [Injectables_1.NgGoogleSharingAdaptor,
        RealtimeApiTest_1.RealtimeApiTest])
], Test);
exports.Test = Test;
//# sourceMappingURL=Test.js.map