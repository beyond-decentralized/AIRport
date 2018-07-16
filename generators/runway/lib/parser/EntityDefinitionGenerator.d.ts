import { DbSchema } from "@airport/ground-control";
import * as ts from "typescript";
import { Configuration } from "../options/Options";
import { EntityCandidate } from "./EntityCandidate";
import { EntityCandidateRegistry } from "./EntityCandidateRegistry";
export declare const globalCandidateRegistry: EntityCandidateRegistry;
export declare const globalCandidateInheritanceMap: Map<string, string>;
/** Generate documention for all classes in a set of .ts files */
export declare function generateEntityDefinitions(fileNames: string[], options: ts.CompilerOptions, configuration: Configuration, schemaMapByProjectName: {
    [projectName: string]: DbSchema;
}): {
    [entityName: string]: EntityCandidate;
};
