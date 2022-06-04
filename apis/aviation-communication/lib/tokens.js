import { lib } from "@airport/direction-indicator";
import { RepositoryEntityUtils } from "./RepositoryEntityId";
const aviationCommunication = lib('aviation-communication');
export const REPOSITORY_ENTITY_UTILS = aviationCommunication.token({
    class: RepositoryEntityUtils,
    interface: 'IRepositoryEntityUtils',
    token: 'REPOSITORY_ENTITY_UTILS'
});
//# sourceMappingURL=tokens.js.map