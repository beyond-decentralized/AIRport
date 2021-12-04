import { DI } from '@airport/di';
import { CASCADE_GRAPH_VERIFIER } from '../tokens';
export class CascadeGraphVerifier {
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
}
DI.set(CASCADE_GRAPH_VERIFIER, CascadeGraphVerifier);
//# sourceMappingURL=CascadeGraphVerifier.js.map