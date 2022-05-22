import { IApiObject } from '@airport/check-in';
import * as ts from 'typescript';
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
export declare function visitInterfaceCandidateFile(node: ts.Node, path: string): IApiObject;
//# sourceMappingURL=InterfaceDetector.d.ts.map