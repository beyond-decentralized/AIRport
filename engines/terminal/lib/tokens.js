import { lib } from '@airport/di';
const terminal = lib('terminal');
export const CASCADE_GRAPH_VERIFIER = terminal.token('CASCADE_GRAPH_VERIFIER');
export const DATABASE_MANAGER = terminal.token('DATABASE_MANAGER');
export const DELETE_MANAGER = terminal.token('DELETE_MANAGER');
export const DEPENDENCY_GRAPH_RESOLVER = terminal.token('DEPENDENCY_GRAPH_RESOLVER');
export const ENTITY_GRAPH_RECONSTRUCTOR = terminal.token('ENTITY_GRAPH_RECONSTRUCTOR');
export const HISTORY_MANAGER = terminal.token('HISTORY_MANAGER');
export const INSERT_MANAGER = terminal.token('INSERT_MANAGER');
export const INTERNAL_RECORD_MANAGER = terminal.token('INTERNAL_RECORD_MANAGER');
export const ONLINE_MANAGER = terminal.token('ONLINE_MANAGER');
export const OPERATION_MANAGER = terminal.token('OPERATION_MANAGER');
export const QUERY_MANAGER = terminal.token('QUERY_MANAGER');
export const REPOSITORY_MANAGER = terminal.token('REPOSITORY_MANAGER');
export const STRUCTURAL_ENTITY_VALIDATOR = terminal.token('STRUCTURAL_ENTITY_VALIDATOR');
export const UPDATE_MANAGER = terminal.token('UPDATE_MANAGER');
//# sourceMappingURL=tokens.js.map