var app = (function (exports) {
    'use strict';

    var ContextType;
    (function (ContextType) {
        ContextType["DB"] = "DB";
        ContextType["UI"] = "UI";
    })(ContextType || (ContextType = {}));
    class Context {
        constructor(name, type) {
            this.name = name;
            this.type = type;
        }
    }

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
        constructor(application, name) {
            this.application = application;
            this.name = name;
        }
        getPath() {
            return this.application.domain.name + ':' + this.application.name + ':' + this.name;
        }
    }

    class InjectionApplication {
        constructor(name, domain) {
            this.name = name;
            this.domain = domain;
            this.tokenMap = new Map();
            this.autopilot = false;
        }
        token(name) {
            const existingToken = this.tokenMap.get(name);
            if (existingToken) {
                throw new Error(`Token with name '${name}' has already been created`);
            }
            const diToken = new DependencyInjectionToken(this, name);
            this.tokenMap.set(name, diToken);
            return diToken;
        }
    }
    function lib$1(libraryName) {
        return AIRPORT_DOMAIN.app(libraryName);
    }

    const directionIndicator = lib$1('di');
    const AUTOPILOT_API_LOADER = directionIndicator.token('AUTOPILOT_API_LOADER');

    const classMap = new Map();
    const objectMap = new Map();
    class Container {
        set(token, clazz) {
            classMap.set(token.name, clazz);
            objectMap.set(token.name, null);
        }
    }
    class ChildContainer extends Container {
        // TODO: implement continuous upgrading
        // classes: any[]  = []
        // numPendingInits = 0
        // theObjects: any[]  = []
        constructor(context) {
            super();
            this.context = context;
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
                let object = objectMap.get(token.name);
                if (!object) {
                    if (!this.context.inAIRportApp && token.application.autopilot) {
                        object = this.getSync(AUTOPILOT_API_LOADER)
                            .loadApiAutopilot(token);
                    }
                    else {
                        const clazz = classMap.get(token.name);
                        if (!clazz) {
                            firstMissingClassToken = token;
                            return;
                        }
                        if (clazz.diSet && !clazz.diSet()) {
                            firstMissingClassToken = token;
                            firstDiNotSetClass = clazz;
                            return;
                        }
                        object = new clazz();
                    }
                    object.__container__ = this;
                    objectMap.set(token.name, object);
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
        async getByNames(domainName, applicationName, tokenName) {
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
            const token = application.tokenMap.get(tokenName);
            if (!token) {
                throw new Error(`Could not find token: ${tokenName}
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
            this.childContainers = new Set();
            this.uiContainerMap = new Map();
        }
        db() {
            if (!this.dbContainer) {
                this.dbContainer = new ChildContainer(new Context(null, ContextType.DB));
            }
            return this.dbContainer;
        }
        remove(container) {
            if (!container) {
                return;
            }
            this.childContainers.delete(container);
            if (container.context && container.context.name) {
                this.uiContainerMap.get(container.context.name)
                    .delete(container);
            }
        }
        ui(componentName) {
            const context = new Context(componentName, ContextType.UI);
            const container = this.addContainer(context);
            let matchingUiContainerSet = this.uiContainerMap.get(componentName);
            if (!matchingUiContainerSet) {
                matchingUiContainerSet = new Set();
                this.uiContainerMap.set(componentName, matchingUiContainerSet);
            }
            matchingUiContainerSet.add(container);
            return container;
        }
        addContainer(context) {
            const childContainer = new ChildContainer(context);
            this.childContainers.add(childContainer);
            return childContainer;
        }
    }
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
    const DEPENDENCY_INJECTION = new RootContainer();
    if (typeof window !== 'undefined') {
        window.DEPENDENCY_INJECTION = DEPENDENCY_INJECTION;
        window.lib = lib$1;
        window.domain = domain;
    }
    const IOC = new InversionOfControl();

    const vhfRadio = lib$1('vhf-radio');
    const CROSS_TAB_COMMUNCATOR = vhfRadio.token('CROSS_TAB_COMMUNCATOR');

    function getAugmentedNamespace(n) {
    	if (n.__esModule) return n;
    	var a = Object.defineProperty({}, '__esModule', {value: true});
    	Object.keys(n).forEach(function (k) {
    		var d = Object.getOwnPropertyDescriptor(n, k);
    		Object.defineProperty(a, k, d.get ? d : {
    			enumerable: true,
    			get: function () {
    				return n[k];
    			}
    		});
    	});
    	return a;
    }

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    var util = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isNode = exports.PROMISE_RESOLVED_VOID = exports.PROMISE_RESOLVED_TRUE = exports.PROMISE_RESOLVED_FALSE = void 0;
    exports.isPromise = isPromise;
    exports.microSeconds = microSeconds;
    exports.randomInt = randomInt;
    exports.randomToken = randomToken;
    exports.sleep = sleep;

    /**
     * returns true if the given object is a promise
     */
    function isPromise(obj) {
      if (obj && typeof obj.then === 'function') {
        return true;
      } else {
        return false;
      }
    }

    var PROMISE_RESOLVED_FALSE = Promise.resolve(false);
    exports.PROMISE_RESOLVED_FALSE = PROMISE_RESOLVED_FALSE;
    var PROMISE_RESOLVED_TRUE = Promise.resolve(true);
    exports.PROMISE_RESOLVED_TRUE = PROMISE_RESOLVED_TRUE;
    var PROMISE_RESOLVED_VOID = Promise.resolve();
    exports.PROMISE_RESOLVED_VOID = PROMISE_RESOLVED_VOID;

    function sleep(time, resolveWith) {
      if (!time) time = 0;
      return new Promise(function (res) {
        return setTimeout(function () {
          return res(resolveWith);
        }, time);
      });
    }

    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    /**
     * https://stackoverflow.com/a/8084248
     */


    function randomToken() {
      return Math.random().toString(36).substring(2);
    }

    var lastMs = 0;
    var additional = 0;
    /**
     * returns the current time in micro-seconds,
     * WARNING: This is a pseudo-function
     * Performance.now is not reliable in webworkers, so we just make sure to never return the same time.
     * This is enough in browsers, and this function will not be used in nodejs.
     * The main reason for this hack is to ensure that BroadcastChannel behaves equal to production when it is used in fast-running unit tests.
     */

    function microSeconds() {
      var ms = new Date().getTime();

      if (ms === lastMs) {
        additional++;
        return ms * 1000 + additional;
      } else {
        lastMs = ms;
        additional = 0;
        return ms * 1000;
      }
    }
    /**
     * copied from the 'detect-node' npm module
     * We cannot use the module directly because it causes problems with rollup
     * @link https://github.com/iliakan/detect-node/blob/master/index.js
     */


    var isNode = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
    exports.isNode = isNode;
    });

    var interopRequireDefault = createCommonjsModule(function (module) {
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }

    module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
    });

    createCommonjsModule(function (module) {
    function _typeof(obj) {
      "@babel/helpers - typeof";

      return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
    }

    module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
    });

    var _util = util;

    var native = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.averageResponseTime = averageResponseTime;
    exports.canBeUsed = canBeUsed;
    exports.close = close;
    exports.create = create;
    exports.microSeconds = exports["default"] = void 0;
    exports.onMessage = onMessage;
    exports.postMessage = postMessage;
    exports.type = void 0;



    var microSeconds = _util.microSeconds;
    exports.microSeconds = microSeconds;
    var type = 'native';
    exports.type = type;

    function create(channelName) {
      var state = {
        messagesCallback: null,
        bc: new BroadcastChannel(channelName),
        subFns: [] // subscriberFunctions

      };

      state.bc.onmessage = function (msg) {
        if (state.messagesCallback) {
          state.messagesCallback(msg.data);
        }
      };

      return state;
    }

    function close(channelState) {
      channelState.bc.close();
      channelState.subFns = [];
    }

    function postMessage(channelState, messageJson) {
      try {
        channelState.bc.postMessage(messageJson, false);
        return _util.PROMISE_RESOLVED_VOID;
      } catch (err) {
        return Promise.reject(err);
      }
    }

    function onMessage(channelState, fn) {
      channelState.messagesCallback = fn;
    }

    function canBeUsed() {
      /**
       * in the electron-renderer, isNode will be true even if we are in browser-context
       * so we also check if window is undefined
       */
      if (_util.isNode && typeof window === 'undefined') return false;

      if (typeof BroadcastChannel === 'function') {
        if (BroadcastChannel._pubkey) {
          throw new Error('BroadcastChannel: Do not overwrite window.BroadcastChannel with this module, this is not a polyfill');
        }

        return true;
      } else return false;
    }

    function averageResponseTime() {
      return 150;
    }

    var _default = {
      create: create,
      close: close,
      onMessage: onMessage,
      postMessage: postMessage,
      canBeUsed: canBeUsed,
      type: type,
      averageResponseTime: averageResponseTime,
      microSeconds: microSeconds
    };
    exports["default"] = _default;
    });

    /**
     * this is a set which automatically forgets
     * a given entry when a new entry is set and the ttl
     * of the old one is over
     */
    var ObliviousSet = /** @class */ (function () {
        function ObliviousSet(ttl) {
            this.ttl = ttl;
            this.set = new Set();
            this.timeMap = new Map();
        }
        ObliviousSet.prototype.has = function (value) {
            return this.set.has(value);
        };
        ObliviousSet.prototype.add = function (value) {
            var _this = this;
            this.timeMap.set(value, now());
            this.set.add(value);
            /**
             * When a new value is added,
             * start the cleanup at the next tick
             * to not block the cpu for more important stuff
             * that might happen.
             */
            setTimeout(function () {
                removeTooOldValues(_this);
            }, 0);
        };
        ObliviousSet.prototype.clear = function () {
            this.set.clear();
            this.timeMap.clear();
        };
        return ObliviousSet;
    }());
    /**
     * Removes all entries from the set
     * where the TTL has expired
     */
    function removeTooOldValues(obliviousSet) {
        var olderThen = now() - obliviousSet.ttl;
        var iterator = obliviousSet.set[Symbol.iterator]();
        /**
         * Because we can assume the new values are added at the bottom,
         * we start from the top and stop as soon as we reach a non-too-old value.
         */
        while (true) {
            var value = iterator.next().value;
            if (!value) {
                return; // no more elements
            }
            var time = obliviousSet.timeMap.get(value);
            if (time < olderThen) {
                obliviousSet.timeMap.delete(value);
                obliviousSet.set.delete(value);
            }
            else {
                // We reached a value that is not old enough
                return;
            }
        }
    }
    function now() {
        return new Date().getTime();
    }

    var es$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        ObliviousSet: ObliviousSet,
        removeTooOldValues: removeTooOldValues,
        now: now
    });

    var fillOptionsWithDefaults_1 = fillOptionsWithDefaults$1;

    function fillOptionsWithDefaults$1() {
      var originalOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = JSON.parse(JSON.stringify(originalOptions)); // main

      if (typeof options.webWorkerSupport === 'undefined') options.webWorkerSupport = true; // indexed-db

      if (!options.idb) options.idb = {}; //  after this time the messages get deleted

      if (!options.idb.ttl) options.idb.ttl = 1000 * 45;
      if (!options.idb.fallbackInterval) options.idb.fallbackInterval = 150; //  handles abrupt db onclose events.

      if (originalOptions.idb && typeof originalOptions.idb.onclose === 'function') options.idb.onclose = originalOptions.idb.onclose; // localstorage

      if (!options.localstorage) options.localstorage = {};
      if (!options.localstorage.removeTimeout) options.localstorage.removeTimeout = 1000 * 60; // custom methods

      if (originalOptions.methods) options.methods = originalOptions.methods; // node

      if (!options.node) options.node = {};
      if (!options.node.ttl) options.node.ttl = 1000 * 60 * 2; // 2 minutes;

      /**
       * On linux use 'ulimit -Hn' to get the limit of open files.
       * On ubuntu this was 4096 for me, so we use half of that as maxParallelWrites default.
       */

      if (!options.node.maxParallelWrites) options.node.maxParallelWrites = 2048;
      if (typeof options.node.useFastPath === 'undefined') options.node.useFastPath = true;
      return options;
    }

    var options = /*#__PURE__*/Object.defineProperty({
    	fillOptionsWithDefaults: fillOptionsWithDefaults_1
    }, '__esModule', {value: true});

    var _obliviousSet = /*@__PURE__*/getAugmentedNamespace(es$1);

    var _options = options;

    var indexedDb = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.averageResponseTime = averageResponseTime;
    exports.canBeUsed = canBeUsed;
    exports.cleanOldMessages = cleanOldMessages;
    exports.close = close;
    exports.create = create;
    exports.createDatabase = createDatabase;
    exports["default"] = void 0;
    exports.getAllMessages = getAllMessages;
    exports.getIdb = getIdb;
    exports.getMessagesHigherThan = getMessagesHigherThan;
    exports.getOldMessages = getOldMessages;
    exports.microSeconds = void 0;
    exports.onMessage = onMessage;
    exports.postMessage = postMessage;
    exports.removeMessageById = removeMessageById;
    exports.type = void 0;
    exports.writeMessage = writeMessage;







    /**
     * this method uses indexeddb to store the messages
     * There is currently no observerAPI for idb
     * @link https://github.com/w3c/IndexedDB/issues/51
     */
    var microSeconds = _util.microSeconds;
    exports.microSeconds = microSeconds;
    var DB_PREFIX = 'pubkey.broadcast-channel-0-';
    var OBJECT_STORE_ID = 'messages';
    var type = 'idb';
    exports.type = type;

    function getIdb() {
      if (typeof indexedDB !== 'undefined') return indexedDB;

      if (typeof window !== 'undefined') {
        if (typeof window.mozIndexedDB !== 'undefined') return window.mozIndexedDB;
        if (typeof window.webkitIndexedDB !== 'undefined') return window.webkitIndexedDB;
        if (typeof window.msIndexedDB !== 'undefined') return window.msIndexedDB;
      }

      return false;
    }

    function createDatabase(channelName) {
      var IndexedDB = getIdb(); // create table

      var dbName = DB_PREFIX + channelName;
      var openRequest = IndexedDB.open(dbName, 1);

      openRequest.onupgradeneeded = function (ev) {
        var db = ev.target.result;
        db.createObjectStore(OBJECT_STORE_ID, {
          keyPath: 'id',
          autoIncrement: true
        });
      };

      var dbPromise = new Promise(function (res, rej) {
        openRequest.onerror = function (ev) {
          return rej(ev);
        };

        openRequest.onsuccess = function () {
          res(openRequest.result);
        };
      });
      return dbPromise;
    }
    /**
     * writes the new message to the database
     * so other readers can find it
     */


    function writeMessage(db, readerUuid, messageJson) {
      var time = new Date().getTime();
      var writeObject = {
        uuid: readerUuid,
        time: time,
        data: messageJson
      };
      var transaction = db.transaction([OBJECT_STORE_ID], 'readwrite');
      return new Promise(function (res, rej) {
        transaction.oncomplete = function () {
          return res();
        };

        transaction.onerror = function (ev) {
          return rej(ev);
        };

        var objectStore = transaction.objectStore(OBJECT_STORE_ID);
        objectStore.add(writeObject);
      });
    }

    function getAllMessages(db) {
      var objectStore = db.transaction(OBJECT_STORE_ID).objectStore(OBJECT_STORE_ID);
      var ret = [];
      return new Promise(function (res) {
        objectStore.openCursor().onsuccess = function (ev) {
          var cursor = ev.target.result;

          if (cursor) {
            ret.push(cursor.value); //alert("Name for SSN " + cursor.key + " is " + cursor.value.name);

            cursor["continue"]();
          } else {
            res(ret);
          }
        };
      });
    }

    function getMessagesHigherThan(db, lastCursorId) {
      var objectStore = db.transaction(OBJECT_STORE_ID).objectStore(OBJECT_STORE_ID);
      var ret = [];

      function openCursor() {
        // Occasionally Safari will fail on IDBKeyRange.bound, this
        // catches that error, having it open the cursor to the first
        // item. When it gets data it will advance to the desired key.
        try {
          var keyRangeValue = IDBKeyRange.bound(lastCursorId + 1, Infinity);
          return objectStore.openCursor(keyRangeValue);
        } catch (e) {
          return objectStore.openCursor();
        }
      }

      return new Promise(function (res) {
        openCursor().onsuccess = function (ev) {
          var cursor = ev.target.result;

          if (cursor) {
            if (cursor.value.id < lastCursorId + 1) {
              cursor["continue"](lastCursorId + 1);
            } else {
              ret.push(cursor.value);
              cursor["continue"]();
            }
          } else {
            res(ret);
          }
        };
      });
    }

    function removeMessageById(db, id) {
      var request = db.transaction([OBJECT_STORE_ID], 'readwrite').objectStore(OBJECT_STORE_ID)["delete"](id);
      return new Promise(function (res) {
        request.onsuccess = function () {
          return res();
        };
      });
    }

    function getOldMessages(db, ttl) {
      var olderThen = new Date().getTime() - ttl;
      var objectStore = db.transaction(OBJECT_STORE_ID).objectStore(OBJECT_STORE_ID);
      var ret = [];
      return new Promise(function (res) {
        objectStore.openCursor().onsuccess = function (ev) {
          var cursor = ev.target.result;

          if (cursor) {
            var msgObk = cursor.value;

            if (msgObk.time < olderThen) {
              ret.push(msgObk); //alert("Name for SSN " + cursor.key + " is " + cursor.value.name);

              cursor["continue"]();
            } else {
              // no more old messages,
              res(ret);
              return;
            }
          } else {
            res(ret);
          }
        };
      });
    }

    function cleanOldMessages(db, ttl) {
      return getOldMessages(db, ttl).then(function (tooOld) {
        return Promise.all(tooOld.map(function (msgObj) {
          return removeMessageById(db, msgObj.id);
        }));
      });
    }

    function create(channelName, options) {
      options = (0, _options.fillOptionsWithDefaults)(options);
      return createDatabase(channelName).then(function (db) {
        var state = {
          closed: false,
          lastCursorId: 0,
          channelName: channelName,
          options: options,
          uuid: (0, _util.randomToken)(),

          /**
           * emittedMessagesIds
           * contains all messages that have been emitted before
           * @type {ObliviousSet}
           */
          eMIs: new _obliviousSet.ObliviousSet(options.idb.ttl * 2),
          // ensures we do not read messages in parrallel
          writeBlockPromise: _util.PROMISE_RESOLVED_VOID,
          messagesCallback: null,
          readQueuePromises: [],
          db: db
        };
        /**
         * Handle abrupt closes that do not originate from db.close().
         * This could happen, for example, if the underlying storage is
         * removed or if the user clears the database in the browser's
         * history preferences.
         */

        db.onclose = function () {
          state.closed = true;
          if (options.idb.onclose) options.idb.onclose();
        };
        /**
         * if service-workers are used,
         * we have no 'storage'-event if they post a message,
         * therefore we also have to set an interval
         */


        _readLoop(state);

        return state;
      });
    }

    function _readLoop(state) {
      if (state.closed) return;
      readNewMessages(state).then(function () {
        return (0, _util.sleep)(state.options.idb.fallbackInterval);
      }).then(function () {
        return _readLoop(state);
      });
    }

    function _filterMessage(msgObj, state) {
      if (msgObj.uuid === state.uuid) return false; // send by own

      if (state.eMIs.has(msgObj.id)) return false; // already emitted

      if (msgObj.data.time < state.messagesCallbackTime) return false; // older then onMessageCallback

      return true;
    }
    /**
     * reads all new messages from the database and emits them
     */


    function readNewMessages(state) {
      // channel already closed
      if (state.closed) return _util.PROMISE_RESOLVED_VOID; // if no one is listening, we do not need to scan for new messages

      if (!state.messagesCallback) return _util.PROMISE_RESOLVED_VOID;
      return getMessagesHigherThan(state.db, state.lastCursorId).then(function (newerMessages) {
        var useMessages = newerMessages
        /**
         * there is a bug in iOS where the msgObj can be undefined some times
         * so we filter them out
         * @link https://github.com/pubkey/broadcast-channel/issues/19
         */
        .filter(function (msgObj) {
          return !!msgObj;
        }).map(function (msgObj) {
          if (msgObj.id > state.lastCursorId) {
            state.lastCursorId = msgObj.id;
          }

          return msgObj;
        }).filter(function (msgObj) {
          return _filterMessage(msgObj, state);
        }).sort(function (msgObjA, msgObjB) {
          return msgObjA.time - msgObjB.time;
        }); // sort by time

        useMessages.forEach(function (msgObj) {
          if (state.messagesCallback) {
            state.eMIs.add(msgObj.id);
            state.messagesCallback(msgObj.data);
          }
        });
        return _util.PROMISE_RESOLVED_VOID;
      });
    }

    function close(channelState) {
      channelState.closed = true;
      channelState.db.close();
    }

    function postMessage(channelState, messageJson) {
      channelState.writeBlockPromise = channelState.writeBlockPromise.then(function () {
        return writeMessage(channelState.db, channelState.uuid, messageJson);
      }).then(function () {
        if ((0, _util.randomInt)(0, 10) === 0) {
          /* await (do not await) */
          cleanOldMessages(channelState.db, channelState.options.idb.ttl);
        }
      });
      return channelState.writeBlockPromise;
    }

    function onMessage(channelState, fn, time) {
      channelState.messagesCallbackTime = time;
      channelState.messagesCallback = fn;
      readNewMessages(channelState);
    }

    function canBeUsed() {
      if (_util.isNode) return false;
      var idb = getIdb();
      if (!idb) return false;
      return true;
    }

    function averageResponseTime(options) {
      return options.idb.fallbackInterval * 2;
    }

    var _default = {
      create: create,
      close: close,
      onMessage: onMessage,
      postMessage: postMessage,
      canBeUsed: canBeUsed,
      type: type,
      averageResponseTime: averageResponseTime,
      microSeconds: microSeconds
    };
    exports["default"] = _default;
    });

    var localstorage = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.addStorageEventListener = addStorageEventListener;
    exports.averageResponseTime = averageResponseTime;
    exports.canBeUsed = canBeUsed;
    exports.close = close;
    exports.create = create;
    exports["default"] = void 0;
    exports.getLocalStorage = getLocalStorage;
    exports.microSeconds = void 0;
    exports.onMessage = onMessage;
    exports.postMessage = postMessage;
    exports.removeStorageEventListener = removeStorageEventListener;
    exports.storageKey = storageKey;
    exports.type = void 0;







    /**
     * A localStorage-only method which uses localstorage and its 'storage'-event
     * This does not work inside of webworkers because they have no access to locastorage
     * This is basically implemented to support IE9 or your grandmothers toaster.
     * @link https://caniuse.com/#feat=namevalue-storage
     * @link https://caniuse.com/#feat=indexeddb
     */
    var microSeconds = _util.microSeconds;
    exports.microSeconds = microSeconds;
    var KEY_PREFIX = 'pubkey.broadcastChannel-';
    var type = 'localstorage';
    /**
     * copied from crosstab
     * @link https://github.com/tejacques/crosstab/blob/master/src/crosstab.js#L32
     */

    exports.type = type;

    function getLocalStorage() {
      var localStorage;
      if (typeof window === 'undefined') return null;

      try {
        localStorage = window.localStorage;
        localStorage = window['ie8-eventlistener/storage'] || window.localStorage;
      } catch (e) {// New versions of Firefox throw a Security exception
        // if cookies are disabled. See
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1028153
      }

      return localStorage;
    }

    function storageKey(channelName) {
      return KEY_PREFIX + channelName;
    }
    /**
    * writes the new message to the storage
    * and fires the storage-event so other readers can find it
    */


    function postMessage(channelState, messageJson) {
      return new Promise(function (res) {
        (0, _util.sleep)().then(function () {
          var key = storageKey(channelState.channelName);
          var writeObj = {
            token: (0, _util.randomToken)(),
            time: new Date().getTime(),
            data: messageJson,
            uuid: channelState.uuid
          };
          var value = JSON.stringify(writeObj);
          getLocalStorage().setItem(key, value);
          /**
           * StorageEvent does not fire the 'storage' event
           * in the window that changes the state of the local storage.
           * So we fire it manually
           */

          var ev = document.createEvent('Event');
          ev.initEvent('storage', true, true);
          ev.key = key;
          ev.newValue = value;
          window.dispatchEvent(ev);
          res();
        });
      });
    }

    function addStorageEventListener(channelName, fn) {
      var key = storageKey(channelName);

      var listener = function listener(ev) {
        if (ev.key === key) {
          fn(JSON.parse(ev.newValue));
        }
      };

      window.addEventListener('storage', listener);
      return listener;
    }

    function removeStorageEventListener(listener) {
      window.removeEventListener('storage', listener);
    }

    function create(channelName, options) {
      options = (0, _options.fillOptionsWithDefaults)(options);

      if (!canBeUsed()) {
        throw new Error('BroadcastChannel: localstorage cannot be used');
      }

      var uuid = (0, _util.randomToken)();
      /**
       * eMIs
       * contains all messages that have been emitted before
       * @type {ObliviousSet}
       */

      var eMIs = new _obliviousSet.ObliviousSet(options.localstorage.removeTimeout);
      var state = {
        channelName: channelName,
        uuid: uuid,
        eMIs: eMIs // emittedMessagesIds

      };
      state.listener = addStorageEventListener(channelName, function (msgObj) {
        if (!state.messagesCallback) return; // no listener

        if (msgObj.uuid === uuid) return; // own message

        if (!msgObj.token || eMIs.has(msgObj.token)) return; // already emitted

        if (msgObj.data.time && msgObj.data.time < state.messagesCallbackTime) return; // too old

        eMIs.add(msgObj.token);
        state.messagesCallback(msgObj.data);
      });
      return state;
    }

    function close(channelState) {
      removeStorageEventListener(channelState.listener);
    }

    function onMessage(channelState, fn, time) {
      channelState.messagesCallbackTime = time;
      channelState.messagesCallback = fn;
    }

    function canBeUsed() {
      if (_util.isNode) return false;
      var ls = getLocalStorage();
      if (!ls) return false;

      try {
        var key = '__broadcastchannel_check';
        ls.setItem(key, 'works');
        ls.removeItem(key);
      } catch (e) {
        // Safari 10 in private mode will not allow write access to local
        // storage and fail with a QuotaExceededError. See
        // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API#Private_Browsing_Incognito_modes
        return false;
      }

      return true;
    }

    function averageResponseTime() {
      var defaultTime = 120;
      var userAgent = navigator.userAgent.toLowerCase();

      if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
        // safari is much slower so this time is higher
        return defaultTime * 2;
      }

      return defaultTime;
    }

    var _default = {
      create: create,
      close: close,
      onMessage: onMessage,
      postMessage: postMessage,
      canBeUsed: canBeUsed,
      type: type,
      averageResponseTime: averageResponseTime,
      microSeconds: microSeconds
    };
    exports["default"] = _default;
    });

    var simulate = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.averageResponseTime = averageResponseTime;
    exports.canBeUsed = canBeUsed;
    exports.close = close;
    exports.create = create;
    exports.microSeconds = exports["default"] = void 0;
    exports.onMessage = onMessage;
    exports.postMessage = postMessage;
    exports.type = void 0;



    var microSeconds = _util.microSeconds;
    exports.microSeconds = microSeconds;
    var type = 'simulate';
    exports.type = type;
    var SIMULATE_CHANNELS = new Set();

    function create(channelName) {
      var state = {
        name: channelName,
        messagesCallback: null
      };
      SIMULATE_CHANNELS.add(state);
      return state;
    }

    function close(channelState) {
      SIMULATE_CHANNELS["delete"](channelState);
    }

    function postMessage(channelState, messageJson) {
      return new Promise(function (res) {
        return setTimeout(function () {
          var channelArray = Array.from(SIMULATE_CHANNELS);
          channelArray.filter(function (channel) {
            return channel.name === channelState.name;
          }).filter(function (channel) {
            return channel !== channelState;
          }).filter(function (channel) {
            return !!channel.messagesCallback;
          }).forEach(function (channel) {
            return channel.messagesCallback(messageJson);
          });
          res();
        }, 5);
      });
    }

    function onMessage(channelState, fn) {
      channelState.messagesCallback = fn;
    }

    function canBeUsed() {
      return true;
    }

    function averageResponseTime() {
      return 5;
    }

    var _default = {
      create: create,
      close: close,
      onMessage: onMessage,
      postMessage: postMessage,
      canBeUsed: canBeUsed,
      type: type,
      averageResponseTime: averageResponseTime,
      microSeconds: microSeconds
    };
    exports["default"] = _default;
    });

    var require$$0 = native;

    var require$$1 = indexedDb;

    var require$$2 = localstorage;

    var require$$3 = simulate;

    var chooseMethod_1 = chooseMethod;

    var _native = interopRequireDefault(require$$0);

    var _indexedDb = interopRequireDefault(require$$1);

    var _localstorage = interopRequireDefault(require$$2);

    var _simulate = interopRequireDefault(require$$3);

    // the line below will be removed from es5/browser builds
    // order is important
    var METHODS = [_native["default"], // fastest
    _indexedDb["default"], _localstorage["default"]];

    function chooseMethod(options) {
      var chooseMethods = [].concat(options.methods, METHODS).filter(Boolean); // the line below will be removed from es5/browser builds



      if (options.type) {
        if (options.type === 'simulate') {
          // only use simulate-method if directly chosen
          return _simulate["default"];
        }

        var ret = chooseMethods.find(function (m) {
          return m.type === options.type;
        });
        if (!ret) throw new Error('method-type ' + options.type + ' not found');else return ret;
      }
      /**
       * if no webworker support is needed,
       * remove idb from the list so that localstorage is been chosen
       */


      if (!options.webWorkerSupport && !_util.isNode) {
        chooseMethods = chooseMethods.filter(function (m) {
          return m.type !== 'idb';
        });
      }

      var useMethod = chooseMethods.find(function (method) {
        return method.canBeUsed();
      });
      if (!useMethod) throw new Error("No useable method found in " + JSON.stringify(METHODS.map(function (m) {
        return m.type;
      })));else return useMethod;
    }

    var methodChooser = /*#__PURE__*/Object.defineProperty({
    	chooseMethod: chooseMethod_1
    }, '__esModule', {value: true});

    var _methodChooser = methodChooser;

    var broadcastChannel = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.OPEN_BROADCAST_CHANNELS = exports.BroadcastChannel = void 0;
    exports.clearNodeFolder = clearNodeFolder;
    exports.enforceOptions = enforceOptions;







    /**
     * Contains all open channels,
     * used in tests to ensure everything is closed.
     */
    var OPEN_BROADCAST_CHANNELS = new Set();
    exports.OPEN_BROADCAST_CHANNELS = OPEN_BROADCAST_CHANNELS;
    var lastId = 0;

    var BroadcastChannel = function BroadcastChannel(name, options) {
      // identifier of the channel to debug stuff
      this.id = lastId++;
      OPEN_BROADCAST_CHANNELS.add(this);
      this.name = name;

      if (ENFORCED_OPTIONS) {
        options = ENFORCED_OPTIONS;
      }

      this.options = (0, _options.fillOptionsWithDefaults)(options);
      this.method = (0, _methodChooser.chooseMethod)(this.options); // isListening

      this._iL = false;
      /**
       * _onMessageListener
       * setting onmessage twice,
       * will overwrite the first listener
       */

      this._onML = null;
      /**
       * _addEventListeners
       */

      this._addEL = {
        message: [],
        internal: []
      };
      /**
       * Unsend message promises
       * where the sending is still in progress
       * @type {Set<Promise>}
       */

      this._uMP = new Set();
      /**
       * _beforeClose
       * array of promises that will be awaited
       * before the channel is closed
       */

      this._befC = [];
      /**
       * _preparePromise
       */

      this._prepP = null;

      _prepareChannel(this);
    }; // STATICS

    /**
     * used to identify if someone overwrites
     * window.BroadcastChannel with this
     * See methods/native.js
     */


    exports.BroadcastChannel = BroadcastChannel;
    BroadcastChannel._pubkey = true;
    /**
     * clears the tmp-folder if is node
     * @return {Promise<boolean>} true if has run, false if not node
     */

    function clearNodeFolder(options) {
      options = (0, _options.fillOptionsWithDefaults)(options);
      var method = (0, _methodChooser.chooseMethod)(options);

      if (method.type === 'node') {
        return method.clearNodeFolder().then(function () {
          return true;
        });
      } else {
        return _util.PROMISE_RESOLVED_FALSE;
      }
    }
    /**
     * if set, this method is enforced,
     * no mather what the options are
     */


    var ENFORCED_OPTIONS;

    function enforceOptions(options) {
      ENFORCED_OPTIONS = options;
    } // PROTOTYPE


    BroadcastChannel.prototype = {
      postMessage: function postMessage(msg) {
        if (this.closed) {
          throw new Error('BroadcastChannel.postMessage(): ' + 'Cannot post message after channel has closed');
        }

        return _post(this, 'message', msg);
      },
      postInternal: function postInternal(msg) {
        return _post(this, 'internal', msg);
      },

      set onmessage(fn) {
        var time = this.method.microSeconds();
        var listenObj = {
          time: time,
          fn: fn
        };

        _removeListenerObject(this, 'message', this._onML);

        if (fn && typeof fn === 'function') {
          this._onML = listenObj;

          _addListenerObject(this, 'message', listenObj);
        } else {
          this._onML = null;
        }
      },

      addEventListener: function addEventListener(type, fn) {
        var time = this.method.microSeconds();
        var listenObj = {
          time: time,
          fn: fn
        };

        _addListenerObject(this, type, listenObj);
      },
      removeEventListener: function removeEventListener(type, fn) {
        var obj = this._addEL[type].find(function (obj) {
          return obj.fn === fn;
        });

        _removeListenerObject(this, type, obj);
      },
      close: function close() {
        var _this = this;

        if (this.closed) {
          return;
        }

        OPEN_BROADCAST_CHANNELS["delete"](this);
        this.closed = true;
        var awaitPrepare = this._prepP ? this._prepP : _util.PROMISE_RESOLVED_VOID;
        this._onML = null;
        this._addEL.message = [];
        return awaitPrepare // wait until all current sending are processed
        .then(function () {
          return Promise.all(Array.from(_this._uMP));
        }) // run before-close hooks
        .then(function () {
          return Promise.all(_this._befC.map(function (fn) {
            return fn();
          }));
        }) // close the channel
        .then(function () {
          return _this.method.close(_this._state);
        });
      },

      get type() {
        return this.method.type;
      },

      get isClosed() {
        return this.closed;
      }

    };
    /**
     * Post a message over the channel
     * @returns {Promise} that resolved when the message sending is done
     */

    function _post(broadcastChannel, type, msg) {
      var time = broadcastChannel.method.microSeconds();
      var msgObj = {
        time: time,
        type: type,
        data: msg
      };
      var awaitPrepare = broadcastChannel._prepP ? broadcastChannel._prepP : _util.PROMISE_RESOLVED_VOID;
      return awaitPrepare.then(function () {
        var sendPromise = broadcastChannel.method.postMessage(broadcastChannel._state, msgObj); // add/remove to unsend messages list

        broadcastChannel._uMP.add(sendPromise);

        sendPromise["catch"]().then(function () {
          return broadcastChannel._uMP["delete"](sendPromise);
        });
        return sendPromise;
      });
    }

    function _prepareChannel(channel) {
      var maybePromise = channel.method.create(channel.name, channel.options);

      if ((0, _util.isPromise)(maybePromise)) {
        channel._prepP = maybePromise;
        maybePromise.then(function (s) {
          // used in tests to simulate slow runtime

          /*if (channel.options.prepareDelay) {
               await new Promise(res => setTimeout(res, this.options.prepareDelay));
          }*/
          channel._state = s;
        });
      } else {
        channel._state = maybePromise;
      }
    }

    function _hasMessageListeners(channel) {
      if (channel._addEL.message.length > 0) return true;
      if (channel._addEL.internal.length > 0) return true;
      return false;
    }

    function _addListenerObject(channel, type, obj) {
      channel._addEL[type].push(obj);

      _startListening(channel);
    }

    function _removeListenerObject(channel, type, obj) {
      channel._addEL[type] = channel._addEL[type].filter(function (o) {
        return o !== obj;
      });

      _stopListening(channel);
    }

    function _startListening(channel) {
      if (!channel._iL && _hasMessageListeners(channel)) {
        // someone is listening, start subscribing
        var listenerFn = function listenerFn(msgObj) {
          channel._addEL[msgObj.type].forEach(function (listenerObject) {
            /**
             * Getting the current time in JavaScript has no good precision.
             * So instead of only listening to events that happend 'after' the listener
             * was added, we also listen to events that happended 100ms before it.
             * This ensures that when another process, like a WebWorker, sends events
             * we do not miss them out because their timestamp is a bit off compared to the main process.
             * Not doing this would make messages missing when we send data directly after subscribing and awaiting a response.
             * @link https://johnresig.com/blog/accuracy-of-javascript-time/
             */
            var hundredMsInMicro = 100 * 1000;
            var minMessageTime = listenerObject.time - hundredMsInMicro;

            if (msgObj.time >= minMessageTime) {
              listenerObject.fn(msgObj.data);
            }
          });
        };

        var time = channel.method.microSeconds();

        if (channel._prepP) {
          channel._prepP.then(function () {
            channel._iL = true;
            channel.method.onMessage(channel._state, listenerFn, time);
          });
        } else {
          channel._iL = true;
          channel.method.onMessage(channel._state, listenerFn, time);
        }
      }
    }

    function _stopListening(channel) {
      if (channel._iL && !_hasMessageListeners(channel)) {
        // noone is listening, stop subscribing
        channel._iL = false;
        var time = channel.method.microSeconds();
        channel.method.onMessage(channel._state, null, time);
      }
    }
    });

    /* global WorkerGlobalScope */
    function add$1(fn) {
      if (typeof WorkerGlobalScope === 'function' && self instanceof WorkerGlobalScope) ; else {
        /**
         * if we are on react-native, there is no window.addEventListener
         * @link https://github.com/pubkey/unload/issues/6
         */
        if (typeof window.addEventListener !== 'function') return;
        /**
         * for normal browser-windows, we use the beforeunload-event
         */

        window.addEventListener('beforeunload', function () {
          fn();
        }, true);
        /**
         * for iframes, we have to use the unload-event
         * @link https://stackoverflow.com/q/47533670/3443137
         */

        window.addEventListener('unload', function () {
          fn();
        }, true);
      }
      /**
       * TODO add fallback for safari-mobile
       * @link https://stackoverflow.com/a/26193516/3443137
       */

    }

    var BrowserMethod = {
      add: add$1
    };

    var USE_METHOD = BrowserMethod;
    var LISTENERS = new Set();
    var startedListening = false;

    function startListening() {
      if (startedListening) return;
      startedListening = true;
      USE_METHOD.add(runAll);
    }

    function add(fn) {
      startListening();
      if (typeof fn !== 'function') throw new Error('Listener is no function');
      LISTENERS.add(fn);
      var addReturn = {
        remove: function remove() {
          return LISTENERS["delete"](fn);
        },
        run: function run() {
          LISTENERS["delete"](fn);
          return fn();
        }
      };
      return addReturn;
    }
    function runAll() {
      var promises = [];
      LISTENERS.forEach(function (fn) {
        promises.push(fn());
        LISTENERS["delete"](fn);
      });
      return Promise.all(promises);
    }
    function removeAll() {
      LISTENERS.clear();
    }
    function getSize() {
      return LISTENERS.size;
    }

    var es = /*#__PURE__*/Object.freeze({
        __proto__: null,
        add: add,
        runAll: runAll,
        removeAll: removeAll,
        getSize: getSize
    });

    var _unload = /*@__PURE__*/getAugmentedNamespace(es);

    var beLeader_1 = beLeader;
    var createLeaderElection_1 = createLeaderElection;





    var LeaderElection = function LeaderElection(broadcastChannel, options) {
      var _this = this;

      this.broadcastChannel = broadcastChannel;
      this._options = options;
      this.isLeader = false;
      this.hasLeader = false;
      this.isDead = false;
      this.token = (0, _util.randomToken)();
      /**
       * Apply Queue,
       * used to ensure we do not run applyOnce()
       * in parallel.
       */

      this._aplQ = _util.PROMISE_RESOLVED_VOID; // amount of unfinished applyOnce() calls

      this._aplQC = 0; // things to clean up

      this._unl = []; // _unloads

      this._lstns = []; // _listeners

      this._dpL = function () {}; // onduplicate listener


      this._dpLC = false; // true when onduplicate called

      /**
       * Even when the own instance is not applying,
       * we still listen to messages to ensure the hasLeader flag
       * is set correctly.
       */

      var hasLeaderListener = function hasLeaderListener(msg) {
        if (msg.context === 'leader') {
          if (msg.action === 'death') {
            _this.hasLeader = false;
          }

          if (msg.action === 'tell') {
            _this.hasLeader = true;
          }
        }
      };

      this.broadcastChannel.addEventListener('internal', hasLeaderListener);

      this._lstns.push(hasLeaderListener);
    };

    LeaderElection.prototype = {
      /**
       * Returns true if the instance is leader,
       * false if not.
       * @async
       */
      applyOnce: function applyOnce( // true if the applyOnce() call came from the fallbackInterval cycle
      isFromFallbackInterval) {
        var _this2 = this;

        if (this.isLeader) {
          return (0, _util.sleep)(0, true);
        }

        if (this.isDead) {
          return (0, _util.sleep)(0, false);
        }
        /**
         * Already applying more then once,
         * -> wait for the apply queue to be finished.
         */


        if (this._aplQC > 1) {
          return this._aplQ;
        }
        /**
         * Add a new apply-run
         */


        var applyRun = function applyRun() {
          /**
           * Optimization shortcuts.
           * Directly return if a previous run
           * has already elected a leader.
           */
          if (_this2.isLeader) {
            return _util.PROMISE_RESOLVED_TRUE;
          }

          var stopCriteria = false;
          var stopCriteriaPromiseResolve;
          /**
           * Resolves when a stop criteria is reached.
           * Uses as a performance shortcut so we do not
           * have to await the responseTime when it is already clear
           * that the election failed.
           */

          var stopCriteriaPromise = new Promise(function (res) {
            stopCriteriaPromiseResolve = function stopCriteriaPromiseResolve() {
              stopCriteria = true;
              res();
            };
          });

          var handleMessage = function handleMessage(msg) {
            if (msg.context === 'leader' && msg.token != _this2.token) {

              if (msg.action === 'apply') {
                // other is applying
                if (msg.token > _this2.token) {
                  /**
                   * other has higher token
                   * -> stop applying and let other become leader.
                   */
                  stopCriteriaPromiseResolve();
                }
              }

              if (msg.action === 'tell') {
                // other is already leader
                stopCriteriaPromiseResolve();
                _this2.hasLeader = true;
              }
            }
          };

          _this2.broadcastChannel.addEventListener('internal', handleMessage);
          /**
           * If the applyOnce() call came from the fallbackInterval,
           * we can assume that the election runs in the background and
           * not critical process is waiting for it.
           * When this is true, we give the other intances
           * more time to answer to messages in the election cycle.
           * This makes it less likely to elect duplicate leaders.
           * But also it takes longer which is not a problem because we anyway
           * run in the background.
           */


          var waitForAnswerTime = isFromFallbackInterval ? _this2._options.responseTime * 4 : _this2._options.responseTime;

          var applyPromise = _sendMessage(_this2, 'apply') // send out that this one is applying
          .then(function () {
            return Promise.race([(0, _util.sleep)(waitForAnswerTime), stopCriteriaPromise.then(function () {
              return Promise.reject(new Error());
            })]);
          }) // send again in case another instance was just created
          .then(function () {
            return _sendMessage(_this2, 'apply');
          }) // let others time to respond
          .then(function () {
            return Promise.race([(0, _util.sleep)(waitForAnswerTime), stopCriteriaPromise.then(function () {
              return Promise.reject(new Error());
            })]);
          })["catch"](function () {}).then(function () {
            _this2.broadcastChannel.removeEventListener('internal', handleMessage);

            if (!stopCriteria) {
              // no stop criteria -> own is leader
              return beLeader(_this2).then(function () {
                return true;
              });
            } else {
              // other is leader
              return false;
            }
          });

          return applyPromise;
        };

        this._aplQC = this._aplQC + 1;
        this._aplQ = this._aplQ.then(function () {
          return applyRun();
        }).then(function () {
          _this2._aplQC = _this2._aplQC - 1;
        });
        return this._aplQ.then(function () {
          return _this2.isLeader;
        });
      },
      awaitLeadership: function awaitLeadership() {
        if (
        /* _awaitLeadershipPromise */
        !this._aLP) {
          this._aLP = _awaitLeadershipOnce(this);
        }

        return this._aLP;
      },

      set onduplicate(fn) {
        this._dpL = fn;
      },

      die: function die() {
        var _this3 = this;

        this._lstns.forEach(function (listener) {
          return _this3.broadcastChannel.removeEventListener('internal', listener);
        });

        this._lstns = [];

        this._unl.forEach(function (uFn) {
          return uFn.remove();
        });

        this._unl = [];

        if (this.isLeader) {
          this.hasLeader = false;
          this.isLeader = false;
        }

        this.isDead = true;
        return _sendMessage(this, 'death');
      }
    };
    /**
     * @param leaderElector {LeaderElector}
     */

    function _awaitLeadershipOnce(leaderElector) {
      if (leaderElector.isLeader) {
        return _util.PROMISE_RESOLVED_VOID;
      }

      return new Promise(function (res) {
        var resolved = false;

        function finish() {
          if (resolved) {
            return;
          }

          resolved = true;
          leaderElector.broadcastChannel.removeEventListener('internal', whenDeathListener);
          res(true);
        } // try once now


        leaderElector.applyOnce().then(function () {
          if (leaderElector.isLeader) {
            finish();
          }
        });
        /**
         * Try on fallbackInterval
         * @recursive
         */

        var tryOnFallBack = function tryOnFallBack() {
          return (0, _util.sleep)(leaderElector._options.fallbackInterval).then(function () {
            if (leaderElector.isDead || resolved) {
              return;
            }

            if (leaderElector.isLeader) {
              finish();
            } else {
              return leaderElector.applyOnce(true).then(function () {
                if (leaderElector.isLeader) {
                  finish();
                } else {
                  tryOnFallBack();
                }
              });
            }
          });
        };

        tryOnFallBack(); // try when other leader dies

        var whenDeathListener = function whenDeathListener(msg) {
          if (msg.context === 'leader' && msg.action === 'death') {
            leaderElector.hasLeader = false;
            leaderElector.applyOnce().then(function () {
              if (leaderElector.isLeader) {
                finish();
              }
            });
          }
        };

        leaderElector.broadcastChannel.addEventListener('internal', whenDeathListener);

        leaderElector._lstns.push(whenDeathListener);
      });
    }
    /**
     * sends and internal message over the broadcast-channel
     */


    function _sendMessage(leaderElector, action) {
      var msgJson = {
        context: 'leader',
        action: action,
        token: leaderElector.token
      };
      return leaderElector.broadcastChannel.postInternal(msgJson);
    }

    function beLeader(leaderElector) {
      leaderElector.isLeader = true;
      leaderElector.hasLeader = true;
      var unloadFn = (0, _unload.add)(function () {
        return leaderElector.die();
      });

      leaderElector._unl.push(unloadFn);

      var isLeaderListener = function isLeaderListener(msg) {
        if (msg.context === 'leader' && msg.action === 'apply') {
          _sendMessage(leaderElector, 'tell');
        }

        if (msg.context === 'leader' && msg.action === 'tell' && !leaderElector._dpLC) {
          /**
           * another instance is also leader!
           * This can happen on rare events
           * like when the CPU is at 100% for long time
           * or the tabs are open very long and the browser throttles them.
           * @link https://github.com/pubkey/broadcast-channel/issues/414
           * @link https://github.com/pubkey/broadcast-channel/issues/385
           */
          leaderElector._dpLC = true;

          leaderElector._dpL(); // message the lib user so the app can handle the problem


          _sendMessage(leaderElector, 'tell'); // ensure other leader also knows the problem

        }
      };

      leaderElector.broadcastChannel.addEventListener('internal', isLeaderListener);

      leaderElector._lstns.push(isLeaderListener);

      return _sendMessage(leaderElector, 'tell');
    }

    function fillOptionsWithDefaults(options, channel) {
      if (!options) options = {};
      options = JSON.parse(JSON.stringify(options));

      if (!options.fallbackInterval) {
        options.fallbackInterval = 3000;
      }

      if (!options.responseTime) {
        options.responseTime = channel.method.averageResponseTime(channel.options);
      }

      return options;
    }

    function createLeaderElection(channel, options) {
      if (channel._leaderElector) {
        throw new Error('BroadcastChannel already has a leader-elector');
      }

      options = fillOptionsWithDefaults(options, channel);
      var elector = new LeaderElection(channel, options);

      channel._befC.push(function () {
        return elector.die();
      });

      channel._leaderElector = elector;
      return elector;
    }

    var leaderElection = /*#__PURE__*/Object.defineProperty({
    	beLeader: beLeader_1,
    	createLeaderElection: createLeaderElection_1
    }, '__esModule', {value: true});

    var _broadcastChannel = broadcastChannel;

    var _leaderElection = leaderElection;

    var lib = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "BroadcastChannel", {
      enumerable: true,
      get: function get() {
        return _broadcastChannel.BroadcastChannel;
      }
    });
    Object.defineProperty(exports, "OPEN_BROADCAST_CHANNELS", {
      enumerable: true,
      get: function get() {
        return _broadcastChannel.OPEN_BROADCAST_CHANNELS;
      }
    });
    Object.defineProperty(exports, "beLeader", {
      enumerable: true,
      get: function get() {
        return _leaderElection.beLeader;
      }
    });
    Object.defineProperty(exports, "clearNodeFolder", {
      enumerable: true,
      get: function get() {
        return _broadcastChannel.clearNodeFolder;
      }
    });
    Object.defineProperty(exports, "createLeaderElection", {
      enumerable: true,
      get: function get() {
        return _leaderElection.createLeaderElection;
      }
    });
    Object.defineProperty(exports, "enforceOptions", {
      enumerable: true,
      get: function get() {
        return _broadcastChannel.enforceOptions;
      }
    });
    });

    var _index = lib;

    /**
     * because babel can only export on default-attribute,
     * we use this for the non-module-build
     * this ensures that users do not have to use
     * var BroadcastChannel = require('broadcast-channel').default;
     * but
     * var BroadcastChannel = require('broadcast-channel');
     */
    var index_es5 = {
      BroadcastChannel: _index.BroadcastChannel,
      createLeaderElection: _index.createLeaderElection,
      clearNodeFolder: _index.clearNodeFolder,
      enforceOptions: _index.enforceOptions,
      beLeader: _index.beLeader
    };

    class CrossTabCommunicator {
        constructor() {
            this.demoListenerStarted = false;
            this.isNativeBroadcastChannel = typeof BroadcastChannel === 'function';
            window.addEventListener("message", event => {
                const message = event.data;
                if (message.__received__) {
                    return;
                }
                let messageCopy = {
                    ...message
                };
                message.__received__ = true;
                const messageOriginFragments = event.origin.split('//');
                const appDomainAndPort = messageOriginFragments[1];
                if (message.domain !== appDomainAndPort) {
                    return;
                }
                if (message.category === 'IsConnectionReady') {
                    this.clientHost = message.domain;
                    this.clientProtocol = messageOriginFragments[0];
                }
                // FIXME: serialize message if !this.isNativeBroadcastChannel
                this.communicationChannel.postMessage(messageCopy);
            });
            const createChannel = () => {
                this.communicationChannel = new index_es5.BroadcastChannel('clientCommunication', {
                    idb: {
                        onclose: () => {
                            // the onclose event is just the IndexedDB closing.
                            // you should also close the channel before creating
                            // a new one.
                            this.communicationChannel.close();
                            createChannel();
                        },
                    },
                });
                this.communicationChannel.onmessage = (message) => {
                    if (!this.clientHost || message.domain !== this.clientHost) {
                        return;
                    }
                    if (message.__received__) {
                        return;
                    }
                    const messageCopy = { ...message };
                    message.__received__ = true;
                    // FIXME: deserialize message if !this.isNativeBroadcastChannel
                    window.parent.postMessage(messageCopy, this.clientProtocol + '//' + this.clientHost);
                };
            };
            createChannel();
        }
    }
    DEPENDENCY_INJECTION.set(CROSS_TAB_COMMUNCATOR, CrossTabCommunicator);

    IOC.getSync(CROSS_TAB_COMMUNCATOR);

    exports.CROSS_TAB_COMMUNCATOR = CROSS_TAB_COMMUNCATOR;
    exports.CrossTabCommunicator = CrossTabCommunicator;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
//# sourceMappingURL=bundle.js.map
