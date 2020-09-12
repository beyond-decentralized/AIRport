import * as ts from 'typescript';
import { EntityCandidateRegistry } from './EntityCandidateRegistry';
/**
 * Created by Papa on 3/26/2016.
 */
export declare const globalCandidateRegistry: EntityCandidateRegistry;
export declare const globalCandidateInheritanceMap: Map<string, string>;
export declare function visitEntityFile(node: ts.Node, path: string): void;
//# sourceMappingURL=EntityDefinitionGenerator.d.ts.map