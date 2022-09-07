'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Data Validation object.
 */
class Dvo {
    constructor(dbEntityId, qApplication) {
        if (typeof dbEntityId === 'number') {
            this.dbEntity = qApplication.__dbApplication__.currentVersion[0]
                .applicationVersion.entities[dbEntityId];
        }
        else {
            this.dbEntity = dbEntityId;
        }
    }
    async validate(entity, rules) {
        return null;
    }
}

const and = function (...conditions) {
    throw Error('Implement');
};
const between = function (from, to) {
    throw Error('Implement');
};
const byId = function () {
    throw Error('Implement');
};
const equals = function (valueOrTyped, valueIfTyped) {
    throw Error('Implement');
};
const exists = function (valueOrTyped, valueIfTyped) {
    throw Error('Implement');
};
const isInteger = function (field) {
    throw Error('Implement');
};
const isNotNull = function (validationSpec) {
    throw Error('Implement');
};
const isNull = function (validationSpec) {
    throw Error('Implement');
};
const length = function (from, to) {
    throw Error('Implement');
};
const oneOfNumbers = function (...values) {
    throw Error('Implement');
};
const oneOfStrings = function (...values) {
    throw Error('Implement');
};
const or = function (...conditions) {
    throw Error('Implement');
};
const typed = function (options) {
    throw Error('Implement');
};
const uniqueIn = function (value) {
    throw Error('Implement');
};
const value = function (value) {
    throw Error('Implement');
};

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

/******************************************************************************
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

function __decorate$d(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.ContainerAccessor = __decorate$d([
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

const airApi = {
    setQApp: function (qApplication) { },
    dS: function (__dbApplication__, dbEntityId) { return true; },
    ddS: function (__dbApplication__, dbEntityId) { return true; }
};

/******************************************************************************
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

function __decorate$c(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

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
exports.AirEntityUtils = __decorate$c([
    Injected()
], exports.AirEntityUtils);

const aviationCommunication = lib('aviation-communication');
const AIR_ENTITY_UTILS = aviationCommunication.token({
    class: exports.AirEntityUtils,
    interface: 'IAirEntityUtils',
    token: 'AIR_ENTITY_UTILS'
});

/******************************************************************************
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

function __decorate$b(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

exports.Domain = class Domain {
};
__decorate$b([
    Id(),
    DbNumber(),
    Column()
], exports.Domain.prototype, "_localId", void 0);
__decorate$b([
    DbString()
], exports.Domain.prototype, "name", void 0);
__decorate$b([
    OneToMany()
], exports.Domain.prototype, "applications", void 0);
exports.Domain = __decorate$b([
    Entity(),
    Table()
], exports.Domain);

exports.Application = class Application {
    constructor() {
        this.versions = [];
        this.currentVersion = [];
    }
};
__decorate$b([
    Id(),
    DbNumber(),
    Column()
], exports.Application.prototype, "index", void 0);
__decorate$b([
    Column(),
    DbString()
], exports.Application.prototype, "scope", void 0);
__decorate$b([
    Column(),
    DbString()
], exports.Application.prototype, "name", void 0);
__decorate$b([
    Column(),
    DbString()
], exports.Application.prototype, "fullName", void 0);
__decorate$b([
    Column(),
    DbString()
], exports.Application.prototype, "status", void 0);
__decorate$b([
    Column(),
    DbString()
], exports.Application.prototype, "signature", void 0);
__decorate$b([
    ManyToOne(),
    JoinColumn()
], exports.Application.prototype, "domain", void 0);
__decorate$b([
    OneToMany()
], exports.Application.prototype, "versions", void 0);
__decorate$b([
    OneToMany()
], exports.Application.prototype, "currentVersion", void 0);
exports.Application = __decorate$b([
    Entity(),
    Table()
], exports.Application);

exports.VersionedApplicationObject = class VersionedApplicationObject {
};
__decorate$b([
    ManyToOne(),
    JoinColumn()
], exports.VersionedApplicationObject.prototype, "deprecatedSinceVersion", void 0);
__decorate$b([
    ManyToOne(),
    JoinColumn()
], exports.VersionedApplicationObject.prototype, "removedInVersion", void 0);
__decorate$b([
    ManyToOne(),
    JoinColumn()
], exports.VersionedApplicationObject.prototype, "sinceVersion", void 0);
exports.VersionedApplicationObject = __decorate$b([
    MappedSuperclass()
], exports.VersionedApplicationObject);

exports.ApplicationColumn = class ApplicationColumn extends exports.VersionedApplicationObject {
    constructor() {
        super(...arguments);
        this.propertyColumns = [];
        this.manyRelationColumns = [];
        this.oneRelationColumns = [];
    }
};
__decorate$b([
    DbNumber(),
    Id(),
    Column()
], exports.ApplicationColumn.prototype, "_localId", void 0);
__decorate$b([
    Column(),
    DbNumber()
], exports.ApplicationColumn.prototype, "index", void 0);
__decorate$b([
    Column(),
    DbNumber()
], exports.ApplicationColumn.prototype, "idIndex", void 0);
__decorate$b([
    Column(),
    DbBoolean()
], exports.ApplicationColumn.prototype, "isGenerated", void 0);
__decorate$b([
    Column(),
    DbNumber()
], exports.ApplicationColumn.prototype, "allocationSize", void 0);
__decorate$b([
    Column(),
    DbString()
], exports.ApplicationColumn.prototype, "name", void 0);
__decorate$b([
    Column(),
    DbBoolean()
], exports.ApplicationColumn.prototype, "notNull", void 0);
__decorate$b([
    Column(),
    DbNumber()
], exports.ApplicationColumn.prototype, "precision", void 0);
__decorate$b([
    Column(),
    DbNumber()
], exports.ApplicationColumn.prototype, "scale", void 0);
__decorate$b([
    Column(),
    DbString()
], exports.ApplicationColumn.prototype, "type", void 0);
__decorate$b([
    ManyToOne(),
    JoinColumn()
], exports.ApplicationColumn.prototype, "entity", void 0);
__decorate$b([
    OneToMany()
], exports.ApplicationColumn.prototype, "propertyColumns", void 0);
__decorate$b([
    OneToMany()
], exports.ApplicationColumn.prototype, "manyRelationColumns", void 0);
__decorate$b([
    OneToMany()
], exports.ApplicationColumn.prototype, "oneRelationColumns", void 0);
exports.ApplicationColumn = __decorate$b([
    Entity(),
    Table()
], exports.ApplicationColumn);

exports.ApplicationCurrentVersion = class ApplicationCurrentVersion {
};
__decorate$b([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.ApplicationCurrentVersion.prototype, "application", void 0);
__decorate$b([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.ApplicationCurrentVersion.prototype, "applicationVersion", void 0);
exports.ApplicationCurrentVersion = __decorate$b([
    Entity(),
    Table()
], exports.ApplicationCurrentVersion);

exports.ApplicationEntity = class ApplicationEntity extends exports.VersionedApplicationObject {
    constructor() {
        super(...arguments);
        //
        // One-to-Many's
        //
        this.columns = [];
        // TODO: implement if needed
        // @OneToMany()
        // @JoinColumns([
        // 	{name: "APPLICATION_VERSION_LID"},
        // 	{name: "TABLE_INDEX", referencedColumnName: "INDEX"}
        // ])
        // @WhereJoinTable((
        // 	otm: QAppEntity,
        // 	mto: QAppColumn
        // ) => mto.idIndex.IS_NOT_NULL())
        // idColumns: IApplicationColumn[];
        this.operations = [];
        this.properties = [];
        this.relations = [];
        this.relationReferences = [];
        this.columnMap = {};
        this.idColumns = [];
        this.idColumnMap = {};
        this.propertyMap = {};
    }
};
__decorate$b([
    DbNumber(),
    Id(),
    Column()
], exports.ApplicationEntity.prototype, "_localId", void 0);
__decorate$b([
    Column(),
    DbNumber()
], exports.ApplicationEntity.prototype, "index", void 0);
__decorate$b([
    Column(),
    DbBoolean()
], exports.ApplicationEntity.prototype, "isLocal", void 0);
__decorate$b([
    Column(),
    DbBoolean()
], exports.ApplicationEntity.prototype, "isAirEntity", void 0);
__decorate$b([
    Column(),
    DbString()
], exports.ApplicationEntity.prototype, "name", void 0);
__decorate$b([
    Column(),
    Json()
], exports.ApplicationEntity.prototype, "tableConfig", void 0);
__decorate$b([
    ManyToOne(),
    JoinColumn()
], exports.ApplicationEntity.prototype, "applicationVersion", void 0);
__decorate$b([
    OneToMany()
], exports.ApplicationEntity.prototype, "columns", void 0);
__decorate$b([
    OneToMany()
], exports.ApplicationEntity.prototype, "operations", void 0);
__decorate$b([
    OneToMany()
], exports.ApplicationEntity.prototype, "properties", void 0);
__decorate$b([
    OneToMany()
], exports.ApplicationEntity.prototype, "relations", void 0);
__decorate$b([
    OneToMany()
], exports.ApplicationEntity.prototype, "relationReferences", void 0);
__decorate$b([
    Transient()
], exports.ApplicationEntity.prototype, "columnMap", void 0);
__decorate$b([
    Transient()
], exports.ApplicationEntity.prototype, "idColumns", void 0);
__decorate$b([
    Transient()
], exports.ApplicationEntity.prototype, "idColumnMap", void 0);
__decorate$b([
    Transient()
], exports.ApplicationEntity.prototype, "propertyMap", void 0);
exports.ApplicationEntity = __decorate$b([
    Entity(),
    Table()
], exports.ApplicationEntity);

exports.ApplicationOperation = class ApplicationOperation extends exports.VersionedApplicationObject {
};
__decorate$b([
    Id(),
    GeneratedValue(),
    DbNumber(),
    Column()
], exports.ApplicationOperation.prototype, "_localId", void 0);
__decorate$b([
    Column(),
    DbNumber()
], exports.ApplicationOperation.prototype, "type", void 0);
__decorate$b([
    ManyToOne(),
    JoinColumn()
], exports.ApplicationOperation.prototype, "entity", void 0);
__decorate$b([
    Column(),
    DbString()
], exports.ApplicationOperation.prototype, "name", void 0);
__decorate$b([
    Column(),
    Json()
], exports.ApplicationOperation.prototype, "rule", void 0);
exports.ApplicationOperation = __decorate$b([
    Entity(),
    Table()
], exports.ApplicationOperation);

exports.ApplicationProperty = class ApplicationProperty extends exports.VersionedApplicationObject {
    constructor() {
        super(...arguments);
        this.propertyColumns = [];
        this.relation = [];
    }
};
__decorate$b([
    DbNumber(),
    Id(),
    Column()
], exports.ApplicationProperty.prototype, "_localId", void 0);
__decorate$b([
    DbNumber(),
    Column()
], exports.ApplicationProperty.prototype, "index", void 0);
__decorate$b([
    DbString(),
    Column()
], exports.ApplicationProperty.prototype, "name", void 0);
__decorate$b([
    DbBoolean(),
    Column()
], exports.ApplicationProperty.prototype, "isId", void 0);
__decorate$b([
    ManyToOne(),
    JoinColumn()
], exports.ApplicationProperty.prototype, "entity", void 0);
__decorate$b([
    OneToMany()
], exports.ApplicationProperty.prototype, "propertyColumns", void 0);
__decorate$b([
    OneToMany()
], exports.ApplicationProperty.prototype, "relation", void 0);
exports.ApplicationProperty = __decorate$b([
    Entity(),
    Table()
], exports.ApplicationProperty);

/**
 * Many-to-Many between Columns and properties
 */
exports.ApplicationPropertyColumn = class ApplicationPropertyColumn extends exports.VersionedApplicationObject {
};
__decorate$b([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.ApplicationPropertyColumn.prototype, "column", void 0);
__decorate$b([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.ApplicationPropertyColumn.prototype, "property", void 0);
exports.ApplicationPropertyColumn = __decorate$b([
    Entity()
    // TODO: rename table name to APPLICATION_PROPERTY_COLUMNS
    ,
    Table()
], exports.ApplicationPropertyColumn);

exports.ApplicationReference = class ApplicationReference extends exports.VersionedApplicationObject {
};
__decorate$b([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.ApplicationReference.prototype, "ownApplicationVersion", void 0);
__decorate$b([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.ApplicationReference.prototype, "referencedApplicationVersion", void 0);
__decorate$b([
    Column(),
    DbNumber()
], exports.ApplicationReference.prototype, "index", void 0);
exports.ApplicationReference = __decorate$b([
    Entity(),
    Table()
], exports.ApplicationReference);

exports.ApplicationRelation = class ApplicationRelation extends exports.VersionedApplicationObject {
    constructor() {
        super(...arguments);
        this.manyRelationColumns = [];
        this.oneRelationColumns = [];
    }
};
__decorate$b([
    DbNumber(),
    Id(),
    Column()
], exports.ApplicationRelation.prototype, "_localId", void 0);
__decorate$b([
    DbNumber(),
    Column()
], exports.ApplicationRelation.prototype, "index", void 0);
__decorate$b([
    ManyToOne(),
    JoinColumn()
], exports.ApplicationRelation.prototype, "property", void 0);
__decorate$b([
    Json(),
    Column()
], exports.ApplicationRelation.prototype, "foreignKey", void 0);
__decorate$b([
    Json(),
    Column()
], exports.ApplicationRelation.prototype, "manyToOneElems", void 0);
__decorate$b([
    Json(),
    Column()
], exports.ApplicationRelation.prototype, "oneToManyElems", void 0);
__decorate$b([
    DbString(),
    Column()
], exports.ApplicationRelation.prototype, "relationType", void 0);
__decorate$b([
    Column()
], exports.ApplicationRelation.prototype, "isId", void 0);
__decorate$b([
    ManyToOne(),
    JoinColumn()
], exports.ApplicationRelation.prototype, "entity", void 0);
__decorate$b([
    ManyToOne(),
    JoinColumn()
], exports.ApplicationRelation.prototype, "relationEntity", void 0);
__decorate$b([
    OneToMany()
], exports.ApplicationRelation.prototype, "manyRelationColumns", void 0);
__decorate$b([
    OneToMany()
], exports.ApplicationRelation.prototype, "oneRelationColumns", void 0);
exports.ApplicationRelation = __decorate$b([
    Entity(),
    Table()
], exports.ApplicationRelation);

exports.ApplicationRelationColumn = class ApplicationRelationColumn extends exports.VersionedApplicationObject {
};
__decorate$b([
    Id(),
    Column()
], exports.ApplicationRelationColumn.prototype, "_localId", void 0);
__decorate$b([
    ManyToOne(),
    JoinColumn()
], exports.ApplicationRelationColumn.prototype, "manyColumn", void 0);
__decorate$b([
    ManyToOne(),
    JoinColumn()
], exports.ApplicationRelationColumn.prototype, "oneColumn", void 0);
__decorate$b([
    ManyToOne(),
    JoinColumn()
], exports.ApplicationRelationColumn.prototype, "manyRelation", void 0);
__decorate$b([
    ManyToOne(),
    JoinColumn()
], exports.ApplicationRelationColumn.prototype, "oneRelation", void 0);
__decorate$b([
    ManyToOne(),
    JoinColumn()
], exports.ApplicationRelationColumn.prototype, "parentRelation", void 0);
exports.ApplicationRelationColumn = __decorate$b([
    Entity(),
    Table()
], exports.ApplicationRelationColumn);

exports.ApplicationVersion = class ApplicationVersion {
    constructor() {
        this.entities = [];
        this.references = [];
        this.referencedBy = [];
        this.entityMapByName = {};
        this.referencesMapByName = {};
        this.referencedByMapByName = {};
    }
};
__decorate$b([
    DbNumber(),
    Id(),
    SequenceGenerator(),
    Column()
], exports.ApplicationVersion.prototype, "_localId", void 0);
__decorate$b([
    Column(),
    DbNumber()
], exports.ApplicationVersion.prototype, "integerVersion", void 0);
__decorate$b([
    Column(),
    DbString()
], exports.ApplicationVersion.prototype, "versionString", void 0);
__decorate$b([
    Column(),
    DbNumber()
], exports.ApplicationVersion.prototype, "majorVersion", void 0);
__decorate$b([
    Column(),
    DbNumber()
], exports.ApplicationVersion.prototype, "minorVersion", void 0);
__decorate$b([
    Column(),
    DbNumber()
], exports.ApplicationVersion.prototype, "patchVersion", void 0);
__decorate$b([
    Column(),
    Json()
], exports.ApplicationVersion.prototype, "jsonApplication", void 0);
__decorate$b([
    ManyToOne(),
    JoinColumn()
], exports.ApplicationVersion.prototype, "application", void 0);
__decorate$b([
    OneToMany()
], exports.ApplicationVersion.prototype, "entities", void 0);
__decorate$b([
    OneToMany()
], exports.ApplicationVersion.prototype, "references", void 0);
__decorate$b([
    OneToMany()
], exports.ApplicationVersion.prototype, "referencedBy", void 0);
__decorate$b([
    Transient()
], exports.ApplicationVersion.prototype, "entityMapByName", void 0);
__decorate$b([
    Transient()
], exports.ApplicationVersion.prototype, "referencesMapByName", void 0);
__decorate$b([
    Transient()
], exports.ApplicationVersion.prototype, "referencedByMapByName", void 0);
exports.ApplicationVersion = __decorate$b([
    Entity(),
    Table()
], exports.ApplicationVersion);

const __constructors__$2 = {
    Application: exports.Application,
    ApplicationColumn: exports.ApplicationColumn,
    ApplicationCurrentVersion: exports.ApplicationCurrentVersion,
    ApplicationEntity: exports.ApplicationEntity,
    ApplicationOperation: exports.ApplicationOperation,
    ApplicationProperty: exports.ApplicationProperty,
    ApplicationPropertyColumn: exports.ApplicationPropertyColumn,
    ApplicationReference: exports.ApplicationReference,
    ApplicationRelation: exports.ApplicationRelation,
    ApplicationRelationColumn: exports.ApplicationRelationColumn,
    ApplicationVersion: exports.ApplicationVersion,
    Domain: exports.Domain,
    VersionedApplicationObject: exports.VersionedApplicationObject
};
const Q_air____at_airport_slash_airspace = {
    __constructors__: __constructors__$2,
    domain: 'air',
    name: '@airport/airspace'
};
function air____at_airport_slash_airspace_diSet(dbEntityId) {
    return airApi.dS(Q_air____at_airport_slash_airspace.__dbApplication__, dbEntityId);
}
airApi.setQApp(Q_air____at_airport_slash_airspace);

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

exports.IsolateMessageType = void 0;
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
})(exports.IsolateMessageType || (exports.IsolateMessageType = {}));

exports.AppState = void 0;
(function (AppState) {
    AppState["NOT_INITIALIED"] = "NOT_INITIALIED";
    AppState["START_INITIALIZING"] = "START_INITIALIZING";
    AppState["INITIALIZING_IN_PROGRESS"] = "INITIALIZING_IN_PROGRESS";
    AppState["INITIALIZED"] = "INITIALIZED";
})(exports.AppState || (exports.AppState = {}));

/******************************************************************************
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

function __decorate$a(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

const applicationState = {
    api: null,
    application: null,
    appState: exports.AppState.NOT_INITIALIED,
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

exports.ApplicationStore = class ApplicationStore {
    constructor() {
        this.applicationState = applicationState;
    }
    get state() {
        return this.applicationState;
    }
};
exports.ApplicationStore = __decorate$a([
    Injected()
], exports.ApplicationStore);

exports.SelectorManager = class SelectorManager {
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
exports.SelectorManager = __decorate$a([
    Injected()
], exports.SelectorManager);

const apron = lib('apron');
const APPLICATION_LOADER = apron.token({
    class: null,
    interface: 'IApplicationLoader',
    token: 'APPLICATION_LOADER'
});
const APPLICATION_STORE = apron.token({
    class: exports.ApplicationStore,
    interface: 'IApplicationStore',
    token: 'APPLICATION_STORE'
});
const LOCAL_API_SERVER = apron.token({
    class: null,
    interface: 'ILocalAPIServer',
    token: 'LOCAL_API_SERVER'
});
const SELECTOR_MANAGER = apron.token({
    class: exports.SelectorManager,
    interface: 'ISelectorManager',
    token: 'SELECTOR_MANAGER'
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
const INTERNAL_DOMAIN = 'internal://domain';

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

/******************************************************************************
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

function __decorate$9(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

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
DbApplicationUtils = __decorate$9([
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

/******************************************************************************
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

function __decorate$8(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

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
__decorate$8([
    Inject()
], OperationSerializer.prototype, "serializationStateManager", void 0);
OperationSerializer = __decorate$8([
    Injected()
], OperationSerializer);

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
SerializationStateManager = SerializationStateManager_1 = __decorate$8([
    Injected()
], SerializationStateManager);

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
__decorate$8([
    Inject()
], QueryResultsDeserializer.prototype, "airEntityUtils", void 0);
__decorate$8([
    Inject()
], QueryResultsDeserializer.prototype, "serializationStateManager", void 0);
QueryResultsDeserializer = __decorate$8([
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

/******************************************************************************
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

function __decorate$7(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

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
__decorate$7([
    Inject()
], LocalAPIClient.prototype, "operationSerializer", void 0);
__decorate$7([
    Inject()
], LocalAPIClient.prototype, "queryResultsDeserializer", void 0);
LocalAPIClient = __decorate$7([
    Injected()
], LocalAPIClient);

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
__decorate$7([
    Inject()
], AutopilotApiLoader.prototype, "interAppApiClient", void 0);
__decorate$7([
    Inject()
], AutopilotApiLoader.prototype, "localApiClient", void 0);
AutopilotApiLoader = __decorate$7([
    Injected()
], AutopilotApiLoader);

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
UiStateManager = UiStateManager_1 = __decorate$7([
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

/******************************************************************************
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

function __decorate$6(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

/**
 * Marks a group of mutation history changes.
 */
exports.OperationHistory = class OperationHistory {
    constructor() {
        this.recordHistory = [];
    }
};
__decorate$6([
    GeneratedValue(),
    SequenceGenerator(),
    Id(),
    Column()
], exports.OperationHistory.prototype, "_localId", void 0);
__decorate$6([
    Column(),
    DbNumber()
], exports.OperationHistory.prototype, "orderNumber", void 0);
__decorate$6([
    Column(),
    DbString()
], exports.OperationHistory.prototype, "changeType", void 0);
__decorate$6([
    Column(),
    DbNumber()
], exports.OperationHistory.prototype, "systemWideOperationId", void 0);
__decorate$6([
    ManyToOne(),
    JoinColumn()
], exports.OperationHistory.prototype, "entity", void 0);
__decorate$6([
    ManyToOne(),
    JoinColumn()
], exports.OperationHistory.prototype, "actor", void 0);
__decorate$6([
    ManyToOne(),
    JoinColumn()
], exports.OperationHistory.prototype, "repositoryTransactionHistory", void 0);
__decorate$6([
    OneToMany()
], exports.OperationHistory.prototype, "recordHistory", void 0);
exports.OperationHistory = __decorate$6([
    Entity(),
    Table()
], exports.OperationHistory);

exports.RecordHistory = class RecordHistory {
    constructor() {
        this.newValues = [];
        this.oldValues = [];
    }
};
__decorate$6([
    Id(),
    GeneratedValue(),
    SequenceGenerator(),
    Column()
], exports.RecordHistory.prototype, "_localId", void 0);
__decorate$6([
    Column(),
    DbNumber()
], exports.RecordHistory.prototype, "_actorRecordId", void 0);
__decorate$6([
    ManyToOne(),
    JoinColumn()
], exports.RecordHistory.prototype, "actor", void 0);
__decorate$6([
    ManyToOne(),
    JoinColumn()
], exports.RecordHistory.prototype, "operationHistory", void 0);
__decorate$6([
    OneToMany()
], exports.RecordHistory.prototype, "newValues", void 0);
__decorate$6([
    OneToMany()
], exports.RecordHistory.prototype, "oldValues", void 0);
__decorate$6([
    Transient()
], exports.RecordHistory.prototype, "tableColumnMap", void 0);
exports.RecordHistory = __decorate$6([
    Entity(),
    Table()
], exports.RecordHistory);

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
__decorate$6([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RecordHistoryNewValue.prototype, "recordHistory", void 0);
__decorate$6([
    Id(),
    Column(),
    DbNumber()
], exports.RecordHistoryNewValue.prototype, "columnIndex", void 0);
__decorate$6([
    Column(),
    DbAny()
], exports.RecordHistoryNewValue.prototype, "newValue", void 0);
exports.RecordHistoryNewValue = __decorate$6([
    Entity(),
    Table()
], exports.RecordHistoryNewValue);

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
__decorate$6([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RecordHistoryOldValue.prototype, "recordHistory", void 0);
__decorate$6([
    Id(),
    Column(),
    DbNumber()
], exports.RecordHistoryOldValue.prototype, "columnIndex", void 0);
__decorate$6([
    Column(),
    DbAny()
], exports.RecordHistoryOldValue.prototype, "oldValue", void 0);
exports.RecordHistoryOldValue = __decorate$6([
    Entity(),
    Table()
], exports.RecordHistoryOldValue);

exports.RepositoryTransactionType = void 0;
(function (RepositoryTransactionType) {
    RepositoryTransactionType["LOCAL"] = "LOCAL";
    RepositoryTransactionType["REMOTE"] = "REMOTE";
    RepositoryTransactionType["REMOTE_REFERENCE"] = "REMOTE_REFERENCE";
})(exports.RepositoryTransactionType || (exports.RepositoryTransactionType = {}));

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
__decorate$6([
    GeneratedValue(),
    Id(),
    SequenceGenerator(),
    Column()
], exports.RepositoryTransactionHistory.prototype, "_localId", void 0);
__decorate$6([
    Column(),
    DbString()
], exports.RepositoryTransactionHistory.prototype, "repositoryTransactionType", void 0);
__decorate$6([
    Column(),
    DbNumber()
], exports.RepositoryTransactionHistory.prototype, "saveTimestamp", void 0);
__decorate$6([
    Column(),
    DbNumber()
], exports.RepositoryTransactionHistory.prototype, "syncTimestamp", void 0);
__decorate$6([
    Column(),
    DbString()
], exports.RepositoryTransactionHistory.prototype, "GUID", void 0);
__decorate$6([
    Column(),
    DbBoolean()
], exports.RepositoryTransactionHistory.prototype, "isRepositoryCreation", void 0);
__decorate$6([
    ManyToOne(),
    JoinColumn()
], exports.RepositoryTransactionHistory.prototype, "repository", void 0);
__decorate$6([
    ManyToOne(),
    JoinColumn()
], exports.RepositoryTransactionHistory.prototype, "transactionHistory", void 0);
__decorate$6([
    OneToMany()
], exports.RepositoryTransactionHistory.prototype, "operationHistory", void 0);
exports.RepositoryTransactionHistory = __decorate$6([
    Entity(),
    Table()
], exports.RepositoryTransactionHistory);

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
__decorate$6([
    GeneratedValue(),
    Id(),
    SequenceGenerator(),
    Column()
], exports.TransactionHistory.prototype, "_localId", void 0);
__decorate$6([
    Column(),
    DbString()
], exports.TransactionHistory.prototype, "transactionType", void 0);
__decorate$6([
    OneToMany()
], exports.TransactionHistory.prototype, "repositoryTransactionHistories", void 0);
__decorate$6([
    Transient()
], exports.TransactionHistory.prototype, "repositoryTransactionHistoryMap", void 0);
__decorate$6([
    Transient()
], exports.TransactionHistory.prototype, "applicationMap", void 0);
__decorate$6([
    Transient()
], exports.TransactionHistory.prototype, "allOperationHistory", void 0);
__decorate$6([
    Transient()
], exports.TransactionHistory.prototype, "allRecordHistory", void 0);
__decorate$6([
    Transient()
], exports.TransactionHistory.prototype, "allRecordHistoryNewValues", void 0);
__decorate$6([
    Transient()
], exports.TransactionHistory.prototype, "allRecordHistoryOldValues", void 0);
exports.TransactionHistory = __decorate$6([
    Entity(),
    Table()
], exports.TransactionHistory);

exports.Actor = class Actor {
};
__decorate$6([
    Id(),
    GeneratedValue(),
    DbNumber(),
    Column()
], exports.Actor.prototype, "_localId", void 0);
__decorate$6([
    Column(),
    DbString()
], exports.Actor.prototype, "GUID", void 0);
__decorate$6([
    ManyToOne(),
    JoinColumn()
], exports.Actor.prototype, "userAccount", void 0);
__decorate$6([
    ManyToOne(),
    JoinColumn()
], exports.Actor.prototype, "terminal", void 0);
__decorate$6([
    ManyToOne(),
    JoinColumn()
], exports.Actor.prototype, "application", void 0);
exports.Actor = __decorate$6([
    Entity()
], exports.Actor);

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
__decorate$6([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.AirEntity.prototype, "repository", void 0);
__decorate$6([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.AirEntity.prototype, "actor", void 0);
__decorate$6([
    Id(),
    Column(),
    GeneratedValue()
], exports.AirEntity.prototype, "_actorRecordId", void 0);
__decorate$6([
    Column(),
    DbNumber()
], exports.AirEntity.prototype, "ageSuitability", void 0);
__decorate$6([
    Column(),
    DbDate()
], exports.AirEntity.prototype, "createdAt", void 0);
__decorate$6([
    Column()
], exports.AirEntity.prototype, "systemWideOperationId", void 0);
__decorate$6([
    ManyToOne(),
    JoinColumn()
], exports.AirEntity.prototype, "originalRepository", void 0);
__decorate$6([
    ManyToOne(),
    JoinColumn()
], exports.AirEntity.prototype, "originalActor", void 0);
__decorate$6([
    Column()
], exports.AirEntity.prototype, "originalActorRecordId", void 0);
__decorate$6([
    Transient()
], exports.AirEntity.prototype, "createdBy", void 0);
__decorate$6([
    Transient()
], exports.AirEntity.prototype, "isNew", void 0);
__decorate$6([
    Transient()
], exports.AirEntity.prototype, "id", void 0);
exports.AirEntity = __decorate$6([
    MappedSuperclass()
], exports.AirEntity);

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
__decorate$6([
    Column(),
    GeneratedValue(),
    Id(),
    DbNumber()
], exports.Repository.prototype, "_localId", void 0);
__decorate$6([
    Column(),
    DbString()
], exports.Repository.prototype, "GUID", void 0);
__decorate$6([
    Column(),
    DbString()
], exports.Repository.prototype, "name", void 0);
__decorate$6([
    Column(),
    DbNumber()
], exports.Repository.prototype, "ageSuitability", void 0);
__decorate$6([
    Column(),
    DbDate()
], exports.Repository.prototype, "createdAt", void 0);
__decorate$6([
    Column()
], exports.Repository.prototype, "immutable", void 0);
__decorate$6([
    Column(),
    DbString()
], exports.Repository.prototype, "source", void 0);
__decorate$6([
    ManyToOne(),
    JoinColumn()
], exports.Repository.prototype, "owner", void 0);
__decorate$6([
    OneToMany()
], exports.Repository.prototype, "repositoryTransactionHistory", void 0);
__decorate$6([
    ManyToOne(),
    JoinColumn()
], exports.Repository.prototype, "continent", void 0);
__decorate$6([
    ManyToOne(),
    JoinColumn()
], exports.Repository.prototype, "country", void 0);
__decorate$6([
    ManyToOne(),
    JoinColumn()
], exports.Repository.prototype, "state", void 0);
__decorate$6([
    ManyToOne(),
    JoinColumn()
], exports.Repository.prototype, "metroArea", void 0);
__decorate$6([
    OneToMany()
], exports.Repository.prototype, "repositoryApplications", void 0);
__decorate$6([
    OneToMany()
], exports.Repository.prototype, "repositoryClients", void 0);
__decorate$6([
    OneToMany()
], exports.Repository.prototype, "repositoryDatabases", void 0);
__decorate$6([
    OneToMany()
], exports.Repository.prototype, "repositoryTerminals", void 0);
__decorate$6([
    OneToMany()
], exports.Repository.prototype, "repositoryTypes", void 0);
exports.Repository = __decorate$6([
    Entity(),
    Table()
], exports.Repository);

exports.RepositoryApplication = class RepositoryApplication {
};
__decorate$6([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RepositoryApplication.prototype, "application", void 0);
__decorate$6([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RepositoryApplication.prototype, "repository", void 0);
exports.RepositoryApplication = __decorate$6([
    Entity(),
    Table()
], exports.RepositoryApplication);

exports.RepositoryClient = class RepositoryClient {
};
__decorate$6([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RepositoryClient.prototype, "repository", void 0);
__decorate$6([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RepositoryClient.prototype, "client", void 0);
exports.RepositoryClient = __decorate$6([
    Entity(),
    Table()
], exports.RepositoryClient);

exports.RepositoryDatabase = class RepositoryDatabase {
};
__decorate$6([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RepositoryDatabase.prototype, "repository", void 0);
__decorate$6([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RepositoryDatabase.prototype, "database", void 0);
exports.RepositoryDatabase = __decorate$6([
    Entity(),
    Table()
], exports.RepositoryDatabase);

exports.RepositoryTerminal = class RepositoryTerminal {
};
__decorate$6([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RepositoryTerminal.prototype, "repository", void 0);
__decorate$6([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RepositoryTerminal.prototype, "terminal", void 0);
exports.RepositoryTerminal = __decorate$6([
    Entity(),
    Table()
], exports.RepositoryTerminal);

exports.RepositoryType = class RepositoryType {
};
__decorate$6([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RepositoryType.prototype, "repository", void 0);
__decorate$6([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.RepositoryType.prototype, "type", void 0);
exports.RepositoryType = __decorate$6([
    Entity(),
    Table()
], exports.RepositoryType);

const __constructors__$1 = {
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
const Q_air____at_airport_slash_holding_dash_pattern = {
    __constructors__: __constructors__$1,
    domain: 'air',
    name: '@airport/holding-pattern'
};
function air____at_airport_slash_holding_dash_pattern_diSet(dbEntityId) {
    return airApi.dS(Q_air____at_airport_slash_holding_dash_pattern.__dbApplication__, dbEntityId);
}
airApi.setQApp(Q_air____at_airport_slash_holding_dash_pattern);

const holdingPattern = lib('holding-pattern');
const REPOSITORY_API = holdingPattern.token({
    class: null,
    interface: 'RepositoryApi',
    token: 'REPOSITORY_API'
});

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

loadAutopilot();

REPOSITORY_API.setClass(RepositoryApi);
REPOSITORY_API.setDependencies({
    interAppApiClient: INTER_APP_API_CLIENT
});

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
function getPrimitiveValue(value, dbColumn, rowIndex, datesToNumbers = true) {
    switch (dbColumn.type) {
        case SQLDataType.ANY: {
            assertDataType([
                'boolean', 'number', 'object', 'string'
            ], dbColumn, rowIndex, value);
            break;
        }
        case SQLDataType.BOOLEAN: {
            assertDataType([
                'boolean'
            ], dbColumn, rowIndex, value);
            break;
        }
        case SQLDataType.DATE: {
            assertDataType([
                'number', 'object'
            ], dbColumn, rowIndex, value);
            break;
        }
        case SQLDataType.JSON: {
            assertDataType([
                'object'
            ], dbColumn, rowIndex, value);
            break;
        }
        case SQLDataType.NUMBER: {
            assertDataType([
                'number'
            ], dbColumn, rowIndex, value);
            break;
        }
        case SQLDataType.STRING: {
            assertDataType([
                'string'
            ], dbColumn, rowIndex, value);
            break;
        }
        default:
            throw new Error('Unexpected SQLDataType: ' + dbColumn.type);
    }
    switch (typeof value) {
        case 'boolean':
            return value ? 1 : 0;
        case 'number':
        case 'string':
            // FIXME: prevent SQL injection
            return value;
        case 'object': {
            if (value === null) {
                return value;
            }
            if (value instanceof Date) {
                if (dbColumn.type !== SQLDataType.DATE) {
                    throw new Error(`Unexpected Date object for row: ${rowIndex + 1}, column: ${getColumnName(dbColumn)}`);
                }
                return datesToNumbers ? value.getTime() : value;
            }
            else {
                if (dbColumn.type !== SQLDataType.JSON) {
                    throw new Error(`Unexpected Json object for row: ${rowIndex + 1}, column: ${getColumnName(dbColumn)}`);
                }
                return JSON.stringify(value);
            }
        }
        case 'undefined':
            throw new Error(`Cannot use an 'undefined' value in an operation.`);
        default:
            throw new Error(`Unexpected object in operation.`);
    }
}
function assertDataType(typesOfData, dbColumn, rowIndex, value) {
    if (typesOfData.indexOf(typeof value) < -1) {
        const expectedDataTypes = typesOfData.join(', ');
        throw new Error(`Unexpected typeof value for row: ${rowIndex + 1}, column: ${getColumnName(dbColumn)}.  Expecting: ${expectedDataTypes}`);
    }
}
function getColumnName(dbColumn) {
    return dbColumn.name
        ? dbColumn.name
        : dbColumn.propertyColumns[0].property.name;
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
 * Created by Papa on 11/17/2016.
 */
// FIXME: add support for a full blown INSERT VALUES, with expression support for VALUES
class AbstractInsertValues extends AbstractQuery {
    constructor(rawInsertValues, columnIndexes) {
        super();
        this.rawInsertValues = rawInsertValues;
        this.columnIndexes = columnIndexes;
    }
    validateColumn(dbColumn, dbEntity, columnName) {
        if (!dbColumn) {
            throw new Error(`
		Could not find column ${columnName} in entity: ${dbEntity.name}
				(table: ${dbEntity.tableConfig.name})
						`);
        }
        if (dbColumn.entity.applicationVersion.application.index !==
            dbEntity.applicationVersion.application.index
            || dbColumn.entity.index !== dbEntity.index) {
            const columnApplication = dbColumn.entity.applicationVersion.application;
            const entityApplication = dbEntity.applicationVersion.application;
            throw new Error(`Unexpected entity for column ${dbColumn.name}.
			Expecting:
				Domain: ${entityApplication.domain.name}
				Application: ${entityApplication.name}
				Entity: ${dbEntity.name}
			Found:
				Domain: ${columnApplication.domain.name}
				Application: ${columnApplication.name}
				Entity: ${dbColumn.entity.name}`);
        }
    }
    valuesToJSON(valueSets, dbColumns, queryUtils, fieldUtils, relationManager) {
        // let currentValueIndex = -1;
        // this.values           = [];
        return valueSets.map((valueSet, rowIndex) => {
            return valueSet.map((value, columnIndex) => {
                if (value === undefined) {
                    throw new Error(`Cannot use 'undefined' in VALUES clause.`);
                }
                if (!(value instanceof QField)) {
                    return getPrimitiveValue(value, dbColumns[columnIndex], rowIndex);
                    // this.values.push(getPrimitiveValue(value));
                    // return ++currentValueIndex;
                }
                else {
                    return value.toJSON(this.columnAliases, false, queryUtils, fieldUtils, relationManager);
                }
            });
        });
    }
}

class AbstractUpdate extends AbstractQuery {
    constructor(rawUpdate) {
        super();
        this.rawUpdate = rawUpdate;
    }
    toJSON(queryUtils, fieldUtils, relationManager) {
        return {
            U: this.rawUpdate.UPDATE
                .__driver__.getRelationJson(this.columnAliases, queryUtils, fieldUtils, relationManager),
            S: this.setToJSON(this.rawUpdate.SET, queryUtils, fieldUtils, relationManager),
            W: queryUtils.whereClauseToJSON(this.rawUpdate.WHERE, this.columnAliases)
        };
    }
}

/**
 * Created by Papa on 10/2/2016.
 */
class Delete extends AbstractQuery {
    constructor(rawDelete) {
        super();
        this.rawDelete = rawDelete;
    }
    toJSON(queryUtils, fieldUtils, relationManager) {
        return {
            DF: this.rawDelete.DELETE_FROM
                .__driver__.getRelationJson(this.columnAliases, queryUtils, fieldUtils, relationManager),
            W: queryUtils.whereClauseToJSON(this.rawDelete.WHERE, this.columnAliases)
        };
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

// FIXME: add support for a full blown INSERT VALUES, with expression support for VALUES
class InsertColumnValues extends AbstractInsertValues {
    toJSON(queryUtils, fieldUtils, relationManager) {
        const entityDriver = this.rawInsertValues.INSERT_INTO.__driver__;
        const insertInto = entityDriver.getRelationJson(this.columnAliases, queryUtils, fieldUtils, relationManager);
        const columnMap = entityDriver.dbEntity.columnMap;
        const dbColumns = [];
        const columnIndexes = this.columnIndexes ? this.columnIndexes : this.rawInsertValues.columns.map((columnName) => {
            const dbColumn = columnMap[columnName];
            this.validateColumn(dbColumn, entityDriver.dbEntity, columnName);
            dbColumns.push(dbColumn);
            return dbColumn.index;
        });
        return {
            II: insertInto,
            C: columnIndexes,
            V: this.valuesToJSON(this.rawInsertValues.VALUES, dbColumns, queryUtils, fieldUtils, relationManager)
        };
    }
}

/**
 * Created by Papa on 11/17/2016.
 */
// FIXME: add support for a full blown INSERT VALUES, with expression support for VALUES
class InsertValues extends AbstractInsertValues {
    toJSON(queryUtils, fieldUtils, relationManager) {
        const driver = this.rawInsertValues.INSERT_INTO
            .__driver__;
        const insertInto = driver.getRelationJson(this.columnAliases, queryUtils, fieldUtils, relationManager);
        const dbColumns = [];
        let columnIndexes;
        if (this.columnIndexes) {
            columnIndexes = this.columnIndexes;
            for (let i = 0; i < columnIndexes.length; i++) {
                const dbColumn = driver.dbEntity.columns[columnIndexes[i]];
                this.validateColumn(dbColumn, driver.dbEntity);
                dbColumns.push(dbColumn);
            }
        }
        else {
            columnIndexes = this.rawInsertValues.columns.map(column => {
                const dbColumn = column.dbColumn;
                this.validateColumn(dbColumn, driver.dbEntity);
                dbColumns.push(dbColumn);
                return dbColumn.index;
            });
        }
        return {
            II: insertInto,
            C: columnIndexes,
            V: this.valuesToJSON(this.rawInsertValues.VALUES, dbColumns, queryUtils, fieldUtils, relationManager)
        };
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

class UpdateColumns extends AbstractUpdate {
    constructor(rawUpdate) {
        super(rawUpdate);
    }
    setToJSON(set, queryUtils, fieldUtils, relationManager) {
        const setClause = {};
        const dbEntity = this.rawUpdate.UPDATE
            .__driver__.dbEntity;
        const dbColumnMap = dbEntity.columnMap;
        const idDbColumnMap = dbEntity.idColumnMap;
        for (const columnName in set) {
            let value = set[columnName];
            if (value === undefined) {
                delete set[columnName];
                continue;
            }
            if (!dbColumnMap[columnName]) {
                throw new Error(`
	Unknown column: '${columnName}' for entity: '${dbEntity.name}'
			(table: '${dbEntity.tableConfig.name}').
				`);
            }
            if (idDbColumnMap[columnName]) {
                throw new Error(`
	Cannot update @Id columns:
	Column: '${columnName}' for entity: '${dbEntity.name}'
			(table: '${dbEntity.tableConfig.name}').
				`);
            }
            value = wrapPrimitive(value);
            if (!value.toJSON) {
                throw `Unexpected value ${JSON.stringify(value)} for property ${columnName} of entity ${dbEntity.name}`;
            }
            setClause[columnName] = value.toJSON(this.columnAliases, false, queryUtils, fieldUtils, relationManager);
        }
        return setClause;
    }
}

/**
 * Created by Papa on 10/2/2016.
 */
// FIXME: add support for a full blown UPDATE, with expression support for SET
class UpdateProperties extends AbstractUpdate {
    constructor(rawUpdate) {
        super(rawUpdate);
    }
    toJSON(queryUtils, fieldUtils, relationManager) {
        return {
            U: this.rawUpdate.UPDATE
                .__driver__.getRelationJson(this.columnAliases, queryUtils, fieldUtils, relationManager),
            S: this.setToJSON(this.rawUpdate.SET, queryUtils, fieldUtils, relationManager),
            W: queryUtils.whereClauseToJSON(this.rawUpdate.WHERE, this.columnAliases)
        };
    }
    setToJSON(rawSet, queryUtils, fieldUtils, relationManager) {
        const jsonSetClause = {};
        const dbEntity = this.rawUpdate.UPDATE.__driver__.dbEntity;
        const dbPropertyMap = dbEntity.propertyMap;
        this.setEntityFragmentsToJSON(rawSet, jsonSetClause, [], dbPropertyMap, [], queryUtils, fieldUtils, relationManager);
        return jsonSetClause;
    }
    setEntityFragmentsToJSON(rawSetFragment, jsonSetClause, dbPropertyChain, dbPropertyMap, childDbRelationChain, queryUtils, fieldUtils, relationManager) {
        const isTopLevelFragment = !dbPropertyMap.length;
        for (const propertyName in rawSetFragment) {
            const dbProperty = dbPropertyMap[propertyName];
            const dbEntity = dbProperty.entity;
            if (!dbProperty) {
                throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

	Unknown property: '${propertyName}' for entity: '${dbEntity.name}'
			(table: '${dbEntity.tableConfig.name}').
				`);
            }
            if (isTopLevelFragment && dbProperty.isId) {
                throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

	Cannot update @Id properties:
	Property: '${propertyName}' for entity: '${dbEntity.name}'
			(table: '${dbEntity.tableConfig.name}').
				`);
            }
            else if (!isTopLevelFragment && !dbProperty.isId) {
                throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

	Updated properties of nested entities must be @Id properties:
	Property: '${propertyName}' for entity: '${dbEntity.name}'
			(table: '${dbEntity.tableConfig.name}').
				`);
            }
            const childDbPropertyChain = [...dbPropertyChain];
            childDbPropertyChain.push(dbProperty);
            this.setFragmentToJSON(rawSetFragment, jsonSetClause, childDbPropertyChain, propertyName, childDbRelationChain, queryUtils, fieldUtils, relationManager);
        }
    }
    setFragmentToJSON(rawSetFragment, jsonSetClause, dbPropertyChain, propertyName, dbRelationChain, queryUtils, fieldUtils, relationManager) {
        const dbProperty = dbPropertyChain[dbPropertyChain.length - 1];
        const dbEntity = dbProperty.entity;
        let value = rawSetFragment[propertyName];
        if (value === undefined) {
            delete rawSetFragment[propertyName];
            return;
        }
        value = wrapPrimitive(value);
        // If this is not a nested object definition
        if (value.toJSON) {
            if (dbProperty.propertyColumns.length !== 1) {
                throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

	Cannot update multi-column property to a single value:
	Property: '${propertyName}' for entity: '${dbEntity.name}'
			(table: '${dbEntity.tableConfig.name}')
			has ${dbProperty.propertyColumns.length + 1} columns 
			but is being updates to a single value.
				`);
            }
            else {
                let dbColumn = dbProperty.propertyColumns[0].column;
                if (dbRelationChain.length) {
                    for (let i = dbRelationChain.length - 1; i >= 0; i--) {
                        const currentDbRelation = dbRelationChain[i];
                        const matchingManyRelationColumn = currentDbRelation.manyRelationColumns.filter((manyRelationColumn) => {
                            return manyRelationColumn.manyColumn.index ===
                                dbColumn.index;
                        })[0];
                        dbColumn = matchingManyRelationColumn.oneColumn;
                    }
                }
                if (jsonSetClause[dbColumn.name]) {
                    const firstProperty = dbPropertyChain[0];
                    throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

	Cannot update the same column multiple times in the same statement:
	Property: '${propertyName}' for entity: '${dbEntity.name}'
			(table: '${dbEntity.tableConfig.name}')
	maps to table: ${firstProperty.entity.tableConfig.name}, column: ${dbColumn.name}
		which has already been set in this update statement (above).
				`);
                }
                jsonSetClause[dbColumn.name] = value.toJSON(this.columnAliases, false, queryUtils, fieldUtils, relationManager);
                return;
            }
        }
        // This should be a nested property definition
        else {
            if (typeof value === 'object') {
                const dbRelation = dbProperty.relation[0];
                const childDbRelationChain = [...dbRelationChain];
                childDbRelationChain.push(dbRelation);
                switch (dbRelation.relationType) {
                    case EntityRelationType.MANY_TO_ONE: {
                        this.setEntityFragmentsToJSON(value, jsonSetClause, dbPropertyChain, dbRelation.relationEntity.propertyMap, childDbRelationChain, queryUtils, fieldUtils, relationManager);
                        break;
                    }
                    case EntityRelationType.ONE_TO_MANY:
                        // Not  nested property definition
                        throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

				Cannot update @OneToMany properties:
					Property: '${propertyName}' of entity: '${this.rawUpdate.UPDATE.__driver__.dbEntity.name}
					is a @OneToMany relation and cannot be updated since it is
					assumed to be based on @Id columns (which cannot be updated).'
				`);
                    default:
                        // Not  nested property definition
                        throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

				Undefined relation type: 
					Property: '${propertyName}' of entity: '${this.rawUpdate.UPDATE.__driver__.dbEntity.name}'
					is defined with an unknown type of a relation.  Expecting either
					@ManyToOne(...)
					or
					@OneToMany(...)
				`);
                }
                return;
            }
            else {
                // Not  nested property definition
                throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

				Unexpected value ${JSON.stringify(value)} 
					for property: '${propertyName}' of entity: '${this.rawUpdate.UPDATE.__driver__.dbEntity.name}'
				Expecting a nested property definition.
				`);
            }
        }
    }
    getPropertyChainDesription(dbPropertyChain) {
        const rootDbEntity = dbPropertyChain[0].entity;
        let prefix = '    ';
        let lastPrefix = '';
        let ending = `...
}`;
        let message = `
Updated Entity: ${rootDbEntity.name}, property chain:
{`;
        const maxChainDepth = dbPropertyChain.length;
        for (let i = 0; i < maxChainDepth; i++) {
            let dbProperty = dbPropertyChain[i];
            message += `${prefix}${dbProperty.name}: `;
            if (i + 1 < maxChainDepth) {
                message += `: {\n`;
            }
            else {
                message += 'VALUE';
            }
            ending = prefix + `...
${lastPrefix}}`;
            lastPrefix = prefix;
            prefix += '    ';
        }
        return `${message}
${ending}`;
    }
}

/******************************************************************************
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

function __decorate$5(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

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
exports.Lookup = class Lookup {
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
], exports.Lookup.prototype, "entityUtils", void 0);
__decorate$5([
    Inject()
], exports.Lookup.prototype, "queryFacade", void 0);
exports.Lookup = __decorate$5([
    Injected()
], exports.Lookup);
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

/**
 * Created by Papa on 11/12/2016.
 */
class EntitySearch extends EntityLookup {
    graph(rawGraphQuery, context) {
        return from(this.search(rawGraphQuery, QueryResultType.ENTITY_TREE, context));
    }
    tree(rawTreeQuery, context) {
        return from(this.search(rawTreeQuery, QueryResultType.ENTITY_TREE, context));
    }
    async search(rawEntityQuery, queryResultType, context) {
        return await this.entityLookup(rawEntityQuery, queryResultType, true, false, this.ensureContext(context));
    }
    noCache() {
        return this.setNoCache(EntitySearch);
    }
}

/**
 * Created by Papa on 11/12/2016.
 */
class EntitySearchOne extends EntityLookup {
    graph(rawGraphQuery, context) {
        return from(this.searchOne(rawGraphQuery, QueryResultType.ENTITY_GRAPH, context));
    }
    tree(rawTreeQuery, context) {
        return from(this.searchOne(rawTreeQuery, QueryResultType.ENTITY_TREE, context));
    }
    // TODO: return Observable from deep within the framework
    // and detect changes to the underlying data
    async searchOne(rawEntityQuery, queryResultType, context) {
        return await this.entityLookup(rawEntityQuery, queryResultType, true, true, this.ensureContext(context));
    }
}

/**
 * Created by Papa on 11/12/2016.
 */
exports.NonEntityFind = class NonEntityFind extends exports.Lookup {
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
exports.NonEntityFind = __decorate$5([
    Injected()
], exports.NonEntityFind);

/**
 * Created by Papa on 11/12/2016.
 */
exports.NonEntityFindOne = class NonEntityFindOne extends exports.Lookup {
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
exports.NonEntityFindOne = __decorate$5([
    Injected()
], exports.NonEntityFindOne);

/**
 * Created by Papa on 11/12/2016.
 */
exports.NonEntitySearch = class NonEntitySearch extends exports.Lookup {
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
exports.NonEntitySearch = __decorate$5([
    Injected()
], exports.NonEntitySearch);

/**
 * Created by Papa on 11/12/2016.
 */
exports.NonEntitySearchOne = class NonEntitySearchOne extends exports.Lookup {
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
exports.NonEntitySearchOne = __decorate$5([
    Injected()
], exports.NonEntitySearchOne);

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

/**
 * Created by Papa on 8/26/2017.
 */
exports.Dao = class Dao {
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
__decorate$5([
    Inject()
], exports.Dao.prototype, "databaseFacade", void 0);
__decorate$5([
    Inject()
], exports.Dao.prototype, "entityStateManager", void 0);
__decorate$5([
    Inject()
], exports.Dao.prototype, "lookup", void 0);
__decorate$5([
    Inject()
], exports.Dao.prototype, "updateCacheManager", void 0);
exports.Dao = __decorate$5([
    Injected()
], exports.Dao);

class DaoQueryDecorators {
    Graph(callback) {
        return function (target, propertyKey) {
            // No runtime logic required.
        };
    }
    Tree(callback) {
        return function (target, propertyKey) {
            // No runtime logic required.
        };
    }
}

const tarmaqDao = lib('tarmaq-dao');

const DAO = tarmaqDao.token({
    class: exports.Dao,
    interface: 'class Dao',
    token: 'DAO'
});
const DATABASE_FACADE = tarmaqDao.token({
    class: null,
    interface: 'IDatabaseFacade',
    token: 'DATABASE_FACADE'
});
const LOOKUP = tarmaqDao.token({
    class: exports.Lookup,
    interface: 'ILookup',
    token: 'LOOKUP'
});
const NON_ENTITY_FIND = tarmaqDao.token({
    class: exports.NonEntityFind,
    interface: 'INonEntityFind',
    token: 'NON_ENTITY_FIND'
});
const NON_ENTITY_FIND_ONE = tarmaqDao.token({
    class: exports.NonEntityFindOne,
    interface: 'INonEntityFindOne',
    token: 'NON_ENTITY_FIND_ONE'
});
const NON_ENTITY_SEARCH = tarmaqDao.token({
    class: exports.NonEntitySearch,
    interface: 'INonEntitySearch',
    token: 'NON_ENTITY_SEARCH'
});
const NON_ENTITY_SEARCH_ONE = tarmaqDao.token({
    class: exports.NonEntitySearchOne,
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

function diSet(dbApplication, dbEntityId // ApplicationEntity_LocalId
) {
    {
        return false;
    }
}
function duoDiSet(dbApplication, dbEntityId) {
    return dbApplication && dbApplication.currentVersion[0]
        .applicationVersion.entities[dbEntityId];
}
airApi.dS = diSet;
airApi.ddS = duoDiSet;

const ACTOR_PROPERTY_NAME = 'actor';
const REPOSITORY_PROPERTY_NAME = 'repository';

/******************************************************************************
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

function __decorate$4(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

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
__decorate$4([
    Inject()
], ApplicationUtils.prototype, "airportDatabase", void 0);
__decorate$4([
    Inject()
], ApplicationUtils.prototype, "entityStateManager", void 0);
__decorate$4([
    Inject()
], ApplicationUtils.prototype, "utils", void 0);
ApplicationUtils = ApplicationUtils_1 = __decorate$4([
    Injected()
], ApplicationUtils);

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
__decorate$4([
    Inject()
], EntityUtils.prototype, "utils", void 0);
EntityUtils = __decorate$4([
    Injected()
], EntityUtils);
ENTITY_UTILS.setClass(EntityUtils);

let FieldUtils = class FieldUtils {
    getFieldQueryJson(fieldSubQuery, entityAliases, queryUtils) {
        let subSelectQuery = new FieldQuery(fieldSubQuery, entityAliases);
        return subSelectQuery.toJSON(queryUtils, this, this.relationManager);
    }
};
__decorate$4([
    Inject()
], FieldUtils.prototype, "relationManager", void 0);
FieldUtils = __decorate$4([
    Injected()
], FieldUtils);

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
QMetadataUtils = __decorate$4([
    Injected()
], QMetadataUtils);

function getColumnQField(entity, property, q, column) {
    switch (column.type) {
        case SQLDataType.ANY:
            return new QUntypedField(column, property, q);
        case SQLDataType.BOOLEAN:
            return new QBooleanField(column, property, q);
        case SQLDataType.DATE:
            return new QDateField(column, property, q);
        case SQLDataType.NUMBER:
            return new QNumberField(column, property, q);
        case SQLDataType.JSON:
        case SQLDataType.STRING:
            return new QStringField(column, property, q);
        default:
            throw new Error(`Unsupported data type for property ${entity.applicationVersion.application.name}.${entity.name}.${property.name}`);
    }
}
function getQRelation(entity, property, q, allQApps, applicationUtils, relationManager) {
    const relation = property.relation[0];
    switch (relation.relationType) {
        case EntityRelationType.MANY_TO_ONE:
            const relationEntity = relation.relationEntity;
            const relationApplication = relationEntity.applicationVersion.application;
            const qIdRelationConstructor = allQApps[relationApplication.index]
                .__qIdRelationConstructors__[relationEntity.index];
            return new qIdRelationConstructor(relation.relationEntity, relation, q, applicationUtils, relationManager);
        case EntityRelationType.ONE_TO_MANY:
            if (entity.isAirEntity) {
                return new QAirEntityOneToManyRelation(relation, q, applicationUtils, relationManager);
            }
            else {
                return new QOneToManyRelation(relation, q, applicationUtils, relationManager);
            }
        default:
            throw new Error(`Unknown EntityRelationType: ${relation.relationType}.`);
    }
}
function getQEntityConstructor(allQApps) {
    // ChildQEntity refers to the constructor
    var ChildQEntity = function (entity, applicationUtils, relationManager, nextChildJoinPosition, dbRelation, joinType) {
        ChildQEntity.base.constructor.call(this, entity, applicationUtils, relationManager, nextChildJoinPosition, dbRelation, joinType);
        entity.properties.forEach((property) => {
            let qFieldOrRelation;
            if (property.relation && property.relation.length) {
                qFieldOrRelation = getQRelation(entity, property, this, allQApps, applicationUtils, relationManager);
                for (const propertyColumn of property.propertyColumns) {
                    addColumnQField(entity, property, this, propertyColumn.column);
                }
            }
            else {
                qFieldOrRelation = addColumnQField(entity, property, this, property.propertyColumns[0].column);
            }
            this[property.name] = qFieldOrRelation;
        });
        // entity.__qConstructor__ = ChildQEntity
    };
    const childQEntityMethods = {
    /*
    yourMethodName: function() {},
    */
    };
    extend(QEntity, ChildQEntity, childQEntityMethods);
    return ChildQEntity;
}
function addColumnQField(entity, property, q, column) {
    const qFieldOrRelation = getColumnQField(entity, property, q, column);
    q.__driver__.allColumns[column.index]
        = qFieldOrRelation;
    if (column.idIndex || column.idIndex === 0) {
        q.__driver__.idColumns[column.idIndex]
            = qFieldOrRelation;
    }
    return qFieldOrRelation;
}
function getQEntityIdRelationConstructor(dbEntity) {
    function QEntityIdRelation(entity, relation, qEntity, appliationUtils, relationManager) {
        QEntityIdRelation.base.constructor.call(this, relation, qEntity, appliationUtils, relationManager);
        getQEntityIdFields(this, entity, qEntity, relation.property);
        // (<any>entity).__qConstructor__.__qIdRelationConstructor__ = QEntityIdRelation
    }
    const qEntityIdRelationMethods = {
    /*
    yourMethodName: function() {},
    */
    };
    if (dbEntity.isAirEntity) {
        extend(QAirEntityRelation, QEntityIdRelation, qEntityIdRelationMethods);
    }
    else {
        extend(QRelation, QEntityIdRelation, qEntityIdRelationMethods);
    }
    return QEntityIdRelation;
}
/**
 * Set all fields behind an id relation.  For example
 *
 * QA.id
 *
 * or
 *
 * QA.rel1.id
 *
 * or
 *
 * QA.rel2.otherRel.id
 * QA.rel2.id
 *
 * @param addToObject  Object to add to (Ex: QA | QA.rel1 | QA.rel2.otherRel
 * @param relationEntity  Entity to which the fields belong (Ex: QA, QRel1, QRel2, QOtherRel)
 * @param utils
 * @param parentProperty  The parent property from which the current property was
 *    navigated to
 * @param relationColumnMap  DbColumn map for the current path of properties
 *  (QA.rel2.otherRel), keyed by the column from the One side of the relation
 */
function getQEntityIdFields(addToObject, relationEntity, qEntity, parentProperty, relationColumnMap) {
    if (!relationColumnMap) {
        const parentRelation = parentProperty.relation[0];
        const relationColumns = parentRelation.manyRelationColumns;
        relationColumnMap = new Map();
        for (const relationColumn of relationColumns) {
            relationColumnMap.set(relationColumn.oneColumn, relationColumn.manyColumn);
        }
    }
    relationEntity.properties.forEach((property) => {
        if (!property.isId) {
            return;
        }
        let qFieldOrRelation;
        // If it's a relation property (and therefore has backing columns)
        if (property.relation && property.relation.length) {
            const relation = property.relation[0];
            const relationColumns = relation.manyRelationColumns;
            for (const relationColumn of relationColumns) {
                const originalColumn = relationColumnMap.get(relationColumn.manyColumn);
                // Remove the mapping of the parent relation
                relationColumnMap.delete(relationColumn.manyColumn);
                // And replace it with the nested relation
                relationColumnMap.set(relationColumn.oneColumn, originalColumn);
            }
            qFieldOrRelation = getQEntityIdFields({}, relation.relationEntity, qEntity, parentProperty, relationColumnMap);
        }
        else {
            const originalColumn = relationColumnMap.get(property.propertyColumns[0].column);
            qFieldOrRelation = getColumnQField(relationEntity, parentProperty, qEntity, originalColumn);
        }
        addToObject[property.name] = qFieldOrRelation;
    });
    return addToObject;
}
function setQAppEntities(application, qApplication, allQApps, appliationUtils, relationManager) {
    // const entities = orderEntitiesByIdDependencies(application.currentVersion[0].applicationVersion.entities,
    // application)
    qApplication.__qIdRelationConstructors__ = [];
    qApplication.__qConstructors__ = {};
    // let haveMissingDependencies
    // do {
    // 	haveMissingDependencies = false
    // NOTE: only need to compute the keys of entities for Many-to-One(s)
    // Many-to-Ones must reference the table by primary key in order to
    // guarantee a single record.  Any other type of join may return multiple
    // records and is in fact a Many-to-Many
    application.currentVersion[0].applicationVersion.entities.forEach((
    // entities.forEach((
    entity) => {
        // NOTE: an @Id column is guaranteed to be present in only one property
        for (const idColumn of entity.idColumns) {
            if (idColumn.manyRelationColumns
                && idColumn.manyRelationColumns.length) {
                const oneColumn = idColumn.manyRelationColumns[0].oneColumn;
                const relatedEntity = oneColumn.entity;
                const relatedQApp = allQApps[relatedEntity.applicationVersion.application.index];
                if (!relatedQApp) {
                    throw new Error(`QApp not yet initialized for ID relation:
					${entity.name}.${oneColumn.name}
					`);
                }
                // const manyColumn = idColumn.manyRelationColumns[0].manyColumn
                // if (relatedEntity.id === manyColumn.entity.id
                // 	&& relatedEntity.applicationVersion.application.index
                // 	=== manyColumn.entity.applicationVersion.application.index) {
                // 	continue
                // }
                // const relatedQEntityConstructor =
                // qApplication.__qConstructors__[relatedEntity.index] if (!relatedQEntityConstructor)
                // { throw new Error(`QEntity not yet initialized for ID relation:
                // ${entity.name}.${manyColumn.name} `) haveMissingDependencies = true }
            }
        }
        const qIdRelationConstructor = getQEntityIdRelationConstructor(entity);
        qApplication.__qIdRelationConstructors__[entity.index] = qIdRelationConstructor;
        // TODO: compute many-to-many relations
        const qConstructor = getQEntityConstructor(allQApps);
        qApplication.__qConstructors__[entity.index] = qConstructor;
        if (!Object.getOwnPropertyNames(qApplication)
            .filter(propertyName => propertyName === entity.name).length) {
            Object.defineProperty(qApplication, entity.name, {
                get: function () {
                    return new this.__qConstructors__[entity.index](entity, appliationUtils, relationManager);
                }
            });
        }
    });
    // } while (haveMissingDependencies)
}

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
__decorate$4([
    Inject()
], QueryUtils.prototype, "entityUtils", void 0);
__decorate$4([
    Inject()
], QueryUtils.prototype, "fieldUtils", void 0);
__decorate$4([
    Inject()
], QueryUtils.prototype, "relationManager", void 0);
__decorate$4([
    Inject()
], QueryUtils.prototype, "airEntityUtils", void 0);
QueryUtils = __decorate$4([
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
DatabaseStore = __decorate$4([
    Injected()
], DatabaseStore);

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
__decorate$4([
    Inject()
], RelationManager.prototype, "applicationUtils", void 0);
RelationManager = __decorate$4([
    Injected()
], RelationManager);

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
Utils = __decorate$4([
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

airApi.setQApp = function (qApplication) {
    DEPENDENCY_INJECTION.db().eventuallyGet(AIRPORT_DATABASE).then((airportDatabase) => {
        airportDatabase.setQApp(qApplication);
    });
};

/**
 * Created by Papa on 6/10/2016.
 */
const INVALID_TABLE_NAME = 'A0ZA2vKHIAeI9506rYzCSFKYcSbSuLy5sRieHPnd2NevufFEx9CxuZsAdXieZBbRj5mPYypr3TGYwb6limMcTTWHOnsk7F6991890';

/**
 * Created by Papa on 4/16/2017.
 */
exports.AirEntityType = void 0;
(function (AirEntityType) {
    AirEntityType["NOT_AIR_ENTITY"] = "NOT_AIR_ENTITY";
    AirEntityType["AIR_ENTITY"] = "AIR_ENTITY";
})(exports.AirEntityType || (exports.AirEntityType = {}));

/******************************************************************************
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

function __decorate$3(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

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

exports.TerminalState = class TerminalState {
    constructor() {
        this.terminalState = internalTerminalState;
    }
};
exports.TerminalState = __decorate$3([
    Injected()
], exports.TerminalState);

exports.TerminalStore = class TerminalStore {
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
__decorate$3([
    Inject()
], exports.TerminalStore.prototype, "selectorManager", void 0);
__decorate$3([
    Inject()
], exports.TerminalStore.prototype, "terminalState", void 0);
exports.TerminalStore = __decorate$3([
    Injected()
], exports.TerminalStore);

const internalUserState = new BehaviorSubject({
    allSessions: [],
    sessionMapByEmail: new Map()
});

exports.UserState = class UserState {
    constructor() {
        this.userState = internalUserState;
    }
};
exports.UserState = __decorate$3([
    Injected()
], exports.UserState);

exports.UserStore = class UserStore {
    get state() {
        return this.userState.userState;
    }
    async init() {
        this.getUserState = this.selectorManager.createRootSelector(this.state);
        this.getAllSessions = this.selectorManager.createSelector(this.getUserState, userState => userState.allSessions);
        this.getSessionMapByEmail = this.selectorManager.createSelector(this.getUserState, userState => userState.sessionMapByEmail);
    }
};
__decorate$3([
    Inject()
], exports.UserStore.prototype, "selectorManager", void 0);
__decorate$3([
    Inject()
], exports.UserStore.prototype, "userState", void 0);
exports.UserStore = __decorate$3([
    Injected()
], exports.UserStore);

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
const TERMINAL_SESSION_MANAGER = terminalMap.token({
    class: null,
    interface: 'ITerminalSessionManager',
    token: 'TERMINAL_SESSION_MANAGER'
});
const TERMINAL_STATE = terminalMap.token({
    class: exports.TerminalState,
    interface: 'ITerminalStateContainer',
    token: 'TERMINAL_STATE'
});
const TERMINAL_STORE = terminalMap.token({
    class: exports.TerminalStore,
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
    class: exports.UserState,
    interface: 'IUserStateContainer',
    token: 'USER_STATE'
});
const USER_STORE = terminalMap.token({
    class: exports.UserStore,
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

/******************************************************************************
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

function __decorate$2(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

const travelDocumentCheckpoint = lib('travel-document-checkpoint');
const USER_ACCOUNT_API = travelDocumentCheckpoint.token({
    class: null,
    interface: 'UserAccountApi',
    token: 'USER_ACCOUNT_API'
});

// An API stub for other Applications and UIs to use
exports.UserAccountApi = class UserAccountApi {
    constructor() {
        DEPENDENCY_INJECTION.db().manualInject(this, USER_ACCOUNT_API);
    }
    async findUserAccount(privateId) {
        return await this.userAccountApi.findUserAccount(privateId);
    }
};
__decorate$2([
    Inject()
], exports.UserAccountApi.prototype, "userAccountApi", void 0);
exports.UserAccountApi = __decorate$2([
    Injected()
], exports.UserAccountApi);

loadAutopilot();

exports.Client = class Client {
};
__decorate$2([
    Id(),
    DbNumber(),
    Column()
], exports.Client.prototype, "_localId", void 0);
__decorate$2([
    DbString(),
    Column()
], exports.Client.prototype, "domain", void 0);
__decorate$2([
    DbString(),
    Column()
], exports.Client.prototype, "GUID", void 0);
__decorate$2([
    ManyToOne(),
    JoinColumn()
], exports.Client.prototype, "continent", void 0);
__decorate$2([
    ManyToOne(),
    JoinColumn()
], exports.Client.prototype, "country", void 0);
__decorate$2([
    ManyToOne(),
    JoinColumn()
], exports.Client.prototype, "state", void 0);
__decorate$2([
    ManyToOne(),
    JoinColumn()
], exports.Client.prototype, "metroArea", void 0);
__decorate$2([
    OneToMany()
], exports.Client.prototype, "clientTypes", void 0);
exports.Client = __decorate$2([
    Entity(),
    Table()
], exports.Client);

exports.ClientType = class ClientType {
};
__decorate$2([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.ClientType.prototype, "client", void 0);
__decorate$2([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.ClientType.prototype, "type", void 0);
exports.ClientType = __decorate$2([
    Entity(),
    Table()
], exports.ClientType);

exports.Database = class Database {
};
__decorate$2([
    Id(),
    DbNumber(),
    Column()
], exports.Database.prototype, "_localId", void 0);
__decorate$2([
    DbString(),
    Column()
], exports.Database.prototype, "domain", void 0);
__decorate$2([
    DbString(),
    Column()
], exports.Database.prototype, "GUID", void 0);
__decorate$2([
    ManyToOne(),
    JoinColumn()
], exports.Database.prototype, "continent", void 0);
__decorate$2([
    ManyToOne(),
    JoinColumn()
], exports.Database.prototype, "country", void 0);
__decorate$2([
    ManyToOne(),
    JoinColumn()
], exports.Database.prototype, "state", void 0);
__decorate$2([
    ManyToOne(),
    JoinColumn()
], exports.Database.prototype, "metroArea", void 0);
__decorate$2([
    OneToMany()
], exports.Database.prototype, "databaseTypes", void 0);
exports.Database = __decorate$2([
    Entity(),
    Table()
], exports.Database);

exports.DatabaseType = class DatabaseType {
};
__decorate$2([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.DatabaseType.prototype, "database", void 0);
__decorate$2([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.DatabaseType.prototype, "type", void 0);
exports.DatabaseType = __decorate$2([
    Entity(),
    Table()
], exports.DatabaseType);

exports.Continent = class Continent {
};
__decorate$2([
    Id(),
    DbNumber(),
    Column()
], exports.Continent.prototype, "id", void 0);
__decorate$2([
    DbString()
], exports.Continent.prototype, "name", void 0);
__decorate$2([
    OneToMany()
], exports.Continent.prototype, "countries", void 0);
__decorate$2([
    OneToMany()
], exports.Continent.prototype, "userAccounts", void 0);
exports.Continent = __decorate$2([
    Entity(),
    Table()
], exports.Continent);

exports.Country = class Country {
};
__decorate$2([
    Id(),
    GeneratedValue(),
    DbNumber(),
    Column()
], exports.Country.prototype, "id", void 0);
__decorate$2([
    DbString()
], exports.Country.prototype, "abbreviation", void 0);
__decorate$2([
    DbString()
], exports.Country.prototype, "name", void 0);
__decorate$2([
    ManyToOne(),
    JoinColumn()
], exports.Country.prototype, "continent", void 0);
__decorate$2([
    OneToMany()
], exports.Country.prototype, "userAccounts", void 0);
exports.Country = __decorate$2([
    Entity(),
    Table()
], exports.Country);

exports.MetroArea = class MetroArea {
};
__decorate$2([
    Id(),
    GeneratedValue(),
    DbNumber(),
    Column()
], exports.MetroArea.prototype, "id", void 0);
__decorate$2([
    DbString()
], exports.MetroArea.prototype, "name", void 0);
__decorate$2([
    ManyToOne(),
    JoinColumn()
], exports.MetroArea.prototype, "country", void 0);
__decorate$2([
    OneToMany()
], exports.MetroArea.prototype, "metroAreaStates", void 0);
__decorate$2([
    OneToMany()
], exports.MetroArea.prototype, "userAccounts", void 0);
exports.MetroArea = __decorate$2([
    Entity(),
    Table()
], exports.MetroArea);

exports.MetroAreaState = class MetroAreaState {
};
__decorate$2([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.MetroAreaState.prototype, "state", void 0);
__decorate$2([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.MetroAreaState.prototype, "metroArea", void 0);
exports.MetroAreaState = __decorate$2([
    Entity(),
    Table()
], exports.MetroAreaState);

exports.State = class State {
};
__decorate$2([
    Id(),
    GeneratedValue(),
    DbNumber(),
    Column()
], exports.State.prototype, "id", void 0);
__decorate$2([
    DbString()
], exports.State.prototype, "abbreviation", void 0);
__decorate$2([
    DbString()
], exports.State.prototype, "name", void 0);
__decorate$2([
    ManyToOne(),
    JoinColumn()
], exports.State.prototype, "country", void 0);
__decorate$2([
    OneToMany()
], exports.State.prototype, "metroAreaStates", void 0);
__decorate$2([
    OneToMany()
], exports.State.prototype, "userAccounts", void 0);
exports.State = __decorate$2([
    Entity(),
    Table()
], exports.State);

exports.Terminal = class Terminal {
    constructor() {
        this.isLocal = false;
    }
};
__decorate$2([
    Id(),
    GeneratedValue(),
    DbNumber(),
    Column()
], exports.Terminal.prototype, "_localId", void 0);
__decorate$2([
    Column(),
    DbString()
], exports.Terminal.prototype, "GUID", void 0);
__decorate$2([
    ManyToOne(),
    JoinColumn()
], exports.Terminal.prototype, "owner", void 0);
__decorate$2([
    Column(),
    DbBoolean()
], exports.Terminal.prototype, "isLocal", void 0);
__decorate$2([
    ManyToOne(),
    JoinColumn()
], exports.Terminal.prototype, "continent", void 0);
__decorate$2([
    ManyToOne(),
    JoinColumn()
], exports.Terminal.prototype, "country", void 0);
__decorate$2([
    ManyToOne(),
    JoinColumn()
], exports.Terminal.prototype, "state", void 0);
__decorate$2([
    ManyToOne(),
    JoinColumn()
], exports.Terminal.prototype, "metroArea", void 0);
__decorate$2([
    OneToMany()
], exports.Terminal.prototype, "terminalTypes", void 0);
exports.Terminal = __decorate$2([
    Entity(),
    Table()
], exports.Terminal);

exports.TerminalType = class TerminalType {
};
__decorate$2([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.TerminalType.prototype, "terminal", void 0);
__decorate$2([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.TerminalType.prototype, "type", void 0);
exports.TerminalType = __decorate$2([
    Entity(),
    Table()
], exports.TerminalType);

exports.Classification = class Classification {
};
__decorate$2([
    Id(),
    Column()
], exports.Classification.prototype, "id", void 0);
exports.Classification = __decorate$2([
    Entity(),
    Table()
], exports.Classification);

exports.Type = class Type {
};
__decorate$2([
    Id(),
    Column()
], exports.Type.prototype, "id", void 0);
__decorate$2([
    OneToMany()
], exports.Type.prototype, "typeClassifications", void 0);
exports.Type = __decorate$2([
    Entity(),
    Table()
], exports.Type);

exports.TypeClassification = class TypeClassification {
};
__decorate$2([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.TypeClassification.prototype, "classification", void 0);
__decorate$2([
    Id(),
    ManyToOne(),
    JoinColumn()
], exports.TypeClassification.prototype, "type", void 0);
exports.TypeClassification = __decorate$2([
    Entity(),
    Table()
], exports.TypeClassification);

exports.UserAccount = class UserAccount {
};
__decorate$2([
    Id(),
    GeneratedValue(),
    DbNumber(),
    Column()
], exports.UserAccount.prototype, "_localId", void 0);
__decorate$2([
    Column(),
    DbString()
], exports.UserAccount.prototype, "email", void 0);
__decorate$2([
    Column(),
    DbString()
], exports.UserAccount.prototype, "passwordHash", void 0);
__decorate$2([
    Column(),
    DbNumber()
], exports.UserAccount.prototype, "ranking", void 0);
__decorate$2([
    Column(),
    DbString()
], exports.UserAccount.prototype, "username", void 0);
__decorate$2([
    Column(),
    DbString()
], exports.UserAccount.prototype, "GUID", void 0);
__decorate$2([
    ManyToOne(),
    JoinColumn()
], exports.UserAccount.prototype, "domain", void 0);
__decorate$2([
    ManyToOne(),
    JoinColumn()
], exports.UserAccount.prototype, "continent", void 0);
__decorate$2([
    ManyToOne(),
    JoinColumn()
], exports.UserAccount.prototype, "country", void 0);
__decorate$2([
    ManyToOne(),
    JoinColumn()
], exports.UserAccount.prototype, "state", void 0);
__decorate$2([
    ManyToOne(),
    JoinColumn()
], exports.UserAccount.prototype, "metroArea", void 0);
exports.UserAccount = __decorate$2([
    Entity()
], exports.UserAccount);

const __constructors__ = {
    Classification: exports.Classification,
    Client: exports.Client,
    ClientType: exports.ClientType,
    Continent: exports.Continent,
    Country: exports.Country,
    Database: exports.Database,
    DatabaseType: exports.DatabaseType,
    MetroArea: exports.MetroArea,
    MetroAreaState: exports.MetroAreaState,
    State: exports.State,
    Terminal: exports.Terminal,
    TerminalType: exports.TerminalType,
    Type: exports.Type,
    TypeClassification: exports.TypeClassification,
    UserAccount: exports.UserAccount
};
const Q_air____at_airport_slash_travel_dash_document_dash_checkpoint = {
    __constructors__,
    domain: 'air',
    name: '@airport/travel-document-checkpoint'
};
function air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(dbEntityId) {
    return airApi.dS(Q_air____at_airport_slash_travel_dash_document_dash_checkpoint.__dbApplication__, dbEntityId);
}
airApi.setQApp(Q_air____at_airport_slash_travel_dash_document_dash_checkpoint);

USER_ACCOUNT_API.setClass(exports.UserAccountApi);
USER_ACCOUNT_API.setDependencies({
    interAppApiClient: INTER_APP_API_CLIENT
});

const arrivalsNDepartures = lib('arrivals-n-departures');
const REQUEST_MANAGER = arrivalsNDepartures.token({
    class: null,
    interface: 'RequestManager',
    token: 'REQUEST_MANAGER'
});
const OPERATION_DESERIALIZER = arrivalsNDepartures.token({
    class: null,
    interface: 'IOperationDeserializer',
    token: 'OPERATION_DESERIALIZER'
});
arrivalsNDepartures.token({
    class: null,
    interface: 'IQueryParameterDeserializer',
    token: 'QUERY_PARAMETER_DESERIALIZER'
});
arrivalsNDepartures.token({
    class: null,
    interface: 'IQueryResultsSerializer',
    token: 'QUERY_RESULTS_SERIALIZER'
});

/******************************************************************************
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

function __decorate$1(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

exports.ApiRegistry = class ApiRegistry {
    initialize(applicationApi) {
        this.applicationStore.state.api = applicationApi;
    }
    async findApiObjectAndOperation(domainName, applicationName, apiInterfaceName, methodName) {
        return await this.findObjectAndOperationForApi(this.applicationStore.state.api, domainName, applicationName, apiInterfaceName, methodName);
    }
    async findObjectAndOperationForApi(api, domainName, applicationName, apiInterfaceName, methodName) {
        const apiObjectDefinition = api.apiObjectMap[apiInterfaceName];
        if (!apiObjectDefinition) {
            throw new Error(`Could not find API object for
        Domain:
            ${domainName}
        Application:
            ${applicationName}
        Interface:
            ${apiInterfaceName}
            
            ---===<<<((( Please remember, generator must be run after API modifications )))>>>===---

            `);
        }
        const apiOperation = apiObjectDefinition.operationMap[methodName];
        if (!apiOperation) {
            throw new Error(`Could not find API object method for 
        Domain:
            ${domainName}
        Application:
            ${applicationName}
        Interface:
            ${apiInterfaceName}
        Method name:
            ${methodName}
            
            ---===<<<((( Please remember, generator must be run after API modifications )))>>>===---

            `);
        }
        const apiObject = await this.containerAccessor.getContainer(this)
            .getByNames(domainName, applicationName, apiInterfaceName);
        return {
            apiObject,
            apiOperation
        };
    }
};
__decorate$1([
    Inject()
], exports.ApiRegistry.prototype, "applicationStore", void 0);
__decorate$1([
    Inject()
], exports.ApiRegistry.prototype, "containerAccessor", void 0);
exports.ApiRegistry = __decorate$1([
    Injected()
], exports.ApiRegistry);

exports.ApiValidator = class ApiValidator {
    validate(operation, parameters) {
        // FIXME: implement (eventually)
    }
};
exports.ApiValidator = __decorate$1([
    Injected()
], exports.ApiValidator);

exports.LocalAPIServer = class LocalAPIServer {
    async handleRequest(request) {
        let payload;
        let errorMessage;
        try {
            // TODO: this should be inside coreHandleRequest after retrieval
            // of apiOperation.  For that requestManager must be supported
            // by the main @airport/terminal. It works in App VMs since
            // a new requestManager object is created per request but
            // currently does not work in @airport/terminal (since there is
            // no per-request creating of injected objects).
            this.requestManager.actor = request.actor;
            this.requestManager.userAccount = request.actor.userAccount;
            payload = await this.coreHandleRequest(request, this.applicationStore.state.api);
        }
        catch (e) {
            errorMessage = e.message ? e.message : e;
            console.error(e);
        }
        const response = {
            application: request.application,
            args: request.args,
            category: 'ToClient',
            domain: request.domain,
            errorMessage,
            id: request.id,
            hostDomain: request.hostDomain,
            hostProtocol: request.hostProtocol,
            methodName: request.methodName,
            objectName: request.objectName,
            protocol: request.protocol,
            payload,
            transactionId: request.transactionId
        };
        return response;
    }
    async coreHandleRequest(request, api) {
        const { apiObject, apiOperation } = await this.apiRegistry.findObjectAndOperationForApi(api, request.domain, request.application, request.objectName, request.methodName);
        const result = apiObject[request.methodName].apply(apiObject, request.args);
        if (apiOperation.isAsync) {
            return await result;
        }
        else {
            return result;
        }
    }
};
__decorate$1([
    Inject()
], exports.LocalAPIServer.prototype, "apiRegistry", void 0);
__decorate$1([
    Inject()
], exports.LocalAPIServer.prototype, "applicationStore", void 0);
__decorate$1([
    Inject()
], exports.LocalAPIServer.prototype, "requestManager", void 0);
exports.LocalAPIServer = __decorate$1([
    Injected()
], exports.LocalAPIServer);

// TODO: figure out if this is needed - originally written for deserializing
// Client-side operation entities.  Since then moved to Isolates and generic
// API calls.  Probably should be used in go-tower to deserialize all of the
// method argiments passed it (and won't be tied to a query of any kind, API
// interface is generic, unless already known to contain entity objects.)
exports.OperationDeserializer = class OperationDeserializer {
    deserialize(entity, dbEntity, entityStateManager, applicationUtils) {
        const operation = {
            lookupTable: [],
        };
        let deserializedEntity;
        if (entity instanceof Array) {
            deserializedEntity = entity.map(anEntity => this.doDeserialize(anEntity, dbEntity, operation, entityStateManager, applicationUtils));
        }
        else {
            deserializedEntity = this.doDeserialize(entity, dbEntity, operation, entityStateManager, applicationUtils);
        }
        return deserializedEntity;
    }
    doDeserialize(entity, dbEntity, operation, entityStateManager, applicationUtils) {
        let state = entityStateManager.getEntityState(entity);
        let operationUniqueId = entityStateManager.getOperationUniqueId(entity);
        if (!operationUniqueId || typeof operationUniqueId !== 'number'
            || operationUniqueId < 1 || operationUniqueId % 1 === 0) {
            throw new Error(`Invalid or missing ${entityStateManager.getUniqueIdFieldName()} field.`);
        }
        let alreadyDeserializedEntity = operation.lookupTable[operationUniqueId];
        switch (state) {
            case EntityState$1.STUB: {
                let alreadyDeserializedEntity = operation.lookupTable[operationUniqueId];
                if (!alreadyDeserializedEntity) {
                    throw new Error(`Could not find an already present entity for
					${entityStateManager.getUniqueIdFieldName()} of ${operationUniqueId}`);
                }
                return alreadyDeserializedEntity;
            }
            default:
                if (alreadyDeserializedEntity) {
                    throw new Error(`Entity appears more than once for
					${entityStateManager.getUniqueIdFieldName()} of ${operationUniqueId}`);
                }
        }
        let deserializedEntity = {};
        operation.lookupTable[operationUniqueId] = deserializedEntity;
        deserializedEntity[entityStateManager.getStateFieldName()] = state;
        for (const dbProperty of dbEntity.properties) {
            let value = entity[dbProperty.name];
            if (applicationUtils.isEmpty(value)) {
                continue;
            }
            let propertyCopy;
            if (dbProperty.relation) {
                const dbRelation = dbProperty.relation[0];
                switch (dbRelation.relationType) {
                    case EntityRelationType.ONE_TO_MANY:
                        if (!(value instanceof Array)) {
                            throw new Error(`Expecting @OneToMany for an array entity relation`);
                        }
                        propertyCopy = value.map(aProperty => this.doDeserialize(aProperty, dbRelation.entity, operation, entityStateManager, applicationUtils));
                        break;
                    case EntityRelationType.MANY_TO_ONE:
                        if (!(value instanceof Object) || value instanceof Array) {
                            throw new Error(`Expecting @ManyToOne for a non-array entity relation`);
                        }
                        propertyCopy = this.doDeserialize(value, dbRelation.entity, operation, entityStateManager, applicationUtils);
                        break;
                    default:
                        throw new Error(`Unknown relation type: ${dbRelation.relationType}`);
                }
            }
            else {
                const dbColumn = dbProperty.propertyColumns[0].column;
                switch (dbColumn.type) {
                    case SQLDataType.JSON:
                        // propertyCopy = this.cleanJsonObject(value, dbProperty, entityStateManager)
                        throw new Error('Json properties cannot be deserialized');
                    case SQLDataType.DATE:
                        if (!(value instanceof Object)
                            || value[entityStateManager.getStateFieldName()] !== EntityState$1.DATE
                            || !value.value) {
                            throw new Error(`Invalid Serialized Date format for ${dbEntity.name}.${dbProperty.name}`);
                        }
                        try {
                            propertyCopy = new Date(value);
                        }
                        catch (e) {
                            throw new Error(`Invalid Serialized Date format for ${dbEntity.name}.${dbProperty.name}`);
                        }
                        break;
                    case SQLDataType.ANY:
                    case SQLDataType.BOOLEAN:
                    case SQLDataType.NUMBER:
                    case SQLDataType.STRING:
                        propertyCopy = value;
                        break;
                    default:
                        throw new Error(`Unexpected data type for ${dbEntity.name}.${dbProperty.name}`);
                }
            }
            deserializedEntity[dbProperty.name] = propertyCopy;
        }
        return deserializedEntity;
    }
    cleanJsonObject(value, dbProperty, entityStateManager) {
        let valueCopy;
        if (value instanceof Object) {
            if (value instanceof Array) {
                valueCopy = value.map(aValue => this.cleanJsonObject(aValue, dbProperty, entityStateManager));
            }
            else {
                valueCopy = {};
                if (value[entityStateManager.getStateFieldName()] === EntityState$1.STUB) {
                    throw new Error(`Interlinked object graphs are not supported in @Json() columns 
                    ${dbProperty.entity.name}.${dbProperty.name}`);
                }
                delete value[entityStateManager.getStateFieldName()];
                delete value[entityStateManager.getUniqueIdFieldName()];
                for (const propertyName in value) {
                    const property = value[propertyName];
                    valueCopy[propertyName] = this.
                        cleanJsonObject(property, dbProperty, entityStateManager);
                }
            }
        }
        else {
            valueCopy = value;
        }
        return valueCopy;
    }
};
exports.OperationDeserializer = __decorate$1([
    Injected()
], exports.OperationDeserializer);

exports.EntityCopier = class EntityCopier {
    copyEntityForProcessing(entity, dbEntity, entityStateManager, context) {
        const operation = {
            processedEntityMap: new Map(),
            sequence: context.lastOUID ? context.lastOUID : 0,
        };
        const copy = this.doCopyEntityForProcessing(entity, dbEntity, entityStateManager, operation);
        context.lastOUID = operation.sequence;
        return copy;
    }
    doCopyEntityForProcessing(entity, dbEntity, entityStateManager, operation) {
        if (entity instanceof Array) {
            return entity.map(anEntity => this.doCopyEntityForProcessing(anEntity, dbEntity, entityStateManager, operation));
        }
        else {
            let entityCopy = {};
            if (operation.processedEntityMap.has(entity)) {
                return operation.processedEntityMap.get(entity);
            }
            operation.processedEntityMap.set(entity, entityCopy);
            const operationUniqueId = ++operation.sequence;
            entityCopy[entityStateManager.getUniqueIdFieldName()] = operationUniqueId;
            entity[entityStateManager.getUniqueIdFieldName()] = operationUniqueId;
            entityStateManager.setOriginalValues(entityStateManager.getOriginalValues(entity), entityCopy);
            for (let dbProperty of dbEntity.properties) {
                const property = entity[dbProperty.name];
                if (dbProperty.relation && dbProperty.relation.length && property) {
                    entityCopy[dbProperty.name] = this.doCopyEntityForProcessing(property, dbProperty.relation[0].relationEntity, entityStateManager, operation);
                }
                else {
                    // No need to clone dates or JSON objects - they
                    // won't be modified by the save process
                    entityCopy[dbProperty.name] = property;
                }
            }
            entityCopy[entityStateManager.getStateFieldName()]
                = entity[entityStateManager.getStateFieldName()];
            return entityCopy;
        }
    }
};
exports.EntityCopier = __decorate$1([
    Injected()
], exports.EntityCopier);

exports.UpdateCacheManager = class UpdateCacheManager {
    saveOriginalValues(entity, dbEntity) {
        this.doSaveOriginalValues(entity, dbEntity, new Set());
    }
    doSaveOriginalValues(entity, dbEntity, processedEntities) {
        if (entity instanceof Array) {
            for (let i = 0; i < entity.length; i++) {
                this.doSaveOriginalValues(entity[i], dbEntity, processedEntities);
            }
            return;
        }
        if (!entity) {
            return;
        }
        if (processedEntities.has(entity)) {
            return;
        }
        processedEntities.add(entity);
        const originalValuesObject = {};
        this.entityStateManager.setOriginalValues(originalValuesObject, entity);
        for (let dbProperty of dbEntity.properties) {
            const property = entity[dbProperty.name];
            if (dbProperty.relation && dbProperty.relation.length) {
                if (!property) {
                    continue;
                }
                if (dbProperty.relation[0].relationType === EntityRelationType.MANY_TO_ONE) {
                    // Save the nested child object Ids in the original values of this object
                    // in case the object behind this relation is changed
                    this.applicationUtils.forEachColumnTypeOfRelation(dbProperty.relation[0], (_dbColumn, propertyNameChains) => {
                        for (let propertyNameChain of propertyNameChains) {
                            let nestedProperty = entity;
                            let currentPropertyOriginalValue = originalValuesObject;
                            for (let i = 0; i < propertyNameChain.length; i++) {
                                const propertyName = propertyNameChain[i];
                                if (nestedProperty instanceof Object) {
                                    nestedProperty = nestedProperty[propertyName];
                                    let originalValue;
                                    // Nested object continues
                                    if (i === propertyNameChain.length - 1) {
                                        originalValue = nestedProperty;
                                    }
                                    else {
                                        originalValue = {};
                                    }
                                    currentPropertyOriginalValue[propertyName] = originalValue;
                                    currentPropertyOriginalValue = currentPropertyOriginalValue[propertyName];
                                }
                                else {
                                    // This is the actual value
                                    currentPropertyOriginalValue[propertyName] = nestedProperty;
                                }
                            }
                        }
                    });
                }
                this.doSaveOriginalValues(property, dbProperty.relation[0].relationEntity, processedEntities);
            }
            else {
                originalValuesObject[dbProperty.name] = entity[dbProperty.name];
            }
        }
    }
    setOperationState(entityCopy, dbEntity, processedEntities) {
        if (entityCopy instanceof Array) {
            for (var i = 0; i < entityCopy.length; i++) {
                this.setOperationState(entityCopy[i], dbEntity, processedEntities);
            }
            return;
        }
        if (processedEntities.has(entityCopy)) {
            return;
        }
        processedEntities.add(entityCopy);
        const originalValuesObject = this.entityStateManager
            .getOriginalValues(entityCopy);
        let entityState = entityCopy[this.entityStateManager.getStateFieldName()];
        let hasId = true;
        let hasGeneratedIds = false;
        for (const dbProperty of dbEntity.properties) {
            if (!dbProperty.isId) {
                continue;
            }
            for (const propertyColumn of dbProperty.propertyColumns) {
                if (propertyColumn.column.isGenerated) {
                    hasGeneratedIds = true;
                }
            }
            if (dbProperty.relation && dbProperty.relation.length) {
                this.applicationUtils.forEachColumnTypeOfRelation(dbProperty.relation[0], (_dbColumn, propertyNameChains) => {
                    for (let propertyNameChain of propertyNameChains) {
                        let nestedProperty = entityCopy;
                        for (let i = 0; i < propertyNameChain.length; i++) {
                            const propertyName = propertyNameChain[i];
                            if (nestedProperty) {
                                nestedProperty = nestedProperty[propertyName];
                            }
                        }
                        if (!nestedProperty) {
                            if (entityState === EntityState$1.DELETE) {
                                throw new Error(`Entity is marked for deletion but does not have an @Id() property:
            ${propertyNameChain.join('.')}
                                    `);
                            }
                            else {
                                entityState = EntityState$1.CREATE;
                                hasId = false;
                                return true;
                            }
                        }
                    }
                });
            }
            else if (!entityCopy[dbProperty.name] && entityCopy[dbProperty.name] !== 0) {
                hasId = false;
            }
        }
        if (originalValuesObject) {
            for (const dbProperty of dbEntity.properties) {
                const property = entityCopy[dbProperty.name];
                if (dbProperty.relation && dbProperty.relation.length) {
                    if (!property) {
                        continue;
                    }
                    const dbRelation = dbProperty.relation[0];
                    this.entityStateManager
                        .getOriginalValues(property);
                    this.applicationUtils.forEachColumnTypeOfRelation(dbRelation, (_dbColumn, propertyNameChains) => {
                        const propertyOriginalValuesObject = this.entityStateManager
                            .getOriginalValues(property);
                        // const firstPropertyNameChain = propertyNameChains[0];
                        for (const propertyNameChain of propertyNameChains) {
                            let value = entityCopy;
                            let originalValue = propertyOriginalValuesObject;
                            for (let i = 0; i < propertyNameChain.length; i++) {
                                const propertyName = propertyNameChain[i];
                                value = value[propertyName];
                                // Skip the property itself since the original values object
                                // belongs to the property and not the checked object
                                // (in the case of relations only)
                                if (i !== 0) {
                                    originalValue = originalValue[propertyName];
                                }
                                let noValue = value === null || value === undefined;
                                let noOriginalValue = originalValue === null
                                    || originalValue === undefined;
                                if (noValue) {
                                    if (originalValue) {
                                        entityState = EntityState$1.UPDATE;
                                        return true;
                                    }
                                    break;
                                }
                                if (noOriginalValue) {
                                    if (value) {
                                        entityState = EntityState$1.UPDATE;
                                        return true;
                                    }
                                    break;
                                }
                                // If it's a nested object
                                if (typeof value === 'object') {
                                    // If original isn't a nested object
                                    if (typeof originalValue !== 'object') {
                                        entityState = EntityState$1.UPDATE;
                                        return true;
                                    }
                                    // Values should not be dates or json objects, only
                                    // nested object references to eventual _localIds
                                }
                                else if (typeof originalValue === 'object') {
                                    // value is not a nested object but originalValue is
                                    entityState = EntityState$1.UPDATE;
                                    return true;
                                }
                                else {
                                    // Both values are primitives (nested _localIds)
                                    if (value !== originalValue) {
                                        entityState = EntityState$1.UPDATE;
                                        return true;
                                    }
                                }
                            }
                        }
                    });
                }
                else {
                    if (entityState) {
                        continue;
                    }
                    let originalValue = originalValuesObject[dbProperty.name];
                    let propertyValue;
                    switch (dbProperty.propertyColumns[0].column.type) {
                        case SQLDataType.DATE:
                            if (originalValue) {
                                originalValue = originalValue.getTime();
                            }
                            if (property) {
                                propertyValue = property.getTime();
                            }
                            break;
                        case SQLDataType.JSON:
                            if (originalValue) {
                                originalValue = JSON.stringify(originalValue);
                            }
                            if (property) {
                                propertyValue = JSON.stringify(property);
                            }
                            break;
                        default:
                            propertyValue = property;
                            break;
                    }
                    if (propertyValue !== originalValue) {
                        entityState = EntityState$1.UPDATE;
                    }
                }
            }
        }
        for (const dbProperty of dbEntity.properties) {
            const property = entityCopy[dbProperty.name];
            if (property && dbProperty.relation && dbProperty.relation.length) {
                this.setOperationState(property, dbProperty.relation[0].relationEntity, processedEntities);
            }
        }
        if (!entityState) {
            if ((hasId && hasGeneratedIds) || originalValuesObject) {
                entityState = EntityState$1.PASS_THROUGH;
            }
            else {
                entityState = EntityState$1.CREATE;
            }
        }
        entityCopy[this.entityStateManager.getStateFieldName()] = entityState;
    }
    afterSaveModifications(entity, dbEntity, saveResult, processedEntities) {
        this.updateOriginalValuesAfterSave(entity, dbEntity, saveResult, new Set());
        this.removeDeletedEntities(entity, dbEntity, saveResult, processedEntities);
    }
    updateOriginalValuesAfterSave(entity, dbEntity, saveResult, processedEntities) {
        if (entity instanceof Array) {
            for (let i = 0; i < entity.length; i++) {
                this.updateOriginalValuesAfterSave(entity[i], dbEntity, saveResult, processedEntities);
            }
        }
        else {
            if (processedEntities.has(entity)) {
                return;
            }
            processedEntities.add(entity);
            let operationUniqueId = this.entityStateManager.getOperationUniqueId(entity, false, dbEntity);
            let originalValuesObject = {};
            originalValuesObject = this.doUpdateOriginalValuesAfterSave(entity, dbEntity, saveResult, processedEntities, operationUniqueId);
            this.entityStateManager.setOriginalValues(originalValuesObject, entity);
        }
    }
    doUpdateOriginalValuesAfterSave(entity, dbEntity, saveResult, processedEntities, operationUniqueId) {
        let createdRecord = saveResult.created[operationUniqueId];
        if (createdRecord) {
            if (createdRecord !== true) {
                for (const generatedPropertyName in createdRecord) {
                    entity[generatedPropertyName] = createdRecord[generatedPropertyName];
                }
                if (dbEntity.isAirEntity) {
                    let airEntity = entity;
                    if (!airEntity.repository || !airEntity.repository._localId) {
                        airEntity.repository = saveResult.newRepository;
                    }
                    airEntity.actor = saveResult.actor;
                }
            }
        }
        else if (saveResult.deleted[operationUniqueId]) {
            this.entityStateManager.setIsDeleted(true, entity);
            this.entityStateManager.setOriginalValues(null, entity);
            return;
        }
        let originalValuesObject = {};
        for (const dbProperty of dbEntity.properties) {
            const property = entity[dbProperty.name];
            if (property && dbProperty.relation && dbProperty.relation.length) {
                if (dbProperty.relation[0].relationType === EntityRelationType.MANY_TO_ONE) {
                    // Save the nested child object Ids in the original values of this object
                    // in case the object behind this relation is changed
                    this.applicationUtils.forEachColumnTypeOfRelation(dbProperty.relation[0], (_dbColumn, propertyNameChains) => {
                        for (let propertyNameChain of propertyNameChains) {
                            let nestedProperty = entity;
                            let currentPropertyOriginalValue = originalValuesObject;
                            for (let i = 0; i < propertyNameChain.length; i++) {
                                const propertyName = propertyNameChain[i];
                                if (nestedProperty instanceof Object) {
                                    nestedProperty = nestedProperty[propertyName];
                                    let originalValue;
                                    // Nested object continues
                                    if (i === propertyNameChain.length - 1) {
                                        originalValue = nestedProperty;
                                    }
                                    else {
                                        originalValue = {};
                                    }
                                    currentPropertyOriginalValue[propertyName] = originalValue;
                                    currentPropertyOriginalValue = currentPropertyOriginalValue[propertyName];
                                }
                                else {
                                    // This is the actual value
                                    currentPropertyOriginalValue[propertyName] = nestedProperty;
                                }
                            }
                        }
                    });
                }
                this.updateOriginalValuesAfterSave(property, dbProperty.relation[0].relationEntity, saveResult, processedEntities);
            }
            else {
                originalValuesObject[dbProperty.name] = property;
            }
        }
        return originalValuesObject;
    }
    removeDeletedEntities(entity, dbEntity, saveResult, processedEntities) {
        if (entity instanceof Array) {
            for (let i = entity.length - 1; i >= 0; i--) {
                if (this.removeDeletedEntities(entity[i], dbEntity, saveResult, processedEntities)) {
                    entity.splice(i, 1);
                }
            }
            return !entity.length;
        }
        else {
            if (processedEntities.has(entity)) {
                return this.entityStateManager.isDeleted(entity);
            }
            processedEntities.add(entity);
            for (const dbRelation of dbEntity.relations) {
                const dbRelationProperty = dbRelation.property;
                const property = entity[dbRelationProperty.name];
                if (!property) {
                    continue;
                }
                switch (dbRelation.relationType) {
                    case EntityRelationType.MANY_TO_ONE:
                        if (this.removeDeletedEntities(property, dbRelation.relationEntity, saveResult, processedEntities)) {
                            entity[dbRelationProperty.name] = null;
                        }
                        break;
                    case EntityRelationType.ONE_TO_MANY:
                        this.removeDeletedEntities(property, dbRelation.relationEntity, saveResult, processedEntities);
                        break;
                }
            }
            return this.entityStateManager.isDeleted(entity);
        }
    }
};
__decorate$1([
    Inject()
], exports.UpdateCacheManager.prototype, "entityStateManager", void 0);
__decorate$1([
    Inject()
], exports.UpdateCacheManager.prototype, "applicationUtils", void 0);
exports.UpdateCacheManager = __decorate$1([
    Injected()
], exports.UpdateCacheManager);

var EntityStateManager_1;
exports.EntityStateManager = EntityStateManager_1 = class EntityStateManager {
    isStub(entity) {
        return this.getEntityState(entity) === EntityState$1.STUB;
    }
    isParentSchemaId(entity) {
        return this.getEntityState(entity) ===
            EntityState$1.PARENT_SCHEMA_ID;
    }
    isPassThrough(entity) {
        return this.getEntityState(entity) === EntityState$1.PASS_THROUGH;
    }
    markAsOfParentSchema(entity) {
        entity[EntityStateManager_1.STATE_FIELD] =
            EntityState$1.PARENT_SCHEMA_ID;
    }
    markForDeletion(entity) {
        entity[EntityStateManager_1.STATE_FIELD] = EntityState$1.DELETE;
    }
    markToCreate(entity) {
        entity[EntityStateManager_1.STATE_FIELD] = EntityState$1.CREATE;
    }
    markToUpdate(entity) {
        entity[EntityStateManager_1.STATE_FIELD] = EntityState$1.UPDATE;
    }
    getEntityState(entity) {
        return entity[EntityStateManager_1.STATE_FIELD];
    }
    getOriginalValues(entity) {
        return entity[EntityStateManager_1.ORIGINAL_VALUES_PROPERTY];
    }
    setOriginalValues(originalValues, entity) {
        entity[EntityStateManager_1.ORIGINAL_VALUES_PROPERTY] = originalValues;
    }
    copyEntityState(fromEntity, toEntity) {
        toEntity[EntityStateManager_1.STATE_FIELD]
            = fromEntity[EntityStateManager_1.STATE_FIELD];
        toEntity[EntityStateManager_1.ORIGINAL_VALUES_PROPERTY]
            = fromEntity[EntityStateManager_1.ORIGINAL_VALUES_PROPERTY];
    }
    getStateFieldName() {
        return EntityStateManager_1.STATE_FIELD;
    }
    getEntityStateTypeAsFlags(entity, dbEntity) {
        let isCreate, isDelete, isParentSchemaId, isPassThrough, isResultDate, isStub, isUpdate;
        const entityState = this.getEntityState(entity);
        switch (entityState) {
            case EntityState$1.CREATE:
                isCreate = true;
                break;
            case EntityState$1.DELETE:
                isDelete = true;
                break;
            case EntityState$1.PARENT_SCHEMA_ID:
                isParentSchemaId = true;
                break;
            case EntityState$1.PASS_THROUGH:
                isPassThrough = true;
                break;
            // case EntityState.RESULT:
            // 	isResult = true
            // 	break
            case EntityState$1.DATE:
                isResultDate = true;
                break;
            // case EntityState.RESULT_JSON:
            // 	isResultJson = true
            // 	break
            case EntityState$1.STUB:
                isStub = true;
                break;
            case EntityState$1.UPDATE:
                isUpdate = true;
                break;
            default:
                throw new Error(`Unexpected entity state
"${this.getStateFieldName()}" for ${dbEntity.name}: ${entityState}`);
        }
        return {
            isCreate,
            isDelete,
            isParentSchemaId,
            isPassThrough,
            // isResult,
            isResultDate,
            isStub,
            isUpdate,
        };
    }
    setIsDeleted(isDeleted, entity) {
        entity[EntityStateManager_1.STATE_FIELD] = EntityState$1.DELETE;
    }
    isDeleted(entity) {
        return entity[EntityStateManager_1.STATE_FIELD] === EntityState$1.DELETE;
    }
    getOperationUniqueId(entity, throwIfNotFound = true, dbEntity = null) {
        const operationUniqueId = entity[EntityStateManager_1.OPERATION_UNIQUE_ID_FIELD];
        if (!operationUniqueId || typeof operationUniqueId !== 'number' || operationUniqueId < 1) {
            if (throwIfNotFound) {
                let entityDescription;
                if (dbEntity) {
                    entityDescription = dbEntity.applicationVersion.application.name + '.' + dbEntity.name;
                }
                else {
                    entityDescription = JSON.stringify(entity);
                }
                throw new Error(`Could not find "${EntityStateManager_1.OPERATION_UNIQUE_ID_FIELD}" property on DTO:
        
        ${entityDescription}`);
            }
        }
        return operationUniqueId;
    }
    copyOperationUniqueId(entity, entityCopy) {
        const operationUniqueId = entity[EntityStateManager_1.OPERATION_UNIQUE_ID_FIELD];
        entityCopy[EntityStateManager_1.OPERATION_UNIQUE_ID_FIELD] = operationUniqueId;
    }
    markAsStub(entity) {
        entity[EntityStateManager_1.STATE_FIELD] = EntityState$1.STUB;
    }
    getUniqueIdFieldName() {
        return EntityStateManager_1.OPERATION_UNIQUE_ID_FIELD;
    }
};
exports.EntityStateManager.DELETED_PROPERTY = '__deleted__';
exports.EntityStateManager.ORIGINAL_VALUES_PROPERTY = '__originalValues__';
exports.EntityStateManager.STATE_FIELD = '__state__';
exports.EntityStateManager.OPERATION_UNIQUE_ID_FIELD = '__OUID__';
exports.EntityStateManager = EntityStateManager_1 = __decorate$1([
    Injected()
], exports.EntityStateManager);
function injectEntityStateManager() {
    console.log('inject EntityStateManager');
}

function markForDeletion(entity) {
    IOC.getSync(ENTITY_STATE_MANAGER).markForDeletion(entity);
}

/**
 * Created by Papa on 5/23/2016.
 */
exports.DatabaseFacade = class DatabaseFacade {
    async insertColumnValues(rawInsertColumnValues, context) {
        if (!rawInsertColumnValues) {
            return 0;
        }
        if (rawInsertColumnValues instanceof Function) {
            rawInsertColumnValues = rawInsertColumnValues();
        }
        const insertColumnValues = new InsertColumnValues(rawInsertColumnValues);
        const queryContext = await this.ensureQueryContext(context);
        const portableQuery = this.queryFacade.getPortableQuery(insertColumnValues, null, queryContext);
        return await this.transactionalConnector.insertValues(portableQuery, context);
    }
    async insertValues(rawInsertValues, context) {
        if (!rawInsertValues) {
            return 0;
        }
        if (rawInsertValues instanceof Function) {
            rawInsertValues = rawInsertValues();
        }
        const insertValues = new InsertValues(rawInsertValues);
        const queryContext = await this.ensureQueryContext(context);
        const portableQuery = this.queryFacade.getPortableQuery(insertValues, null, queryContext);
        return await this.transactionalConnector.insertValues(portableQuery, context);
    }
    async insertColumnValuesGenerateIds(rawInsertColumnValues, context) {
        if (!rawInsertColumnValues) {
            return [];
        }
        if (rawInsertColumnValues instanceof Function) {
            rawInsertColumnValues = rawInsertColumnValues();
        }
        const insertValues = new InsertColumnValues(rawInsertColumnValues);
        const queryContext = await this.ensureQueryContext(context);
        const portableQuery = this.queryFacade.getPortableQuery(insertValues, null, queryContext);
        return await this.transactionalConnector.insertValuesGetLocalIds(portableQuery, context);
    }
    async insertValuesGenerateIds(rawInsertValues, context) {
        if (!rawInsertValues) {
            return [];
        }
        if (rawInsertValues instanceof Function) {
            rawInsertValues = rawInsertValues();
        }
        const insertValues = new InsertValues(rawInsertValues);
        const queryContext = await this.ensureQueryContext(context);
        const portableQuery = this.queryFacade.getPortableQuery(insertValues, null, queryContext);
        return await this.transactionalConnector.insertValuesGetLocalIds(portableQuery, context);
    }
    async deleteWhere(rawDelete, context) {
        if (!rawDelete) {
            return 0;
        }
        if (rawDelete instanceof Function) {
            rawDelete = rawDelete();
        }
        let deleteWhere = new Delete(rawDelete);
        const queryContext = await this.ensureQueryContext(context);
        let portableQuery = this.queryFacade.getPortableQuery(deleteWhere, null, queryContext);
        return await this.transactionalConnector.deleteWhere(portableQuery, context);
    }
    async save(entity, context) {
        if (!entity) {
            return null;
        }
        const entityCopy = await this.preSaveOperations(entity, context);
        const saveResult = await this.transactionalConnector.save(entityCopy, context);
        this.updateCacheManager.afterSaveModifications(entity, context.dbEntity, saveResult, new Set());
        return saveResult;
    }
    async saveToDestination(repositoryDestination, entity, context) {
        if (!entity) {
            return null;
        }
        const entityCopy = await this.preSaveOperations(entity, context);
        const saveResult = await this.transactionalConnector
            .saveToDestination(repositoryDestination, entityCopy, context);
        this.updateCacheManager.afterSaveModifications(entity, context.dbEntity, saveResult, new Set());
        return saveResult;
    }
    async preSaveOperations(entity, context) {
        if (!entity) {
            return null;
        }
        const dbEntity = context.dbEntity;
        const entityCopy = this.entityCopier
            .copyEntityForProcessing(entity, dbEntity, this.entityStateManager, context);
        this.updateCacheManager.setOperationState(entityCopy, dbEntity, new Set());
        return entityCopy;
    }
    /**
     * Updates an entity with a WHERE clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    async updateColumnsWhere(rawUpdate, context) {
        if (!rawUpdate) {
            return 0;
        }
        if (rawUpdate instanceof Function) {
            rawUpdate = rawUpdate();
        }
        let updateColumns = new UpdateColumns(rawUpdate);
        const queryContext = await this.ensureQueryContext(context);
        const portableQuery = this.queryFacade.getPortableQuery(updateColumns, null, queryContext);
        return await this.transactionalConnector.updateValues(portableQuery, context);
    }
    async updateWhere(rawUpdate, context) {
        if (!rawUpdate) {
            return 0;
        }
        if (rawUpdate instanceof Function) {
            rawUpdate = rawUpdate();
        }
        let update = new UpdateProperties(rawUpdate);
        const queryContext = await this.ensureQueryContext(context);
        const portableQuery = this.queryFacade.getPortableQuery(update, null, queryContext);
        return await this.transactionalConnector.updateValues(portableQuery, context);
    }
    prepare(queryFunction) {
        return new FunctionWrapper(queryFunction);
    }
    async ensureQueryContext(context) {
        const queryContext = context;
        return queryContext;
    }
};
__decorate$1([
    Inject()
], exports.DatabaseFacade.prototype, "entityCopier", void 0);
__decorate$1([
    Inject()
], exports.DatabaseFacade.prototype, "entityStateManager", void 0);
__decorate$1([
    Inject()
], exports.DatabaseFacade.prototype, "queryFacade", void 0);
__decorate$1([
    Inject()
], exports.DatabaseFacade.prototype, "transactionalConnector", void 0);
__decorate$1([
    Inject()
], exports.DatabaseFacade.prototype, "updateCacheManager", void 0);
exports.DatabaseFacade = __decorate$1([
    Injected()
], exports.DatabaseFacade);
class FunctionWrapper {
    constructor(queryFunction) {
        throw new Error('Not Implemented');
    }
    find(...params) {
    }
}

exports.QueryFacade = class QueryFacade {
    async find(query, queryResultType, context) {
        await this.ensureContext(context);
        const result = await this.transactionalConnector.find(this.getPortableQuery(query, queryResultType, context), context);
        return result;
    }
    async findOne(query, queryResultType, context) {
        await this.ensureContext(context);
        const result = await this.transactionalConnector.findOne(this.getPortableQuery(query, queryResultType, context), context);
        return result;
    }
    getPortableQuery(query, queryResultType, context) {
        return {
            jsonQuery: query.toJSON(this.queryUtils, this.fieldUtils, this.relationManager),
            parameterMap: query.getParameters(),
            queryResultType,
            applicationIndex: context.dbEntity.applicationVersion.application.index,
            tableIndex: context.dbEntity.index,
            // values: query.values
        };
    }
    // FIXME: merge update caches on the client
    async search(query, queryResultType, context) {
        await this.ensureContext(context);
        let observable = await this.transactionalConnector.search(this.getPortableQuery(query, queryResultType, context), context);
        return observable;
    }
    async searchOne(query, queryResultType, context) {
        await this.ensureContext(context);
        let observable = await this.transactionalConnector.searchOne(this.getPortableQuery(query, queryResultType, context), context);
        return observable;
    }
    async ensureContext(context) {
    }
};
__decorate$1([
    Inject()
], exports.QueryFacade.prototype, "fieldUtils", void 0);
__decorate$1([
    Inject()
], exports.QueryFacade.prototype, "queryUtils", void 0);
__decorate$1([
    Inject()
], exports.QueryFacade.prototype, "relationManager", void 0);
__decorate$1([
    Inject()
], exports.QueryFacade.prototype, "transactionalConnector", void 0);
exports.QueryFacade = __decorate$1([
    Injected()
], exports.QueryFacade);

class EntityAccumulator {
    constructor(applicationDomain, applicationName, entityMap) {
        this.applicationDomain = applicationDomain;
        this.applicationName = applicationName;
        this.entityMap = entityMap;
    }
    add(clazz, index) {
        this.entityMap.set(clazz, {
            entity: {
                index,
                name: clazz.name,
            },
            application: {
                domain: this.applicationDomain,
                name: this.applicationName,
            },
        });
    }
}
exports.AirportDatabase = class AirportDatabase {
    get entityMap() {
        return this.databaseStore.entityMap;
    }
    ;
    get F() {
        return this.databaseStore.functions;
    }
    get functions() {
        return this.databaseStore.functions;
    }
    get A() {
        return this.databaseStore.applications;
    }
    get applications() {
        return this.databaseStore.applications;
    }
    get qApplications() {
        return this.databaseStore.qApplications;
    }
    get Q() {
        return this.databaseStore.qApplications;
    }
    get QM() {
        return this.databaseStore.QM;
    }
    async load() {
        // Just calling this method, loads the AirpotDatabase object
    }
    setQApp(qApplication) {
        const fullApplication_Name = this.dbApplicationUtils
            .getFullApplication_Name(qApplication);
        const existingQApp = this.QM[fullApplication_Name];
        if (existingQApp) {
            const dbApplication = existingQApp.__dbApplication__;
            qApplication.__dbApplication__ = dbApplication;
            setQAppEntities(dbApplication, qApplication, this.qApplications, this.appliationUtils, this.relationManager);
            this.Q[dbApplication.index] = qApplication;
        }
        this.QM[fullApplication_Name] = qApplication;
    }
    getAccumulator(applicationDomain, applicationName) {
        return new EntityAccumulator(applicationDomain, applicationName, this.entityMap);
    }
    async insertColumnValues(rawInsertValues, context) {
        return await this.databaseFacade.insertColumnValues(rawInsertValues, context);
    }
    async insertValues(rawInsertValues, context) {
        return await this.databaseFacade.insertValues(rawInsertValues, context);
    }
    async insertColumnValuesGenerateIds(rawInsertValues, context) {
        return await this.databaseFacade.insertColumnValuesGenerateIds(rawInsertValues, context);
    }
    async insertValuesGenerateIds(rawInsertValues, context) {
        return await this.databaseFacade.insertValuesGenerateIds(rawInsertValues, context);
    }
    /**
     * Creates an entity with a WHERE clause - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records deleted
     */
    async deleteWhere(rawDelete, context) {
        return await this.databaseFacade.deleteWhere(rawDelete, context);
    }
    /**
     * Ether creates or updates an entity - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records saved (1 or 0)
     */
    async save(entity, context, operationName) {
        return await this.databaseFacade.save(entity, context);
    }
    /**
     * Updates an entity with a WHERE clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    async updateColumnsWhere(rawUpdateColumns, context) {
        return await this.databaseFacade.updateColumnsWhere(rawUpdateColumns, context);
    }
    /**
     * Updates an entity with a WHERE clause, using a property based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    async updateWhere(rawUpdate, context) {
        return await this.databaseFacade.updateWhere(rawUpdate, context);
    }
};
__decorate$1([
    Inject()
], exports.AirportDatabase.prototype, "appliationUtils", void 0);
__decorate$1([
    Inject()
], exports.AirportDatabase.prototype, "databaseFacade", void 0);
__decorate$1([
    Inject()
], exports.AirportDatabase.prototype, "databaseStore", void 0);
__decorate$1([
    Inject()
], exports.AirportDatabase.prototype, "dbApplicationUtils", void 0);
__decorate$1([
    Inject()
], exports.AirportDatabase.prototype, "find", void 0);
__decorate$1([
    Inject()
], exports.AirportDatabase.prototype, "findOne", void 0);
__decorate$1([
    Inject()
], exports.AirportDatabase.prototype, "relationManager", void 0);
__decorate$1([
    Inject()
], exports.AirportDatabase.prototype, "search", void 0);
__decorate$1([
    Inject()
], exports.AirportDatabase.prototype, "searchOne", void 0);
exports.AirportDatabase = __decorate$1([
    Injected()
], exports.AirportDatabase);
function injectAirportDatabase() {
    console.log('Injecting AirportDatabase');
}

const tower = lib('tower');
const ENTITY_COPIER = tower.token({
    class: exports.EntityCopier,
    interface: 'IEntityCopier',
    token: 'ENTITY_COPIER'
});
AIRPORT_DATABASE.setClass(exports.AirportDatabase);
ENTITY_STATE_MANAGER.setClass(exports.EntityStateManager);
API_REGISTRY.setClass(exports.ApiRegistry);
API_REGISTRY.setDependencies({
    applicationStore: APPLICATION_STORE,
    containerAccessor: CONTAINER_ACCESSOR
});
API_VALIDATOR.setClass(exports.ApiValidator);
LOCAL_API_SERVER.setClass(exports.LocalAPIServer);
LOCAL_API_SERVER.setDependencies({
    apiRegistry: API_REGISTRY,
    applicationStore: APPLICATION_STORE,
    requestManager: REQUEST_MANAGER
});
OPERATION_DESERIALIZER.setClass(exports.OperationDeserializer);
UPDATE_CACHE_MANAGER.setClass(exports.UpdateCacheManager);
DATABASE_FACADE.setClass(exports.DatabaseFacade);
DATABASE_FACADE.setDependencies({
    entityCopier: ENTITY_COPIER,
    queryFacade: QUERY_FACADE
});
QUERY_FACADE.setClass(exports.QueryFacade);

function loadTower(applicationName) {
    console.log('@airport/tower is loaded for Application: ' + applicationName);
}

/******************************************************************************
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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

exports.AbstractApplicationLoader = class AbstractApplicationLoader {
    constructor(application) {
        this.application = application;
        this.initializing = false;
    }
    async load(lastIds) {
        if (this.initializing) {
            return;
        }
        this.initializing = true;
        const lastTerminalState = this.terminalStore.getTerminalState();
        this.terminalStore.state.next({
            ...lastTerminalState,
            lastIds
        });
        await this.applicationInitializer.initializeForAIRportApp(this.application);
        this.apiRegistry.initialize(this.application.versions[0].api);
    }
    async initialize() {
    }
    getApplication() {
        return this.application;
    }
};
__decorate([
    Inject()
], exports.AbstractApplicationLoader.prototype, "applicationInitializer", void 0);
__decorate([
    Inject()
], exports.AbstractApplicationLoader.prototype, "terminalStore", void 0);
__decorate([
    Inject()
], exports.AbstractApplicationLoader.prototype, "apiRegistry", void 0);
exports.AbstractApplicationLoader = __decorate([
    Injected()
], exports.AbstractApplicationLoader);

exports.AIRPORT_DOMAIN = AIRPORT_DOMAIN;
exports.AIR_ENTITY_UTILS = AIR_ENTITY_UTILS;
exports.API_REGISTRY = API_REGISTRY;
exports.API_VALIDATOR = API_VALIDATOR;
exports.APPLICATION_INITIALIZER = APPLICATION_INITIALIZER;
exports.APPLICATION_LOADER = APPLICATION_LOADER;
exports.APPLICATION_STORE = APPLICATION_STORE;
exports.AUTOPILOT_API_LOADER = AUTOPILOT_API_LOADER;
exports.Api = Api;
exports.CONTAINER_ACCESSOR = CONTAINER_ACCESSOR;
exports.ChildContainer = ChildContainer;
exports.Column = Column;
exports.Container = Container;
exports.Context = Context;
exports.DAO = DAO;
exports.DATABASE_FACADE = DATABASE_FACADE;
exports.DEPENDENCY_INJECTION = DEPENDENCY_INJECTION;
exports.DOMAIN_RETRIEVER = DOMAIN_RETRIEVER;
exports.DaoQueryDecorators = DaoQueryDecorators;
exports.DbAny = DbAny;
exports.DbBoolean = DbBoolean;
exports.DbDate = DbDate;
exports.DbNumber = DbNumber;
exports.DbString = DbString;
exports.DependencyInjectionToken = DependencyInjectionToken;
exports.Dvo = Dvo;
exports.ENTITY_COPIER = ENTITY_COPIER;
exports.Entity = Entity;
exports.EntityDatabaseFacade = EntityDatabaseFacade;
exports.EntityFind = EntityFind;
exports.EntityFindOne = EntityFindOne;
exports.EntityLookup = EntityLookup;
exports.EntitySearch = EntitySearch;
exports.EntitySearchOne = EntitySearchOne;
exports.FieldsSelect = FieldsSelect;
exports.FunctionWrapper = FunctionWrapper;
exports.GeneratedValue = GeneratedValue;
exports.INTER_APP_API_CLIENT = INTER_APP_API_CLIENT;
exports.INVALID_TABLE_NAME = INVALID_TABLE_NAME;
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
exports.LOCAL_API_SERVER = LOCAL_API_SERVER;
exports.LOOKUP = LOOKUP;
exports.LookupProxy = LookupProxy;
exports.ManyToOne = ManyToOne;
exports.MappedSuperclass = MappedSuperclass;
exports.NON_ENTITY_FIND = NON_ENTITY_FIND;
exports.NON_ENTITY_FIND_ONE = NON_ENTITY_FIND_ONE;
exports.NON_ENTITY_SEARCH = NON_ENTITY_SEARCH;
exports.NON_ENTITY_SEARCH_ONE = NON_ENTITY_SEARCH_ONE;
exports.OneToMany = OneToMany;
exports.QUERY_FACADE = QUERY_FACADE;
exports.Q_air____at_airport_slash_airspace = Q_air____at_airport_slash_airspace;
exports.Q_air____at_airport_slash_holding_dash_pattern = Q_air____at_airport_slash_holding_dash_pattern;
exports.Q_air____at_airport_slash_travel_dash_document_dash_checkpoint = Q_air____at_airport_slash_travel_dash_document_dash_checkpoint;
exports.RJoinColumn = RJoinColumn;
exports.RJoinColumns = RJoinColumns;
exports.RootContainer = RootContainer;
exports.SELECTOR_MANAGER = SELECTOR_MANAGER;
exports.STORE_DRIVER = STORE_DRIVER;
exports.SequenceGenerator = SequenceGenerator;
exports.TERMINAL_SESSION_MANAGER = TERMINAL_SESSION_MANAGER;
exports.TERMINAL_STATE = TERMINAL_STATE;
exports.TERMINAL_STORE = TERMINAL_STORE;
exports.TRANSACTIONAL_RECEIVER = TRANSACTIONAL_RECEIVER;
exports.TRANSACTIONAL_SERVER = TRANSACTIONAL_SERVER;
exports.TRANSACTION_MANAGER = TRANSACTION_MANAGER;
exports.Table = Table;
exports.TraditionalServerSeq = TraditionalServerSeq;
exports.Transient = Transient;
exports.USER_STATE = USER_STATE;
exports.USER_STORE = USER_STORE;
exports.airApi = airApi;
exports.air____at_airport_slash_airspace_diSet = air____at_airport_slash_airspace_diSet;
exports.air____at_airport_slash_holding_dash_pattern_diSet = air____at_airport_slash_holding_dash_pattern_diSet;
exports.air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet = air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet;
exports.and = and;
exports.applicationState = applicationState;
exports.between = between;
exports.byId = byId;
exports.diSet = diSet;
exports.doEnsureContext = doEnsureContext;
exports.domain = domain;
exports.duoDiSet = duoDiSet;
exports.equals = equals;
exports.exists = exists;
exports.extend = extend;
exports.injectAirportDatabase = injectAirportDatabase;
exports.injectEntityStateManager = injectEntityStateManager;
exports.internalTerminalState = internalTerminalState;
exports.internalUserState = internalUserState;
exports.isInteger = isInteger;
exports.isNotNull = isNotNull;
exports.isNull = isNull;
exports.length = length;
exports.lib = lib;
exports.loadTower = loadTower;
exports.markForDeletion = markForDeletion;
exports.oneOfNumbers = oneOfNumbers;
exports.oneOfStrings = oneOfStrings;
exports.or = or;
exports.typed = typed;
exports.uniqueIn = uniqueIn;
exports.value = value;
//# sourceMappingURL=index.js.map
