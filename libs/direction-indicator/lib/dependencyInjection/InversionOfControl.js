import { DEPENDENCY_INJECTION } from "./Container";
export class InversionOfControl {
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
//# sourceMappingURL=InversionOfControl.js.map