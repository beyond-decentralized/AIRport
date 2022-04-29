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
//# sourceMappingURL=CascadeGraphVerifier.js.map