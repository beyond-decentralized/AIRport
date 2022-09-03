'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var IsolateMessageType;
(function (IsolateMessageType) {
    IsolateMessageType["ADD_REPOSITORY"] = "ADD_REPOSITORY";
    IsolateMessageType["APP_INITIALIZING"] = "APP_INITIALIZING";
    IsolateMessageType["APP_INITIALIZED"] = "APP_INITIALIZED";
    IsolateMessageType["CALL_API"] = "CALL_API";
    IsolateMessageType["DELETE_WHERE"] = "DELETE_WHERE";
    IsolateMessageType["FIND"] = "FIND";
    IsolateMessageType["FIND_ONE"] = "FIND_ONE";
    IsolateMessageType["GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME"] = "GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME";
    IsolateMessageType["INSERT_VALUES"] = "INSERT_VALUES";
    IsolateMessageType["INSERT_VALUES_GET_IDS"] = "INSERT_VALUES_GET_IDS";
    IsolateMessageType["RETRIEVE_DOMAIN"] = "RETRIEVE_DOMAIN";
    IsolateMessageType["SEARCH"] = "SEARCH";
    IsolateMessageType["SEARCH_ONE"] = "SEARCH_ONE";
    IsolateMessageType["SEARCH_UNSUBSCRIBE"] = "UNSUBSCRIBE";
    IsolateMessageType["SAVE"] = "SAVE";
    IsolateMessageType["SAVE_TO_DESTINATION"] = "SAVE_TO_DESTINATION";
    IsolateMessageType["UPDATE_VALUES"] = "UPDATE_VALUES";
})(IsolateMessageType || (IsolateMessageType = {}));

var AppState;
(function (AppState) {
    AppState["NOT_INITIALIED"] = "NOT_INITIALIED";
    AppState["START_INITIALIZING"] = "START_INITIALIZING";
    AppState["INITIALIZING_IN_PROGRESS"] = "INITIALIZING_IN_PROGRESS";
    AppState["INITIALIZED"] = "INITIALIZED";
})(AppState || (AppState = {}));

class InjectionDomain {
    constructor(name) {
        this.name = name;
        this.applicationMap = {};
    }
    app(applicationName) {
        if (this.applicationMap[applicationName]) {
            throw new Error(`
			Application already defined.
			Domain:      ${this.name}
			Application: ${applicationName}
			`);
        }
        const application = new InjectionApplication(applicationName, this);
        this.applicationMap[applicationName] = application;
        return application;
    }
    getApp(applicationName) {
        return this.applicationMap[applicationName];
    }
}
const DOMAIN_MAP = {};
function domain(domainName) {
    if (DOMAIN_MAP[domainName]) {
        return DOMAIN_MAP[domainName];
    }
    const domain = new InjectionDomain(domainName);
    DOMAIN_MAP[domainName] = domain;
    return domain;
}
const AIRPORT_DOMAIN = domain('turbase.app');

class DependencyInjectionToken {
    constructor(application, descriptor) {
        this.application = application;
        this.descriptor = descriptor;
    }
    get dependencyConfiguration() {
        return this.getInheritedDependencyConfiguration(this.descriptor.class);
    }
    getPath() {
        return this.application.domain.name + ':' + this.application.name + ':'
            + this.descriptor.token;
    }
    setDependencies(dependencyConfiguration) {
        if (this._dependencyConfiguration) {
            this._dependencyConfiguration = {
                ...this._dependencyConfiguration,
                ...dependencyConfiguration
            };
        }
        else {
            this._dependencyConfiguration = dependencyConfiguration;
        }
        if (!this.descriptor.class) {
            return;
        }
        if (this.descriptor.class.dependencyConfiguration) {
            this.descriptor.class.dependencyConfiguration = {
                ...this.descriptor.class.dependencyConfiguration,
                ...dependencyConfiguration
            };
        }
        else {
            this.descriptor.class.dependencyConfiguration = dependencyConfiguration;
        }
    }
    setClass(aClass) {
        this.descriptor.class = aClass;
        aClass.dependencyConfiguration = this._dependencyConfiguration;
    }
    getInheritedDependencyConfiguration(aClass) {
        const parentClass = Object.getPrototypeOf(aClass);
        let returnedDependencyConfiguration = {};
        if (parentClass) {
            returnedDependencyConfiguration = this.getInheritedDependencyConfiguration(parentClass);
        }
        const dependencyConfiguration = aClass.dependencyConfiguration;
        if (dependencyConfiguration) {
            returnedDependencyConfiguration = {
                ...returnedDependencyConfiguration,
                ...dependencyConfiguration
            };
        }
        return returnedDependencyConfiguration;
    }
    getClass() {
        return this.descriptor.class;
    }
}

class InjectionApplication {
    constructor(name, domain) {
        this.name = name;
        this.domain = domain;
        this.tokenMap = new Map();
        this.autopilot = false;
    }
    getFullName() {
        return `${this.domain.name}/${this.name}`;
    }
    token(descriptor) {
        const existingToken = this.tokenMap.get(descriptor.interface);
        if (existingToken) {
            throw new Error(`Token with name '${descriptor.interface}' has already been created`);
        }
        const diToken = new DependencyInjectionToken(this, descriptor);
        this.tokenMap.set(descriptor.interface, diToken);
        return diToken;
    }
}
function lib(libraryName) {
    return AIRPORT_DOMAIN.app(libraryName);
}

var ContextType;
(function (ContextType) {
    ContextType["DB"] = "DB";
    ContextType["UI"] = "UI";
})(ContextType || (ContextType = {}));
class Context {
    constructor(id, type) {
        this.id = id;
        this.type = type;
    }
}

class Container {
}

const Injected = function () {
    return function (constructor) {
        // No runtime logic required.
    };
};
const Inject = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};

var __decorate$m = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let ContainerAccessor = class ContainerAccessor {
    getContainer(injectedObject) {
        const iocContainer = injectedObject.__container__;
        if (!iocContainer) {
            throw new Error('"container" is not set on injectable object.');
        }
        if (!(iocContainer instanceof Container)) {
            throw new Error('"container" property of injectable is not an' +
                'instance of @airport/direction-indicator Container');
        }
        return iocContainer;
    }
};
ContainerAccessor = __decorate$m([
    Injected()
], ContainerAccessor);

const directionIndicator = lib('direction-indicator');
const AUTOPILOT_API_LOADER = directionIndicator.token({
    class: null,
    interface: 'IAutopilotApiLoader',
    token: 'AUTOPILOT_API_LOADER'
});
const CONTAINER_ACCESSOR = directionIndicator.token({
    class: ContainerAccessor,
    interface: 'IContainerAccessor',
    token: 'CONTAINER_ACCESSOR'
});
directionIndicator.token({
    class: null,
    interface: 'IInterAppAPIClient',
    token: 'INTER_APP_API_CLIENT'
});

class ChildContainer extends Container {
    constructor(rootContainer, context) {
        super();
        this.rootContainer = rootContainer;
        this.context = context;
        // TODO: implement continuous upgrading
        // classes: any[]  = []
        // numPendingInits = 0
        // theObjects: any[]  = []
        this.objectMap = new Map();
    }
    doEventuallyGet(tokens, successCallback, errorCallback) {
        let { firstDiNotSetClass, firstMissingClassToken, objects } = this.doGetCore(tokens);
        if (firstMissingClassToken || firstDiNotSetClass) {
            setTimeout(() => {
                this.doEventuallyGet(tokens, successCallback, errorCallback);
            }, 100);
        }
        else {
            if (objects.length > 1) {
                successCallback(objects);
            }
            else {
                successCallback(objects[0]);
            }
        }
    }
    doGet(tokens, successCallback, errorCallback) {
        const { firstDiNotSetClass, firstMissingClassToken, objects } = this.doGetCore(tokens);
        if (firstDiNotSetClass) {
            console.log(`Dependency Injection is not ready for token ${firstMissingClassToken.getPath()}
			, class: ${firstDiNotSetClass.name}. Delaying injection by 100ms`);
            setTimeout(() => {
                this.doGet(tokens, successCallback, errorCallback);
            }, 100);
            return;
        }
        else if (objects.filter(object => object && !object.__initialized__).length) {
            const notInitializedObjectIndexes = objects.map((object, index) => object.__initialized__ ? -1 : index)
                .filter(index => index !== -1);
            const objectPaths = [];
            for (const index of notInitializedObjectIndexes) {
                objectPaths.push(tokens[index].getPath());
            }
            console.log(`Dependency Injection is not ready for tokens:
				 ${objectPaths.join('\n')}
			, these classes are not yet initialized, delaying injection by 100ms`);
            setTimeout(() => {
                this.doGet(tokens, successCallback, errorCallback);
            }, 100);
            return;
        }
        if (firstMissingClassToken) {
            const message = 'Dependency Injection could not find class for token: '
                + firstMissingClassToken.getPath();
            console.log(message);
            errorCallback(message);
        }
        else {
            if (objects.length > 1) {
                successCallback(objects);
            }
            else {
                successCallback(objects[0]);
            }
        }
    }
    doGetCore(tokens) {
        let firstMissingClassToken;
        let firstDiNotSetClass;
        const objects = tokens.map(token => {
            if (firstMissingClassToken || firstDiNotSetClass) {
                return;
            }
            let object = this.objectMap.get(token.descriptor.token);
            if (!object) {
                if (!this.rootContainer.isFramework && token.application.autopilot) {
                    object = this.getSync(AUTOPILOT_API_LOADER)
                        .loadApiAutopilot(token);
                }
                else {
                    // NOTE: object pooling is not supported, see RootContainer for why
                    // const rootObjectPool = this.rootContainer.objectPoolMap.get(token.descriptor.token);
                    // if (rootObjectPool && rootObjectPool.length) {
                    //     object = rootObjectPool.pop()
                    // } else {
                    const aClass = token.descriptor.class;
                    if (!aClass) {
                        firstMissingClassToken = token;
                        return;
                    }
                    if (aClass.diSet && !aClass.diSet()) {
                        firstMissingClassToken = token;
                        firstDiNotSetClass = aClass;
                        return;
                    }
                    object = new aClass();
                    this.setDependencyGetters(object, token);
                    // }
                }
                object.__container__ = this;
                this.objectMap.set(token.descriptor.token, object);
                if (!token.application.autopilot && object.init) {
                    const result = object.init();
                    if (result instanceof Promise) {
                        result.then(_ => {
                            object.__initialized__ = true;
                            console.log(`${token.getPath()} initialized.`);
                        });
                    }
                    else {
                        object.__initialized__ = true;
                        console.log(`${token.getPath()} initialized.`);
                    }
                }
                else {
                    object.__initialized__ = true;
                }
            }
            return object;
        });
        return {
            firstDiNotSetClass,
            firstMissingClassToken,
            objects
        };
    }
    manualInject(object, token) {
        object.__container__ = this;
        this.setDependencyGetters(object, token);
    }
    setDependencyGetters(object, token) {
        if (!token.dependencyConfiguration) {
            return;
        }
        const dependencyConfiguration = token.dependencyConfiguration;
        for (let propertyName in dependencyConfiguration) {
            delete object[propertyName];
            const dependencyToken = dependencyConfiguration[propertyName];
            Object.defineProperty(object, propertyName, {
                get() {
                    return this.__container__.getSync(dependencyToken);
                }
            });
            object['get' + propertyName + 'Async'] = async function () {
                return await this.__container__.get(dependencyToken);
            };
        }
    }
    async getByNames(domainName, applicationName, tokenInterface) {
        const injectionDomain = domain(domainName);
        if (!injectionDomain) {
            throw new Error(`Could nof find
	Domain:
		${domainName}
		`);
        }
        const application = domain(domainName).getApp(applicationName);
        if (!application) {
            throw new Error(`Could not find
	Domain:
		${domainName}
	Application:
		${applicationName}
		`);
        }
        const token = application.tokenMap.get(tokenInterface);
        if (!token) {
            throw new Error(`Could not find token: ${tokenInterface}
	in Domain:
		${domainName}
 	Application:
			${applicationName}
		`);
        }
        return await this.get(token);
    }
    get(...tokens) {
        return new Promise((resolve, reject) => {
            this.doGet(tokens, resolve, reject);
        });
    }
    eventuallyGet(...tokens) {
        return new Promise((resolve, reject) => {
            this.doEventuallyGet(tokens, resolve, reject);
        });
    }
    getSync(...tokens) {
        const { firstDiNotSetClass, firstMissingClassToken, objects } = this.doGetCore(tokens);
        if (firstMissingClassToken) {
            throw new Error('Dependency Injection could not find class for token: '
                + firstMissingClassToken.getPath());
        }
        else if (firstDiNotSetClass) {
            throw new Error('Dependency Injection is not ready for class: '
                + firstDiNotSetClass.name);
        }
        if (objects.length > 1) {
            return objects;
        }
        else {
            return objects[0];
        }
    }
}

class RootContainer extends Container {
    constructor() {
        super(...arguments);
        this.isFramework = false;
        this.dbContainerMap = new Map();
        this.uiContainers = new Set();
    }
    // NOTE: Object pooling is not supported because of possible callbacks
    // that are out of synchronous flow of a transaction.  Thus objects are
    // retained in the container even after the container is removed
    // in order to allow for transactionId reference
    // objectPoolMap: Map<string, any[]> = new Map();
    db(id = null) {
        let dbContainer = this.dbContainerMap.get(id);
        if (!dbContainer) {
            dbContainer = new ChildContainer(this, new Context(id, ContextType.DB));
            this.dbContainerMap.set(id, dbContainer);
        }
        return dbContainer;
    }
    remove(container) {
        if (!container) {
            return;
        }
        const dbContainer = this.dbContainerMap.get(container.context.id);
        if (dbContainer) {
            this.dbContainerMap.delete(container.context.id);
            // NOTE: objectPooling is not supported, see above
            // const objectTokens = dbContainer.objectMap.keys()
            // for (const objectToken of objectTokens) {
            // const object = dbContainer.objectMap.get(objectToken)
            // let objectPool = this.objectPoolMap.get(objectToken)
            // if (!objectPool) {
            //     objectPool = []
            //     this.objectPoolMap.set(objectToken, objectPool)
            // }
            // objectPool.push(object)
            // }
        }
        else {
            this.uiContainers.delete(container);
        }
    }
    ui(componentName) {
        const context = new Context(componentName, ContextType.UI);
        const childContainer = new ChildContainer(this, context);
        this.uiContainers.add(childContainer);
        return childContainer;
    }
}
const DEPENDENCY_INJECTION = new RootContainer();

class InversionOfControl {
    async get(...tokens) {
        return await DEPENDENCY_INJECTION.db().get(...tokens);
    }
    async eventuallyGet(...tokens) {
        return await DEPENDENCY_INJECTION.db().eventuallyGet(...tokens);
    }
    getSync(...tokens) {
        return DEPENDENCY_INJECTION.db().getSync(...tokens);
    }
}

/**
 * From:
 * http://js-bits.blogspot.com/2010/08/javascript-inheritance-done-right.html
 * Via:
 * https://stackoverflow.com/questions/6617780/how-to-call-parent-constructor
 */
function extend(base, sub, methods) {
    sub.prototype = Object.create(base.prototype);
    sub.prototype.constructor = sub;
    sub.base = base.prototype;
    // Copy the methods passed in to the prototype
    for (const name in methods) {
        sub.prototype[name] = methods[name];
    }
    // so we can define the constructor inline
    return sub;
}

if (typeof window !== 'undefined') {
    window.DEPENDENCY_INJECTION = DEPENDENCY_INJECTION;
    window.lib = lib;
    window.domain = domain;
}
const IOC = new InversionOfControl();

const applicationState = {
    api: null,
    application: null,
    appState: AppState.NOT_INITIALIED,
    domain: null,
    // FIXME: make this dynamic for web version (https://turbase.app), local version (https://localhost:PORT)
    // and debugging (http://localhost:3000)
    hostServer: 'http://localhost:3000',
    // FIXME: tie this in to the hostServer variable
    mainDomain: null,
    observableMessageMap: new Map(),
    pendingMessageMap: new Map(),
    messageCallback: null,
};

var __decorate$l = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let ApplicationStore = class ApplicationStore {
    constructor() {
        this.applicationState = applicationState;
    }
    get state() {
        return this.applicationState;
    }
};
ApplicationStore = __decorate$l([
    Injected()
], ApplicationStore);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function isFunction(value) {
    return typeof value === 'function';
}

function createErrorClass(createImpl) {
    var _super = function (instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}

var UnsubscriptionError = createErrorClass(function (_super) {
    return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors
            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
            : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
    };
});

function arrRemove(arr, item) {
    if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
    }
}

var Subscription = (function () {
    function Subscription(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._teardowns = null;
    }
    Subscription.prototype.unsubscribe = function () {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
            this.closed = true;
            var _parentage = this._parentage;
            if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                    try {
                        for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                            var parent_1 = _parentage_1_1.value;
                            parent_1.remove(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    _parentage.remove(this);
                }
            }
            var initialTeardown = this.initialTeardown;
            if (isFunction(initialTeardown)) {
                try {
                    initialTeardown();
                }
                catch (e) {
                    errors = e instanceof UnsubscriptionError ? e.errors : [e];
                }
            }
            var _teardowns = this._teardowns;
            if (_teardowns) {
                this._teardowns = null;
                try {
                    for (var _teardowns_1 = __values(_teardowns), _teardowns_1_1 = _teardowns_1.next(); !_teardowns_1_1.done; _teardowns_1_1 = _teardowns_1.next()) {
                        var teardown_1 = _teardowns_1_1.value;
                        try {
                            execTeardown(teardown_1);
                        }
                        catch (err) {
                            errors = errors !== null && errors !== void 0 ? errors : [];
                            if (err instanceof UnsubscriptionError) {
                                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                            }
                            else {
                                errors.push(err);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_teardowns_1_1 && !_teardowns_1_1.done && (_b = _teardowns_1.return)) _b.call(_teardowns_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (errors) {
                throw new UnsubscriptionError(errors);
            }
        }
    };
    Subscription.prototype.add = function (teardown) {
        var _a;
        if (teardown && teardown !== this) {
            if (this.closed) {
                execTeardown(teardown);
            }
            else {
                if (teardown instanceof Subscription) {
                    if (teardown.closed || teardown._hasParent(this)) {
                        return;
                    }
                    teardown._addParent(this);
                }
                (this._teardowns = (_a = this._teardowns) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
        }
    };
    Subscription.prototype._hasParent = function (parent) {
        var _parentage = this._parentage;
        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
    };
    Subscription.prototype._addParent = function (parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription.prototype._removeParent = function (parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
            this._parentage = null;
        }
        else if (Array.isArray(_parentage)) {
            arrRemove(_parentage, parent);
        }
    };
    Subscription.prototype.remove = function (teardown) {
        var _teardowns = this._teardowns;
        _teardowns && arrRemove(_teardowns, teardown);
        if (teardown instanceof Subscription) {
            teardown._removeParent(this);
        }
    };
    Subscription.EMPTY = (function () {
        var empty = new Subscription();
        empty.closed = true;
        return empty;
    })();
    return Subscription;
}());
var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
    return (value instanceof Subscription ||
        (value && 'closed' in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe)));
}
function execTeardown(teardown) {
    if (isFunction(teardown)) {
        teardown();
    }
    else {
        teardown.unsubscribe();
    }
}

var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: undefined,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false,
};

var timeoutProvider = {
    setTimeout: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) || setTimeout).apply(void 0, __spreadArray([], __read(args)));
    },
    clearTimeout: function (handle) {
        var delegate = timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: undefined,
};

function reportUnhandledError(err) {
    timeoutProvider.setTimeout(function () {
        {
            throw err;
        }
    });
}

function noop() { }

var context = null;
function errorContext(cb) {
    if (config.useDeprecatedSynchronousErrorHandling) {
        var isRoot = !context;
        if (isRoot) {
            context = { errorThrown: false, error: null };
        }
        cb();
        if (isRoot) {
            var _a = context, errorThrown = _a.errorThrown, error = _a.error;
            context = null;
            if (errorThrown) {
                throw error;
            }
        }
    }
    else {
        cb();
    }
}

var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
            _this.destination = destination;
            if (isSubscription(destination)) {
                destination.add(_this);
            }
        }
        else {
            _this.destination = EMPTY_OBSERVER;
        }
        return _this;
    }
    Subscriber.create = function (next, error, complete) {
        return new SafeSubscriber(next, error, complete);
    };
    Subscriber.prototype.next = function (value) {
        if (this.isStopped) ;
        else {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (this.isStopped) ;
        else {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (this.isStopped) ;
        else {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
            this.destination = null;
        }
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        try {
            this.destination.error(err);
        }
        finally {
            this.unsubscribe();
        }
    };
    Subscriber.prototype._complete = function () {
        try {
            this.destination.complete();
        }
        finally {
            this.unsubscribe();
        }
    };
    return Subscriber;
}(Subscription));
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var next;
        if (isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            (next = observerOrNext.next, error = observerOrNext.error, complete = observerOrNext.complete);
            var context_1;
            if (_this && config.useDeprecatedNextContext) {
                context_1 = Object.create(observerOrNext);
                context_1.unsubscribe = function () { return _this.unsubscribe(); };
            }
            else {
                context_1 = observerOrNext;
            }
            next = next === null || next === void 0 ? void 0 : next.bind(context_1);
            error = error === null || error === void 0 ? void 0 : error.bind(context_1);
            complete = complete === null || complete === void 0 ? void 0 : complete.bind(context_1);
        }
        _this.destination = {
            next: next ? wrapForErrorHandling(next) : noop,
            error: wrapForErrorHandling(error !== null && error !== void 0 ? error : defaultErrorHandler),
            complete: complete ? wrapForErrorHandling(complete) : noop,
        };
        return _this;
    }
    return SafeSubscriber;
}(Subscriber));
function wrapForErrorHandling(handler, instance) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            handler.apply(void 0, __spreadArray([], __read(args)));
        }
        catch (err) {
            {
                reportUnhandledError(err);
            }
        }
    };
}
function defaultErrorHandler(err) {
    throw err;
}
var EMPTY_OBSERVER = {
    closed: true,
    next: noop,
    error: defaultErrorHandler,
    complete: noop,
};

var observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();

function identity(x) {
    return x;
}

function pipeFromArray(fns) {
    if (fns.length === 0) {
        return identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}

var Observable = (function () {
    function Observable(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var _this = this;
        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
        errorContext(function () {
            var _a = _this, operator = _a.operator, source = _a.source;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        _this._subscribe(subscriber)
                    :
                        _this._trySubscribe(subscriber));
        });
        return subscriber;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscription;
            subscription = _this.subscribe(function (value) {
                try {
                    next(value);
                }
                catch (err) {
                    reject(err);
                    subscription === null || subscription === void 0 ? void 0 : subscription.unsubscribe();
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable.prototype[observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        return pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
    return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
    return (value && value instanceof Subscriber) || (isObserver(value) && isSubscription(value));
}

function hasLift(source) {
    return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
    return function (source) {
        if (hasLift(source)) {
            return source.lift(function (liftedSource) {
                try {
                    return init(liftedSource, this);
                }
                catch (err) {
                    this.error(err);
                }
            });
        }
        throw new TypeError('Unable to lift unknown Observable type');
    };
}

var OperatorSubscriber = (function (_super) {
    __extends(OperatorSubscriber, _super);
    function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
        var _this = _super.call(this, destination) || this;
        _this.onFinalize = onFinalize;
        _this._next = onNext
            ? function (value) {
                try {
                    onNext(value);
                }
                catch (err) {
                    destination.error(err);
                }
            }
            : _super.prototype._next;
        _this._error = onError
            ? function (err) {
                try {
                    onError(err);
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._error;
        _this._complete = onComplete
            ? function () {
                try {
                    onComplete();
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._complete;
        return _this;
    }
    OperatorSubscriber.prototype.unsubscribe = function () {
        var _a;
        var closed = this.closed;
        _super.prototype.unsubscribe.call(this);
        !closed && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
    };
    return OperatorSubscriber;
}(Subscriber));

var ObjectUnsubscribedError = createErrorClass(function (_super) {
    return function ObjectUnsubscribedErrorImpl() {
        _super(this);
        this.name = 'ObjectUnsubscribedError';
        this.message = 'object unsubscribed';
    };
});

var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.closed = false;
        _this.observers = [];
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype._throwIfClosed = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
    };
    Subject.prototype.next = function (value) {
        var _this = this;
        errorContext(function () {
            var e_1, _a;
            _this._throwIfClosed();
            if (!_this.isStopped) {
                var copy = _this.observers.slice();
                try {
                    for (var copy_1 = __values(copy), copy_1_1 = copy_1.next(); !copy_1_1.done; copy_1_1 = copy_1.next()) {
                        var observer = copy_1_1.value;
                        observer.next(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (copy_1_1 && !copy_1_1.done && (_a = copy_1.return)) _a.call(copy_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        });
    };
    Subject.prototype.error = function (err) {
        var _this = this;
        errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.hasError = _this.isStopped = true;
                _this.thrownError = err;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().error(err);
                }
            }
        });
    };
    Subject.prototype.complete = function () {
        var _this = this;
        errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.isStopped = true;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().complete();
                }
            }
        });
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = this.closed = true;
        this.observers = null;
    };
    Object.defineProperty(Subject.prototype, "observed", {
        get: function () {
            var _a;
            return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
        },
        enumerable: false,
        configurable: true
    });
    Subject.prototype._trySubscribe = function (subscriber) {
        this._throwIfClosed();
        return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._checkFinalizedStatuses(subscriber);
        return this._innerSubscribe(subscriber);
    };
    Subject.prototype._innerSubscribe = function (subscriber) {
        var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
        return hasError || isStopped
            ? EMPTY_SUBSCRIPTION
            : (observers.push(subscriber), new Subscription(function () { return arrRemove(observers, subscriber); }));
    };
    Subject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped) {
            subscriber.complete();
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable));
var AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject.prototype.error = function (err) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject.prototype.complete = function () {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var _a, _b;
        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject;
}(Subject));

var BehaviorSubject = (function (_super) {
    __extends(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        enumerable: false,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        !subscription.closed && subscriber.next(this._value);
        return subscription;
    };
    BehaviorSubject.prototype.getValue = function () {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
        if (hasError) {
            throw thrownError;
        }
        this._throwIfClosed();
        return _value;
    };
    BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, (this._value = value));
    };
    return BehaviorSubject;
}(Subject));

var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });

function isPromise(value) {
    return isFunction(value === null || value === void 0 ? void 0 : value.then);
}

function isInteropObservable(input) {
    return isFunction(input[observable]);
}

function isAsyncIterable(obj) {
    return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}

function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}

function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
var iterator = getSymbolIterator();

function isIterable(input) {
    return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}

function readableStreamLikeToAsyncGenerator(readableStream) {
    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
        var reader, _a, value, done;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reader = readableStream.getReader();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 9, 10]);
                    _b.label = 2;
                case 2:
                    return [4, __await(reader.read())];
                case 3:
                    _a = _b.sent(), value = _a.value, done = _a.done;
                    if (!done) return [3, 5];
                    return [4, __await(void 0)];
                case 4: return [2, _b.sent()];
                case 5: return [4, __await(value)];
                case 6: return [4, _b.sent()];
                case 7:
                    _b.sent();
                    return [3, 2];
                case 8: return [3, 10];
                case 9:
                    reader.releaseLock();
                    return [7];
                case 10: return [2];
            }
        });
    });
}
function isReadableStreamLike(obj) {
    return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}

function innerFrom(input) {
    if (input instanceof Observable) {
        return input;
    }
    if (input != null) {
        if (isInteropObservable(input)) {
            return fromInteropObservable(input);
        }
        if (isArrayLike(input)) {
            return fromArrayLike(input);
        }
        if (isPromise(input)) {
            return fromPromise(input);
        }
        if (isAsyncIterable(input)) {
            return fromAsyncIterable(input);
        }
        if (isIterable(input)) {
            return fromIterable(input);
        }
        if (isReadableStreamLike(input)) {
            return fromReadableStreamLike(input);
        }
    }
    throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
    return new Observable(function (subscriber) {
        var obs = obj[observable]();
        if (isFunction(obs.subscribe)) {
            return obs.subscribe(subscriber);
        }
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    });
}
function fromArrayLike(array) {
    return new Observable(function (subscriber) {
        for (var i = 0; i < array.length && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    });
}
function fromPromise(promise) {
    return new Observable(function (subscriber) {
        promise
            .then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, reportUnhandledError);
    });
}
function fromIterable(iterable) {
    return new Observable(function (subscriber) {
        var e_1, _a;
        try {
            for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                var value = iterable_1_1.value;
                subscriber.next(value);
                if (subscriber.closed) {
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        subscriber.complete();
    });
}
function fromAsyncIterable(asyncIterable) {
    return new Observable(function (subscriber) {
        process(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
    });
}
function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function () {
        var value, e_2_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 11]);
                    asyncIterable_1 = __asyncValues(asyncIterable);
                    _b.label = 1;
                case 1: return [4, asyncIterable_1.next()];
                case 2:
                    if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
                    value = asyncIterable_1_1.value;
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return [2];
                    }
                    _b.label = 3;
                case 3: return [3, 1];
                case 4: return [3, 11];
                case 5:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 11];
                case 6:
                    _b.trys.push([6, , 9, 10]);
                    if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
                    return [4, _a.call(asyncIterable_1)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3, 10];
                case 9:
                    if (e_2) throw e_2.error;
                    return [7];
                case 10: return [7];
                case 11:
                    subscriber.complete();
                    return [2];
            }
        });
    });
}

function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
    if (delay === void 0) { delay = 0; }
    if (repeat === void 0) { repeat = false; }
    var scheduleSubscription = scheduler.schedule(function () {
        work();
        if (repeat) {
            parentSubscription.add(this.schedule(null, delay));
        }
        else {
            this.unsubscribe();
        }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
        return scheduleSubscription;
    }
}

function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return operate(function (source, subscriber) {
        source.subscribe(new OperatorSubscriber(subscriber, function (value) { return executeSchedule(subscriber, scheduler, function () { return subscriber.next(value); }, delay); }, function () { return executeSchedule(subscriber, scheduler, function () { return subscriber.complete(); }, delay); }, function (err) { return executeSchedule(subscriber, scheduler, function () { return subscriber.error(err); }, delay); }));
    });
}

function subscribeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return operate(function (source, subscriber) {
        subscriber.add(scheduler.schedule(function () { return source.subscribe(subscriber); }, delay));
    });
}

function scheduleObservable(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}

function schedulePromise(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}

function scheduleArray(input, scheduler) {
    return new Observable(function (subscriber) {
        var i = 0;
        return scheduler.schedule(function () {
            if (i === input.length) {
                subscriber.complete();
            }
            else {
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    this.schedule();
                }
            }
        });
    });
}

function scheduleIterable(input, scheduler) {
    return new Observable(function (subscriber) {
        var iterator$1;
        executeSchedule(subscriber, scheduler, function () {
            iterator$1 = input[iterator]();
            executeSchedule(subscriber, scheduler, function () {
                var _a;
                var value;
                var done;
                try {
                    (_a = iterator$1.next(), value = _a.value, done = _a.done);
                }
                catch (err) {
                    subscriber.error(err);
                    return;
                }
                if (done) {
                    subscriber.complete();
                }
                else {
                    subscriber.next(value);
                }
            }, 0, true);
        });
        return function () { return isFunction(iterator$1 === null || iterator$1 === void 0 ? void 0 : iterator$1.return) && iterator$1.return(); };
    });
}

function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    return new Observable(function (subscriber) {
        executeSchedule(subscriber, scheduler, function () {
            var iterator = input[Symbol.asyncIterator]();
            executeSchedule(subscriber, scheduler, function () {
                iterator.next().then(function (result) {
                    if (result.done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(result.value);
                    }
                });
            }, 0, true);
        });
    });
}

function scheduleReadableStreamLike(input, scheduler) {
    return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}

function scheduled(input, scheduler) {
    if (input != null) {
        if (isInteropObservable(input)) {
            return scheduleObservable(input, scheduler);
        }
        if (isArrayLike(input)) {
            return scheduleArray(input, scheduler);
        }
        if (isPromise(input)) {
            return schedulePromise(input, scheduler);
        }
        if (isAsyncIterable(input)) {
            return scheduleAsyncIterable(input, scheduler);
        }
        if (isIterable(input)) {
            return scheduleIterable(input, scheduler);
        }
        if (isReadableStreamLike(input)) {
            return scheduleReadableStreamLike(input, scheduler);
        }
    }
    throw createInvalidObservableTypeError(input);
}

function from(input, scheduler) {
    return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}

function map(project, thisArg) {
    return operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            subscriber.next(project.call(thisArg, value, index++));
        }));
    });
}

function distinctUntilChanged(comparator, keySelector) {
    if (keySelector === void 0) { keySelector = identity; }
    comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
    return operate(function (source, subscriber) {
        var previousKey;
        var first = true;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            var currentKey = keySelector(value);
            if (first || !comparator(previousKey, currentKey)) {
                first = false;
                previousKey = currentKey;
                subscriber.next(value);
            }
        }));
    });
}
function defaultCompare(a, b) {
    return a === b;
}

var __decorate$k = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let SelectorManager = class SelectorManager {
    createSelector(...args) {
        if (args.length < 2 || args.length > 6) {
            throw new Error(`Invalid createSelector call, Expecting 1 to 5 selectors and a callback.`);
        }
        const inputSelectors = args.slice(0, args.length - 1);
        const callback = args[args.length - 1];
        let sourceObservable;
        if (inputSelectors.length > 1) {
            // TODO: check if this will work
            sourceObservable = from(inputSelectors.map(selector => selector.observable));
        }
        else {
            sourceObservable = inputSelectors[0].observable;
        }
        let observable = sourceObservable.pipe(
        // share() TODO: implement once RxJs support is added
        distinctUntilChanged(), map(value => callback(value)));
        return this.getSelector(observable);
    }
    createRootSelector(stateObservable) {
        return this.getSelector(stateObservable);
    }
    getSelector(observable) {
        let selector = (function (
        // otherStateObservable?: Observable<SV>
        ) {
            let currentValue;
            observable.subscribe(value => currentValue = value).unsubscribe();
            return currentValue;
        });
        selector.observable = observable;
        return selector;
    }
};
SelectorManager = __decorate$k([
    Injected()
], SelectorManager);

const apron = lib('apron');
const APPLICATION_LOADER = apron.token({
    class: null,
    interface: 'IApplicationLoader',
    token: 'APPLICATION_LOADER'
});
apron.token({
    class: ApplicationStore,
    interface: 'IApplicationStore',
    token: 'APPLICATION_STORE'
});
apron.token({
    class: null,
    interface: 'ILocalAPIServer',
    token: 'LOCAL_API_SERVER'
});
const SELECTOR_MANAGER = apron.token({
    class: SelectorManager,
    interface: 'ISelectorManager',
    token: 'SELECTOR_MANAGER'
});

var ApiObjectKind;
(function (ApiObjectKind) {
    ApiObjectKind["ARRAY"] = "ARRAY";
    ApiObjectKind["BOOLEAN"] = "BOOLEAN";
    ApiObjectKind["BOOLEAN_VALUE"] = "BOOLEAN_VALUE";
    ApiObjectKind["DATE"] = "DATE";
    ApiObjectKind["DB_ENTITY"] = "DB_ENTITY";
    ApiObjectKind["NUMBER"] = "NUMBER";
    ApiObjectKind["NUMBER_VALUE"] = "NUMBER_VALUE";
    ApiObjectKind["OBJECT"] = "OBJECT";
    ApiObjectKind["STRING"] = "STRING";
    ApiObjectKind["STRING_VALUE"] = "STRING_VALUE";
    ApiObjectKind["TYPE_UNION"] = "TYPE_UNION";
})(ApiObjectKind || (ApiObjectKind = {}));

const checkIn = lib('check-in');
const API_REGISTRY = checkIn.token({
    class: null,
    interface: 'IApiRegistry',
    token: 'API_REGISTRY'
});
checkIn.token({
    class: null,
    interface: 'IApiValidator',
    token: 'API_VALIDATOR'
});
API_REGISTRY.setDependencies({
    containerAccessor: CONTAINER_ACCESSOR
});

/**
 * Created by Papa on 4/16/2017.
 */
var AirEntityType;
(function (AirEntityType) {
    AirEntityType["NOT_AIR_ENTITY"] = "NOT_AIR_ENTITY";
    AirEntityType["AIR_ENTITY"] = "AIR_ENTITY";
})(AirEntityType || (AirEntityType = {}));

/**
 * Column keys.
 */
var column;
(function (column) {
    /**
     * Name property of the column.
     * @type {string}
     */
    column.NAME = 'name';
    (function (type) {
        type.ANY = 'any';
        type.BOOLEAN = 'boolean';
        type.DATE = 'Date';
        type.NUMBER = 'number';
        type.STRING = 'string';
    })(column.type || (column.type = {}));
})(column || (column = {}));
/**
 * File level keys.
 */
var file;
(function (file) {
    file.ENTITY = 'Entity';
    file.TABLE = 'Table';
})(file || (file = {}));
/**
 * Entity configuration keys.
 */
var entity;
(function (entity) {
    entity.DATABASES = 'databases';
})(entity || (entity = {}));
/**
 * Foreign Key configuration keys.
 */
var foreignkey;
(function (foreignkey) {
    foreignkey.DEFINITION = 'foreignKeyDefinition';
    foreignkey.NAME = 'name';
    foreignkey.VALUE = 'value';
})(foreignkey || (foreignkey = {}));
/**
 * Index configuration keys.
 */
var index;
(function (index) {
    index.COLUMN_LIST = 'columnList';
    index.NAME = 'name';
    index.UNIQUE = 'unique';
})(index || (index = {}));
/**
 * JoinColumn configuration keys.
 */
var joincolumn;
(function (joincolumn) {
    joincolumn.FOREIGN_KEY = 'foreignKey';
    joincolumn.REFERENCED_COLUMN_NAME = 'referencedColumnName';
    joincolumn.VALUE = 'value';
})(joincolumn || (joincolumn = {}));
/**
 * Property annotation keys.
 */
var property;
(function (property) {
    property.COLUMN = 'Column';
    property.ENUM_TYPE = 'Enum';
    property.ID = 'Id';
    property.JOIN_COLUMN = 'JoinColumn';
    property.JOIN_COLUMNS = 'JoinColumns';
    property.JSON_TYPE = 'Json';
    property.MANY_TO_ONE = 'ManyToOne';
    property.ONE_TO_MANY = 'OneToMany';
    // R_JOIN_COLUMN(s) are not needed since Repository relations are now
    // standardized - simple (@ManyToOne) and (@OneToMany) suffice.
    // export const R_JOIN_COLUMN    = 'RJoinColumn';
    // export const R_JOIN_COLUMNS   = 'RJoinColumns';
    property.SUB_QUERY = 'SubQuery';
    // export const WHERE_JOIN_TABLE = 'WhereJoinTable';
})(property || (property = {}));
/**
 * OneToMany configuration keys.
 */
var onetomany;
(function (onetomany) {
    onetomany.MAPPED_BY = 'mappedBy';
})(onetomany || (onetomany = {}));
/**
 * Table configuration keys.
 */
var table;
(function (table) {
    table.INDEXES = 'indexes';
    table.NAME = 'name';
    table.PRIMARY_KEY = 'primaryKey';
    table.APPLICATION = 'application';
})(table || (table = {}));
/**
 * Name of the RepositoryId column
 * @type {string}
 */
var airEntity;
(function (airEntity) {
    airEntity.ACTOR_LID = 'ACTOR_LID';
    airEntity.ACTOR_RECORD_ID = 'ACTOR_RECORD_ID';
    airEntity.ENTITY_NAME = 'AirEntity';
    airEntity.FOREIGN_KEY = 'REPOSITORY_LID';
    airEntity.LOCAL_ENTITY_NAME = 'LocalAirEntity';
    airEntity.REPOSITORY_LID = 'REPOSITORY_LID';
    airEntity.ORIGINAL_ACTOR_ID = 'ORIGINAL_ACTOR_LID';
    airEntity.ORIGINAL_ACTOR_RECORD_ID = 'ORIGINAL_ACTOR_RECORD_ID';
    airEntity.ORIGINAL_REPOSITORY_ID = 'ORIGINAL_REPOSITORY_LID';
    airEntity.SYS_WIDE_OP_ID_APPLICATION = 'air____at_airport_slash_airport_dash_code';
    airEntity.SYS_WIDE_OP_ID_ENTITY = 'SystemWideOperationId';
    airEntity.systemWideOperationId = 'systemWideOperationId';
    airEntity.SYSTEM_WIDE_OPERATION_ID = 'SYSTEM_WIDE_OPERATION_LID';
})(airEntity || (airEntity = {}));

/**
 * SQL Join contentType.
 */
var JoinType;
(function (JoinType) {
    JoinType["FULL_JOIN"] = "FULL_JOIN";
    JoinType["INNER_JOIN"] = "INNER_JOIN";
    JoinType["LEFT_JOIN"] = "LEFT_JOIN";
    JoinType["RIGHT_JOIN"] = "RIGHT_JOIN";
})(JoinType || (JoinType = {}));
/**
 * Type of Entity Relation
 */
var EntityRelationType;
(function (EntityRelationType) {
    EntityRelationType["ONE_TO_MANY"] = "ONE_TO_MANY";
    EntityRelationType["MANY_TO_ONE"] = "MANY_TO_ONE";
})(EntityRelationType || (EntityRelationType = {}));
/**
 * Serialized relation contentType.
 */
var JSONRelationType;
(function (JSONRelationType) {
    // Join of an entity with the ON clause
    JSONRelationType["ENTITY_JOIN_ON"] = "ENTITY_JOIN_ON";
    // Join of an entity via a application relation
    JSONRelationType["ENTITY_APPLICATION_RELATION"] = "ENTITY_APPLICATION_RELATION";
    // The root entity in a join
    JSONRelationType["ENTITY_ROOT"] = "ENTITY_ROOT";
    // Join of a sub-query (with the ON clause)
    JSONRelationType["SUB_QUERY_JOIN_ON"] = "SUB_QUERY_JOIN_ON";
    // The root sub-query in a join
    JSONRelationType["SUB_QUERY_ROOT"] = "SUB_QUERY_ROOT";
})(JSONRelationType || (JSONRelationType = {}));

/**
 * Order of a sorted field, as specified in the ORDER BY clause.
 */
var SortOrder;
(function (SortOrder) {
    SortOrder["ASCENDING"] = "ASCENDING";
    SortOrder["DESCENDING"] = "DESCENDING";
})(SortOrder || (SortOrder = {}));

/**
 * Extracted from http://www.w3schools.com/sql/sql_functions.asp
 */
var SqlFunction;
(function (SqlFunction) {
    // SQL Aggregate Functions
    // SQL aggregate functions return a single value, calculated from values in a column.
    // Useful Aggregate functions:
    SqlFunction["ABS"] = "ABS";
    SqlFunction["AVG"] = "AVG";
    SqlFunction["COUNT"] = "COUNT";
    //FIRST, // not in SqLite: Returns the first value
    //LAST, // not in SqLite: Returns the last value
    SqlFunction["MAX"] = "MAX";
    SqlFunction["MIN"] = "MIN";
    SqlFunction["SUM"] = "SUM";
    //SQL Scalar functions
    //SQL scalar functions return a single value, based on the input value.
    // Useful scalar functions:
    SqlFunction["UCASE"] = "UCASE";
    SqlFunction["LCASE"] = "LCASE";
    SqlFunction["MID"] = "MID";
    SqlFunction["LEN"] = "LEN";
    SqlFunction["ROUND"] = "ROUND";
    SqlFunction["NOW"] = "NOW";
    SqlFunction["FORMAT"] = "FORMAT";
    // Added
    SqlFunction["REPLACE"] = "REPLACE";
    SqlFunction["TRIM"] = "TRIM";
    // Other
    SqlFunction["DISTINCT"] = "DISTINCT";
    SqlFunction["EXISTS"] = "EXISTS";
    // Algebra Operators
    SqlFunction["DIVIDE"] = "DIVIDE";
    SqlFunction["MINUS"] = "MINUS";
    SqlFunction["MODULUS"] = "MODULUS";
    SqlFunction["MULTIPLY"] = "MULTIPLY";
    SqlFunction["PLUS"] = "PLUS";
    // Concatenate '||' functions
    SqlFunction["CONCATENATE"] = "CONCATENATE";
    // Other functions
    SqlFunction["COALESCE"] = "COALESCE";
})(SqlFunction || (SqlFunction = {}));

/**
 * All possible types of serialized JSON clauses.
 */
var JSONClauseObjectType;
(function (JSONClauseObjectType) {
    JSONClauseObjectType["FIELD"] = "FIELD";
    JSONClauseObjectType["FIELD_FUNCTION"] = "FIELD_FUNCTION";
    JSONClauseObjectType["FIELD_QUERY"] = "FIELD_QUERY";
    JSONClauseObjectType["DISTINCT_FUNCTION"] = "DISTINCT_FUNCTION";
    JSONClauseObjectType["EXISTS_FUNCTION"] = "EXISTS_FUNCTION";
    JSONClauseObjectType["MANY_TO_ONE_RELATION"] = "MANY_TO_ONE_RELATION"; // A many-to-one relation (used in a query)
})(JSONClauseObjectType || (JSONClauseObjectType = {}));
/**
 * Types of data
 */
var SQLDataType;
(function (SQLDataType) {
    // Allowing ANY allows developers to de-type their data
    SQLDataType["ANY"] = "ANY";
    SQLDataType["BOOLEAN"] = "BOOLEAN";
    SQLDataType["DATE"] = "DATE";
    // Allowing JSON allows developers to de-normalize their data
    SQLDataType["JSON"] = "JSON";
    SQLDataType["NUMBER"] = "NUMBER";
    SQLDataType["STRING"] = "STRING";
})(SQLDataType || (SQLDataType = {}));

var EntityState;
(function (EntityState) {
    EntityState["CREATE"] = "CREATE";
    EntityState["DATE"] = "DATE";
    EntityState["DELETE"] = "DELETE";
    // Originally it was PARENT_SCHEMA_ID and was meant for @ManyToOne() references
    // when nothing is returned except for the id fields of the relation, however
    // this schenario was sufficiently covered by STUB - id's only stub.  Now it's
    // PARENT_SCHEMA_ID and currently used only for save operations
    // when the entity referenced via the relation belongs to another application.
    // This is because save does not allow to peristance of records across application
    // boundaries (that should be done via an @Api() which will run validation and
    // other logic).
    // In that case we want to keep the ID of the record from another application
    // so that it can be saved in the record of the current application that is
    // referencing it.
    EntityState["PARENT_SCHEMA_ID"] = "PARENT_SCHEMA_LID";
    // A "Pass through object" is an existing that is present in the object graph
    // but no operations are performed on it
    EntityState["PASS_THROUGH"] = "PASS_THROUGH";
    // An "Id's only" stub
    EntityState["STUB"] = "STUB";
    EntityState["UPDATE"] = "UPDATE";
    // Json fields promote application de-normalization and a currently not implemented
    // except for internal APIs
    // RESULT_JSON = 'RESULT_JSON',
    // RESULT_JSON_ARRAY = 'RESULT_JSON_ARRAY'
})(EntityState || (EntityState = {}));

/**
 * Category of a SQL contentType
 */
var OperationCategory;
(function (OperationCategory) {
    OperationCategory["BOOLEAN"] = "BOOLEAN";
    OperationCategory["DATE"] = "DATE";
    OperationCategory["FUNCTION"] = "FUNCTION";
    OperationCategory["LOGICAL"] = "LOGICAL";
    OperationCategory["NUMBER"] = "NUMBER";
    OperationCategory["STRING"] = "STRING";
    OperationCategory["UNTYPED"] = "UNTYPED"; // Operation on an untyped field
})(OperationCategory || (OperationCategory = {}));
var SqlOperator;
(function (SqlOperator) {
    SqlOperator["AND"] = "AND";
    SqlOperator["EQUALS"] = "EQUALS";
    SqlOperator["EXISTS"] = "EXISTS";
    SqlOperator["GREATER_THAN"] = "GREATER_THAN";
    SqlOperator["GREATER_THAN_OR_EQUALS"] = "GREATER_THAN_OR_EQUALS";
    SqlOperator["IN"] = "IN";
    SqlOperator["IS_NOT_NULL"] = "IS_NOT_NULL";
    SqlOperator["IS_NULL"] = "IS_NULL";
    SqlOperator["LESS_THAN"] = "LESS_THAN";
    SqlOperator["LESS_THAN_OR_EQUALS"] = "LESS_THAN_OR_EQUALS";
    SqlOperator["LIKE"] = "LIKE";
    SqlOperator["OR"] = "OR";
    SqlOperator["NOT"] = "NOT";
    SqlOperator["NOT_EQUALS"] = "NOT_EQUALS";
    SqlOperator["NOT_IN"] = "NOT_IN";
})(SqlOperator || (SqlOperator = {}));
var CRUDOperation;
(function (CRUDOperation) {
    CRUDOperation["CREATE"] = "CREATE";
    CRUDOperation["READ"] = "READ";
    CRUDOperation["UPDATE"] = "UPDATE";
    CRUDOperation["DELETE"] = "DELETE";
})(CRUDOperation || (CRUDOperation = {}));

var TransactionType;
(function (TransactionType) {
    TransactionType["LOCAL"] = "LOCAL";
    TransactionType["REMOTE_SYNC"] = "REMOTE_SYNC";
})(TransactionType || (TransactionType = {}));

var ChangeType;
(function (ChangeType) {
    ChangeType["DELETE_ROWS"] = "DELETE_ROWS";
    ChangeType["INSERT_VALUES"] = "INSERT_VALUES";
    ChangeType["UPDATE_ROWS"] = "UPDATE_ROWS";
})(ChangeType || (ChangeType = {}));

/**
 * Possible distribution strategies for Change List Federations.
 *
 * A common (and only currently supported) basic setup:
 *
 * There is always a Single Shared Store (S3).
 * There are always at least one or more 'Personal' Stores.
 *
 * The stores communicate via servers that propagate data from
 * personal stores to the shared store.
 *
 * What differs is how this propagation is accomplished.
 *
 * In the future, we'll add a truly distributed setup, without any S3s.
 */
var DistributionStrategy;
(function (DistributionStrategy) {
    /**
     *  The server is aware of all Personal Stores and it
     *  subscribes to any possible changes in any of these stores.
     *  It is the server's responsibility to update the S3.
     */
    DistributionStrategy["S3_SECURE_POLL"] = "S3_SECURE_POLL";
    /**
     * There is no need for a server, all clients are aware of S3
     * and are responsible for pushing their changes to it.
     */
    DistributionStrategy["S3_DISTIBUTED_PUSH"] = "S3_DISTIBUTED_PUSH";
})(DistributionStrategy || (DistributionStrategy = {}));

var QueryType;
(function (QueryType) {
    QueryType["DDL"] = "DDL";
    QueryType["SELECT"] = "SELECT";
    QueryType["MUTATE"] = "MUTATE";
})(QueryType || (QueryType = {}));

var PlatformType;
(function (PlatformType) {
    PlatformType["GOOGLE_DOCS"] = "GOOGLE_DOCS";
    PlatformType["IN_MEMORY"] = "IN_MEMORY";
    PlatformType["OFFLINE"] = "OFFLINE";
    PlatformType["STUB"] = "STUB";
})(PlatformType || (PlatformType = {}));

var StoreType;
(function (StoreType) {
    StoreType["COCKROACHDB"] = "COCKROACHDB";
    StoreType["MYSQL"] = "MYSQL";
    StoreType["POSTGRESQL"] = "POSTGRESQL";
    StoreType["REMOTE"] = "REMOTE";
    StoreType["SQLITE"] = "SQLITE";
    StoreType["SQLJS"] = "SQLJS";
    StoreType["WEB_SQL"] = "WEB_SQL";
})(StoreType || (StoreType = {}));
var IdGeneration;
(function (IdGeneration) {
    IdGeneration["ENTITY_CHANGE_ID"] = "ENTITY_CHANGE_LID";
})(IdGeneration || (IdGeneration = {}));

var JsonStatementType;
(function (JsonStatementType) {
    JsonStatementType["ENTITY_QUERY"] = "ENTITY_QUERY";
    JsonStatementType["NON_ENTITY_QUERY"] = "NON_ENTITY_QUERY";
})(JsonStatementType || (JsonStatementType = {}));

var QueryResultType;
(function (QueryResultType) {
    // Ordered query result with bridging for all MtOs and OtM
    QueryResultType["ENTITY_GRAPH"] = "ENTITY_GRAPH";
    // Ordered query result, with objects grouped hierarchically by entity
    QueryResultType["ENTITY_TREE"] = "ENTITY_TREE";
    // Ordered query result, with objects grouped hierarchically by mapping
    QueryResultType["TREE"] = "TREE";
    // Flat array query result, with no forced ordering or grouping
    QueryResultType["SHEET"] = "SHEET";
    // A single field query result, with no forced ordering or grouping
    QueryResultType["FIELD"] = "FIELD";
    // Raw result, returned by a SQL string query
    QueryResultType["RAW"] = "RAW";
})(QueryResultType || (QueryResultType = {}));

var OperationType;
(function (OperationType) {
    OperationType["DELETE"] = "DELETE";
    OperationType["FIND_ONE_GRAPH"] = "FIND_ONE_GRAPH";
    OperationType["FIND_ONE_TREE"] = "FIND_ONE_TREE";
    OperationType["FIND_GRAPH"] = "FIND_GRAPH";
    OperationType["FIND_TREE"] = "FIND_TREE";
    OperationType["SAVE"] = "SAVE";
    OperationType["SEARCH_ONE_GRAPH"] = "SEARCH_ONE_GRAPH";
    OperationType["SEARCH_ONE_TREE"] = "SEARCH_ONE_TREE";
    OperationType["SEARCH_GRAPH"] = "SEARCH_GRAPH";
    OperationType["SEARCH_TREE"] = "SEARCH_TREE";
})(OperationType || (OperationType = {}));
var QueryInputKind;
(function (QueryInputKind) {
    QueryInputKind["PARAMETER"] = "PARAMETER";
    QueryInputKind["Q"] = "Q";
    QueryInputKind["QENTITY"] = "QENTITY";
})(QueryInputKind || (QueryInputKind = {}));
var QueryParameterType;
(function (QueryParameterType) {
    QueryParameterType["BOOLEAN"] = "BOOLEAN";
    QueryParameterType["DATE"] = "DATE";
    QueryParameterType["NUMBER"] = "NUMBER";
    QueryParameterType["STRING"] = "STRING";
})(QueryParameterType || (QueryParameterType = {}));

var ApplicationStatus;
(function (ApplicationStatus) {
    ApplicationStatus["CURRENT"] = "CURRENT";
    ApplicationStatus["MISSING"] = "MISSING";
    ApplicationStatus["NEEDS_UPGRADES"] = "NEEDS_UPGRADES";
    ApplicationStatus["STUB"] = "STUB";
})(ApplicationStatus || (ApplicationStatus = {}));

const INTERNAL_DOMAIN = 'internal://domain';

var __decorate$j = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let DbApplicationUtils = class DbApplicationUtils {
    getFullApplication_Name({ domain, name, }) {
        if (domain.name) {
            domain = domain.name;
        }
        return this.getFullApplication_NameFromDomainAndName(domain, name);
    }
    getFullApplication_NameFromDomainAndName(domainName, applicationName) {
        if (domainName.indexOf('___') > -1) {
            throw new Error('Domain Name cannot contain "___" (3 consecutive underscores) in it.');
        }
        if (domainName.endsWith('.')
            || domainName.endsWith('-')
            || domainName.endsWith(':')
            || domainName.endsWith('__')) {
            throw new Error('Domain Name cannot end with ".", "-", ":" or "__"');
        }
        const domainPrefix = domainName
            .replace(/\./g, '_dot_')
            .replace(/-/g, '_dash_')
            .replace(/:/g, '_colon_');
        if (domainPrefix.indexOf('___') > -1) {
            throw new Error('Domain Name cannot have with ".", "-", ":", or "_" right next to each other.');
        }
        if (applicationName.indexOf('_') > -1) {
            throw new Error('Application Name cannot contain "_" in it.');
        }
        if (applicationName.indexOf('@') !== applicationName.lastIndexOf('@')) {
            throw new Error('Application Name cannot have more than one "@" in it.');
        }
        if (applicationName.indexOf('@') > 0) {
            throw new Error('Application Name cannot contain "@" after the first character in it.');
        }
        if (applicationName.indexOf('/') !== applicationName.lastIndexOf('/')) {
            throw new Error('Application Name cannot have more than one "/" in it.');
        }
        const applicationPrefix = applicationName
            .replace(/@/g, '_at_')
            .replace(/\//g, '_slash_')
            .replace(/-/g, '_dash_');
        if (applicationPrefix.endsWith('_')) {
            throw new Error('Application Name cannot end with "@", "/" or "."');
        }
        if (applicationPrefix.indexOf('___') > -1) {
            throw new Error('Application Name cannot have with "@", "/", "." or "_" right next to each other.');
        }
        let fullApplication_Name = `${domainPrefix}___${applicationPrefix}`;
        if (fullApplication_Name.endsWith('_dash_runtime')) {
            fullApplication_Name = fullApplication_Name.substring(0, fullApplication_Name.length - 13);
        }
        return fullApplication_Name;
    }
    getSequenceName(prefixedTableName, columnName) {
        return `${prefixedTableName}_${columnName}__SEQUENCE`;
    }
};
DbApplicationUtils = __decorate$j([
    Injected()
], DbApplicationUtils);

var BlockSyncStatus;
(function (BlockSyncStatus) {
    // Sync request has been sent but no reply has come yet
    BlockSyncStatus["SYNCHRONIZING"] = "SYNCHRONIZING";
    // Sync has been acknowledged by the AGT
    BlockSyncStatus["SYNCHRONIZED"] = "SYNCHRONIZED";
    // Sync has not been acked by AGT so, requesting sync status from AGT
    BlockSyncStatus["REQUESTING_SYNC_STATUS"] = "REQUESTING_SYNC_STATUS";
    /*
       Do not re-sync until AGT starts responds with a request for more data.
       NOTE: no need of a separate status, state is maintained on SharingNode level.
     */
    // RESYNC_SUSPENDED = 'RESYNC_SUSPENDED',
    // AGT requested re-sync for this block, send it again
    BlockSyncStatus["RESYNC_REQUESTED"] = "RESYNC_REQUESTED";
})(BlockSyncStatus || (BlockSyncStatus = {}));
var RepositorySyncStatus;
(function (RepositorySyncStatus) {
    // Actively syncing this repository
    RepositorySyncStatus["ACTIVE"] = "ACTIVE";
    // AGT is not responding, temporarily pending AGT responses
    RepositorySyncStatus["PENDING"] = "PENDING";
    // AGT (or TM) delayed sync of this repository (for a period of time)
    RepositorySyncStatus["DELAYED"] = "DELAYED";
    // AGT (or TM) suspended sync of this repository
    RepositorySyncStatus["SUSPENDED"] = "SUSPENDED";
    // AGT (or TM) temporarily rerouted syncing of this repository to a different AGT
    RepositorySyncStatus["TEMPORARILY_REROUTED"] = "TEMPORARILY_REROUTED";
    // AGT (or TM) permanently rerouted syncing of this repository to a different AGT
    RepositorySyncStatus["PERMANENTLY_REROUTED"] = "PERMANENTLY_REROUTED";
})(RepositorySyncStatus || (RepositorySyncStatus = {}));
var TerminalSyncStatus;
(function (TerminalSyncStatus) {
    // Terminal is actively syncing
    TerminalSyncStatus["ACTIVE"] = "ACTIVE";
    // Terminal syncing has been suspended
    TerminalSyncStatus["SUSPENDED"] = "SUSPENDED";
})(TerminalSyncStatus || (TerminalSyncStatus = {}));

function ensureChildJsMap(parentContainer, index) {
    let childMap = parentContainer.get(index);
    if (!childMap) {
        childMap = new Map();
        parentContainer.set(index, childMap);
    }
    return childMap;
}

const groundControl = lib('ground-control');
const DB_APPLICATION_UTILS = groundControl.token({
    class: DbApplicationUtils,
    interface: 'IDbApplicationUtils',
    token: 'DB_APPLICATION_UTILS'
});
const ENTITY_STATE_MANAGER = groundControl.token({
    class: null,
    interface: 'IEntityStateManager',
    token: 'ENTITY_STATE_MANAGER'
});
const SEQUENCE_GENERATOR = groundControl.token({
    class: null,
    interface: 'ISequenceGenerator',
    token: 'SEQUENCE_GENERATOR'
});
const TRANSACTIONAL_CONNECTOR = groundControl.token({
    class: null,
    interface: 'ITransactionalConnector',
    token: 'TRANSACTIONAL_CONNECTOR'
});
const UPDATE_CACHE_MANAGER = groundControl.token({
    class: null,
    interface: 'IUpdateCacheManager',
    token: 'UPDATE_CACHE_MANAGER'
});
TRANSACTIONAL_CONNECTOR.setDependencies({
    dbApplicationUtils: DB_APPLICATION_UTILS,
});

/**
 * For logic classes to be hot-swappable for quick upgrades all state is contained
 * in one non-reloadable BehaviorSubject.
 */
const internalTerminalState = new BehaviorSubject({
    applicationActors: [],
    applicationInitializer: {
        applicationWindowMap: new Map(),
        initializingApplicationMap: new Map()
    },
    applicationMapByFullName: new Map(),
    applications: [],
    domains: [],
    frameworkActor: null,
    internalConnector: {
        dbName: '',
        internalCredentials: {
            application: null,
            domain: INTERNAL_DOMAIN,
            methodName: null,
            objectName: null
        },
        serverUrl: ''
    },
    isServer: false,
    lastIds: {
        columns: 0,
        domains: 0,
        entities: 0,
        properties: 0,
        propertyColumns: 0,
        relations: 0,
        relationColumns: 0,
        applications: 0,
        applicationVersions: 0
    },
    receiver: {
        initializedApps: new Set(),
        initializingApps: new Set(),
    },
    sequenceGenerator: {
        sequences: [],
        sequenceBlocks: [],
        generatingSequenceNumbers: false
    },
    terminal: null,
    transactionManager: {
        pendingTransactionQueue: [],
        rootTransactionInProgressMap: new Map(),
        transactionInProgressMap: new Map()
    },
    webReceiver: {
        domainPrefix: '',
        localDomain: '',
        mainDomainFragments: [],
        onClientMessageCallback: null,
        pendingApplicationCounts: new Map(),
        pendingHostCounts: new Map(),
        pendingInterAppApiCallMessageMap: new Map(),
        subsriptionMap: new Map()
    }
});

var __decorate$i = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let TerminalState = class TerminalState {
    constructor() {
        this.terminalState = internalTerminalState;
    }
};
TerminalState = __decorate$i([
    Injected()
], TerminalState);

var __decorate$h = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let TerminalStore = class TerminalStore {
    get state() {
        return this.terminalState.terminalState;
    }
    async init() {
        this.getTerminalState = this.selectorManager.createRootSelector(this.state);
        this.getApplicationActors = this.selectorManager.createSelector(this.getTerminalState, terminal => terminal.applicationActors);
        this.getApplicationInitializer = this.selectorManager.createSelector(this.getTerminalState, terminal => terminal.applicationInitializer);
        this.getApplicationActorMapByDomainAndApplication_Names = this.selectorManager.createSelector(this.getApplicationActors, applicationActors => {
            const applicationActorsByDomainAndApplication_Names = new Map();
            for (const applicationActor of applicationActors) {
                const applicationActorMapForDomain = ensureChildJsMap(applicationActorsByDomainAndApplication_Names, applicationActor.application.domain.name);
                let actorsForApplication = applicationActorMapForDomain
                    .get(applicationActor.application.name);
                if (!actorsForApplication) {
                    actorsForApplication = [];
                    applicationActorMapForDomain.set(applicationActor.application.name, actorsForApplication);
                }
                actorsForApplication.push(applicationActor);
            }
            return applicationActorsByDomainAndApplication_Names;
        });
        this.getDomains = this.selectorManager.createSelector(this.getTerminalState, terminal => terminal.domains);
        this.getDomainMapByName = this.selectorManager.createSelector(this.getDomains, domains => {
            const domainsByName = new Map();
            for (const domain of domains) {
                domainsByName.set(domain.name, domain);
            }
            return domainsByName;
        });
        this.getFrameworkActor = this.selectorManager.createSelector(this.getTerminalState, terminal => terminal.frameworkActor);
        this.getInternalConnector = this.selectorManager.createSelector(this.getTerminalState, terminalState => terminalState.internalConnector);
        this.getIsServer = this.selectorManager.createSelector(this.getTerminalState, terminalState => terminalState.isServer);
        this.getLastIds = this.selectorManager.createSelector(this.getTerminalState, terminalState => terminalState.lastIds);
        this.getLatestApplicationVersionMapByNames = this.selectorManager.createSelector(this.getDomains, domains => {
            const latestApplicationVersionMapByNames = new Map();
            for (const domain of domains) {
                const mapForDomain = ensureChildJsMap(latestApplicationVersionMapByNames, domain.name);
                for (const application of domain.applications) {
                    mapForDomain.set(application.name, application.currentVersion[0].applicationVersion);
                }
            }
            return latestApplicationVersionMapByNames;
        });
        this.getLatestApplicationVersionMapByFullApplication_Name = this.selectorManager.createSelector(this.getLatestApplicationVersionMapByNames, (latestApplicationVersionMapByNames) => {
            const latestApplicationVersionMapByFullApplication_Name = new Map();
            for (const applicationVersionsForDomain_Name of latestApplicationVersionMapByNames.values()) {
                for (const applicationVersion of applicationVersionsForDomain_Name.values()) {
                    latestApplicationVersionMapByFullApplication_Name.set(applicationVersion.application.fullName, applicationVersion);
                }
            }
            return latestApplicationVersionMapByFullApplication_Name;
        });
        this.getAllApplicationVersionsByIds = this.selectorManager.createSelector(this.getDomains, domains => {
            const allApplicationVersionsByIds = [];
            for (const domain of domains) {
                for (const application of domain.applications) {
                    for (const applicationVersion of application.versions) {
                        allApplicationVersionsByIds[applicationVersion._localId] = applicationVersion;
                    }
                }
            }
            return allApplicationVersionsByIds;
        });
        this.getLatestApplicationVersionsByApplication_Indexes = this.selectorManager.createSelector(this.getDomains, domains => {
            const latestApplicationVersionsByApplication_Indexes = [];
            for (const domain of domains) {
                for (const application of domain.applications) {
                    latestApplicationVersionsByApplication_Indexes[application.index]
                        = application.currentVersion[0].applicationVersion;
                }
            }
            return latestApplicationVersionsByApplication_Indexes;
        });
        this.getApplicationMapByFullName = this.selectorManager.createSelector(this.getTerminalState, terminal => terminal.applicationMapByFullName);
        this.getApplications = this.selectorManager.createSelector(this.getTerminalState, terminal => terminal.applications);
        this.getAllEntities = this.selectorManager.createSelector(this.getLatestApplicationVersionsByApplication_Indexes, latestApplicationVersionsByApplication_Indexes => {
            const allEntities = [];
            for (const latestApplicationVersion of latestApplicationVersionsByApplication_Indexes) {
                if (!latestApplicationVersion) {
                    continue;
                }
                for (const entity of latestApplicationVersion.entities) {
                    allEntities[entity._localId] = entity;
                }
            }
            return allEntities;
        });
        this.getAllColumns = this.selectorManager.createSelector(this.getAllEntities, allEntities => {
            const allColumns = [];
            for (const entity of allEntities) {
                if (!entity) {
                    continue;
                }
                for (const column of entity.columns) {
                    allColumns[column._localId] = column;
                }
            }
            return allColumns;
        });
        this.getAllRelations = this.selectorManager.createSelector(this.getAllEntities, allEntities => {
            const allRelations = [];
            for (const entity of allEntities) {
                if (!entity) {
                    continue;
                }
                for (const relation of entity.relations) {
                    allRelations[relation._localId] = relation;
                }
            }
            return allRelations;
        });
        this.getReceiver = this.selectorManager.createSelector(this.getTerminalState, terminal => terminal.receiver);
        this.getSequenceGenerator = this.selectorManager.createSelector(this.getTerminalState, terminal => terminal.sequenceGenerator);
        this.getTerminal = this.selectorManager.createSelector(this.getTerminalState, terminalState => terminalState.terminal);
        this.getTransactionManager = this.selectorManager.createSelector(this.getTerminalState, terminal => terminal.transactionManager);
        this.getWebReceiver = this.selectorManager.createSelector(this.getTerminalState, terminal => terminal.webReceiver);
    }
    tearDown() {
    }
};
__decorate$h([
    Inject()
], TerminalStore.prototype, "selectorManager", void 0);
__decorate$h([
    Inject()
], TerminalStore.prototype, "terminalState", void 0);
TerminalStore = __decorate$h([
    Injected()
], TerminalStore);

const internalUserState = new BehaviorSubject({
    allSessions: [],
    sessionMapByEmail: new Map()
});

var __decorate$g = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let UserState = class UserState {
    constructor() {
        this.userState = internalUserState;
    }
};
UserState = __decorate$g([
    Injected()
], UserState);

var __decorate$f = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let UserStore = class UserStore {
    get state() {
        return this.userState.userState;
    }
    async init() {
        this.getUserState = this.selectorManager.createRootSelector(this.state);
        this.getAllSessions = this.selectorManager.createSelector(this.getUserState, userState => userState.allSessions);
        this.getSessionMapByEmail = this.selectorManager.createSelector(this.getUserState, userState => userState.sessionMapByEmail);
    }
};
__decorate$f([
    Inject()
], UserStore.prototype, "selectorManager", void 0);
__decorate$f([
    Inject()
], UserStore.prototype, "userState", void 0);
UserStore = __decorate$f([
    Injected()
], UserStore);

const ACTOR_PROPERTY_NAME = 'actor';
const REPOSITORY_PROPERTY_NAME = 'repository';

const Y = {
    airportSelectField: true,
    insert: true,
    update: false
};
function convertToY(object) {
    object.airportSelectField = true;
}
function isY(object) {
    return object && object.airportSelectField === true;
}

/**
 * Created by Papa on 10/18/2016.
 */
const ALIASES = ['a', 'b', 'c', 'd', 'e',
    'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z'];
class AliasCache {
    constructor(aliasPrefix = '') {
        this.aliasPrefix = aliasPrefix;
        this.reset();
    }
    getFollowingAlias() {
        let currentAlias = this.lastAlias;
        for (var i = 2; i >= 0; i--) {
            let currentIndex = currentAlias[i];
            currentIndex = (currentIndex + 1) % 26;
            currentAlias[i] = currentIndex;
            if (currentIndex !== 0) {
                break;
            }
        }
        let aliasString = this.aliasPrefix;
        for (var i = 0; i < 3; i++) {
            aliasString += ALIASES[currentAlias[i]];
        }
        if (aliasString === 'add') {
            aliasString = this.getFollowingAlias();
        }
        return aliasString;
    }
    reset() {
        this.lastAlias = [-1, -1, -1];
    }
}
class AliasMap {
    constructor(aliasCache) {
        this.aliasCache = aliasCache;
        this.aliasMap = new Map();
    }
    getNextAlias(object) {
        if (this.hasAliasFor(object)) {
            return this.getExistingAlias(object);
        }
        let aliasString = this.aliasCache.getFollowingAlias();
        this.aliasMap.set(object, aliasString);
        return aliasString;
    }
    hasAliasFor(object) {
        return this.aliasMap.has(object);
    }
}
class EntityAliases extends AliasMap {
    constructor(entityAliasCache = new AliasCache('E'), columnAliasCache = new AliasCache('C'), parameterAliasCache = new AliasCache('P')) {
        super(entityAliasCache);
        this.columnAliasCache = columnAliasCache;
        this.parameterAliases = new ParameterAliases(parameterAliasCache);
    }
    getParams( //
    ) {
        return this.parameterAliases;
    }
    getNewFieldColumnAliases() {
        return new FieldColumnAliases(this, this.columnAliasCache);
    }
    getExistingAlias(entity) {
        if (!this.hasAliasFor(entity)) {
            throw new Error(`No alias found for entity ${entity.__driver__.dbEntity.name}`);
        }
        return this.aliasMap.get(entity);
    }
    getOnlyAlias( //
    ) {
        if (this.aliasMap.size !== 1) {
            return `Expecting only 1 entry in Field's alias map`;
        }
        return this.aliasMap.get(this.aliasMap.keys().next().value);
    }
}
class ParameterAliases extends AliasMap {
    constructor(aliasCache) {
        super(aliasCache);
    }
    getNextAlias(object) {
        if (this.hasAliasFor(object)) {
            return this.getExistingAlias(object).alias;
        }
        let aliasString = this.aliasCache.getFollowingAlias();
        let parameter = {
            alias: aliasString,
            value: object.value
        };
        this.aliasMap.set(object, parameter);
        return aliasString;
    }
    getExistingAlias(field) {
        if (!this.hasAliasFor(field)) {
            throw new Error(`No alias found for a parameter`);
        }
        return this.aliasMap.get(field);
    }
    getParameters( //
    ) {
        let parameters = {};
        this.aliasMap.forEach((value, key) => {
            parameters[value.alias] = value;
        });
        return parameters;
    }
}
class FieldColumnAliases extends AliasMap {
    constructor(_entityAliases, aliasCache) {
        super(aliasCache);
        this._entityAliases = _entityAliases;
    }
    get entityAliases( //
    ) {
        return this._entityAliases;
    }
    getExistingAlias(field) {
        if (!this.hasAliasFor(field)) {
            const qField = field;
            throw new Error(`No alias found for property ${qField.dbProperty.entity.name}.${qField.dbProperty.name}`);
        }
        return this.aliasMap.get(field);
    }
}

const tarmaqQuery = lib('tarmaq-query');

// Separating core-tokens from tokens removes circular dependencies
// at code initialization time
const ENTITY_UTILS = tarmaqQuery.token({
    class: null,
    interface: 'IEntityUtils',
    token: 'ENTITY_UTILS'
});
const QUERY_UTILS = tarmaqQuery.token({
    class: null,
    interface: 'IQueryUtils',
    token: 'QUERY_UTILS'
});

class JoinFields {
    constructor(joinFrom, joinTo) {
        this.joinFrom = joinFrom;
        this.joinTo = joinTo;
        if (!(IOC.getSync(ENTITY_UTILS).isQEntity(this.joinTo))) {
            throw new Error(`Right value in join must be a View or an Entity`);
        }
    }
    ON(joinOperation) {
        let joinChild = this.joinFrom;
        joinChild.__driver__.joinWhereClause = joinOperation(this.joinFrom, this.joinTo);
        return this.joinFrom;
    }
}

function QEntity(dbEntity, applicationUtils, relationManager, fromClausePosition = [], dbRelation = null, joinType = null, QDriver = QEntityDriver) {
    this.__driver__ = new QDriver(dbEntity, applicationUtils, relationManager, fromClausePosition, dbRelation, joinType, this);
}
QEntity.prototype.FULL_JOIN = function (right) {
    return this.__driver__.join(right, JoinType.FULL_JOIN);
};
QEntity.prototype.INNER_JOIN = function (right) {
    return this.__driver__.join(right, JoinType.INNER_JOIN);
};
QEntity.prototype.LEFT_JOIN = function (right) {
    return this.__driver__.join(right, JoinType.LEFT_JOIN);
};
QEntity.prototype.RIGHT_JOIN = function (right) {
    return this.__driver__.join(right, JoinType.RIGHT_JOIN);
};
QEntity.prototype.equals = function (entity) {
    return IOC.getSync(QUERY_UTILS).equals(entity, this);
};
QEntity.prototype.in = function (entities) {
    return IOC.getSync(QUERY_UTILS).in(entities, this);
};
class QEntityDriver {
    constructor(dbEntity, applicationUtils, relationManager, fromClausePosition = [], dbRelation = null, joinType = null, qEntity) {
        this.dbEntity = dbEntity;
        this.applicationUtils = applicationUtils;
        this.relationManager = relationManager;
        this.fromClausePosition = fromClausePosition;
        this.dbRelation = dbRelation;
        this.joinType = joinType;
        this.qEntity = qEntity;
        this.childQEntities = [];
        this.entityFieldMap = {};
        this.entityRelations = [];
        this.idColumns = [];
        this.allColumns = [];
        this.relations = [];
        this.currentChildIndex = -1;
    }
    getInstance() {
        const qEntityConstructor = this.applicationUtils
            .getQEntityConstructor(this.dbEntity);
        let instance = new qEntityConstructor(this.dbEntity, this.applicationUtils, this.relationManager, this.fromClausePosition, this.dbRelation, this.joinType);
        instance.__driver__.currentChildIndex = this.currentChildIndex;
        instance.__driver__.joinWhereClause = this.joinWhereClause;
        instance.__driver__.entityFieldMap = this.entityFieldMap;
        instance.__driver__.entityRelations = this.entityRelations;
        return instance;
    }
    /*
    addEntityRelation<R extends IQEntityInternal>(
        relation: IQInternalRelation<R>
    ): void {
        this.entityRelations[relation.parentRelationIndex] = relation;
    }

    addEntityField<T, IQF extends IQOperableFieldInternal<T, JSONBaseOperation, any, any>>(
        field: IQF
    ): void {
        this.entityFieldMap[field.fieldName] = field;
    }
    */
    /*
    getRelationPropertyName(): string {
        return QMetadataUtils.getRelationPropertyName(QMetadataUtils.getRelationByIndex(this.qEntity, this.relationIndex));
    }
*/
    getRelationJson(columnAliases, queryUtils, fieldUtils, relationManager) {
        // FIXME: this does not work for non-entity tree queries, as there is not dbEntity
        // see ApplicationDao.findMaxVersionedMapByApplicationAndDomain_Names for an example
        let jsonRelation = {
            currentChildIndex: this.currentChildIndex,
            ti: this.dbEntity.index,
            fromClausePosition: this.fromClausePosition,
            jt: this.joinType,
            rt: null,
            rep: columnAliases.entityAliases.getNextAlias(this.getRootJoinEntity()),
            si: this.dbEntity.applicationVersion.application.index
        };
        if (this.joinWhereClause) {
            this.getJoinRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils, relationManager);
        }
        else if (this.dbRelation) {
            this.getEntityRelationJson(jsonRelation);
        }
        else {
            this.getRootRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils, relationManager);
        }
        return jsonRelation;
    }
    getJoinRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils, relationManager) {
        jsonRelation.rt = JSONRelationType.ENTITY_JOIN_ON;
        jsonRelation.joinWhereClause = queryUtils.whereClauseToJSON(this.joinWhereClause, columnAliases);
        return jsonRelation;
    }
    getEntityRelationJson(jsonRelation) {
        jsonRelation.rt = JSONRelationType.ENTITY_APPLICATION_RELATION;
        jsonRelation.ri = this.dbRelation.index;
        // if (!this.dbRelation.whereJoinTable) {
        return jsonRelation;
        // }
        // let otmQEntity;
        // let mtoQEntity;
        // switch (this.dbRelation.relationType) {
        // 	case EntityRelationType.ONE_TO_MANY:
        // 		mtoQEntity = this.qEntity;
        // 		otmQEntity = this.parentJoinEntity;
        // 		break;
        // 	case EntityRelationType.MANY_TO_ONE:
        // 		otmQEntity = this.qEntity;
        // 		mtoQEntity = this.parentJoinEntity;
        // 		break;
        // 	default:
        // 		throw new Error(`Unknown EntityRelationType: ${this.dbRelation.relationType}`);
        // }
        //
        // let joinWhereClause = this.dbRelation.whereJoinTable.addToJoinFunction(otmQEntity,
        // mtoQEntity, this.airportDb, this.airportDb.F); jsonRelation.joinWhereClause    =
        // this.utils.Query.whereClauseToJSON(joinWhereClause, columnAliases);
        // jsonRelation.joinWhereClauseOperator   = this.dbRelation.joinFunctionWithOperator;  return
        // jsonRelation;
    }
    getRootRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils, relationManager) {
        jsonRelation.rt = IOC.getSync(ENTITY_UTILS)
            // Removes circular dependency at code initialization time 
            .isQTree(this) ? JSONRelationType.SUB_QUERY_ROOT : JSONRelationType.ENTITY_ROOT;
        return jsonRelation;
    }
    getQ() {
        return this.qEntity;
    }
    join(right, joinType) {
        let joinChild = right
            .__driver__.getInstance();
        joinChild.__driver__.currentChildIndex = 0;
        let nextChildPosition = this.relationManager.getNextChildJoinPosition(this);
        joinChild.__driver__.fromClausePosition = nextChildPosition;
        joinChild.__driver__.joinType = joinType;
        joinChild.__driver__.parentJoinEntity = this.qEntity;
        this.qEntity.__driver__.childQEntities.push(joinChild);
        return new JoinFields(this.qEntity, joinChild);
    }
    isRootEntity() {
        return !this.parentJoinEntity;
    }
    getRootJoinEntity() {
        let rootEntity = this.qEntity;
        while (rootEntity.__driver__.parentJoinEntity) {
            rootEntity = rootEntity.__driver__.parentJoinEntity;
        }
        return rootEntity;
    }
}

/**
 * Created by Papa on 4/21/2016.
 */
class Operation {
    constructor(category) {
        this.category = category;
    }
}
class ValueOperation extends Operation {
    constructor(category) {
        super(category);
        this.category = category;
    }
    equals(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: SqlOperator.EQUALS,
            r: rValue
        };
    }
    greaterThan(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: SqlOperator.GREATER_THAN,
            r: rValue
        };
    }
    greaterThanOrEquals(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: SqlOperator.GREATER_THAN_OR_EQUALS,
            r: rValue
        };
    }
    IS_NOT_NULL(lValue) {
        return {
            c: this.category,
            l: lValue,
            o: SqlOperator.IS_NOT_NULL
        };
    }
    IS_NULL(lValue) {
        return {
            c: this.category,
            l: lValue,
            o: SqlOperator.IS_NULL
        };
    }
    IN(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: SqlOperator.IN,
            r: rValue
        };
    }
    lessThan(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: SqlOperator.LESS_THAN,
            r: rValue
        };
    }
    lessThanOrEquals(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: SqlOperator.LESS_THAN_OR_EQUALS,
            r: rValue
        };
    }
    notEquals(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: SqlOperator.NOT_EQUALS,
            r: lValue
        };
    }
    NOT_IN(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: SqlOperator.NOT_IN,
            r: rValue
        };
    }
}

/**
 * Created by Papa on 4/21/2016.
 */
const AND = function (...ops) {
    return new LogicalOperation().AND(ops);
};
const OR = function (...ops) {
    return new LogicalOperation().OR(ops);
};
const NOT = function (op) {
    return new LogicalOperation().NOT(op);
};
class LogicalOperation extends Operation {
    constructor() {
        super(null);
    }
    static verifyChildOps(ops) {
        if (!ops || !ops.length) {
            throw new Error(`No child operations provided`);
        }
    }
    AND(ops) {
        return {
            c: OperationCategory.LOGICAL,
            o: SqlOperator.AND,
            v: ops
        };
    }
    OR(ops) {
        return {
            c: OperationCategory.LOGICAL,
            o: SqlOperator.OR,
            v: ops
        };
    }
    NOT(op) {
        return {
            c: OperationCategory.LOGICAL,
            o: SqlOperator.NOT,
            v: op
        };
    }
}

/**
 * Created by Papa on 4/26/2016.
 */
/*
 * Cannot use 'class' syntax because it brakes dynamic creation of subclasses.
 * With 'class' browser reports:
 *   Class constructor QRelation cannot be invoked without 'new'
 * When calling:
 *   Q...Relation.base.constructor.call(this, relation, qEntity)
 */
function QRelation(dbRelation, parentQ, applicationUtils, relationManager) {
    this.dbRelation = dbRelation;
    this.parentQ = parentQ;
    this.applicationUtils = applicationUtils;
    this.relationManager = relationManager;
}
QRelation.prototype.INNER_JOIN = function () {
    const newQEntity = this.getNewQEntity(JoinType.INNER_JOIN);
    this.parentQ.__driver__.childQEntities.push(newQEntity);
    return newQEntity;
};
QRelation.prototype.LEFT_JOIN = function () {
    const newQEntity = this.getNewQEntity(JoinType.LEFT_JOIN);
    this.parentQ.__driver__.childQEntities.push(newQEntity);
    return newQEntity;
};
QRelation.prototype.getNewQEntity = function (joinType) {
    const dbEntity = this.dbRelation.relationEntity;
    const qEntityConstructor = this.applicationUtils.getQEntityConstructor(this.dbRelation.relationEntity);
    let newQEntity = new qEntityConstructor(dbEntity, this.applicationUtils, this.relationManager, this.relationManager.getNextChildJoinPosition(this.parentQ.__driver__), this.dbRelation, joinType, this.applicationUtils, this.relationManager);
    newQEntity.__driver__.parentJoinEntity = this.parentQ;
    return newQEntity;
};
function QAirEntityRelation(dbRelation, parentQ, applicationUtils, relationManager) {
    QAirEntityRelation.base.constructor.call(this, dbRelation, parentQ, applicationUtils, relationManager);
}
const qAirEntityRelationMethods = {
    // equals: function <Entity extends IAirEntity, IQ extends IQEntityInternal>(
    // 	entity: Entity | IQAirEntity |
    // 		IQAirEntityRelation<Entity, IQ> | AirEntityId | string
    // ): JSONLogicalOperation {
    // 	return IOC.getSync(QUERY_UTILS).equals(entity, this)
    // }
    IS_NULL() {
        return OR(this.actor._localId.IS_NULL(), this.repository._localId.IS_NULL(), this._actorRecordId.IS_NULL());
    },
    IS_NOT_NULL() {
        return AND(this.actor._localId.IS_NOT_NULL(), this.repository._localId.IS_NOT_NULL(), this._actorRecordId.IS_NOT_NULL());
    }
};
extend(QRelation, QAirEntityRelation, qAirEntityRelationMethods);

/**
 * Created by Papa on 10/25/2016.
 */
/*
 * Cannot use 'class' syntax because it brakes dynamic creation of subclasses.
 * With 'class' browser reports:
 *   Class constructor QRelation cannot be invoked without 'new'
 * When calling:
 *   Q...Relation.base.constructor.call(this, relation, qEntity)
 */
function QOneToManyRelation(dbRelation, parentQ, applicationUtils, repationManager) {
    QOneToManyRelation.base.constructor.call(this, dbRelation, parentQ, applicationUtils, repationManager);
}
const qOneToManyRelationMethods = {
/*
yourMethodName: function() {},
*/
};
extend(QRelation, QOneToManyRelation, qOneToManyRelationMethods);
function QAirEntityOneToManyRelation(dbRelation, parentQ, applicationUtils, repationManager) {
    QAirEntityOneToManyRelation.base.constructor.call(this, dbRelation, parentQ, applicationUtils, repationManager);
}
const qAirEntityOneToManyRelationMethods = {
/*
yourMethodName: function() {},
*/
};
extend(QAirEntityRelation, QAirEntityOneToManyRelation, qAirEntityOneToManyRelationMethods);

function QTree(fromClausePosition = [], subQuery) {
    QTree.base.constructor.call(this, null, fromClausePosition, null, null, QTreeDriver);
    this.__driver__.subQuery = subQuery;
}
const qTreeMethods = {
/*
yourMethodName: function() {},
*/
};
extend(QEntity, QTree, qTreeMethods);
class QTreeDriver extends QEntityDriver {
    getInstance() {
        let instance = super.getInstance();
        instance.__driver__
            .subQuery = this.subQuery;
        return instance;
    }
    // getRelationPropertyName(): string {
    // 	throw new Error(`not implemented`);
    // }
    getJoinRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils, relationManager) {
        jsonRelation = super.getJoinRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils, relationManager);
        jsonRelation.rt = JSONRelationType.SUB_QUERY_JOIN_ON;
        jsonRelation.subQuery =
            // Removes circular dependency at code initialization time 
            IOC.getSync(ENTITY_UTILS).getTreeQuery(this.subQuery, columnAliases.entityAliases)
                .toJSON(queryUtils, fieldUtils, relationManager);
        return jsonRelation;
    }
    getRootRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils, relationManager) {
        jsonRelation = super.getJoinRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils, relationManager);
        jsonRelation.rt = JSONRelationType.SUB_QUERY_ROOT;
        jsonRelation.subQuery =
            // Removes circular dependency at code initialization time 
            IOC.getSync(ENTITY_UTILS).getTreeQuery(this.subQuery, columnAliases.entityAliases)
                .toJSON(queryUtils, fieldUtils, relationManager);
        return jsonRelation;
    }
}

/**
 * Created by Papa on 6/20/2016.
 */
class BooleanOperation extends ValueOperation {
    constructor() {
        super(OperationCategory.BOOLEAN);
    }
}

/**
 * Created by Papa on 10/16/2016.
 */
class FieldInOrderBy {
    constructor(field, sortOrder) {
        this.field = field;
        this.sortOrder = sortOrder;
    }
    toJSON(columnAliases) {
        if (!columnAliases.hasAliasFor(this.field)) {
            throw new Error(`Field used in ORDER_BY clause is not present in SELECT clause`);
        }
        return {
            fa: columnAliases.getExistingAlias(this.field),
            so: this.sortOrder
        };
    }
    toEntityJSON() {
        let qField = this.field;
        return {
            fa: undefined,
            ci: qField.dbColumn.index,
            pi: qField.dbProperty.index,
            ti: qField.dbProperty.entity.index,
            si: qField.dbProperty.entity.applicationVersion._localId,
            so: this.sortOrder
        };
    }
}

/**
 * Created by Papa on 4/21/2016.
 */
class QField {
    constructor(dbColumn, dbProperty, q, objectType) {
        this.dbColumn = dbColumn;
        this.dbProperty = dbProperty;
        this.q = q;
        this.objectType = objectType;
        this.__appliedFunctions__ = [];
    }
    /**
     protected getFieldKey() {
        let rootEntityPrefix = columnAliases.entityAliases.getExistingAlias(this.parentQ.getRootJoinEntity());
        let key = `${relationManager.getPositionAlias(rootEntityPrefix, this.parentQ.fromClausePosition)}.${this.fieldName}`;
        return key;
    }
     */
    applySqlFunction(sqlFunctionCall) {
        let appliedField = this.getInstance();
        appliedField.__appliedFunctions__.push(sqlFunctionCall);
        return appliedField;
    }
    toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils, relationManager) {
        let alias;
        if (forSelectClause) {
            alias = columnAliases.getNextAlias(this);
        }
        let rootEntityPrefix;
        if (this.__fieldSubQuery__) {
            rootEntityPrefix = columnAliases.entityAliases.getOnlyAlias();
        }
        else {
            rootEntityPrefix = columnAliases.entityAliases.getExistingAlias(this.q.__driver__.getRootJoinEntity());
        }
        let jsonField = {
            appliedFunctions: this.appliedFunctionsToJson(this.__appliedFunctions__, columnAliases, queryUtils, fieldUtils, relationManager),
            si: this.dbProperty.entity.applicationVersion._localId,
            ti: this.dbProperty.entity.index,
            fa: alias,
            pi: this.dbProperty.index,
            ci: this.dbColumn.index,
            ta: relationManager.getPositionAlias(rootEntityPrefix, this.q.__driver__.fromClausePosition),
            ot: this.objectType,
            dt: this.dbColumn.type
        };
        if (this.__fieldSubQuery__) {
            jsonField.fieldSubQuery = fieldUtils.getFieldQueryJson(this.__fieldSubQuery__, columnAliases.entityAliases, queryUtils);
            jsonField.ot = JSONClauseObjectType.FIELD_QUERY;
        }
        return jsonField;
    }
    asc() {
        return new FieldInOrderBy(this, SortOrder.ASCENDING);
    }
    desc() {
        return new FieldInOrderBy(this, SortOrder.DESCENDING);
    }
    addSubQuery(subQuery) {
        let appliedField = this.getInstance();
        appliedField.__fieldSubQuery__ = subQuery;
        return appliedField;
    }
    operableFunctionToJson(functionObject, columnAliases, forSelectClause, queryUtils, fieldUtils, relationManager) {
        let alias;
        if (forSelectClause) {
            alias = columnAliases.getNextAlias(this);
        }
        return {
            appliedFunctions: this.appliedFunctionsToJson(this.__appliedFunctions__, columnAliases, queryUtils, fieldUtils, relationManager),
            fa: alias,
            ot: this.objectType,
            dt: this.dbColumn.type,
            v: this.valueToJSON(functionObject, columnAliases, false, true, queryUtils, fieldUtils, relationManager)
        };
    }
    copyFunctions(field) {
        field.__appliedFunctions__ = this.__appliedFunctions__.slice();
        return field;
    }
    appliedFunctionsToJson(appliedFunctions, columnAliases, queryUtils, fieldUtils, relationManager) {
        if (!appliedFunctions) {
            return appliedFunctions;
        }
        return appliedFunctions.map((appliedFunction) => {
            return this.functionCallToJson(appliedFunction, columnAliases, queryUtils, fieldUtils, relationManager);
        });
    }
    functionCallToJson(functionCall, columnAliases, queryUtils, fieldUtils, relationManager) {
        let parameters;
        if (functionCall.p) {
            parameters = functionCall.p.map((parameter) => {
                return this.valueToJSON(parameter, columnAliases, false, false, queryUtils, fieldUtils, relationManager);
            });
        }
        return {
            ft: functionCall.ft,
            p: parameters
        };
    }
    valueToJSON(functionObject, columnAliases, forSelectClause, fromFunctionObject, queryUtils, fieldUtils, relationManager) {
        if (!functionObject) {
            throw new Error(`Function object must be provided to valueToJSON function.`);
        }
        if (!fromFunctionObject && functionObject instanceof QField) {
            return functionObject.toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils, relationManager);
        }
        let value = functionObject.value;
        switch (typeof value) {
            case 'boolean':
            case 'number':
            case 'string':
                return columnAliases.entityAliases.getParams()
                    .getNextAlias(functionObject);
            case 'object':
                if (value instanceof Date) {
                    return columnAliases.entityAliases.getParams()
                        .getNextAlias(functionObject);
                }
                else if (value instanceof Array) {
                    return columnAliases.entityAliases.getParams()
                        .getNextAlias(functionObject);
                }
                else if (value === null) {
                    return columnAliases.entityAliases.getParams()
                        .getNextAlias(functionObject);
                }
                else {
                    throw new Error(`Unexpected query parameter type allowed types are:
boolean | Date | Date[] | number | number[] | string | string[]
`);
                }
            case 'undefined':
                throw new Error(`Undefined is not allowed as a query parameter`);
            default:
                throw new Error(`Unexpected query parameter type allowed types are:
boolean | Date | Date[] | number | number[] | string | string[]
`);
        }
        // TODO: this never gets called, is this needed?
        /*
        if (value === null || value instanceof Date) {
            return columnAliases.entityAliases.getParams()
                .getNextAlias(functionObject as IQFunction<any>)
        }
        if (value instanceof QField) {
            return value.toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils, relationManager)
        }
        // must be a field sub-query
        let rawFieldQuery: RawFieldQuery<any> = value
        return fieldUtils.getFieldQueryJson(
            rawFieldQuery, columnAliases.entityAliases, queryUtils)
         */
    }
}

/**
 * Created by Papa on 10/25/2016.
 */
class QOperableField extends QField {
    constructor(dbColumn, dbProperty, q, objectType, operation) {
        super(dbColumn, dbProperty, q, objectType);
        this.operation = operation;
    }
    equals(value) {
        if (value instanceof Function) {
            value = value();
        }
        return this.operation.equals(this, value);
    }
    greaterThan(value) {
        if (value instanceof Function) {
            value = value();
        }
        return this.operation.greaterThan(this, value);
    }
    greaterThanOrEquals(value) {
        if (value instanceof Function) {
            value = value();
        }
        return this.operation.greaterThanOrEquals(this, value);
    }
    IS_NOT_NULL() {
        return this.operation.IS_NOT_NULL(this);
    }
    IS_NULL() {
        return this.operation.IS_NULL(this);
    }
    IN(value) {
        if (value instanceof Function) {
            value = value();
        }
        return this.operation.IN(this, value);
    }
    lessThan(value) {
        if (value instanceof Function) {
            value = value();
        }
        return this.operation.lessThan(this, value);
    }
    lessThanOrEquals(value) {
        if (value instanceof Function) {
            value = value();
        }
        return this.operation.lessThanOrEquals(this, value);
    }
    notEquals(value) {
        if (value instanceof Function) {
            value = value();
        }
        return this.operation.notEquals(this, value);
    }
    NOT_IN(values) {
        values = values.map((value) => {
            if (value instanceof Function) {
                return value();
            }
            return value;
        });
        return this.operation.NOT_IN(this, values);
    }
}

class QBooleanField extends QOperableField {
    constructor(dbColumn, dbProperty, q, objectType = JSONClauseObjectType.FIELD) {
        super(dbColumn, dbProperty, q, objectType, new BooleanOperation());
    }
    getInstance(qEntity = this.q) {
        return this.copyFunctions(new QBooleanField(this.dbColumn, this.dbProperty, qEntity, this.objectType));
    }
}
class QBooleanFunction extends QBooleanField {
    constructor(value, isQueryParameter = false) {
        super({ type: SQLDataType.BOOLEAN }, null, null, JSONClauseObjectType.FIELD_FUNCTION);
        this.value = value;
        this.isQueryParameter = isQueryParameter;
    }
    getInstance() {
        return this.copyFunctions(new QBooleanFunction(this.value));
    }
    toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils, relationManager) {
        let json = this.operableFunctionToJson(this, columnAliases, forSelectClause, queryUtils, fieldUtils, relationManager);
        if (this.isQueryParameter) {
            this.parameterAlias = json.v;
        }
        return json;
    }
}

/**
 * Created by Papa on 6/20/2016.
 */
class DateOperation extends ValueOperation {
    constructor() {
        super(OperationCategory.DATE);
    }
}

class QDateField extends QOperableField {
    constructor(dbColumn, dbProperty, q, objectType = JSONClauseObjectType.FIELD) {
        super(dbColumn, dbProperty, q, objectType, new DateOperation());
    }
    getInstance(qEntity = this.q) {
        return this.copyFunctions(new QDateField(this.dbColumn, this.dbProperty, qEntity, this.objectType));
    }
}
class QDateFunction extends QDateField {
    constructor(value, isQueryParameter = false) {
        super({ type: SQLDataType.DATE }, null, null, JSONClauseObjectType.FIELD_FUNCTION);
        this.value = value;
        this.isQueryParameter = isQueryParameter;
    }
    getInstance() {
        return this.copyFunctions(new QDateFunction(this.value, this.isQueryParameter));
    }
    toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils, relationManager) {
        let json = this.operableFunctionToJson(this, columnAliases, forSelectClause, queryUtils, fieldUtils, relationManager);
        if (this.isQueryParameter) {
            this.parameterAlias = json.v;
        }
        return json;
    }
}

/**
 * Created by Papa on 6/20/2016.
 */
class NumberOperation extends ValueOperation {
    constructor() {
        super(OperationCategory.NUMBER);
    }
}

class QNumberField extends QOperableField {
    constructor(dbColumn, dbProperty, q, objectType = JSONClauseObjectType.FIELD) {
        super(dbColumn, dbProperty, q, objectType, new NumberOperation());
    }
    getInstance(qEntity = this.q) {
        return this.copyFunctions(new QNumberField(this.dbColumn, this.dbProperty, qEntity, this.objectType));
    }
}
class QNumberFunction extends QNumberField {
    constructor(value, isQueryParameter = false) {
        super({ type: SQLDataType.NUMBER }, null, null, JSONClauseObjectType.FIELD_FUNCTION);
        this.value = value;
        this.isQueryParameter = isQueryParameter;
    }
    getInstance() {
        return this.copyFunctions(new QNumberFunction(this.value, this.isQueryParameter));
    }
    toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils, relationManager) {
        let json = this.operableFunctionToJson(this, columnAliases, forSelectClause, queryUtils, fieldUtils, relationManager);
        if (this.isQueryParameter) {
            this.parameterAlias = json.v;
        }
        return json;
    }
}

/**
 * Created by Papa on 6/20/2016.
 */
class StringOperation extends ValueOperation {
    constructor() {
        super(OperationCategory.STRING);
    }
    LIKE(lValue, rValue
    // TODO: implement ReqExp
    //| RegExp
    ) {
        return {
            c: this.category,
            l: lValue,
            o: SqlOperator.LIKE,
            r: rValue
        };
    }
}

class QStringField extends QOperableField {
    constructor(dbColumn, dbProperty, q, objectType = JSONClauseObjectType.FIELD) {
        super(dbColumn, dbProperty, q, objectType, new StringOperation());
    }
    getInstance(qEntity = this.q) {
        return this.copyFunctions(new QStringField(this.dbColumn, this.dbProperty, qEntity, this.objectType));
    }
    LIKE(value) {
        if (value instanceof Function) {
            value = value();
        }
        return this.operation.LIKE(this, value);
    }
}
class QStringFunction extends QStringField {
    constructor(value, isQueryParameter = false) {
        super({ type: SQLDataType.STRING }, null, null, JSONClauseObjectType.FIELD_FUNCTION);
        this.value = value;
        this.isQueryParameter = isQueryParameter;
    }
    getInstance() {
        return this.copyFunctions(new QStringFunction(this.value, this.isQueryParameter));
    }
    toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils, relationManager) {
        let json = this.operableFunctionToJson(this, columnAliases, forSelectClause, queryUtils, fieldUtils, relationManager);
        if (this.isQueryParameter) {
            this.parameterAlias = json.v;
        }
        return json;
    }
}

/**
 * Created by Papa on 11/29/2016.
 */
class QNullFunction extends QField {
    constructor() {
        super(null, null, null, JSONClauseObjectType.FIELD_FUNCTION);
        this.value = null;
    }
    getInstance() {
        return this.copyFunctions(new QNullFunction());
    }
    toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils, relationManager) {
        return this.operableFunctionToJson(this, columnAliases, forSelectClause, queryUtils, fieldUtils, relationManager);
    }
}

/**
 * Created by Papa on 12/31/2016.
 */
const bool = function (primitive) {
    if (typeof primitive !== 'boolean') {
        throw new Error(`bool() accepts booleans only.`);
    }
    return new QBooleanFunction(primitive);
};
const date = function (primitive) {
    if (!(primitive instanceof Date)) {
        throw new Error(`date() accepts Dates only.`);
    }
    return new QDateFunction(primitive);
};
const num = function (primitive) {
    if (typeof primitive !== 'number') {
        throw new Error(`num() accepts numbers only.`);
    }
    return new QNumberFunction(primitive);
};
const str = function (primitive) {
    if (typeof primitive !== 'string') {
        throw new Error(`str() accepts strings only.`);
    }
    return new QStringFunction(primitive);
};
function wrapPrimitive(value) {
    switch (typeof value) {
        case 'boolean':
            return bool(value);
        case 'number':
            return num(value);
        case 'string':
            return str(value);
        case 'undefined':
            throw new Error(`Cannot use an 'undefined' value in an operation.`);
    }
    if (value === null) {
        return new QNullFunction();
    }
    if (value instanceof Date) {
        return date(value);
    }
    return value;
}

function getSqlFunctionCall(sqlFunction, parameters) {
    if (parameters) {
        parameters = parameters.map((parameter) => {
            switch (typeof parameter) {
                case 'boolean':
                    return bool(parameter);
                case 'number':
                    return num(parameter);
                case 'string':
                    return str(parameter);
                case 'undefined':
                    throw new Error(`'undefined' cannot be used as a function parameter`);
            }
            if (parameter instanceof Date) {
                return date(parameter);
            }
            return parameter;
        });
    }
    return {
        ft: sqlFunction,
        p: parameters
    };
}
const ABS = function (numeric) {
    if (numeric instanceof QNumberField) {
        return numeric.applySqlFunction(getSqlFunctionCall(SqlFunction.AVG));
    }
    else {
        return new QNumberFunction(numeric).applySqlFunction(getSqlFunctionCall(SqlFunction.ABS));
    }
};
const AVG = function (numeric) {
    if (numeric instanceof QNumberField) {
        return numeric.applySqlFunction(getSqlFunctionCall(SqlFunction.AVG));
    }
    else {
        return new QNumberFunction(numeric).applySqlFunction(getSqlFunctionCall(SqlFunction.AVG));
    }
};
function getFunctionObject(value) {
    switch (typeof value) {
        case 'boolean':
            return new QBooleanFunction(value);
        case 'number':
            return new QNumberFunction(value);
        case 'string':
            return new QStringFunction(value);
    }
    if (value instanceof Date) {
        return new QDateFunction(value);
    }
    let selectClause = value.SELECT;
    if (selectClause instanceof QDistinctFunction) {
        selectClause = selectClause.getSelectClause();
    }
    if (selectClause instanceof QBooleanField) {
        return new QBooleanFunction(value);
    }
    else if (selectClause instanceof QDateField) {
        return new QDateFunction(value);
    }
    else if (selectClause instanceof QNumberField) {
        return new QNumberFunction(value);
    }
    else if (selectClause instanceof QStringField) {
        return new QStringFunction(value);
    }
    throw new Error(`Function rValue must be a primitive, Date, Field or Field query`);
}
const COUNT = function (value) {
    if (value instanceof QOperableField) {
        return value.applySqlFunction(getSqlFunctionCall(SqlFunction.COUNT));
    }
    else {
        return getFunctionObject(value)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.COUNT));
    }
};
const MAX = function (value) {
    if (value instanceof QOperableField) {
        return value.applySqlFunction(getSqlFunctionCall(SqlFunction.MAX));
    }
    else {
        return getFunctionObject(value)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.MAX));
    }
};
const MIN = function (value) {
    if (value instanceof QOperableField) {
        return value.applySqlFunction(getSqlFunctionCall(SqlFunction.MIN));
    }
    else {
        return getFunctionObject(value)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.MIN));
    }
};
const SUM = function (numeric) {
    if (numeric instanceof QNumberField) {
        return numeric.applySqlFunction(getSqlFunctionCall(SqlFunction.SUM));
    }
    else {
        return new QNumberFunction(numeric)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.SUM));
    }
};
const UCASE = function (stringValue) {
    if (stringValue instanceof QStringField) {
        return stringValue.applySqlFunction(getSqlFunctionCall(SqlFunction.UCASE));
    }
    else {
        return new QStringFunction(stringValue)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.UCASE));
    }
};
const LCASE = function (stringValue) {
    if (stringValue instanceof QStringField) {
        return stringValue.applySqlFunction(getSqlFunctionCall(SqlFunction.LCASE));
    }
    else {
        return new QStringFunction(stringValue)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.LCASE));
    }
};
const MID = function (stringValue, start, length) {
    if (stringValue instanceof QStringField) {
        return stringValue.applySqlFunction(getSqlFunctionCall(SqlFunction.MID, [start, length]));
    }
    else {
        return new QStringFunction(stringValue)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.MID, [start, length]));
    }
};
const LEN = function (stringValue) {
    if (stringValue instanceof QStringField) {
        return stringValue.applySqlFunction(getSqlFunctionCall(SqlFunction.LEN));
    }
    else {
        return new QStringFunction(stringValue)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.LEN));
    }
};
const ROUND = function (numeric, digits = 0) {
    if (numeric instanceof QNumberField) {
        return numeric.applySqlFunction(getSqlFunctionCall(SqlFunction.ROUND, [digits]));
    }
    else {
        return new QNumberFunction(numeric)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.ROUND, [digits]));
    }
};
const NOW = function () {
    return new QDateFunction(null)
        .applySqlFunction(getSqlFunctionCall(SqlFunction.NOW));
};
const FORMAT = function (format, ...formatParameters) {
    if (format instanceof QStringField) {
        return format.applySqlFunction(getSqlFunctionCall(SqlFunction.FORMAT, formatParameters));
    }
    else {
        return new QStringFunction(format)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.FORMAT, formatParameters));
    }
};
const REPLACE = function (stringValue, toReplace, replaceWith) {
    if (stringValue instanceof QStringField) {
        return stringValue.applySqlFunction(getSqlFunctionCall(SqlFunction.REPLACE, [toReplace, replaceWith]));
    }
    else {
        return new QStringFunction(stringValue)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.REPLACE, [toReplace, replaceWith]));
    }
};
const TRIM = function (stringField) {
    if (stringField instanceof QStringField) {
        return stringField.applySqlFunction(getSqlFunctionCall(SqlFunction.TRIM));
    }
    else {
        return new QStringFunction(stringField)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.TRIM));
    }
};
class StandAloneFunction {
}
const DISTINCT = function (selectClause) {
    let distinctFunction = new QDistinctFunction(selectClause);
    distinctFunction.applySqlFunction(getSqlFunctionCall(SqlFunction.DISTINCT));
    return distinctFunction;
};
class QDistinctFunction extends StandAloneFunction {
    constructor(selectClause) {
        super();
        this.selectClause = selectClause;
        this.__appliedFunctions__ = [];
    }
    static getSelect(distinct) {
        return distinct.__appliedFunctions__[0].p[0];
    }
    applySqlFunction(sqlFunctionCall) {
        this.__appliedFunctions__.push(sqlFunctionCall);
        return this;
    }
    getSelectClause() {
        return this.selectClause;
    }
    toJSON(parsedSelectClause) {
        if (this.__appliedFunctions__.length != 1) {
            throw new Error(`Not expecting and parent or child functions on "distinct"`);
        }
        if (!this.selectClause) {
            throw new Error(`SELECT clause is missing in "distinct" function.`);
        }
        let appliedFunctions = [
            getSqlFunctionCall(SqlFunction.DISTINCT)
        ];
        return {
            appliedFunctions: appliedFunctions,
            dt: null,
            fa: null,
            ot: JSONClauseObjectType.DISTINCT_FUNCTION,
            v: parsedSelectClause
        };
    }
}
const EXISTS = function (rawQuery) {
    let selectClause = rawQuery.SELECT;
    if (!selectClause) {
        throw new Error(`Sub-Query must have SELECT clause defined to be used in EXITS function`);
    }
    let existsFunction = new QExistsFunction(rawQuery);
    return existsFunction.applySqlFunction(getSqlFunctionCall(SqlFunction.EXISTS));
};
class QExistsFunction extends StandAloneFunction {
    constructor(subQuery) {
        super();
        this.subQuery = subQuery;
        this.__appliedFunctions__ = [];
        this.operator = SqlOperator.EXISTS;
        this.o = SqlOperator.EXISTS;
        this.category = OperationCategory.FUNCTION;
        this.c = OperationCategory.FUNCTION;
    }
    applySqlFunction(sqlFunctionCall) {
        this.__appliedFunctions__.push(sqlFunctionCall);
        return this;
    }
    getQuery() {
        return this.subQuery;
    }
    toJSON(parsedQuery) {
        if (this.__appliedFunctions__.length != 1) {
            throw new Error(`Not expecting and parent or child functions on "exists"`);
        }
        if (!this.subQuery) {
            throw new Error(`Subquery is not defined in "exists" function.`);
        }
        let appliedFunctions = [
            getSqlFunctionCall(SqlFunction.EXISTS)
        ];
        return {
            c: this.category,
            ob: {
                appliedFunctions: appliedFunctions,
                dt: null,
                ot: JSONClauseObjectType.EXISTS_FUNCTION,
                v: parsedQuery
            },
            o: this.operator
        };
    }
}
// Algebra Operators
const DIVIDE = function (numeric1, numeric2) {
    if (numeric1 instanceof QNumberField) {
        return numeric1.applySqlFunction(getSqlFunctionCall(SqlFunction.DIVIDE, [numeric2]));
    }
    else {
        return new QNumberFunction(numeric1)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.DIVIDE, [numeric2]));
    }
};
const SUBTRACT = function (numeric1, numeric2) {
    if (numeric1 instanceof QNumberField) {
        return numeric1.applySqlFunction(getSqlFunctionCall(SqlFunction.MINUS, [numeric2]));
    }
    else {
        return new QNumberFunction(numeric1)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.MINUS, [numeric2]));
    }
};
const MODULUS = function (numeric1, numeric2) {
    if (numeric1 instanceof QNumberField) {
        return numeric1.applySqlFunction(getSqlFunctionCall(SqlFunction.MODULUS, [numeric2]));
    }
    else {
        return new QNumberFunction(numeric1)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.MODULUS, [numeric2]));
    }
};
const MULTIPLY = function (numeric1, numeric2) {
    if (numeric1 instanceof QNumberField) {
        return numeric1.applySqlFunction(getSqlFunctionCall(SqlFunction.MULTIPLY, [numeric2]));
    }
    else {
        return new QNumberFunction(numeric1)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.MULTIPLY, [numeric2]));
    }
};
const ADD = function (numeric1, numeric2) {
    if (numeric1 instanceof QNumberField) {
        return numeric1.applySqlFunction(getSqlFunctionCall(SqlFunction.PLUS, [numeric2]));
    }
    else {
        return new QNumberFunction(numeric1)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.PLUS, [numeric2]));
    }
};
const CONCAT = function (//
...fragments) {
    if (fragments.length > 2) {
        throw new Error(`Less than two operands passed to 'concat' function.`);
    }
    let firstFragment = fragments[0];
    let restOfFragments = fragments.slice(1);
    if (firstFragment instanceof QStringField) {
        return firstFragment.applySqlFunction(getSqlFunctionCall(SqlFunction.CONCATENATE, restOfFragments));
    }
    else {
        return new QStringFunction(firstFragment)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.CONCATENATE, restOfFragments));
    }
};
/**
 * A
 * UNION
 * B
 */
const UNION = function (...rawQueries) {
    throw new Error('not implemented');
};
/**
 * A
 * UNION ALL
 * B
 */
const UNION_ALL = function (...rawQueries) {
    throw new Error('not implemented');
};
/**
 * A
 * INTERSECT
 * B
 */
const INTERSECT = function (...rawQueries) {
    throw new Error('not implemented');
};
/**
 * A
 * MINUS
 * B
 */
const EXCEPT = function (...rawQueries) {
    throw new Error('not implemented');
};
/**
 * A
 * MINUS
 * B
 */
const MINUS = EXCEPT;

/**
 * Created by papa on 7/13/17.
 */
class UntypedOperation extends ValueOperation {
    constructor() {
        super(OperationCategory.UNTYPED);
    }
    LIKE(lValue, rValue
    // TODO: implement ReqExp
    //| RegExp
    ) {
        return {
            c: this.category,
            l: lValue,
            o: SqlOperator.LIKE,
            r: rValue
        };
    }
}

class QUntypedField extends QOperableField {
    constructor(dbColumn, dbProperty, q, objectType = JSONClauseObjectType.FIELD) {
        super(dbColumn, dbProperty, q, objectType, new UntypedOperation());
    }
    getInstance(qEntity = this.q) {
        return this.copyFunctions(new QUntypedField(this.dbColumn, this.dbProperty, qEntity, this.objectType));
    }
    like(value) {
        if (value instanceof Function) {
            value = value();
        }
        return this.operation.LIKE(this, value);
    }
}

/**
 * Created by Papa on 10/27/2016.
 */
class AbstractQuery {
    constructor(entityAliases = new EntityAliases(), columnAliases = entityAliases.getNewFieldColumnAliases()) {
        this.entityAliases = entityAliases;
        this.columnAliases = columnAliases;
        this.isEntityQuery = false;
    }
    getParameters( //
    ) {
        return this.entityAliases.getParams().getParameters();
    }
    getNonEntityQuery(rawQuery, jsonQuery, createSelectCallback, queryUtils, fieldUtils, relationManager) {
        let from = this.fromClauseToJSON(rawQuery.FROM, queryUtils, fieldUtils, relationManager);
        jsonQuery.F = from;
        if (createSelectCallback) {
            createSelectCallback(jsonQuery);
        }
        jsonQuery.W = queryUtils.whereClauseToJSON(rawQuery.WHERE, this.columnAliases);
        jsonQuery.GB = this.groupByClauseToJSON(rawQuery.GROUP_BY);
        jsonQuery.H = queryUtils.whereClauseToJSON(rawQuery.HAVING, this.columnAliases);
        jsonQuery.OB = this.orderByClauseToJSON(rawQuery.ORDER_BY);
        jsonQuery.L = rawQuery.LIMIT;
        jsonQuery.O = rawQuery.OFFSET;
        return jsonQuery;
    }
    fromClauseToJSON(fromClause, queryUtils, fieldUtils, relationManager) {
        if (!fromClause) {
            if (this.isEntityQuery) {
                return [];
            }
            else {
                throw new Error('From clause must be present in a non-Entity based query.');
            }
        }
        return fromClause.map((fromEntity) => {
            if (!(IOC.getSync(ENTITY_UTILS).isQEntity(fromEntity))) {
                throw new Error(`FROM clause can contain only Views or Entities.`);
            }
            if (this.isEntityQuery) {
                if (IOC.getSync(ENTITY_UTILS).isQTree(fromEntity)) {
                    throw new Error(`Entity FROM clauses can contain only Entities.`);
                }
            }
            return fromEntity.__driver__
                .getRelationJson(this.columnAliases, queryUtils, fieldUtils, relationManager);
        });
    }
    groupByClauseToJSON(groupBy) {
        if (!groupBy || !groupBy.length) {
            return null;
        }
        return groupBy.map((field) => {
            if (!this.columnAliases.hasAliasFor(field)) {
                throw new Error(`Field used in group by clause is not present in SELECT clause`);
            }
            return {
                fa: this.columnAliases.getExistingAlias(field)
            };
        });
    }
    orderByClauseToJSON(orderBy) {
        if (!orderBy || !orderBy.length) {
            return null;
        }
        return orderBy.map((field) => {
            return field.toJSON(this.columnAliases);
        });
    }
}

/**
 * Created by Papa on 10/24/2016.
 */
const NON_ENTITY_SELECT_ERROR_MESSAGE = `Unsupported entry in Non-Entity SELECT clause, must be a(n): Entity Field | ManyToOne Relation | primitive wrapped by "bool","date","num","str" | query wrapped by "field"`;
class DistinguishableQuery extends AbstractQuery {
    constructor(entityAliases) {
        super(entityAliases);
        this.isHierarchicalEntityQuery = false;
    }
    selectClauseToJSON(rawSelect, queryUtils, fieldUtils, relationManager) {
        if (rawSelect instanceof QDistinctFunction) {
            if (this.isHierarchicalEntityQuery) {
                throw new Error(`Distinct cannot be used in SELECT of Hierarchical/Bridged Entity queries.`);
            }
            let rawInnerSelect = rawSelect.getSelectClause();
            let innerSelect = this.nonDistinctSelectClauseToJSON(rawInnerSelect, queryUtils, fieldUtils, relationManager);
            return rawSelect.toJSON(innerSelect);
        }
        else {
            return this.nonDistinctSelectClauseToJSON(rawSelect, queryUtils, fieldUtils, relationManager);
        }
    }
}

/**
 * Created by Papa on 10/24/2016.
 */
const FIELD_IN_SELECT_CLAUSE_ERROR_MESSAGE = `Entity SELECT clauses can only contain fields assigned: null | undefined | boolean | Date | number | string | Relation SELECT`;
/**
 * A query whose SELECT facade is a collection of properties.
 */
class MappableQuery extends DistinguishableQuery {
    nonDistinctSelectClauseToJSON(rawSelect, queryUtils, fieldUtils, relationManager) {
        let select = {};
        for (let property in rawSelect) {
            let value = rawSelect[property];
            if (value instanceof QField) {
                if (this.isEntityQuery) {
                    throw new Error(FIELD_IN_SELECT_CLAUSE_ERROR_MESSAGE);
                }
                // The same value may appear in the SELECT clause more than once.
                // In that case the last one will set the alias for all of them.
                // Because the alias only matters for GROUP_BY and ORDER_BY
                // that is OK.
                select[property] = value.toJSON(this.columnAliases, true, queryUtils, fieldUtils, relationManager);
            }
            else if (value instanceof QOneToManyRelation
                || value instanceof QAirEntityOneToManyRelation) {
                throw new Error(`@OneToMany relation objects can cannot be used in SELECT clauses`);
            } // Must be a primitive
            else {
                let isChildObject = false;
                try {
                    // Must be an entity query here
                    switch (typeof value) {
                        case 'boolean':
                        case 'number':
                        case 'string':
                        case 'undefined':
                            continue;
                        case 'object':
                            if (value instanceof Date) {
                            }
                            else if (value === null) {
                            }
                            else {
                                isChildObject = true;
                                select[property] = this.nonDistinctSelectClauseToJSON(value, queryUtils, fieldUtils, relationManager);
                            }
                    }
                }
                finally {
                    if (!isChildObject && !this.isEntityQuery) {
                        throw new Error(NON_ENTITY_SELECT_ERROR_MESSAGE);
                    }
                }
            }
        }
        return select;
    }
}

/**
 * Created by Papa on 10/24/2016.
 */
class EntityQuery extends MappableQuery {
    constructor(rawQuery) {
        super();
        this.rawQuery = rawQuery;
        this.isEntityQuery = true;
        this.isHierarchicalEntityQuery = true;
    }
    toJSON(queryUtils, fieldUtils, relationManager) {
        return {
            S: this.selectClauseToJSON(this.rawQuery.SELECT, queryUtils, fieldUtils, relationManager),
            F: this.fromClauseToJSON(this.rawQuery.FROM, queryUtils, fieldUtils, relationManager),
            forUpdate: this.rawQuery.FOR_UPDATE,
            W: queryUtils.whereClauseToJSON(this.rawQuery.WHERE, this.columnAliases),
            OB: this.orderByClauseToJSON(this.rawQuery.ORDER_BY)
        };
    }
    nonDistinctSelectClauseToJSON(rawSelect) {
        for (let field in rawSelect) {
            let value = rawSelect[field];
            if (value instanceof QField) {
                throw new Error(`Field References cannot be used in Entity Queries`);
            }
            else if (value instanceof Object && !(value instanceof Date)) {
                this.nonDistinctSelectClauseToJSON(value);
            }
        }
        return rawSelect;
    }
    orderByClauseToJSON(orderBy) {
        if (!orderBy || !orderBy.length) {
            return null;
        }
        return orderBy.map((field) => {
            return field.toEntityJSON();
        });
    }
}

/**
 * Created by Papa on 10/24/2016.
 */
class FieldQuery extends DistinguishableQuery {
    // private qEntityMap: {[entityName: string]: QEntity<any>},
    //	private entitiesRelationPropertyMap: {[entityName: string]: {[propertyName: string]:
    // EntityRelationRecord}},
    //		private entitiesPropertyTypeMap: {[entityName: string]: {[propertyName: string]:
    // boolean}}
    constructor(rawQuery, entityAliases = new EntityAliases()) {
        super(entityAliases);
        this.rawQuery = rawQuery;
    }
    nonDistinctSelectClauseToJSON(rawSelect, queryUtils, fieldUtils, relationManager) {
        if (!(this.rawQuery.SELECT instanceof QField)) {
            throw new Error(NON_ENTITY_SELECT_ERROR_MESSAGE);
        }
        this.columnAliases.entityAliases.getNextAlias(this.rawQuery.SELECT.q.__driver__.getRootJoinEntity());
        return this.rawQuery.SELECT.toJSON(this.columnAliases, true, queryUtils, fieldUtils, relationManager);
    }
    toJSON(queryUtils, fieldUtils, relationManager) {
        let select = this.selectClauseToJSON(this.rawQuery.SELECT, queryUtils, fieldUtils, relationManager);
        let jsonFieldQuery = {
            S: select,
            forUpdate: this.rawQuery.FOR_UPDATE,
            ot: JSONClauseObjectType.FIELD_QUERY,
            dt: this.getClauseDataType()
        };
        return this.getNonEntityQuery(this.rawQuery, jsonFieldQuery, null, queryUtils, fieldUtils, relationManager);
    }
    getClauseDataType() {
        let selectField = this.rawQuery.SELECT;
        if (selectField instanceof QDistinctFunction) {
            selectField = selectField.getSelectClause();
        }
        if (selectField instanceof QBooleanField) {
            return SQLDataType.BOOLEAN;
        }
        else if (selectField instanceof QDateField) {
            return SQLDataType.DATE;
        }
        else if (selectField instanceof QNumberField) {
            return SQLDataType.NUMBER;
        }
        else if (selectField instanceof QStringField) {
            return SQLDataType.STRING;
        }
        else if (selectField instanceof QUntypedField) {
            return SQLDataType.ANY;
        }
        else {
            throw new Error(`Unsupported type of SELECT field in Field Query`);
        }
    }
}

/**
 * Created by Papa on 10/23/2016.
 */
class SheetQuery extends DistinguishableQuery {
    constructor(rawQuery) {
        super();
        this.rawQuery = rawQuery;
    }
    nonDistinctSelectClauseToJSON(rawSelect, queryUtils, fieldUtils, relationManager) {
        if (!(rawSelect instanceof Array)) {
            throw new Error(`Flat Queries an array of fields in SELECT clause.`);
        }
        return rawSelect.map((selectField) => {
            if (!(selectField instanceof QField)) {
                throw new Error(NON_ENTITY_SELECT_ERROR_MESSAGE);
            }
            this.columnAliases.entityAliases.getNextAlias(selectField.q.__driver__.getRootJoinEntity());
            return selectField.toJSON(this.columnAliases, true, queryUtils, fieldUtils, relationManager);
        });
    }
    toJSON(queryUtils, fieldUtils, relationManager) {
        let select = this.selectClauseToJSON(this.rawQuery.SELECT, queryUtils, fieldUtils, relationManager);
        let jsonFieldQuery = {
            S: select,
            forUpdate: this.rawQuery.FOR_UPDATE
        };
        return this.getNonEntityQuery(this.rawQuery, jsonFieldQuery, null, queryUtils, fieldUtils, relationManager);
    }
}

class TreeQuery extends MappableQuery {
    constructor(rawQuery, entityAliases = new EntityAliases()) {
        super(entityAliases);
        this.rawQuery = rawQuery;
    }
    toJSON(queryUtils, fieldUtils, relationManager) {
        let jsonMappedQuery = this.getNonEntityQuery(this.rawQuery, {}, (jsonQuery) => {
            jsonQuery.S = this.selectClauseToJSON(this.rawQuery.SELECT, queryUtils, fieldUtils, relationManager);
            jsonQuery.forUpdate = this.rawQuery.FOR_UPDATE;
        }, queryUtils, fieldUtils, relationManager);
        return jsonMappedQuery;
    }
}

var __decorate$e = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ApplicationUtils_1;
let ApplicationUtils = ApplicationUtils_1 = class ApplicationUtils {
    getDbEntity(applicationIndex, tableIndex) {
        return this.airportDatabase.applications[applicationIndex].currentVersion[0]
            .applicationVersion.entities[tableIndex];
    }
    isActorId(columnName) {
        return columnName === airEntity.ACTOR_LID;
    }
    isActorRecordId(columnName) {
        return columnName === airEntity.ACTOR_RECORD_ID;
    }
    isRepositoryId(columnName) {
        return columnName === airEntity.REPOSITORY_LID;
    }
    doCascade(dbRelation, crudOperation) {
        if (dbRelation.relationType !== EntityRelationType.ONE_TO_MANY) {
            return false;
        }
        if (!dbRelation.oneToManyElems) {
            return false;
        }
        switch (crudOperation) {
            case CRUDOperation.CREATE:
            case CRUDOperation.UPDATE:
            case CRUDOperation.DELETE:
                return true;
            default:
                throw new Error(`Unsupported CRUDOperation '${crudOperation}' for cascade check.`);
        }
    }
    getQEntityConstructor(dbEntity) {
        return this.airportDatabase.qApplications[dbEntity.applicationVersion.application.index]
            .__qConstructors__[dbEntity.index];
    }
    getEntityConstructor(dbEntity) {
        const entityConstructor = this.airportDatabase.qApplications[dbEntity.applicationVersion.application.index]
            .__constructors__[dbEntity.name];
        return entityConstructor;
    }
    getNewEntity(dbEntity) {
        const entityConstructor = this.getEntityConstructor(dbEntity);
        if (!entityConstructor) {
            return {};
        }
        return new entityConstructor();
    }
    isIdEmpty(idValue) {
        return !idValue && idValue !== 0;
    }
    isEmpty(value) {
        return this.isIdEmpty(value) && value !== false && value !== '';
    }
    isRelationColumn(dbColumn) {
        return this.isManyRelationColumn(dbColumn)
            || this.isOneRelationColumn(dbColumn);
    }
    isManyRelationColumn(dbColumn) {
        return !!(dbColumn.manyRelationColumns && dbColumn.manyRelationColumns.length);
    }
    isOneRelationColumn(dbColumn) {
        return !!(dbColumn.oneRelationColumns && dbColumn.oneRelationColumns.length);
    }
    getIdKey(entityObject, dbEntity, failOnNoId = true, 
    // noIdValueCallback: {
    // 	(
    // 		relationColumn: DbColumn,
    // 		value: any,
    // 		propertyNameChains: string[][],
    // 	): boolean;
    // } = null,
    idValueCallback) {
        const keys = this.getIdKeyInfo(entityObject, dbEntity, failOnNoId, idValueCallback);
        return keys.arrayByIdColumnIndex.join('|');
    }
    getIdKeyInfo(entityObject, dbEntity, failOnNoId = true, idValueCallback) {
        if (!dbEntity.idColumns.length) {
            if (failOnNoId) {
                throw new Error(`@Id is not defined on entity '${dbEntity.name}'.`);
            }
            return null;
        }
        const idKeys = {
            arrayByIdColumnIndex: [],
            mapByIdColumnName: {}
        };
        for (const dbColumn of dbEntity.idColumns) {
            const [propertyNameChains, idValue] = this.getColumnPropertyNameChainsAndValue(dbEntity, dbColumn, entityObject, true, failOnNoId);
            idValueCallback && idValueCallback(dbColumn, idValue, propertyNameChains);
            idKeys.arrayByIdColumnIndex.push(idValue);
            idKeys.mapByIdColumnName[dbColumn.name] = idValue;
        }
        return idKeys;
    }
    getColumnPropertyNameChainsAndValue(dbEntity, dbColumn, entityObject, forIdKey = false, generateNegativeIdsForMissing = true) {
        const columnValuesAndPaths = this.getColumnValuesAndPaths(dbColumn, entityObject, [], forIdKey, generateNegativeIdsForMissing);
        const firstColumnValueAndPath = columnValuesAndPaths[0];
        const propertyNameChains = [firstColumnValueAndPath.path];
        const value = firstColumnValueAndPath.value;
        columnValuesAndPaths.reduce((last, current) => {
            if (!this.utils.valuesEqual(last.value, current.value, true)) {
                throw new Error(`Values differ for ${dbEntity.name}.${dbColumn.name}:
						'${last.path.join('.')}' = ${last.value}
						'${current.path.join('.')}' = ${current.value}`);
            }
            propertyNameChains.push(current.path);
            return current;
        });
        return [propertyNameChains, value];
    }
    addRelationToEntitySelectClause(dbRelation, selectClause, allowDefaults = false) {
        this.forEachColumnTypeOfRelation(dbRelation, (dbColumn, propertyNameChains) => {
            let convertTo = true;
            let propertySelectClause = selectClause;
            const firstPropertyNameChain = propertyNameChains[0];
            firstPropertyNameChain.forEach((propertyNameLink, index) => {
                let propertyObject = propertySelectClause[propertyNameLink];
                if (!propertyObject) {
                    propertyObject = {};
                    this.entityStateManager.markAsStub(propertyObject);
                    propertySelectClause[propertyNameLink] = propertyObject;
                }
                else {
                    if (index < firstPropertyNameChain.length - 1) {
                        if (!(propertyObject instanceof Object) || propertyObject instanceof Date) {
                            throw new Error(`Invalid entry:
								...
								{
									...
									${propertyNameLink}: ${propertyObject}
								}
								in '${dbRelation.property.entity.name}.${dbRelation.property.name}',
								Property must be an Object.`);
                        }
                    }
                    else {
                        if (!allowDefaults && !isY(propertyObject)) {
                            const reason = dbRelation.property.isId
                                ? `'${dbRelation.property.entity.name}.${dbRelation.property.name}' is an @Id property`
                                : `'${dbRelation.property.entity.name}' has no @Id - all properties are treated as @Ids`;
                            throw new Error(`Defaults are not allowed in:
								...
								{
									...
									${propertyNameLink}: ${propertyObject}
								}
								${reason}.`);
                        }
                        convertTo = false;
                    }
                }
                propertySelectClause = propertyObject;
            });
            if (convertTo) {
                convertToY(propertySelectClause);
            }
        });
    }
    forEachColumnOfRelation(dbRelation, entity, callback, failOnNoValue = true) {
        const dbEntity = dbRelation.property.entity;
        for (const dbRelationColumn of dbRelation.manyRelationColumns) {
            const dbColumn = dbRelationColumn.manyColumn;
            const [propertyNameChains, value] = this.getColumnPropertyNameChainsAndValue(dbEntity, dbColumn, entity);
            if (callback(dbColumn, value, propertyNameChains)) {
                return;
            }
        }
    }
    forEachColumnTypeOfRelation(dbRelation, callback) {
        for (const dbRelationColumn of dbRelation.manyRelationColumns) {
            const dbColumn = dbRelationColumn.manyColumn;
            const propertyNameChains = this.getColumnPaths(dbColumn, []);
            if (callback(dbColumn, propertyNameChains)) {
                return;
            }
        }
    }
    getSheetSelectFromSetClause(dbEntity, qEntity, setClause, errorPrefix) {
        const selectClause = [];
        let actorIdColumnIndex;
        let actorRecordIdColumnIndex;
        let repositoryIdColumnIndex;
        let systemWideOperationIdColumn;
        for (const columnIndex in dbEntity.columns) {
            const dbColumn = dbEntity.columns[columnIndex];
            let dbProperty;
            const isIdColumn = dbColumn.propertyColumns.some(propertyColumn => {
                dbProperty = propertyColumn.property;
                return dbProperty.isId;
            });
            let nonIdColumnSet = false;
            if (isIdColumn) {
                if (setClause[dbColumn.name]) {
                    throw new Error(errorPrefix + `Cannot update @Id column '${dbColumn.name}' 
of property '${dbEntity.name}.${dbProperty.name}'.`);
                }
                this.addColumnToSheetSelect(dbColumn, qEntity, selectClause);
            }
            else if (setClause[dbColumn.name]) {
                nonIdColumnSet = true;
                this.addColumnToSheetSelect(dbColumn, qEntity, selectClause);
                // } else {
                // entitySelectClause[dbColumn.index] = null;
            }
            const inQueryColumnIndex = selectClause.length - 1;
            switch (dbColumn.name) {
                case airEntity.ACTOR_LID:
                    actorIdColumnIndex = inQueryColumnIndex;
                    break;
                case airEntity.ACTOR_RECORD_ID:
                    actorRecordIdColumnIndex = inQueryColumnIndex;
                    break;
                case airEntity.REPOSITORY_LID:
                    repositoryIdColumnIndex = inQueryColumnIndex;
                    break;
                case airEntity.SYSTEM_WIDE_OPERATION_ID:
                    if (nonIdColumnSet) {
                        throw new Error(errorPrefix +
                            `Cannot update 'systemWideOperationId' of Repository Entities.`);
                    }
                    systemWideOperationIdColumn = dbColumn;
                    break;
            }
        }
        return {
            actorIdColumnIndex,
            actorRecordIdColumnIndex,
            repositoryIdColumnIndex,
            selectClause,
            systemWideOperationIdColumn
        };
    }
    getColumnValuesAndPaths(dbColumn, relationObject, breadCrumb, forIdKey = false, generateNegativeIdsForMissing = true
    // noIdValueCallback: {
    // 	(
    // 		relationColumn: DbColumn,
    // 		value: any,
    // 		propertyNameChains: string[][],
    // 	): void;
    // }
    ) {
        if (this.isManyRelationColumn(dbColumn)) {
            let columnValuesAndPaths = [];
            // If a column is part of a relation, it would be on the Many Side
            for (const dbRelationColumn of dbColumn.manyRelationColumns) {
                const dbProperty = dbRelationColumn.manyRelation.property;
                const relationBreadCrumb = [...breadCrumb];
                const propertyName = dbProperty.name;
                relationBreadCrumb.push(propertyName);
                const value = relationObject[propertyName];
                if (!value) {
                    if (forIdKey
                    // && this.handleNoId(dbColumn, dbProperty, relationBreadCrumb, value,
                    // noIdValueCallback)
                    ) {
                        throw new Error(`Cannot retrieve composite Id value, value chain '${relationBreadCrumb.join('.')}' is : ${value}.`);
                        // return null;
                    }
                    columnValuesAndPaths.push({
                        path: relationBreadCrumb,
                        value
                    });
                }
                else {
                    const otherEntityColumn = dbRelationColumn.oneColumn;
                    const relationValuesAndPaths = this.getColumnValuesAndPaths(otherEntityColumn, value, relationBreadCrumb, forIdKey);
                    columnValuesAndPaths = columnValuesAndPaths.concat(relationValuesAndPaths);
                }
            }
            return columnValuesAndPaths;
        }
        else {
            // If a column is not a part of (a) relation(s) then it is associated
            // to only one property
            const dbProperty = dbColumn.propertyColumns[0].property;
            const propertyBreadCrumb = [...breadCrumb];
            const propertyName = dbProperty.name;
            propertyBreadCrumb.push(propertyName);
            let value = relationObject[propertyName];
            if (forIdKey && this.isIdEmpty(value)) {
                if (dbColumn.isGenerated) {
                    if (generateNegativeIdsForMissing) {
                        value = --ApplicationUtils_1.TEMP_ID;
                    }
                    else {
                        value = null;
                    }
                    relationObject[propertyName] = value;
                }
                else {
                    // if (this.handleNoId(dbColumn, dbProperty, propertyBreadCrumb, value,
                    // noValueCallback)) { return null; }
                    throw new Error(`Cannot retrieve composite Id value, value chain '${propertyBreadCrumb.join('.')}' is : ${value}.`);
                }
            }
            return [{
                    path: propertyBreadCrumb,
                    value
                }];
        }
    }
    getColumnPaths(dbColumn, breadCrumb) {
        let columnValuesAndPaths = [];
        if (this.isManyRelationColumn(dbColumn)) {
            // If a column is part of a relation, it would be on the Many Side
            for (const dbRelationColumn of dbColumn.manyRelationColumns) {
                const dbProperty = dbRelationColumn.manyRelation.property;
                const relationBreadCrumb = [...breadCrumb];
                relationBreadCrumb.push(dbProperty.name);
                const otherEntityColumn = dbRelationColumn.oneColumn;
                const relationValuesAndPaths = this.getColumnPaths(otherEntityColumn, relationBreadCrumb);
                columnValuesAndPaths = columnValuesAndPaths.concat(relationValuesAndPaths);
            }
        }
        else {
            // If a column is not a part of (a) relation(s) then it is associated
            // to only one property
            const dbProperty = dbColumn.propertyColumns[0].property;
            const propertyBreadCrumb = [...breadCrumb];
            propertyBreadCrumb.push(dbProperty.name);
            columnValuesAndPaths.push(propertyBreadCrumb);
        }
        return columnValuesAndPaths;
    }
    addColumnToSheetSelect(dbColumn, qEntity, entitySelectClause) {
        if (this.isManyRelationColumn(dbColumn)) {
            const columnPaths = this.getColumnPaths(dbColumn, []);
            const firstColumnPath = columnPaths[0];
            let relationColumn = qEntity[firstColumnPath[0]];
            firstColumnPath.reduce((last, current) => {
                relationColumn = relationColumn[current];
                return current;
            });
            entitySelectClause.push(relationColumn);
        }
        else {
            entitySelectClause.push(qEntity[dbColumn.propertyColumns[0].property.name]);
        }
    }
    /*
        private addColumnToEntitySelect(
            dbColumn: DbColumn,
            entitySelectClause: any,
        ) {
            const dbRelation = dbColumn.relation;
            if (dbRelation) {
                let selectClauseFragment = entitySelectClause;
                let lastSelectClauseFragment;
                let sourceColumn = dbColumn;
                let lastPropertyName;
                do {
                    lastPropertyName = sourceColumn.property.name;
                    lastSelectClauseFragment = selectClauseFragment;
                    if (!lastSelectClauseFragment[lastPropertyName]) {
                        selectClauseFragment = {};
                        lastSelectClauseFragment[lastPropertyName] = selectClauseFragment;
                    } else {
                        selectClauseFragment = lastSelectClauseFragment[lastPropertyName];
                    }
                    const relationColumn = sourceColumn.relation.relationColumns.filter(
                        relationColumn => relationColumn.ownColumn.index === sourceColumn.index)[0];
                    sourceColumn = relationColumn.relationColumn;
                } while (sourceColumn.relation);
                lastSelectClauseFragment[lastPropertyName] = null;
            } else {
                entitySelectClause[dbColumn.property.name] = null;
            }
        }
    */
    handleNoId(dbColumn, dbProperty, propertyNameChains, value, noIdValueCallback) {
        if (noIdValueCallback) {
            if (!noIdValueCallback(dbColumn, value, propertyNameChains)) {
                return true;
            }
        }
        else {
            throw new Error(`Cannot retrieve composite Id value, value chain '${propertyNameChains.join('.')}' is : ${value}.`);
        }
        return false;
    }
};
ApplicationUtils.TEMP_ID = 0;
__decorate$e([
    Inject()
], ApplicationUtils.prototype, "airportDatabase", void 0);
__decorate$e([
    Inject()
], ApplicationUtils.prototype, "entityStateManager", void 0);
__decorate$e([
    Inject()
], ApplicationUtils.prototype, "utils", void 0);
ApplicationUtils = ApplicationUtils_1 = __decorate$e([
    Injected()
], ApplicationUtils);

var __decorate$d = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Papa on 6/14/2016.
 */
let EntityUtils = class EntityUtils {
    getObjectClassName(object) {
        if (typeof object != 'object' || object === null) {
            throw new Error(`Not an object instance`);
        }
        return this.getClassName(object.constructor);
    }
    getClassName(clazz) {
        if (typeof clazz != 'function') {
            throw new Error(`Not a constructor function`);
        }
        let className = clazz['name'];
        // let className = /(\w+)\(/.exec(clazz.toString())[1];
        return className;
    }
    exists(object) {
        return this.utils.objectExists(object);
    }
    /*
     static isBlank(
     object: any
     ) {
     for (let propertyName in object) {
     let property = object[propertyName];
     if (this.exists(property)) {
     if (property instanceof Array) {
     if (property.length > 0) {
     return false;
     }
     } else {
     return false;
     }
     }
     }
     return true;
     }
     */
    isAppliable(object) {
        return object instanceof QOperableField;
    }
    getQuery(query) {
        return this.getRawQuery(query);
    }
    ensureId(rawEntityQuery) {
        let theRawEntityQuery = this.getRawQuery(rawEntityQuery);
        this.ensureIdAtLevel(theRawEntityQuery.SELECT, theRawEntityQuery.FROM[0]);
        return theRawEntityQuery;
    }
    ensureIdAtLevel(selectClauseFragment, qEntity) {
        for (const propertyName in selectClauseFragment) {
            const subFragment = selectClauseFragment[propertyName];
            if (subFragment instanceof Object
                && typeof subFragment.airportSelectField !== 'boolean'
                && !subFragment.__allFields__) {
                let matchingQEntity;
                for (const childQEntity of qEntity.__driver__.childQEntities) {
                    if (childQEntity.__driver__.dbRelation.property.name === propertyName) {
                        matchingQEntity = childQEntity;
                        break;
                    }
                }
                if (matchingQEntity) {
                    this.ensureIdAtLevel(subFragment, matchingQEntity);
                }
            }
        }
        if (!selectClauseFragment.id) {
            return;
        }
        let repository = selectClauseFragment.repository;
        if (repository) {
            if (!(repository instanceof Object)) {
                throw new Error(`id queries must include a repository object in the SELECT clause.
It must be an Object with the id property.`);
            }
            repository.GUID = Y;
        }
        let actor = selectClauseFragment.actor;
        if (actor) {
            if (!(actor instanceof Object)) {
                throw new Error(`id queries must include an actor object in the SELECT clause.
It must be an Object with the id property.`);
            }
            actor.GUID = Y;
        }
        selectClauseFragment._actorRecordId = Y;
        this.ensureRepositoryAndActorJoin(qEntity);
    }
    ensureRepositoryAndActorJoin(qEntity) {
        let qActor, qRepository;
        let repositoryJoinFound = false;
        let actorJoinFound = false;
        for (const childQEntity of qEntity.__driver__.childQEntities) {
            if (childQEntity.__driver__.dbRelation.property.name === ACTOR_PROPERTY_NAME) {
                actorJoinFound = true;
                qActor = childQEntity;
            }
            if (childQEntity.__driver__.dbRelation.property.name === REPOSITORY_PROPERTY_NAME) {
                repositoryJoinFound = true;
                qRepository = childQEntity;
            }
        }
        if (!actorJoinFound) {
            qActor = qEntity.actor.LEFT_JOIN();
        }
        if (!repositoryJoinFound) {
            qRepository = qEntity.repository.LEFT_JOIN();
        }
        return {
            qActor,
            qRepository
        };
    }
    findActorQEntity() {
    }
    // Removes circular dependency at code initialization time
    getRawQuery(rawQuery) {
        if (rawQuery instanceof Function) {
            return rawQuery();
        }
        else {
            return rawQuery;
        }
    }
    // Removes circular dependency at code initialization time
    getEntityQuery(rawGraphQuery) {
        return new EntityQuery(this.getRawQuery(rawGraphQuery));
    }
    // Removes circular dependency at code initialization time
    getTreeQuery(rawQuery, entityAliases) {
        return new TreeQuery(rawQuery, entityAliases);
    }
    // Removes circular dependency at code initialization time
    isQEntity(qEntity) {
        return qEntity instanceof QEntity;
    }
    // Removes circular dependency at code initialization time
    isQTree(qEntity) {
        return qEntity instanceof QTreeDriver;
    }
    // Removes circular dependency at code initialization time
    getQTree(fromClausePosition, subQuery) {
        return new QTree(fromClausePosition, subQuery);
    }
    // Removes circular dependency at code initialization time
    isQField(qEntity) {
        return qEntity instanceof QField;
    }
};
__decorate$d([
    Inject()
], EntityUtils.prototype, "utils", void 0);
EntityUtils = __decorate$d([
    Injected()
], EntityUtils);
ENTITY_UTILS.setClass(EntityUtils);

var __decorate$c = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let FieldUtils = class FieldUtils {
    getFieldQueryJson(fieldSubQuery, entityAliases, queryUtils) {
        let subSelectQuery = new FieldQuery(fieldSubQuery, entityAliases);
        return subSelectQuery.toJSON(queryUtils, this, this.relationManager);
    }
};
__decorate$c([
    Inject()
], FieldUtils.prototype, "relationManager", void 0);
FieldUtils = __decorate$c([
    Injected()
], FieldUtils);

var __decorate$b = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let QMetadataUtils = class QMetadataUtils {
    getAllColumns(qEntity) {
        return qEntity.__driver__.allColumns;
    }
    getAllNonGeneratedColumns(qEntity) {
        return this.getAllColumns(qEntity).filter(qField => !qField.dbColumn.isGenerated);
    }
    getAllInsertableColumns(qEntity) {
        return this.getAllColumns(qEntity).filter(qField => {
            if (qField.dbColumn.isGenerated) {
                return false;
            }
            if (qEntity.__driver__.dbEntity.isAirEntity) {
                switch (qField.dbColumn.name) {
                    case airEntity.SYSTEM_WIDE_OPERATION_ID:
                        return false;
                }
            }
            return true;
        });
    }
    getDbEntity(qEntity) {
        return qEntity.__driver__.dbEntity;
    }
    getNewEntity(qEntity, airDb) {
        const dbEntity = qEntity.__driver__.dbEntity;
        const entityConstructor = airDb.qApplications[dbEntity.applicationVersion.application.index].__constructors__[dbEntity.name];
        if (!entityConstructor) {
            return {};
        }
        return new entityConstructor();
    }
};
QMetadataUtils = __decorate$b([
    Injected()
], QMetadataUtils);

var __decorate$a = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let QueryUtils = class QueryUtils {
    equals(entityOrId, toObject // | IQRelation<IQ>
    ) {
        if (!entityOrId) {
            throw new Error(`null entity/Id is passed into 'equals' method`);
        }
        const { qActor, qRepository } = this.entityUtils.ensureRepositoryAndActorJoin(toObject);
        if (entityOrId instanceof QEntity) {
            const relationIdEntities = this.entityUtils
                .ensureRepositoryAndActorJoin(entityOrId);
            return AND(qRepository.GUID.equals(relationIdEntities.qRepository.repository.GUID), qActor.GUID.equals(relationIdEntities.qActor.actor.GUID), toObject._actorRecordId.equals(entityOrId._actorRecordId));
        }
        else {
            let entityId = this.validateEntityId(entityOrId);
            return AND(qRepository.GUID.equals(entityId.repository.GUID), qActor.GUID.equals(entityId.actor.GUID), toObject._actorRecordId.equals(entityId._actorRecordId));
        }
    }
    in(entitiesOrIds, toObject // | IQRelation<IQ>
    ) {
        if (!entitiesOrIds || !entitiesOrIds.length) {
            throw new Error(`null entity/Id array is passed into 'in' method`);
        }
        let entityIds = entitiesOrIds.map(entityOrId => this.validateEntityId(entityOrId));
        const { qActor, qRepository } = this.entityUtils.ensureRepositoryAndActorJoin(toObject);
        const equalOperations = [];
        for (const entityId of entityIds) {
            equalOperations.push(AND(qRepository.GUID.equals(entityId.repository.GUID), qActor.GUID.equals(entityId.actor.GUID), toObject._actorRecordId.equals(entityId._actorRecordId)));
        }
        return OR(...equalOperations);
    }
    validateEntityId(entityId) {
        if (typeof entityId === 'string') {
            return this.airEntityUtils.parseEGUID(entityId);
        }
        else {
            if (!entityId.repository
                || !entityId.repository.GUID
                || typeof entityId.repository.GUID !== 'string'
                || !entityId.actor
                || !entityId.actor.GUID
                || typeof entityId.actor.GUID !== 'number'
                || !entityId._actorRecordId
                || typeof entityId._actorRecordId !== 'number') {
                throw new Error(`Passed in AirEntity does not have
				the necessary fields to query by id.  Expecting:
					interface AnInterface extends AirEntity {
						repository: {
							GUID: string
						},
						actor: {
							GUID: string
						},
						_actorRecordId: number
					}
					`);
            }
            return entityId;
        }
    }
    whereClauseToJSON(whereClause, columnAliases) {
        if (!whereClause) {
            return null;
        }
        let operation = whereClause;
        let jsonOperation = {
            c: operation.c,
            o: operation.o
        };
        switch (operation.c) {
            case OperationCategory.LOGICAL:
                let logicalOperation = operation;
                let jsonLogicalOperation = jsonOperation;
                switch (operation.o) {
                    case SqlOperator.NOT:
                        jsonLogicalOperation.v = this.whereClauseToJSON(logicalOperation.v, columnAliases);
                        break;
                    case SqlOperator.AND:
                    case SqlOperator.OR:
                        jsonLogicalOperation.v = logicalOperation.v.map((value) => this.whereClauseToJSON(value, columnAliases));
                        break;
                    default:
                        throw new Error(`Unsupported logical operation '${operation.o}'`);
                }
                break;
            case OperationCategory.FUNCTION:
                // TODO: verify that cast of Q object is valid
                let functionOperation = operation;
                let query = functionOperation.getQuery();
                let jsonQuery = IOC.getSync(ENTITY_UTILS).getTreeQuery(query, columnAliases.entityAliases).toJSON(this, this.fieldUtils, this.relationManager);
                jsonOperation = functionOperation.toJSON(jsonQuery);
                break;
            case OperationCategory.BOOLEAN:
            case OperationCategory.DATE:
            case OperationCategory.NUMBER:
            case OperationCategory.STRING:
            case OperationCategory.UNTYPED:
                let valueOperation = operation;
                // All Non logical or exists operations are value operations (equals, IS_NULL, LIKE,
                // etc.)
                let jsonValueOperation = jsonOperation;
                jsonValueOperation.l = this.convertLRValue(valueOperation.l, columnAliases);
                let rValue = valueOperation.r;
                if (rValue instanceof Array) {
                    jsonValueOperation.r = rValue.map((anRValue) => {
                        return this.convertLRValue(anRValue, columnAliases);
                    });
                }
                else {
                    jsonValueOperation.r = this.convertLRValue(rValue, columnAliases);
                }
                break;
        }
        return jsonOperation;
    }
    convertLRValue(value, columnAliases) {
        value = wrapPrimitive(value);
        switch (typeof value) {
            case 'undefined':
                throw new Error(`'undefined' is not a valid L or R value`);
            default:
                if (value instanceof QOperableField) {
                    return value.toJSON(columnAliases, false, this, this.fieldUtils, this.relationManager);
                } // Must be a Field Query
                else {
                    let rawFieldQuery = value;
                    return this.fieldUtils.getFieldQueryJson(rawFieldQuery, columnAliases.entityAliases, this);
                }
        }
    }
};
__decorate$a([
    Inject()
], QueryUtils.prototype, "entityUtils", void 0);
__decorate$a([
    Inject()
], QueryUtils.prototype, "fieldUtils", void 0);
__decorate$a([
    Inject()
], QueryUtils.prototype, "relationManager", void 0);
__decorate$a([
    Inject()
], QueryUtils.prototype, "airEntityUtils", void 0);
QueryUtils = __decorate$a([
    Injected()
], QueryUtils);

const databaseState = {
    applications: [],
    entityMap: new Map(),
    functions: {
        ABS,
        ADD,
        AVG,
        CONCAT,
        COUNT,
        DISTINCT,
        DIVIDE,
        EXISTS,
        FORMAT,
        INTERSECT,
        LCASE,
        LEN,
        ROUND,
        MAX,
        MID,
        MIN,
        MINUS,
        MODULUS,
        MULTIPLY,
        NOW,
        REPLACE,
        SUBTRACT,
        SUM,
        TRIM,
        UCASE,
        UNION,
        UNION_ALL,
        // logical operators
        AND,
        NOT,
        OR,
        // primitive wrappers
        bool,
        date,
        num,
        str,
        wrapPrimitive,
    },
    qApplications: [],
    QM: {},
};

var __decorate$9 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let DatabaseStore = class DatabaseStore {
    constructor() {
        this.databaseState = databaseState;
    }
    get applications() {
        return this.databaseState.applications;
    }
    get entityMap() {
        return this.databaseState.entityMap;
    }
    get functions() {
        return this.databaseState.functions;
    }
    get qApplications() {
        return this.databaseState.qApplications;
    }
    get QM() {
        return this.databaseState.QM;
    }
};
DatabaseStore = __decorate$9([
    Injected()
], DatabaseStore);

var __decorate$8 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let RelationManager = class RelationManager {
    getPositionAlias(rootEntityPrefix, fromClausePosition) {
        return `${rootEntityPrefix}_${fromClausePosition.join('_')}`;
    }
    getAlias(jsonRelation) {
        return this.getPositionAlias(jsonRelation.rep, jsonRelation.fromClausePosition);
    }
    getParentAlias(jsonRelation) {
        let fromClausePosition = jsonRelation.fromClausePosition;
        if (fromClausePosition.length === 0) {
            throw new Error(`Cannot find alias of a parent entity for the root entity`);
        }
        return this.getPositionAlias(jsonRelation.rep, fromClausePosition.slice(0, fromClausePosition.length - 1));
    }
    createRelatedQEntity(joinRelation, context) {
        const dbEntity = this.applicationUtils.getDbEntity(joinRelation.si, joinRelation.ti);
        let QEntityConstructor = this.applicationUtils.getQEntityConstructor(dbEntity);
        return new QEntityConstructor(dbEntity, this.applicationUtils, this, joinRelation.fromClausePosition, dbEntity.relations[joinRelation.ri], joinRelation.jt);
    }
    getNextChildJoinPosition(joinParentDriver) {
        let nextChildJoinPosition = joinParentDriver.fromClausePosition.slice();
        nextChildJoinPosition.push(++joinParentDriver.currentChildIndex);
        return nextChildJoinPosition;
    }
};
__decorate$8([
    Inject()
], RelationManager.prototype, "applicationUtils", void 0);
RelationManager = __decorate$8([
    Injected()
], RelationManager);

var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let Utils = class Utils {
    strsToNums(strings) {
        return strings.map(str => parseInt(str));
    }
    objectExists(object) {
        return object !== null && object !== undefined;
    }
    valuesEqual(value1, value2, checkChildObjects = false) {
        if (typeof value1 === 'object') {
            if (value1 instanceof Date) {
                if (value2 instanceof Date) {
                    return value1.getTime() === value2.getTime();
                }
                else {
                    return false;
                }
            }
            else {
                if (typeof value2 !== 'object') {
                    return false;
                }
                if (!checkChildObjects) {
                    // Skip child objects
                    return true;
                }
                let checkedKeys = {};
                for (let key in value1) {
                    checkedKeys[key] = true;
                    if (!this.valuesEqual(value1[key], value2[key], checkChildObjects)) {
                        return false;
                    }
                }
                for (let key in value2) {
                    if (!checkedKeys[key]) {
                        return false;
                    }
                }
                return true;
            }
        }
        if (!value1) {
            if (value1 === '') {
                return value2 === '';
            }
            else if (value1 === false) {
                return value2 === false;
            }
            else if (value1 === 0) {
                return value2 === 0;
            }
            if (value2 === '' || value2 === false || value2 === 0) {
                return false;
            }
            // treat undefined and null as same value
            return (!value2);
        }
        if (!value2) {
            return false;
        }
        return value1 === value2;
    }
    compareNumbers(number1, number2) {
        if (number1 < number2) {
            return -1;
        }
        if (number1 > number2) {
            return 1;
        }
        return 0;
    }
};
Utils = __decorate$7([
    Injected()
], Utils);

const airTrafficControl = lib('air-traffic-control');

// Separating core-tokens from tokens removes circular dependencies
// at code initialization time
const UTILS = airTrafficControl.token({
    class: Utils,
    interface: 'IUtils',
    token: 'UTILS'
});
ENTITY_UTILS.setDependencies({
    utils: UTILS
});
QUERY_UTILS.setClass(QueryUtils);

var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let AirEntityUtils = class AirEntityUtils {
    getCreatedBy(airEntity) {
        return airEntity.actor.userAccount;
    }
    encodeId(idObject) {
        if (!idObject.repository
            || !idObject.repository.GUID
            || !idObject.actor
            || !idObject.actor.GUID
            || !idObject._actorRecordId) {
            return null;
        }
        if (typeof idObject.repository.GUID !== 'string') {
            throw Error(`Type of "repository.GUID" property is not a string.`);
        }
        if (typeof idObject.actor.GUID !== 'string') {
            throw Error(`Type of "actor.GUID" property is not a string.`);
        }
        if (typeof idObject._actorRecordId !== 'number') {
            throw Error(`Type of "_actorRecordId" property is not a number.`);
        }
        return idObject.repository.GUID + '-' + idObject.actor.GUID + '-' + idObject._actorRecordId;
    }
    parseEGUID(idString) {
        const idStringFragments = idString.split('-');
        if (idStringFragments.length !== 11) {
            throw new Error('Invalid Entity Id, expecting ${repository.GUID}-${actor.GUID}-${_actorRecordId}');
        }
        const repositoryGUIDFragments = [];
        for (let i = 0; i < 5; i++) {
            repositoryGUIDFragments.push(idStringFragments[i]);
        }
        const actorGUIDFragments = [];
        for (let i = 5; i < 10; i++) {
            actorGUIDFragments.push(idStringFragments[i]);
        }
        return {
            repository: {
                GUID: repositoryGUIDFragments.join('-')
            },
            actor: {
                GUID: actorGUIDFragments.join('-')
            },
            _actorRecordId: parseInt(idStringFragments[11])
        };
    }
    setId(idString, airEntity) {
        if (!idString) {
            return;
        }
        let airEntityId = this.parseEGUID(idString);
        if (!airEntity.repository) {
            airEntity.repository = {
                GUID: airEntityId.repository.GUID
            };
        }
        else {
            airEntity.repository.GUID = airEntityId.repository.GUID;
        }
        if (!airEntity.actor) {
            airEntity.actor = {
                GUID: airEntityId.repository.GUID
            };
        }
        else {
            airEntity.actor.GUID = airEntityId.actor.GUID;
        }
        airEntity._actorRecordId = airEntityId._actorRecordId;
    }
};
AirEntityUtils = __decorate$6([
    Injected()
], AirEntityUtils);

const aviationCommunication = lib('aviation-communication');
const AIR_ENTITY_UTILS = aviationCommunication.token({
    class: AirEntityUtils,
    interface: 'IAirEntityUtils',
    token: 'AIR_ENTITY_UTILS'
});

var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class LookupProxy {
    constructor(dao) {
        this.dao = dao;
    }
    ensureContext(context) {
        return doEnsureContext(context);
    }
    async lookup(rawQuery, queryResultType, search, one, QueryClass, context, mapResults) {
        return await this.dao.lookup.lookup(rawQuery, queryResultType, search, one, QueryClass, context, mapResults);
    }
}
let Lookup = class Lookup {
    ensureContext(context) {
        return doEnsureContext(context);
    }
    async lookup(rawQuery, queryResultType, search, one, QueryClass, context) {
        let query;
        if (QueryClass) {
            const rawNonEntityQuery = this.entityUtils.getQuery(rawQuery);
            query = new QueryClass(rawNonEntityQuery);
        }
        else {
            query = this.entityUtils.getEntityQuery(rawQuery);
        }
        let queryMethod;
        if (search) {
            if (one) {
                queryMethod = this.queryFacade.searchOne;
            }
            else {
                queryMethod = this.queryFacade.search;
            }
        }
        else {
            if (one) {
                queryMethod = this.queryFacade.findOne;
            }
            else {
                queryMethod = this.queryFacade.find;
            }
        }
        let result = await queryMethod.call(this.queryFacade, query, queryResultType, context);
        if (!one && !result) {
            result = [];
        }
        return result;
    }
};
__decorate$5([
    Inject()
], Lookup.prototype, "entityUtils", void 0);
__decorate$5([
    Inject()
], Lookup.prototype, "queryFacade", void 0);
Lookup = __decorate$5([
    Injected()
], Lookup);
function doEnsureContext(context) {
    if (!context) {
        context = {};
    }
    if (!context.startedAt) {
        context.startedAt = new Date();
    }
    return context;
}

class EntityLookup extends LookupProxy {
    constructor(dbEntity, dao, mapResults = EntityLookup.mapResults) {
        super(dao);
        this.dbEntity = dbEntity;
        this.mapResults = mapResults;
    }
    setNoCache(ChildClass) {
        return new ChildClass(this.dbEntity, this.dao, this.mapResults);
    }
    async entityLookup(rawEntityQuery, queryResultType, search, one, context) {
        context.dbEntity = this.dbEntity;
        rawEntityQuery = IOC.getSync(ENTITY_UTILS)
            .ensureId(rawEntityQuery);
        const result = await this.lookup(rawEntityQuery, queryResultType, search, one, null, context, this.mapResults);
        if (search) {
            throw new Error(`Search operations are not yet supported`);
        }
        else {
            this.dao.updateCacheManager.saveOriginalValues(result, context.dbEntity);
        }
        return result;
    }
}
EntityLookup.mapResults = false;

/**
 * Created by Papa on 11/12/2016.
 */
class EntityFind extends EntityLookup {
    async graph(rawGraphQuery, context) {
        return await this.find(rawGraphQuery, QueryResultType.ENTITY_GRAPH, context);
    }
    async tree(rawTreeQuery, context) {
        return await this.find(rawTreeQuery, QueryResultType.ENTITY_TREE, context);
    }
    async find(rawEntityQuery, queryResultType, context) {
        return await this.entityLookup(rawEntityQuery, queryResultType, false, false, this.ensureContext(context));
    }
    noCache() {
        return this.setNoCache(EntityFind);
    }
}

/**
 * Created by Papa on 11/12/2016.
 */
class EntityFindOne extends EntityLookup {
    async graph(rawGraphQuery, context) {
        return await this.findOne(rawGraphQuery, QueryResultType.ENTITY_GRAPH, context);
    }
    async tree(rawTreeQuery, context) {
        return await this.findOne(rawTreeQuery, QueryResultType.ENTITY_TREE, context);
    }
    // TODO: return Observable from deep within the framework
    // and detect changes to the underlying data
    async findOne(rawEntityQuery, queryResultType, context) {
        return await this.entityLookup(rawEntityQuery, queryResultType, false, true, this.ensureContext(context));
    }
    noCache() {
        return this.setNoCache(EntityFindOne);
    }
}

var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Papa on 11/12/2016.
 */
let NonEntityFind = class NonEntityFind extends Lookup {
    field(rawFieldQuery, context) {
        return this.find(rawFieldQuery, QueryResultType.FIELD, FieldQuery, context);
    }
    sheet(rawSheetQuery, cursorSize, callback, context) {
        if (cursorSize || callback) {
            throw new Error(`Implement!`);
        }
        return this.find(rawSheetQuery, QueryResultType.SHEET, SheetQuery, context);
    }
    tree(rawTreeQuery, context) {
        return this.find(rawTreeQuery, QueryResultType.TREE, TreeQuery, context);
    }
    find(rawNonEntityQuery, queryResultType, QueryClass, context) {
        return this.lookup(rawNonEntityQuery, queryResultType, false, false, QueryClass, this.ensureContext(context));
    }
};
NonEntityFind = __decorate$4([
    Injected()
], NonEntityFind);

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Papa on 11/12/2016.
 */
let NonEntityFindOne = class NonEntityFindOne extends Lookup {
    field(rawFieldQuery, context) {
        return this.findOne(rawFieldQuery, QueryResultType.FIELD, FieldQuery, context);
    }
    sheet(rawSheetQuery, context) {
        return this.findOne(rawSheetQuery, QueryResultType.SHEET, SheetQuery, context);
    }
    tree(rawTreeQuery, context) {
        return this.findOne(rawTreeQuery, QueryResultType.TREE, TreeQuery, context);
    }
    findOne(rawNonEntityQuery, queryResultType, QueryClass, context) {
        return this.lookup(rawNonEntityQuery, queryResultType, false, true, QueryClass, this.ensureContext(context));
    }
};
NonEntityFindOne = __decorate$3([
    Injected()
], NonEntityFindOne);

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Papa on 11/12/2016.
 */
let NonEntitySearch = class NonEntitySearch extends Lookup {
    field(rawFieldQuery, context) {
        return from(this.search(rawFieldQuery, QueryResultType.FIELD, FieldQuery, context));
    }
    sheet(rawSheetQuery, context) {
        return from(this.search(rawSheetQuery, QueryResultType.SHEET, SheetQuery, context));
    }
    tree(rawTreeQuery, context) {
        return from(this.search(rawTreeQuery, QueryResultType.TREE, TreeQuery, context));
    }
    search(rawNonEntityQuery, queryResultType, QueryClass, context) {
        return this.lookup(rawNonEntityQuery, queryResultType, true, false, QueryClass, this.ensureContext(context));
    }
};
NonEntitySearch = __decorate$2([
    Injected()
], NonEntitySearch);

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Papa on 11/12/2016.
 */
let NonEntitySearchOne = class NonEntitySearchOne extends Lookup {
    field(rawFieldQuery, context) {
        return from(this.searchOne(rawFieldQuery, QueryResultType.FIELD, FieldQuery, context));
    }
    sheet(rawSheetQuery, context) {
        return from(this.searchOne(rawSheetQuery, QueryResultType.SHEET, SheetQuery, context));
    }
    tree(rawTreeQuery, context) {
        return from(this.searchOne(rawTreeQuery, QueryResultType.TREE, TreeQuery, context));
    }
    searchOne(rawNonEntityQuery, queryResultType, QueryClass, context) {
        return this.lookup(rawNonEntityQuery, queryResultType, true, true, QueryClass, this.ensureContext(context));
    }
};
NonEntitySearchOne = __decorate$1([
    Injected()
], NonEntitySearchOne);

/**
 * Created by Papa on 12/11/2016.
 */
class EntityDatabaseFacade {
    // search: IEntitySearch<Entity, Array<Entity>, EntitySelect>;
    // searchOne: IEntitySearchOne<Entity, EntitySelect>;
    constructor(dbEntity, Q, dao) {
        this.dbEntity = dbEntity;
        this.Q = Q;
        this.dao = dao;
        this.find = new EntityFind(this.dbEntity, dao);
        this.findOne = new EntityFindOne(this.dbEntity, dao);
        // this.search = new EntitySearch<Entity, Array<Entity>, EntitySelect>(
        //   this.dbEntity, updateCacheManager);
        // this.searchOne = new EntitySearchOne(this.dbEntity, updateCacheManager);
    }
    get FROM() {
        return this.Q[this.dbEntity.name];
    }
    async insertColumnValues(rawInsertColumnValues, ctx) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.insertColumnValues(rawInsertColumnValues, ctx);
        });
    }
    async insertValues(rawInsertValues, ctx) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.insertValues(rawInsertValues, ctx);
        });
    }
    async insertColumnValuesGenerateIds(rawInsertColumnValues, ctx) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.insertColumnValuesGenerateIds(rawInsertColumnValues, ctx);
        });
    }
    async insertValuesGenerateIds(rawInsertValues, ctx) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.insertValuesGenerateIds(rawInsertValues, ctx);
        });
    }
    async updateColumnsWhere(rawUpdateColumns, ctx) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.updateColumnsWhere(rawUpdateColumns, ctx);
        });
    }
    async updateWhere(rawUpdate, ctx) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.updateWhere(rawUpdate, ctx);
        });
    }
    async deleteWhere(rawDelete, ctx) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.deleteWhere(rawDelete, ctx);
        });
    }
    async save(entity, ctx) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.save(entity, ctx);
        });
    }
    /**
     * @return ISaveResult object with metadata on saved objects
     */
    async saveToDestination(repositoryDestination, entity, ctx) {
        return await this.withDbEntity(ctx, async (databaseFacade, ctx) => {
            return await databaseFacade.saveToDestination(repositoryDestination, entity, ctx);
        });
    }
    async withDbEntity(ctx, callback) {
        if (!ctx) {
            ctx = {};
        }
        if (!ctx.startedAt) {
            ctx.startedAt = new Date();
        }
        const previousEntity = ctx.dbEntity;
        ctx.dbEntity = this.dbEntity;
        try {
            return await callback(this.dao.databaseFacade, ctx);
        }
        finally {
            ctx.dbEntity = previousEntity;
        }
    }
}

class FieldsSelect {
    constructor(dbEntity) {
        this.dbEntity = dbEntity;
    }
    get ids() {
        const propertyNames = this.dbEntity.properties
            .filter(property => property.isId)
            .map(property => property.name);
        return this.getSelect(propertyNames, false);
    }
    get fields() {
        const propertyNames = this.dbEntity.properties
            .filter(property => !property.relation || !property.relation.length)
            .map(property => property.name);
        return this.getSelect(propertyNames, false);
    }
    get manyToOnes() {
        return this.getRelationSelect(EntityRelationType.MANY_TO_ONE);
    }
    get oneToManys() {
        return this.getRelationSelect(EntityRelationType.ONE_TO_MANY);
    }
    getRelationSelect(relationType) {
        const propertyNames = this.dbEntity.properties
            .filter(property => property.relation
            && property.relation.length
            && property.relation[0].relationType === relationType)
            .map(property => property.name);
        return this.getSelect(propertyNames, true);
    }
    getSelect(propertyNames, forRelations) {
        const selectFragment = {};
        for (const propertyName of propertyNames) {
            selectFragment[propertyName] = forRelations ? {} : Y;
        }
        return selectFragment;
    }
}

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Papa on 8/26/2017.
 */
let Dao = class Dao {
    constructor(dbEntityId, Q, internal = false) {
        this.internal = internal;
        const dbEntity = Q.__dbApplication__.currentVersion[0]
            .applicationVersion.entities[dbEntityId];
        // TODO: figure out how to inject EntityDatabaseFacade and dependencies
        this.db = new EntityDatabaseFacade(dbEntity, Q, this);
        this.SELECT = new FieldsSelect(dbEntity);
    }
    static BaseSave(config) {
        return function (target, propertyKey) {
            // No runtime logic required.
        };
    }
    mapById(entities) {
        const map = new Map();
        for (const entity of entities) {
            map.set(entity.id, entity);
        }
        return map;
    }
    async count(context) {
        throw new Error(`Not Implemented`);
    }
    exists(entityId, context) {
        throw new Error(`Not Implemented`);
    }
    async findAll(entityIds, context, cacheForUpdate = false) {
        if (entityIds) {
            throw new Error(`Not implemented`);
        }
        return await this.db.find.graph({
            SELECT: {},
            FROM: [this.db.FROM],
        }, context);
    }
    async findAllAsTrees(entityIds, context, cacheForUpdate = false) {
        if (entityIds) {
            throw new Error(`Not implemented`);
        }
        return await this.db.find.tree({
            SELECT: {},
            FROM: [this.db.FROM],
        }, context);
    }
    async findOne(AirEntityId, forUpdate = false, context) {
        if (!this.db.dbEntity.isAirEntity) {
            throw new Error(`Dao.findOne can only be called for Repository Entities.`);
        }
        const idObject = AirEntityId;
        let q;
        return await this.db.findOne.graph({
            SELECT: {
                '*': Y
            },
            FROM: [
                q = this.db.FROM
            ],
            WHERE: q.equals(idObject),
            FOR_UPDATE: forUpdate
        }, context);
    }
    async findIn(airEntityIds, forUpdate, context) {
        if (!this.db.dbEntity.isAirEntity) {
            throw new Error(`Dao.findIn can only be called for Repository Entities.`);
        }
        let q;
        return await this.db.find.graph({
            SELECT: {
                '*': Y
            },
            FROM: [
                q = this.db.FROM
            ],
            WHERE: q.in(airEntityIds),
            FOR_UPDATE: forUpdate
        }, context);
    }
    async save(entity, context) {
        return await this.db.save(entity, this.ensureContext(context));
    }
    markForDeletion(entityIdInfo, context) {
        if (entityIdInfo instanceof Array) {
            for (const anEntity of entityIdInfo) {
                this.entityStateManager.markForDeletion(anEntity);
            }
        }
        else {
            this.entityStateManager.markForDeletion(entityIdInfo);
        }
    }
    _repositoryId() {
        return {
            actor: {
                _localId: Y
            },
            _actorRecordId: Y,
            ageSuitability: Y,
            repository: {
                _localId: Y
            }
        };
    }
    /**
     * The Promise based API for all Entity 'find' (find many) queries.
     */
    async _find(rawGraphQuery, ctx) {
        return await this.db.find.graph(rawGraphQuery, ctx);
    }
    /**
     * The Promise based API for all Entity 'findOne' that also
     * ensures that the record is unique.  If multiple records
     * are found the ones with older createdAt values are deleted.
     */
    async _findUnique(rawGraphQuery, ctx) {
        const records = await this.db.find.graph(rawGraphQuery, ctx);
        if (!records.length) {
            return null;
        }
        if (records.length > 1) {
            // Remove older agreement records
            records.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
            for (let i = 1; i < records.length; i++) {
                this.markForDeletion(records[i]);
            }
            await this.save(records);
        }
        return records[0];
    }
    /**
     * The Promise based API for all Entity 'findOne' queries.
     */
    async _findOne(rawGraphQuery, ctx) {
        return await this.db.findOne.graph(rawGraphQuery, ctx);
    }
    /**
     * The Observable based API for all Entity 'searchOne' (searchOne many) queries.
     */
    _search(rawGraphQuery, ctx) {
        throw new Error('Not implemented');
    }
    /**
     * The Observable based API for all Entity 'searchOne' queries.
     */
    _searchOne(rawGraphQuery, ctx) {
        throw new Error('Not implemented');
    }
    ensureContext(context) {
        return doEnsureContext(context);
    }
};
__decorate([
    Inject()
], Dao.prototype, "databaseFacade", void 0);
__decorate([
    Inject()
], Dao.prototype, "entityStateManager", void 0);
__decorate([
    Inject()
], Dao.prototype, "lookup", void 0);
__decorate([
    Inject()
], Dao.prototype, "updateCacheManager", void 0);
Dao = __decorate([
    Injected()
], Dao);

const tarmaqDao = lib('tarmaq-dao');

const DAO = tarmaqDao.token({
    class: Dao,
    interface: 'class Dao',
    token: 'DAO'
});
const DATABASE_FACADE = tarmaqDao.token({
    class: null,
    interface: 'IDatabaseFacade',
    token: 'DATABASE_FACADE'
});
const LOOKUP = tarmaqDao.token({
    class: Lookup,
    interface: 'ILookup',
    token: 'LOOKUP'
});
const NON_ENTITY_FIND = tarmaqDao.token({
    class: NonEntityFind,
    interface: 'INonEntityFind',
    token: 'NON_ENTITY_FIND'
});
const NON_ENTITY_FIND_ONE = tarmaqDao.token({
    class: NonEntityFindOne,
    interface: 'INonEntityFindOne',
    token: 'NON_ENTITY_FIND_ONE'
});
const NON_ENTITY_SEARCH = tarmaqDao.token({
    class: NonEntitySearch,
    interface: 'INonEntitySearch',
    token: 'NON_ENTITY_SEARCH'
});
const NON_ENTITY_SEARCH_ONE = tarmaqDao.token({
    class: NonEntitySearchOne,
    interface: 'INonEntitySearchOne',
    token: 'NON_ENTITY_SEARCH_ONE'
});
const QUERY_FACADE = tarmaqDao.token({
    class: null,
    interface: 'IQueryFacade',
    token: 'QUERY_FACADE'
});
DAO.setDependencies({
    databaseFacade: DATABASE_FACADE,
    entityStateManager: ENTITY_STATE_MANAGER,
    lookup: LOOKUP,
    updateCacheManager: UPDATE_CACHE_MANAGER
});

const AIRPORT_DATABASE = airTrafficControl.token({
    class: null,
    interface: 'IAirportDatabase',
    token: 'AIRPORT_DATABASE'
});
const APPLICATION_UTILS = airTrafficControl.token({
    class: ApplicationUtils,
    interface: 'IApplicationUtils',
    token: 'APPLICATION_UTILS'
});
const DATABASE_STORE = airTrafficControl.token({
    class: DatabaseStore,
    interface: 'IDatabaseState',
    token: 'DATABASE_STORE'
});
const FIELD_UTILS = airTrafficControl.token({
    class: FieldUtils,
    interface: 'IFieldUtils',
    token: 'FIELD_UTILS'
});
airTrafficControl.token({
    class: QMetadataUtils,
    interface: 'IQMetadataUtils',
    token: 'Q_METADATA_UTILS'
});
const RELATION_MANAGER = airTrafficControl.token({
    class: RelationManager,
    interface: 'IRelationManager',
    token: 'RELATION_MANAGER'
});
airTrafficControl.token({
    class: null,
    interface: 'IRepositoryLoader',
    token: 'REPOSITORY_LOADER'
});
AIRPORT_DATABASE.setDependencies({
    appliationUtils: APPLICATION_UTILS,
    databaseFacade: DATABASE_FACADE,
    databaseStore: DATABASE_STORE,
    dbApplicationUtils: DB_APPLICATION_UTILS,
    find: NON_ENTITY_FIND,
    findOne: NON_ENTITY_FIND_ONE,
    relationManager: RELATION_MANAGER,
    search: NON_ENTITY_SEARCH,
    searchOne: NON_ENTITY_SEARCH_ONE
});
APPLICATION_UTILS.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    entityStateManager: ENTITY_STATE_MANAGER,
    utils: UTILS
});
DATABASE_FACADE.setDependencies({
    applicationUtils: APPLICATION_UTILS,
    entityStateManager: ENTITY_STATE_MANAGER,
    transactionalConnector: TRANSACTIONAL_CONNECTOR,
    updateCacheManager: UPDATE_CACHE_MANAGER
});
FIELD_UTILS.setDependencies({
    relationManager: RELATION_MANAGER
});
LOOKUP.setDependencies({
    entityUtils: ENTITY_UTILS,
    queryFacade: QUERY_FACADE
});
QUERY_FACADE.setDependencies({
    fieldUtils: FIELD_UTILS,
    queryUtils: QUERY_UTILS,
    relationManager: RELATION_MANAGER,
    transactionalConnector: TRANSACTIONAL_CONNECTOR
});
QUERY_UTILS.setDependencies({
    entityUtils: ENTITY_UTILS,
    fieldUtils: FIELD_UTILS,
    relationManager: RELATION_MANAGER,
    airEntityUtils: AIR_ENTITY_UTILS
});
RELATION_MANAGER.setDependencies({
    applicationUtils: APPLICATION_UTILS
});
UPDATE_CACHE_MANAGER.setDependencies({
    applicationUtils: APPLICATION_UTILS,
    entityStateManager: ENTITY_STATE_MANAGER,
});

const terminalMap = lib('terminal-map');
const APPLICATION_INITIALIZER = terminalMap.token({
    class: null,
    interface: 'IApplicationInitializer',
    token: 'APPLICATION_INITIALIZER'
});
const DOMAIN_RETRIEVER = terminalMap.token({
    class: null,
    interface: 'IDomainRetriever',
    token: 'DOMAIN_RETRIEVER'
});
const STORE_DRIVER = terminalMap.token({
    class: null,
    interface: 'IStoreDriver',
    token: 'STORE_DRIVER'
});
terminalMap.token({
    class: null,
    interface: 'ITerminalSessionManager',
    token: 'TERMINAL_SESSION_MANAGER'
});
const TERMINAL_STATE = terminalMap.token({
    class: TerminalState,
    interface: 'ITerminalStateContainer',
    token: 'TERMINAL_STATE'
});
const TERMINAL_STORE = terminalMap.token({
    class: TerminalStore,
    interface: 'ITerminalStore',
    token: 'TERMINAL_STORE'
});
const TRANSACTION_MANAGER = terminalMap.token({
    class: null,
    interface: 'ITransactionManager',
    token: 'TRANSACTION_MANAGER'
});
const TRANSACTIONAL_RECEIVER = terminalMap.token({
    class: null,
    interface: 'ITransactionalReceiver',
    token: 'TRANSACTIONAL_RECEIVER'
});
const TRANSACTIONAL_SERVER = terminalMap.token({
    class: null,
    interface: 'ITransactionalServer',
    token: 'TRANSACTIONAL_SERVER'
});
const USER_STATE = terminalMap.token({
    class: UserState,
    interface: 'IUserStateContainer',
    token: 'USER_STATE'
});
const USER_STORE = terminalMap.token({
    class: UserStore,
    interface: 'IUserStore',
    token: 'USER_STORE'
});
APPLICATION_INITIALIZER.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    sequenceGenerator: SEQUENCE_GENERATOR,
    terminalStore: TERMINAL_STORE
});
DOMAIN_RETRIEVER.setDependencies({
    transactionalConnector: TRANSACTIONAL_CONNECTOR
});
TERMINAL_STORE.setDependencies({
    selectorManager: SELECTOR_MANAGER,
    terminalState: TERMINAL_STATE
});
TRANSACTION_MANAGER.setDependencies({
    storeDriver: STORE_DRIVER,
    terminalStore: TERMINAL_STORE
});
TRANSACTIONAL_RECEIVER.setDependencies({
    applicationInitializer: APPLICATION_INITIALIZER,
    dbApplicationUtils: DB_APPLICATION_UTILS,
});
TRANSACTIONAL_SERVER.setDependencies({
    terminalStore: TERMINAL_STORE,
    transactionManager: TRANSACTION_MANAGER
});
USER_STORE.setDependencies({
    selectorManager: SELECTOR_MANAGER,
    userState: USER_STATE
});

// @Injected()
class ApplicationLoader {
    constructor() {
        this.initializing = false;
    }
    async load(application, lastIds) {
        if (this.initializing) {
            return;
        }
        this.initializing = true;
        const lastTerminalState = this.terminalStore.getTerminalState();
        this.terminalStore.state.next({
            ...lastTerminalState,
            lastIds
        });
        this.application = application;
        await this.applicationInitializer.initializeForAIRportApp(application);
        this.apiRegistry.initialize(application.versions[0].api);
    }
    async initialize() {
    }
    getApplication() {
        return this.application;
    }
}

APPLICATION_LOADER.setClass(ApplicationLoader);
APPLICATION_LOADER.setDependencies({
    applicationInitializer: APPLICATION_INITIALIZER,
    apiRegistry: API_REGISTRY,
    terminalStore: TERMINAL_STORE,
});

function loadAppHarness() {
    console.debug("AIRport App harness loaded");
}

exports.ApplicationLoader = ApplicationLoader;
exports.loadAppHarness = loadAppHarness;
//# sourceMappingURL=index.js.map
