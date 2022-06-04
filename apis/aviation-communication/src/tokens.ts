import { lib } from "@airport/direction-indicator"
import { IRepositoryEntityUtils, RepositoryEntityUtils } from "./RepositoryEntityId"

const aviationCommunication = lib('aviation-communication')

export const REPOSITORY_ENTITY_UTILS = aviationCommunication.token<IRepositoryEntityUtils>({
    class: RepositoryEntityUtils,
    interface: 'IRepositoryEntityUtils',
    token: 'REPOSITORY_ENTITY_UTILS'
})