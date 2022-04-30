var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/air-control';
let CascadeGraphVerifier = class CascadeGraphVerifier {
    verify(root, context) {
        if (!(root instanceof Array)) {
            root = [root];
        }
        // TODO: validate the rules specified in the graph
        // The graph will be defined via a @Save({
        //	...RULES
        //})
        // decorator
        return root;
    }
};
CascadeGraphVerifier = __decorate([
    Injected()
], CascadeGraphVerifier);
export { CascadeGraphVerifier };
//# sourceMappingURL=CascadeGraphVerifier.js.map