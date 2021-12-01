import tsc from 'typescript';
import { getRelativePath } from '../../resolve/pathResolver';
import { projectInterfaces } from '../InterfaceRegistry';
export const currentApplicationApi = {
    apiObjectMap: {}
};
/**
 * Detecting interfaces is not really needed as long as interfaces
 * are generated for the API classes.  The interfaces themselves
 * may have class references but those should not make it into the
 * bundle.  The only executable code in the bundle should be
 * the "lib('nameOfLibrary')" and its token definitions.
 *
 * @param node
 * @param path
 * @returns
 */
export function visitInterfaceCandidateFile(node, path) {
    if (node.kind !== tsc.SyntaxKind.InterfaceDeclaration) {
        return;
    }
    const interfaceNode = node;
    // This is a top level class, get its symbol
    const symbol = globalThis.checker.getSymbolAtLocation(interfaceNode.name);
    const interfaceName = interfaceNode.name.escapedText;
    const relativePath = getRelativePath(path);
    let fileInterfaces = projectInterfaces.get(relativePath);
    if (!fileInterfaces) {
        fileInterfaces = new Set();
        projectInterfaces.set(relativePath, fileInterfaces);
    }
    fileInterfaces.add(interfaceName);
}
//# sourceMappingURL=InterfaceDetector.js.map