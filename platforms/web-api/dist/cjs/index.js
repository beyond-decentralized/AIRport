'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const airApi = {
    setQApplication: function (qApplication) { },
    dS: function (__dbApplication__, dbEntityId) { return true; },
    ddS: function (__dbApplication__, dbEntityId) { return true; }
};

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

exports.ContextType = void 0;
(function (ContextType) {
    ContextType["DB"] = "DB";
    ContextType["UI"] = "UI";
})(exports.ContextType || (exports.ContextType = {}));
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

var __decorate$n = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.ContainerAccessor = class ContainerAccessor {
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
exports.ContainerAccessor = __decorate$n([
    Injected()
], exports.ContainerAccessor);

const directionIndicator = lib('direction-indicator');
const AUTOPILOT_API_LOADER = directionIndicator.token({
    class: null,
    interface: 'IAutopilotApiLoader',
    token: 'AUTOPILOT_API_LOADER'
});
const CONTAINER_ACCESSOR = directionIndicator.token({
    class: exports.ContainerAccessor,
    interface: 'IContainerAccessor',
    token: 'CONTAINER_ACCESSOR'
});
const INTER_APP_API_CLIENT = directionIndicator.token({
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
            dbContainer = new ChildContainer(this, new Context(id, exports.ContextType.DB));
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
        const context = new Context(componentName, exports.ContextType.UI);
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

var __decorate$m = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.AirEntityUtils = class AirEntityUtils {
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
exports.AirEntityUtils = __decorate$m([
    Injected()
], exports.AirEntityUtils);

const aviationCommunication = lib('aviation-communication');
const AIR_ENTITY_UTILS = aviationCommunication.token({
    class: exports.AirEntityUtils,
    interface: 'IAirEntityUtils',
    token: 'AIR_ENTITY_UTILS'
});

const Api = function () {
    return function (target, propertyKey, descriptor) {
        // No runtime logic required.
        return null;
    };
};

exports.ApiObjectKind = void 0;
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
})(exports.ApiObjectKind || (exports.ApiObjectKind = {}));

const checkIn = lib('check-in');
const API_REGISTRY = checkIn.token({
    class: null,
    interface: 'IApiRegistry',
    token: 'API_REGISTRY'
});
const API_VALIDATOR = checkIn.token({
    class: null,
    interface: 'IApiValidator',
    token: 'API_VALIDATOR'
});
API_REGISTRY.setDependencies({
    containerAccessor: CONTAINER_ACCESSOR
});

exports.ConstraintMode = void 0;
(function (ConstraintMode) {
    ConstraintMode["CONSTRAINT"] = "CONSTRAINT";
    ConstraintMode["NO_CONSTRAINT"] = "NO_CONSTRAINT";
    ConstraintMode["PROVIDER_DEFAULT"] = "PROVIDER_DEFAULT";
})(exports.ConstraintMode || (exports.ConstraintMode = {}));

/**
 * Created by Papa on 8/20/2016.
 */
const Id = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
const Column = function (columnConfiguration) {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
const JoinColumn = function (joinColumnConfiguration) {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
const JoinColumns = function (joinColumnConfigurations) {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
const RJoinColumn = function (rJoinColumnConfiguration) {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
const RJoinColumns = function (joinColumnConfigurations) {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
const Json = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
const DbAny = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
const DbBoolean = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
const DbDate = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
const DbNumber = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
const DbString = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
const Transient = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
const ManyToOne = function (elements) {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
const OneToMany = function (elements) {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
const GeneratedValue = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
const SequenceGenerator = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};
const TraditionalServerSeq = function () {
    return function (targetObject, propertyKey) {
        // No runtime logic required.
    };
};

/**
 * Created by Papa on 8/20/2016.
 */
const Entity = function () {
    return function (constructor) {
        // No runtime logic required.
    };
};
const Table = function (tableConfiguration) {
    return function (constructor) {
        // No runtime logic required.
    };
};
const MappedSuperclass = function () {
    return function (constructor) {
    };
};

var __decorate$l = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Marks a group of mutation history changes.
 */
exports.OperationHistory = class OperationHistory {
    constructor() {
        this.recordHistory = [];
    }
};
__decorate$l([
    GeneratedValue(),
    SequenceGenerator(),
    Id(),
    Column()
], exports.OperationHistory.prototype, "_localId", void 0);
__decorate$l([
    Column(),
    DbNumber()
], exports.OperationHistory.prototype, "orderNumber", void 0);
__decorate$l([
    Column(),
    DbString()
], exports.OperationHistory.prototype, "changeType", void 0);
__decorate$l([
    Column(),
    DbNumber()
], exports.OperationHistory.prototype, "systemWideOperationId", void 0);
__decorate$l([
    ManyToOne(),
    JoinColumn()
], exports.OperationHistory.prototype, "entity", void 0);
__decorate$l([
    ManyToOne(),
    JoinColumn()
], exports.OperationHistory.prototype, "actor", void 0);
__decorate$l([
    ManyToOne(),
    JoinColumn()
], exports.OperationHistory.prototype, "repositoryTransactionHistory", void 0);
__decorate$l([
    OneToMany()
], exports.OperationHistory.prototype, "recordHistory", void 0);
exports.OperationHistory = __decorate$l([
    Entity(),
    Table()
], exports.OperationHistory);

var __decorate$k = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.RecordHistory = class RecordHistory {
    constructor() {
        this.newValues = [];
        this.oldValues = [];
    }
};
__decorate$k([
    Id(),
    GeneratedValue(),
    SequenceGenerator(),
    Column()
], exports.RecordHistory.prototype, "_localId", void 0);
__decorate$k([
    Column(),
    DbNumber()
], exports.RecordHistory.prototype, "_actorRecordId", void 0);
__decorate$k([
    ManyToOne(),
    JoinColumn()
], exports.RecordHistory.prototype, "actor", void 0);
__decorate$k([
    ManyToOne(),
    JoinColumn()
], exports.RecordHistory.prototype, "operationHistory", void 0);
__decorate$k([
    OneToMany()
], exports.RecordHistory.prototype, "newValues", void 0);
__decorate$k([
    OneToMany()
], exports.RecordHistory.prototype, "oldValues", void 0);
__decorate$k([
    Transient()
], exports.RecordHistory.prototype, "tableColumnMap", void 0);
exports.RecordHistory = __decorate$k([
    Entity(),
    Table()
], exports.RecordHistory);

var __decorate$j = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Currently, syncing databases are always SqLite dbs.  This means
 * we don't need to store types for values.  If a need arises type
 * specific FieldChange classes can always be added.  Having
 * VARCHAR and NUMBER should suffice for other db implementations.
 * NUMBER covers (dates, booleans and numbers).  Maybe REALs will
 * also be required.
 */
exports.RecordHistoryNewValue = class RecordHistoryNewValue {
};
__decorate$j([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RecordHistoryNewValue.prototype, "recordHistory", void 0);
__decorate$j([
    Id(),
    Column(),
    DbNumber()
], exports.RecordHistoryNewValue.prototype, "columnIndex", void 0);
__decorate$j([
    Column(),
    DbAny()
], exports.RecordHistoryNewValue.prototype, "newValue", void 0);
exports.RecordHistoryNewValue = __decorate$j([
    Entity(),
    Table()
], exports.RecordHistoryNewValue);

var __decorate$i = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Currently, syncing databases are always SqLite dbs.  This means
 * we don't need to store types for values.  If a need arises type
 * specific FieldChange classes can always be added.  Having
 * VARCHAR and NUMBER should suffice for other db implementations.
 * NUMBER covers (dates, booleans and numbers).  Maybe REALs will
 * also be required.
 */
exports.RecordHistoryOldValue = class RecordHistoryOldValue {
};
__decorate$i([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RecordHistoryOldValue.prototype, "recordHistory", void 0);
__decorate$i([
    Id(),
    Column(),
    DbNumber()
], exports.RecordHistoryOldValue.prototype, "columnIndex", void 0);
__decorate$i([
    Column(),
    DbAny()
], exports.RecordHistoryOldValue.prototype, "oldValue", void 0);
exports.RecordHistoryOldValue = __decorate$i([
    Entity(),
    Table()
], exports.RecordHistoryOldValue);

exports.RepositoryTransactionType = void 0;
(function (RepositoryTransactionType) {
    RepositoryTransactionType["LOCAL"] = "LOCAL";
    RepositoryTransactionType["REMOTE"] = "REMOTE";
    RepositoryTransactionType["REMOTE_REFERENCE"] = "REMOTE_REFERENCE";
})(exports.RepositoryTransactionType || (exports.RepositoryTransactionType = {}));

var __decorate$h = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.RepositoryTransactionHistory = class RepositoryTransactionHistory {
    constructor(data) {
        this.repositoryTransactionType = exports.RepositoryTransactionType.LOCAL;
        this.operationHistory = [];
        if (!data) {
            return;
        }
        this._localId = data._localId;
        this.transactionHistory = data.transactionHistory;
        this.repository = data.repository;
        this.saveTimestamp = data.saveTimestamp;
        this.operationHistory = data.operationHistory;
    }
};
__decorate$h([
    GeneratedValue(),
    Id(),
    SequenceGenerator(),
    Column()
], exports.RepositoryTransactionHistory.prototype, "_localId", void 0);
__decorate$h([
    Column(),
    DbString()
], exports.RepositoryTransactionHistory.prototype, "repositoryTransactionType", void 0);
__decorate$h([
    Column(),
    DbNumber()
], exports.RepositoryTransactionHistory.prototype, "saveTimestamp", void 0);
__decorate$h([
    Column(),
    DbNumber()
], exports.RepositoryTransactionHistory.prototype, "syncTimestamp", void 0);
__decorate$h([
    Column(),
    DbString()
], exports.RepositoryTransactionHistory.prototype, "GUID", void 0);
__decorate$h([
    Column(),
    DbBoolean()
], exports.RepositoryTransactionHistory.prototype, "isRepositoryCreation", void 0);
__decorate$h([
    ManyToOne(),
    JoinColumn()
], exports.RepositoryTransactionHistory.prototype, "repository", void 0);
__decorate$h([
    ManyToOne(),
    JoinColumn()
], exports.RepositoryTransactionHistory.prototype, "transactionHistory", void 0);
__decorate$h([
    OneToMany()
], exports.RepositoryTransactionHistory.prototype, "operationHistory", void 0);
exports.RepositoryTransactionHistory = __decorate$h([
    Entity(),
    Table()
], exports.RepositoryTransactionHistory);

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

var EntityState$1;
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
})(EntityState$1 || (EntityState$1 = {}));

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

/**
 * Created by Papa on 9/10/2016.
 */
const ALL_TABLE_COLUMNS = 'A';
class TableMap {
    constructor(applicationVersionId, tableMap = {}) {
        this.applicationVersionId = applicationVersionId;
        this.tableMap = tableMap;
    }
    ensure(tableIndex, allColumns = false, ColumnMapConstructor = ColumnMap) {
        let tableColumnMap = this.tableMap[tableIndex];
        if (!tableColumnMap) {
            tableColumnMap = new ColumnMapConstructor(tableIndex, allColumns);
            this.tableMap[tableIndex] = tableColumnMap;
        }
        return tableColumnMap;
    }
    existsByStructure(tableIndex, columnIndex) {
        let tableColumnMap = this.tableMap[tableIndex];
        if (!tableColumnMap) {
            return false;
        }
        return !!tableColumnMap.columnMap[columnIndex];
    }
}

class ColumnMap {
    constructor(tableIndex, allColumns = false) {
        this.tableIndex = tableIndex;
        this.columnMap = {};
        if (allColumns) {
            this.columnMap[ALL_TABLE_COLUMNS] = true;
        }
    }
    ensure(columnIndex) {
        this.columnMap[columnIndex] = true;
    }
}

var __decorate$g = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
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
DbApplicationUtils = __decorate$g([
    Injected()
], DbApplicationUtils);

class ApplicationMap {
    constructor(applicationMap = {}) {
        this.applicationMap = applicationMap;
    }
    ensureEntity(entity, allColumns = false, TableMapConstructor = TableMap) {
        return this.ensure(entity.applicationVersion._localId, entity.index, allColumns, TableMapConstructor);
    }
    ensure(applicationVersionLocalId, tableIndex, allColumns = false, TableMapConstructor = TableMap) {
        let tableMap = this.applicationMap[applicationVersionLocalId];
        if (!tableMap) {
            tableMap = new TableMapConstructor(applicationVersionLocalId);
            this.applicationMap[applicationVersionLocalId] = tableMap;
        }
        return tableMap.ensure(tableIndex, allColumns);
    }
    existsByStructure(applicationVersionLocalId, tableIndex, columnIndex) {
        let tableMap = this.applicationMap[applicationVersionLocalId];
        if (!tableMap) {
            return false;
        }
        return tableMap.existsByStructure(tableIndex, columnIndex);
    }
}

class SyncColumnMap extends ColumnMap {
    constructor(tableIndex, allColumns = false) {
        super(tableIndex, allColumns);
    }
}

/**
 * Created by Papa on 10/7/2016.
 */
class SyncTableMap extends TableMap {
    constructor(applicationIndex, tableMap) {
        super(applicationIndex, tableMap);
    }
    ensureEntity(tableIndex, allColumns = false) {
        return super.ensure(tableIndex, allColumns, SyncColumnMap);
    }
    intersects(columnMap) {
        for (let tableIndex in this.tableMap) {
            if (columnMap.tableMap[tableIndex]) {
                let tableColumnMap = this.tableMap[tableIndex];
                let otherTableColumnMap = columnMap.tableMap[tableIndex];
                if (tableColumnMap[ALL_TABLE_COLUMNS] || tableColumnMap[ALL_TABLE_COLUMNS]) {
                    return true;
                }
                for (let columnIndex in tableColumnMap.columnMap) {
                    if (otherTableColumnMap.columnMap[columnIndex]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

class SyncApplicationMap extends ApplicationMap {
    constructor(applicationMap) {
        super(applicationMap);
    }
    ensureEntity(entity, allColumns = false) {
        return super.ensureEntity(entity, allColumns, SyncTableMap);
    }
    intersects(applicationMap) {
        for (const applicationIndex in this.applicationMap) {
            if (applicationMap.applicationMap[applicationIndex]) {
                const syncTableMap = new SyncTableMap(parseInt(applicationIndex), this.applicationMap[applicationIndex].tableMap);
                if (syncTableMap.intersects(applicationMap.applicationMap[applicationIndex])) {
                    return true;
                }
            }
        }
        return false;
    }
}

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

const groundControl = lib('ground-control');
const DB_APPLICATION_UTILS = groundControl.token({
    class: DbApplicationUtils,
    interface: 'IDbApplicationUtils',
    token: 'DB_APPLICATION_UTILS'
});
groundControl.token({
    class: null,
    interface: 'IEntityStateManager',
    token: 'ENTITY_STATE_MANAGER'
});
groundControl.token({
    class: null,
    interface: 'ISequenceGenerator',
    token: 'SEQUENCE_GENERATOR'
});
const TRANSACTIONAL_CONNECTOR = groundControl.token({
    class: null,
    interface: 'ITransactionalConnector',
    token: 'TRANSACTIONAL_CONNECTOR'
});
groundControl.token({
    class: null,
    interface: 'IUpdateCacheManager',
    token: 'UPDATE_CACHE_MANAGER'
});
TRANSACTIONAL_CONNECTOR.setDependencies({
    dbApplicationUtils: DB_APPLICATION_UTILS,
});

var __decorate$f = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.TransactionHistory = class TransactionHistory {
    constructor() {
        this.repositoryTransactionHistories = [];
        this.repositoryTransactionHistoryMap = {};
        this.applicationMap = new SyncApplicationMap();
        this.allOperationHistory = [];
        this.allRecordHistory = [];
        this.allRecordHistoryNewValues = [];
        this.allRecordHistoryOldValues = [];
    }
};
__decorate$f([
    GeneratedValue(),
    Id(),
    SequenceGenerator(),
    Column()
], exports.TransactionHistory.prototype, "_localId", void 0);
__decorate$f([
    Column(),
    DbString()
], exports.TransactionHistory.prototype, "transactionType", void 0);
__decorate$f([
    OneToMany()
], exports.TransactionHistory.prototype, "repositoryTransactionHistories", void 0);
__decorate$f([
    Transient()
], exports.TransactionHistory.prototype, "repositoryTransactionHistoryMap", void 0);
__decorate$f([
    Transient()
], exports.TransactionHistory.prototype, "applicationMap", void 0);
__decorate$f([
    Transient()
], exports.TransactionHistory.prototype, "allOperationHistory", void 0);
__decorate$f([
    Transient()
], exports.TransactionHistory.prototype, "allRecordHistory", void 0);
__decorate$f([
    Transient()
], exports.TransactionHistory.prototype, "allRecordHistoryNewValues", void 0);
__decorate$f([
    Transient()
], exports.TransactionHistory.prototype, "allRecordHistoryOldValues", void 0);
exports.TransactionHistory = __decorate$f([
    Entity(),
    Table()
], exports.TransactionHistory);

var __decorate$e = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.Actor = class Actor {
};
__decorate$e([
    Id(),
    GeneratedValue(),
    DbNumber(),
    Column()
], exports.Actor.prototype, "_localId", void 0);
__decorate$e([
    Column(),
    DbString()
], exports.Actor.prototype, "GUID", void 0);
__decorate$e([
    ManyToOne(),
    JoinColumn()
], exports.Actor.prototype, "userAccount", void 0);
__decorate$e([
    ManyToOne(),
    JoinColumn()
], exports.Actor.prototype, "terminal", void 0);
__decorate$e([
    ManyToOne(),
    JoinColumn()
], exports.Actor.prototype, "application", void 0);
exports.Actor = __decorate$e([
    Entity()
], exports.Actor);

var __decorate$d = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.AirEntity = class AirEntity {
    constructor(entityGUID) {
        // Currently TypeScript does not support optional getters/setters
        // this is a workaround
        delete this.id;
        Object.defineProperty(this, 'id', {
            get() {
                return IOC.getSync(AIR_ENTITY_UTILS).encodeId(this);
            },
            set(idString) {
                IOC.getSync(AIR_ENTITY_UTILS).setId(idString, this);
            }
        });
        delete this.isNew;
        Object.defineProperty(this, 'isNew', {
            get() {
                return !!this._actorRecordId;
            }
        });
        delete this.createdBy;
        Object.defineProperty(this, 'createdBy', {
            get() {
                return this.actor.userAccount;
            }
        });
        this.id = entityGUID;
    }
};
__decorate$d([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.AirEntity.prototype, "repository", void 0);
__decorate$d([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.AirEntity.prototype, "actor", void 0);
__decorate$d([
    Id(),
    Column(),
    GeneratedValue()
], exports.AirEntity.prototype, "_actorRecordId", void 0);
__decorate$d([
    Column(),
    DbNumber()
], exports.AirEntity.prototype, "ageSuitability", void 0);
__decorate$d([
    Column(),
    DbDate()
], exports.AirEntity.prototype, "createdAt", void 0);
__decorate$d([
    Column()
], exports.AirEntity.prototype, "systemWideOperationId", void 0);
__decorate$d([
    ManyToOne(),
    JoinColumn()
], exports.AirEntity.prototype, "originalRepository", void 0);
__decorate$d([
    ManyToOne(),
    JoinColumn()
], exports.AirEntity.prototype, "originalActor", void 0);
__decorate$d([
    Column()
], exports.AirEntity.prototype, "originalActorRecordId", void 0);
__decorate$d([
    Transient()
], exports.AirEntity.prototype, "createdBy", void 0);
__decorate$d([
    Transient()
], exports.AirEntity.prototype, "isNew", void 0);
__decorate$d([
    Transient()
], exports.AirEntity.prototype, "id", void 0);
exports.AirEntity = __decorate$d([
    MappedSuperclass()
], exports.AirEntity);

var __decorate$c = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Papa on 2/9/2017.
 */
exports.Repository = class Repository {
    constructor() {
        this.repositoryTransactionHistory = [];
        this.repositoryApplications = [];
        this.repositoryClients = [];
        this.repositoryDatabases = [];
        this.repositoryTerminals = [];
        this.repositoryTypes = [];
    }
};
__decorate$c([
    Column(),
    GeneratedValue(),
    Id(),
    DbNumber()
], exports.Repository.prototype, "_localId", void 0);
__decorate$c([
    Column(),
    DbString()
], exports.Repository.prototype, "GUID", void 0);
__decorate$c([
    Column(),
    DbString()
], exports.Repository.prototype, "name", void 0);
__decorate$c([
    Column(),
    DbNumber()
], exports.Repository.prototype, "ageSuitability", void 0);
__decorate$c([
    Column(),
    DbDate()
], exports.Repository.prototype, "createdAt", void 0);
__decorate$c([
    Column()
], exports.Repository.prototype, "immutable", void 0);
__decorate$c([
    Column(),
    DbString()
], exports.Repository.prototype, "source", void 0);
__decorate$c([
    ManyToOne(),
    JoinColumn()
], exports.Repository.prototype, "owner", void 0);
__decorate$c([
    OneToMany()
], exports.Repository.prototype, "repositoryTransactionHistory", void 0);
__decorate$c([
    ManyToOne(),
    JoinColumn()
], exports.Repository.prototype, "continent", void 0);
__decorate$c([
    ManyToOne(),
    JoinColumn()
], exports.Repository.prototype, "country", void 0);
__decorate$c([
    ManyToOne(),
    JoinColumn()
], exports.Repository.prototype, "state", void 0);
__decorate$c([
    ManyToOne(),
    JoinColumn()
], exports.Repository.prototype, "metroArea", void 0);
__decorate$c([
    OneToMany()
], exports.Repository.prototype, "repositoryApplications", void 0);
__decorate$c([
    OneToMany()
], exports.Repository.prototype, "repositoryClients", void 0);
__decorate$c([
    OneToMany()
], exports.Repository.prototype, "repositoryDatabases", void 0);
__decorate$c([
    OneToMany()
], exports.Repository.prototype, "repositoryTerminals", void 0);
__decorate$c([
    OneToMany()
], exports.Repository.prototype, "repositoryTypes", void 0);
exports.Repository = __decorate$c([
    Entity(),
    Table()
], exports.Repository);

var __decorate$b = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.RepositoryApplication = class RepositoryApplication {
};
__decorate$b([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RepositoryApplication.prototype, "application", void 0);
__decorate$b([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RepositoryApplication.prototype, "repository", void 0);
exports.RepositoryApplication = __decorate$b([
    Entity(),
    Table()
], exports.RepositoryApplication);

var __decorate$a = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.RepositoryClient = class RepositoryClient {
};
__decorate$a([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RepositoryClient.prototype, "repository", void 0);
__decorate$a([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RepositoryClient.prototype, "client", void 0);
exports.RepositoryClient = __decorate$a([
    Entity(),
    Table()
], exports.RepositoryClient);

var __decorate$9 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.RepositoryDatabase = class RepositoryDatabase {
};
__decorate$9([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RepositoryDatabase.prototype, "repository", void 0);
__decorate$9([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RepositoryDatabase.prototype, "database", void 0);
exports.RepositoryDatabase = __decorate$9([
    Entity(),
    Table()
], exports.RepositoryDatabase);

var __decorate$8 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.RepositoryTerminal = class RepositoryTerminal {
};
__decorate$8([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RepositoryTerminal.prototype, "repository", void 0);
__decorate$8([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RepositoryTerminal.prototype, "terminal", void 0);
exports.RepositoryTerminal = __decorate$8([
    Entity(),
    Table()
], exports.RepositoryTerminal);

var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.RepositoryType = class RepositoryType {
};
__decorate$7([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RepositoryType.prototype, "repository", void 0);
__decorate$7([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RepositoryType.prototype, "type", void 0);
exports.RepositoryType = __decorate$7([
    Entity(),
    Table()
], exports.RepositoryType);

const __constructors__ = {
    Actor: exports.Actor,
    AirEntity: exports.AirEntity,
    OperationHistory: exports.OperationHistory,
    RecordHistory: exports.RecordHistory,
    RecordHistoryNewValue: exports.RecordHistoryNewValue,
    RecordHistoryOldValue: exports.RecordHistoryOldValue,
    Repository: exports.Repository,
    RepositoryApplication: exports.RepositoryApplication,
    RepositoryClient: exports.RepositoryClient,
    RepositoryDatabase: exports.RepositoryDatabase,
    RepositoryTerminal: exports.RepositoryTerminal,
    RepositoryTransactionHistory: exports.RepositoryTransactionHistory,
    RepositoryType: exports.RepositoryType,
    TransactionHistory: exports.TransactionHistory
};
const Q_APPLICATION = {
    __constructors__,
    domain: 'air',
    name: '@airport/holding-pattern'
};
const Q = Q_APPLICATION;
function diSet(dbEntityId) {
    return airApi.dS(Q.__dbApplication__, dbEntityId);
}
function duoDiSet(dbEntityId) {
    return airApi.ddS(Q.__dbApplication__, dbEntityId);
}
airApi.setQApplication(Q_APPLICATION);

const holdingPattern = lib('holding-pattern');
const REPOSITORY_API = holdingPattern.token({
    class: null,
    interface: 'RepositoryApi',
    token: 'REPOSITORY_API'
});

var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// An API stub for other Applications and UIs to use
let RepositoryApi = class RepositoryApi {
    constructor() {
        DEPENDENCY_INJECTION.db().manualInject(this, REPOSITORY_API);
    }
    async findAll() {
        return await this.repositoryApi.findAll();
    }
    async create(repositoryName) {
        return await this.repositoryApi.create(repositoryName);
    }
};
__decorate$6([
    Inject()
], RepositoryApi.prototype, "repositoryApi", void 0);
RepositoryApi = __decorate$6([
    Injected()
], RepositoryApi);

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify(rnds);
}

var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// let _demoServer = 'https://turbase.app'
let _demoServer = 'http://localhost:3000';
let LocalAPIClient = class LocalAPIClient {
    constructor() {
        this.pendingDemoMessageMap = new Map();
        this.demoListenerStarted = false;
        this.lastConnectionReadyCheckMap = new Map();
    }
    init() {
        {
            this.initializeForWeb();
        }
    }
    initializeForWeb() {
        const htmlElements = document.getElementsByName('AIRportClient');
        if (htmlElements.length) {
            this.clientIframe = htmlElements[0];
        }
        else {
            this.clientIframe = document.createElement('iframe');
            this.clientIframe.src = _demoServer + '/client/index.html';
            this.clientIframe.name = 'AIRportClient';
            this.clientIframe.style.display = 'none';
            document.body.appendChild(this.clientIframe);
        }
        window.addEventListener("message", event => {
            const message = event.data;
            if (message.__received__) {
                return;
            }
            message.__received__ = true;
            if (this.messageCallback) {
                const receivedDate = new Date();
                message.__receivedTime__ = receivedDate.getTime();
                this.messageCallback(message);
            }
            switch (message.category) {
                case 'ConnectionIsReady':
                    let checksForDomain = this.lastConnectionReadyCheckMap.get(message.domain);
                    if (!checksForDomain) {
                        checksForDomain = new Map();
                        this.lastConnectionReadyCheckMap.set(message.domain, checksForDomain);
                    }
                    checksForDomain.set(message.application, true);
                    break;
                case 'ToClientRedirected':
                    // All requests need to have a application signature
                    // to know what application is being communicated to/from
                    if (!this.hasValidApplicationInfo(message)) {
                        return;
                    }
                    let requestDemoMessage = this.pendingDemoMessageMap.get(message.id);
                    if (requestDemoMessage) {
                        requestDemoMessage.resolve(message);
                    }
                    break;
            }
        }, false);
    }
    onMessage(callback) {
        this.messageCallback = callback;
    }
    hasValidApplicationInfo(message) {
        return typeof message.domain === 'string' && message.domain.length >= 3
            && typeof message.application === 'string' && message.application.length >= 3;
    }
    async invokeApiMethod(token, methodName, args) {
        while (!await this.isConnectionReady(token)) {
            await this.wait(100);
        }
        let serializedParams;
        {
            serializedParams = args;
        }
        const request = {
            actor: null,
            application: token.application.name,
            args: serializedParams,
            category: 'FromClient',
            domain: token.application.domain.name,
            hostDomain: null,
            hostProtocol: null,
            id: v4(),
            methodName,
            objectName: token.descriptor.interface,
            protocol: window.location.protocol,
        };
        let response;
        {
            response = await this.sendDemoRequest(request);
        }
        if (response.errorMessage) {
            throw new Error(response.errorMessage);
        }
        let payload;
        {
            payload = response.payload;
        }
        if (payload) {
            this.queryResultsDeserializer.setPropertyDescriptors(payload);
        }
        for (let i = 0; i < args.length; i++) {
            this.queryResultsDeserializer
                .deepCopyProperties(response.args[i], args[i]);
        }
        return payload;
    }
    wait(milliseconds) {
        return new Promise((resolve, _reject) => {
            setTimeout(() => {
                resolve();
            }, milliseconds);
        });
    }
    async isConnectionReady(token) {
        const domain = token.application.domain.name;
        const application = token.application.name;
        if (this.lastConnectionReadyCheckMap.get(domain)
            && this.lastConnectionReadyCheckMap.get(domain).get(application)) {
            // FIXME: checking every time breaks in inconsistent ways,
            // The whole 'IsConnectionReady' check needs to be done internally
            // in the framework, without sending messages around (that is
            // done on every request). 
            // this.lastConnectionReadyCheckMap.get(domain).delete(application)
            return true;
        }
        let request = {
            actor: null,
            application,
            args: [],
            category: 'IsConnectionReady',
            domain,
            hostDomain: null,
            hostProtocol: null,
            id: null,
            methodName: null,
            objectName: null,
            protocol: window.location.protocol,
        };
        {
            this.clientIframe.contentWindow.postMessage(request, _demoServer);
            return false;
        }
    }
    async sendLocalRequest(request) {
        const httpResponse = await fetch('http://localhost:31817', {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'origin',
            body: JSON.stringify(request) // body data type must match "Content-Type" header
        });
        return await httpResponse.json();
    }
    async sendDemoRequest(request) {
        if (!this.demoListenerStarted) {
            this.startDemoListener();
        }
        const returnValue = new Promise((resolve, reject) => {
            this.pendingDemoMessageMap.set(request.id, {
                request,
                resolve,
                reject
            });
        });
        this.clientIframe.contentWindow.postMessage(request, _demoServer);
        return returnValue;
    }
    startDemoListener() {
        window.addEventListener("message", event => {
            this.handleDemoResponse(event.data);
        });
    }
    handleDemoResponse(response) {
        if (response.domain !== window.location.host) {
            return;
        }
        if (response.category !== 'ToClientRedirected') {
            return;
        }
        const pendingRequest = this.pendingDemoMessageMap.get(response.id);
        if (!pendingRequest) {
            return;
        }
        if (response.errorMessage) {
            pendingRequest.reject(response.errorMessage);
        }
        else {
            pendingRequest.resolve(response);
        }
    }
};
__decorate$5([
    Inject()
], LocalAPIClient.prototype, "operationSerializer", void 0);
__decorate$5([
    Inject()
], LocalAPIClient.prototype, "queryResultsDeserializer", void 0);
LocalAPIClient = __decorate$5([
    Injected()
], LocalAPIClient);

var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let AutopilotApiLoader = class AutopilotApiLoader {
    loadApiAutopilot(token) {
        let _this = this;
        return new Proxy({}, {
            get(target, methodName) {
                switch (methodName) {
                    case '__initialized__':
                        return true;
                    case 'then':
                        return target;
                }
                return function (...args) {
                    if (INTER_APP_API_CLIENT.getClass()) {
                        return _this.interAppApiClient.invokeApiMethod(token, methodName, args);
                    }
                    else {
                        return _this.localApiClient.invokeApiMethod(token, methodName, args);
                    }
                };
            }
        });
    }
};
__decorate$4([
    Inject()
], AutopilotApiLoader.prototype, "interAppApiClient", void 0);
__decorate$4([
    Inject()
], AutopilotApiLoader.prototype, "localApiClient", void 0);
AutopilotApiLoader = __decorate$4([
    Injected()
], AutopilotApiLoader);

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let OperationSerializer = class OperationSerializer {
    serializeAsArray(entity) {
        let serializedEntity = [];
        if (!entity) {
            return serializedEntity;
        }
        if (entity instanceof Array) {
            serializedEntity = entity
                .map(anEntity => this.serialize(anEntity));
        }
        else {
            serializedEntity = [this.serialize(entity)];
        }
        return serializedEntity;
    }
    serialize(entity) {
        const operation = {
            namePath: ['root'],
            processedEntityMap: new Map(),
            sequence: 0,
            stubLookupTable: [],
        };
        return this.doSerialize(entity, operation);
    }
    doSerialize(entity, operation) {
        if (entity instanceof Object) {
            if (entity instanceof Array) {
                return entity.map(anEntity => this.doSerialize(anEntity, operation));
            }
            else if (entity instanceof Date) {
                return this.serializationStateManager.serializeAsDate(entity);
            }
        }
        else {
            return entity;
        }
        let operationUniqueId = operation.processedEntityMap.get(entity);
        if (operationUniqueId) {
            return operation.stubLookupTable[operationUniqueId];
        }
        operationUniqueId = ++operation.sequence;
        operation.processedEntityMap.set(entity, operationUniqueId);
        let entityStub = {};
        this.serializationStateManager.markAsStub(entity);
        entityStub[this.serializationStateManager.getUniqueIdFieldName()] = operationUniqueId;
        operation.stubLookupTable[operationUniqueId] = entityStub;
        let serializedEntity = {};
        serializedEntity[this.serializationStateManager.getUniqueIdFieldName()] = operationUniqueId;
        var isFirstProperty = true;
        for (const propertyName in entity) {
            const property = entity[propertyName];
            // const propertyState = property[serializationStateManager.getStateFieldName()]
            let propertyCopy;
            if (!isFirstProperty) {
                operation.namePath.pop();
            }
            isFirstProperty = false;
            operation.namePath.push(propertyName);
            if (property instanceof Object) {
                if (property instanceof Array) {
                    // if (propertyState === EntityState.RESULT_JSON_ARRAY) {
                    // 	propertyCopy = {
                    // 		value: JSON.stringify(property)
                    // 	}
                    // 	propertyCopy[entityStateManager.getStateFieldName()] = propertyState
                    // } else {
                    propertyCopy = property.map(aProperty => this.doSerialize(aProperty, operation));
                    // }
                }
                else if (property instanceof Date) {
                    propertyCopy = this.serializationStateManager.serializeAsDate(property);
                }
                else {
                    // if (propertyState === EntityState.RESULT_JSON) {
                    // 	propertyCopy = {
                    // 		value: JSON.stringify(property)
                    // 	}
                    // 	propertyCopy[entityStateManager.getStateFieldName()] = propertyState
                    // } else {
                    propertyCopy = this.doSerialize(property, operation);
                    // }
                }
            }
            else {
                // switch (propertyState) {
                // 	// case EntityState.RESULT_JSON_ARRAY:
                // 	// 	if (property) {
                // 	// 		throw new Error(`Expecting an Array for "${operation.namePath.join('.')}", got: ${property}`)
                // 	// 	}
                // 	// 	break
                // 	// case EntityState.RESULT_JSON:
                // 	// 	if (property) {
                // 	// 		throw new Error(`Expecting an Object for "${operation.namePath.join('.')}", got: ${property}`)
                // 	// 	}
                // 	// 	break
                // 	case SerializationState.DATE:
                // 		if (property) {
                // 			throw new Error(`Expecting a Date for "${operation.namePath.join('.')}", got: ${property}`)
                // 		}
                // 		break
                // 	default:
                propertyCopy = property;
                // break
                // }
            }
            serializedEntity[propertyName] = propertyCopy;
        }
        if (!isFirstProperty) {
            operation.namePath.pop();
        }
        return serializedEntity;
    }
};
__decorate$3([
    Inject()
], OperationSerializer.prototype, "serializationStateManager", void 0);
OperationSerializer = __decorate$3([
    Injected()
], OperationSerializer);

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SerializationStateManager_1;
var SerializationState;
(function (SerializationState) {
    SerializationState["DATE"] = "DATE";
    SerializationState["STUB"] = "STUB";
})(SerializationState || (SerializationState = {}));
let SerializationStateManager = SerializationStateManager_1 = class SerializationStateManager {
    getSerializationUniqueId(entity, throwIfNotFound = true) {
        const serializationUniqueId = entity[SerializationStateManager_1.SERIALIZATION_UNIQUE_ID_FIELD];
        if (!serializationUniqueId || typeof serializationUniqueId !== 'number' || serializationUniqueId < 1) {
            if (throwIfNotFound) {
                throw new Error(`Could not find "${SerializationStateManager_1.SERIALIZATION_UNIQUE_ID_FIELD}" property on DTO:
        
        ${JSON.stringify(entity)}`);
            }
        }
        return serializationUniqueId;
    }
    getEntityState(entity) {
        return entity[SerializationStateManager_1.SERIALIZATION_STATE_FIELD];
    }
    markAsStub(entity) {
        this.markAs(entity, SerializationState.STUB);
    }
    isStub(entity) {
        return this.is(entity, SerializationState.STUB);
    }
    serializeAsDate(value) {
        return {
            __serializationState__: SerializationState.DATE,
            value: value.toISOString()
        };
    }
    isDate(entity) {
        return this.is(entity, SerializationState.DATE);
    }
    getUniqueIdFieldName() {
        return SerializationStateManager_1.SERIALIZATION_UNIQUE_ID_FIELD;
    }
    // getStateFieldName(): string {
    //     return SerializationStateManager.SERIALIZATION_STATE_FIELD
    // }
    is(entity, serializationState) {
        return entity[SerializationStateManager_1.SERIALIZATION_STATE_FIELD] == serializationState;
    }
    markAs(entity, serializationState) {
        entity[SerializationStateManager_1.SERIALIZATION_STATE_FIELD] = serializationState;
    }
};
SerializationStateManager.SERIALIZATION_UNIQUE_ID_FIELD = '__SUID__';
SerializationStateManager.SERIALIZATION_STATE_FIELD = '__serializationState__';
SerializationStateManager = SerializationStateManager_1 = __decorate$2([
    Injected()
], SerializationStateManager);

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/*
interface ArrayMemberEntityRecord<T> {
    index: number,
    entity: T
}
*/
/*

Instead of doing a blind "copy if GUID is present otherwise do nothing":

1.	When sending objects, mark them all with serialization Ids
2.  Retain those Ids during operations in @Api()s & AIRport
3.	Map all objects on the way back by these serialization ids
4.	Do a copy from -> to based on those ids

interface ArrayMemberRecord<T> {
    index: number,
    isWithoutId: boolean
    isObject: boolean
    isEntity: boolean
    isPrimitive: boolean
    entity: T
}

interface ArrayEntityInfo {
    hasWithoutId: boolean
    hasObjects: boolean
    hasEntities: boolean
    hasPrimitives: boolean
    entityMap: Map<string, ArrayMemberEntityRecord<any>>
    entityArray: ArrayMemberRecord<any>[]
}
 */
let QueryResultsDeserializer = class QueryResultsDeserializer {
    deserialize(entity) {
        const operation = {
            lookupTable: [],
        };
        let deserializedEntity;
        if (entity instanceof Array) {
            deserializedEntity = entity.map(anEntity => this.doDeserialize(anEntity, operation));
        }
        else {
            deserializedEntity = this.doDeserialize(entity, operation);
        }
        return deserializedEntity;
    }
    doDeserialize(entity, operation) {
        let state = this.serializationStateManager.getEntityState(entity);
        switch (state) {
            case SerializationState.DATE:
                return new Date(entity['value']);
            // case EntityState.RESULT_JSON:
            // 	return entity
            // case EntityState.RESULT_JSON_ARRAY:
            // 	const value = entity['value']
            // 	value[entityStateManager.getStateFieldName()] = EntityState.RESULT_JSON_ARRAY
            // 	return entity
        }
        let operationUniqueId = this.serializationStateManager.getSerializationUniqueId(entity);
        if (!operationUniqueId || typeof operationUniqueId !== 'number' || operationUniqueId < 1) {
            throw new Error(`Invalid or missing ${this.serializationStateManager.getUniqueIdFieldName()} field.`);
        }
        let alreadyDeserializedEntity = operation.lookupTable[operationUniqueId];
        switch (state) {
            case SerializationState.STUB: {
                if (!alreadyDeserializedEntity) {
                    throw new Error(`Could not find an already present entity for
					${this.serializationStateManager.getUniqueIdFieldName()} of ${operationUniqueId}`);
                }
                return alreadyDeserializedEntity;
            }
            default:
                if (alreadyDeserializedEntity) {
                    throw new Error(`Entity appears more than once for
					${this.serializationStateManager.getUniqueIdFieldName()} of ${operationUniqueId}`);
                }
        }
        let deserializedEntity = {};
        operation.lookupTable[operationUniqueId] = deserializedEntity;
        for (const propertyName in entity) {
            const property = entity[propertyName];
            let propertyCopy;
            if (property instanceof Object) {
                if (property instanceof Array) {
                    propertyCopy = property.map(aProperty => this.doDeserialize(aProperty, operation));
                }
                else {
                    propertyCopy = this.doDeserialize(property, operation);
                }
            }
            else {
                propertyCopy = property;
            }
            deserializedEntity[propertyName] = propertyCopy;
        }
        delete deserializedEntity[this.serializationStateManager.getUniqueIdFieldName()];
        return deserializedEntity;
    }
    // private getArrayEntityMap() {
    // 	{
    // 		hasWithoutId: boolean
    // 		hasObjects: boolean
    // 		hasEntities: boolean
    // 		hasPrimitives: boolean
    // 		entityMap: Map < string, ArrayMemberEntityRecord < any >>
    // 			entityArray: ArrayMemberRecod[]
    // 	}
    // }
    deepCopyProperties(from, to) {
        if (from instanceof Array) {
            // let fromArrayEntityMapByGUID: Map<string, ArrayMemberEntityRecord<any>> = new Map()
            // let toArrayEntityMapByGUID: Map<string, ArrayMemberEntityRecord<any>> = new Map()
            // let haveFromWithoutId = false
            // let haveFromObjects = false
            // let haveFromEntities = false
            // let haveFromPrimitives = false
            // for (let i = 0; i < from.length; i++) {
            // 	let fromEntity = from[i]
            // 	if (fromEntity instanceof Object && !(fromEntity instanceof Date)) {
            // 		haveFromObjects = true
            // 		let entityGUID = this.airEntityUtils.encodeId(from[i])
            // 		if (entityGUID) {
            // 			haveFromEntities = true
            // 			fromArrayEntityMapByGUID.set(entityGUID, from[i])
            // 		} else {
            // 			haveFromWithoutId = true
            // 		}
            // 	} else {
            // 		haveFromPrimitives = true
            // 	}
            // }
            // let haveToWithoutId = false
            // for (let i = 0; i < from.length; i++) {
            // 	this.deepCopyProperties(from[i], to[i])
            // }
            for (let i = 0; i < from.length; i++) {
                this.deepCopyProperties(from[i], to[i]);
            }
        }
        if (!(from instanceof Object)) {
            return;
        }
        if (from instanceof Date) {
            return;
        }
        for (let propertyName in from) {
            if (!from.hasOwnProperty(propertyName)) {
                continue;
            }
            let fromProperty = from[propertyName];
            let toProperty = to[propertyName];
            if (fromProperty instanceof Object && toProperty instanceof Object) {
                this.deepCopyProperties(fromProperty, toProperty);
            }
            else {
                to[propertyName] = from[propertyName];
            }
        }
        for (let propertyName in to) {
            if (!to.hasOwnProperty(propertyName)) {
                continue;
            }
            if (!from.hasOwnProperty(propertyName)) {
                delete to[propertyName];
            }
        }
        this.doSetPropertyDescriptors(to);
    }
    setPropertyDescriptors(object) {
        if (object instanceof Array) {
            for (let i = 0; i < object.length; i++) {
                this.setPropertyDescriptors(object[i]);
            }
        }
        if (!(object instanceof Object)) {
            return;
        }
        if (object instanceof Date) {
            return;
        }
        for (let propertyName in object) {
            if (!object.hasOwnProperty(propertyName)) {
                continue;
            }
            let property = object[propertyName];
            if (property instanceof Object) {
                this.setPropertyDescriptors(property);
            }
        }
        this.doSetPropertyDescriptors(object);
    }
    doSetPropertyDescriptors(object) {
        let objectPrototype = Object.getPrototypeOf(object);
        if (!object.id
            && !Object.getOwnPropertyDescriptor(object, 'id')
            && (!objectPrototype
                || !Object.getOwnPropertyDescriptor(objectPrototype, 'id'))) {
            Object.defineProperty(object, 'id', {
                get() {
                    return this.__container__.getSync(AIR_ENTITY_UTILS).encodeId(this);
                },
                set(idString) {
                    this.__container__.getSync(AIR_ENTITY_UTILS).setId(idString, this);
                }
            });
        }
        if (!object.isNew
            && !Object.getOwnPropertyDescriptor(object, 'isNew')
            && (!objectPrototype
                || !Object.getOwnPropertyDescriptor(objectPrototype, 'isNew'))) {
            Object.defineProperty(object, 'isNew', {
                get() {
                    return !!this._actorRecordId;
                }
            });
        }
        if (!object.createdBy
            && !Object.getOwnPropertyDescriptor(object, 'createdBy')
            && (!objectPrototype
                || !Object.getOwnPropertyDescriptor(objectPrototype, 'createdBy'))) {
            Object.defineProperty(object, 'createdBy', {
                get() {
                    return this.actor.userAccount;
                }
            });
        }
    }
};
__decorate$1([
    Inject()
], QueryResultsDeserializer.prototype, "airEntityUtils", void 0);
__decorate$1([
    Inject()
], QueryResultsDeserializer.prototype, "serializationStateManager", void 0);
QueryResultsDeserializer = __decorate$1([
    Injected()
], QueryResultsDeserializer);

const pressurization = lib('pressurization');
const OPERATION_SERIALIZER = pressurization.token({
    class: OperationSerializer,
    interface: 'IOperationSerializer',
    token: 'OPERATION_SERIALIZER'
});
const QUERY_RESULTS_DESERIALIZER = pressurization.token({
    class: QueryResultsDeserializer,
    interface: 'IQueryResultsDeserializer',
    token: 'QUERY_RESULTS_DESERIALIZER'
});
const SERIALIZATION_STATE_MANAGER = pressurization.token({
    class: SerializationStateManager,
    interface: 'ISerializationStateManager',
    token: 'SERIALIZATION_STATE_MANAGER'
});
OPERATION_SERIALIZER.setDependencies({
    serializationStateManager: SERIALIZATION_STATE_MANAGER
});
QUERY_RESULTS_DESERIALIZER.setDependencies({
    airEntityUtils: AIR_ENTITY_UTILS,
    serializationStateManager: SERIALIZATION_STATE_MANAGER
});

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UiStateManager_1;
var EntityState;
(function (EntityState) {
    EntityState["CREATE"] = "CREATE";
    EntityState["DATE"] = "DATE";
    EntityState["DELETE"] = "DELETE";
    EntityState["PARENT_SCHEMA_ID"] = "PARENT_SCHEMA_LID";
    EntityState["STUB"] = "STUB";
    EntityState["UPDATE"] = "UPDATE";
})(EntityState || (EntityState = {}));
let UiStateManager = UiStateManager_1 = class UiStateManager {
    isStub(entity) {
        return this.getEntityState(entity) === EntityState.STUB;
    }
    isParentSchemaId(entity) {
        return this.getEntityState(entity) === EntityState.PARENT_SCHEMA_ID;
    }
    markForDeletion(entity, arrayToRemoveFrom) {
        entity[UiStateManager_1.STATE_FIELD] = EntityState.DELETE;
        if (!arrayToRemoveFrom) {
            return;
        }
        for (let i = arrayToRemoveFrom.length - 1; i >= 0; i--) {
            if (arrayToRemoveFrom[i] === entity) {
                arrayToRemoveFrom.splice(i, 1);
                break;
            }
        }
    }
    isDeleted(entity) {
        return entity[UiStateManager_1.STATE_FIELD] === EntityState.DELETE;
    }
    markAsStub(entity) {
        entity[UiStateManager_1.STATE_FIELD] = EntityState.STUB;
    }
    getEntityState(entity) {
        return entity[UiStateManager_1.STATE_FIELD];
    }
};
UiStateManager.STATE_FIELD = '__state__';
UiStateManager = UiStateManager_1 = __decorate([
    Injected()
], UiStateManager);

const autopilot = lib('autopilot');
const LOCAL_API_CLIENT = autopilot.token({
    class: LocalAPIClient,
    interface: 'ILocalAPIClient',
    token: 'LOCAL_API_CLIENT'
});
autopilot.token({
    class: UiStateManager,
    interface: 'IUiStateManager',
    token: 'UI_STATE_MANAGER'
});
LOCAL_API_CLIENT.setDependencies({
    operationSerializer: OPERATION_SERIALIZER,
    queryResultsDeserializer: QUERY_RESULTS_DESERIALIZER
});
AUTOPILOT_API_LOADER.setClass(AutopilotApiLoader);
AUTOPILOT_API_LOADER.setDependencies({
    interAppApiClient: INTER_APP_API_CLIENT,
    localApiClient: LOCAL_API_CLIENT
});

function loadAutopilot() {
    console.log("@airport/autopilot loaded");
}

loadAutopilot();

REPOSITORY_API.setClass(RepositoryApi);
REPOSITORY_API.setDependencies({
    interAppApiClient: INTER_APP_API_CLIENT
});

function loadFrameworkApi() {
    console.debug("AIRport API framework loaded");
}

exports.AIRPORT_DOMAIN = AIRPORT_DOMAIN;
exports.AIR_ENTITY_UTILS = AIR_ENTITY_UTILS;
exports.API_REGISTRY = API_REGISTRY;
exports.API_VALIDATOR = API_VALIDATOR;
exports.AUTOPILOT_API_LOADER = AUTOPILOT_API_LOADER;
exports.Api = Api;
exports.CONTAINER_ACCESSOR = CONTAINER_ACCESSOR;
exports.ChildContainer = ChildContainer;
exports.Column = Column;
exports.Container = Container;
exports.Context = Context;
exports.DEPENDENCY_INJECTION = DEPENDENCY_INJECTION;
exports.DbAny = DbAny;
exports.DbBoolean = DbBoolean;
exports.DbDate = DbDate;
exports.DbNumber = DbNumber;
exports.DbString = DbString;
exports.DependencyInjectionToken = DependencyInjectionToken;
exports.Entity = Entity;
exports.GeneratedValue = GeneratedValue;
exports.INTER_APP_API_CLIENT = INTER_APP_API_CLIENT;
exports.IOC = IOC;
exports.Id = Id;
exports.Inject = Inject;
exports.Injected = Injected;
exports.InjectionApplication = InjectionApplication;
exports.InjectionDomain = InjectionDomain;
exports.InversionOfControl = InversionOfControl;
exports.JoinColumn = JoinColumn;
exports.JoinColumns = JoinColumns;
exports.Json = Json;
exports.ManyToOne = ManyToOne;
exports.MappedSuperclass = MappedSuperclass;
exports.OneToMany = OneToMany;
exports.Q = Q;
exports.Q_APPLICATION = Q_APPLICATION;
exports.RJoinColumn = RJoinColumn;
exports.RJoinColumns = RJoinColumns;
exports.RootContainer = RootContainer;
exports.SequenceGenerator = SequenceGenerator;
exports.Table = Table;
exports.TraditionalServerSeq = TraditionalServerSeq;
exports.Transient = Transient;
exports.airApi = airApi;
exports.diSet = diSet;
exports.domain = domain;
exports.duoDiSet = duoDiSet;
exports.extend = extend;
exports.lib = lib;
exports.loadFrameworkApi = loadFrameworkApi;
//# sourceMappingURL=index.js.map
