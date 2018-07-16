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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const map_1 = require("rxjs/operators/map");
const Service_1 = require("typedi/decorators/Service");
const InjectionTokens_1 = require("../InjectionTokens");
let SelectorWrapper = class SelectorWrapper extends Wrapper {
    constructor() {
        super(SelectorImplToken);
    }
};
SelectorWrapper = __decorate([
    Service_1.Service(SelectorToken),
    __metadata("design:paramtypes", [])
], SelectorWrapper);
let Selector = class Selector {
    constructor(root) {
        this.root = root;
    }
    data() {
        return this.root.pipe(map_1.map((root) => root.data));
    }
};
Selector = __decorate([
    Service_1.Service(SelectorImplToken),
    __param(0, Inject(RootSeletorToken)),
    __metadata("design:paramtypes", [Object])
], Selector);
let ActionsWrapper = class ActionsWrapper extends Wrapper {
    constructor() {
        super(ActionsToken);
    }
};
ActionsWrapper = __decorate([
    Service_1.Service(ActionsToken),
    __metadata("design:paramtypes", [])
], ActionsWrapper);
let Actions = class Actions {
    constructor(dao, select) {
        this.dao = dao;
        this.select = select;
        this.searchById = (id) => (draft) => {
            draft.searchId = id;
            return this.dao.getData(id).pipe(map_1.map((data) => {
                return this.setData(data);
            }));
        };
        this.setData = (data) => (draft) => {
            draft.data = data;
        };
    }
};
Actions = __decorate([
    Service_1.Service(ActionsImplToken),
    __metadata("design:paramtypes", [Object, Object])
], Actions);
/*
class Signal {

    a(data) => (b: draft) {}
    _a(draft, data):Observable<any> | any {

    return getData().pipe(
        map((
            data
        ) => {
        return this.b(getDraft(), new Action());
    });

    b(data) {}
    _b(draft, data): Observable<any> | any {
        draft.data = data;
    }

}
 */
let Store = class Store {
    constructor(modify, signal) {
        this.state = {};
        this.listeners = [];
    }
    initialize() {
    }
    addAction(name, action) {
        this[name] = action;
    }
    addEffect(name, effect) {
        this[];
    }
};
Store = __decorate([
    Service_1.Service(InjectionTokens_1.StoreToken),
    __metadata("design:paramtypes", [Object, Object])
], Store);
exports.Store = Store;
//# sourceMappingURL=Store.js.map