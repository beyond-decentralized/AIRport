import tsc from 'typescript';
import { getRelativePath } from '../../resolve/pathResolver';
import { projectInterfaces } from '../InterfaceRegistry';
export const currentSchemaApi = {
    apiObjectMap: {}
};
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