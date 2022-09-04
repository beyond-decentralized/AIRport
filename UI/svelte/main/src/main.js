"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web_airport_1 = require("@airport/web-airport");
const App_svelte_1 = require("./App.svelte");
(0, web_airport_1.initFramework)().then();
const app = new App_svelte_1.default({
    target: document.body,
    props: {}
});
exports.default = app;
//# sourceMappingURL=main.js.map