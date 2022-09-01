import { holdingPattern } from "../to_be_generated/common-tokens";
import { IRepositoryManager } from "./RepositoryManager";

export const REPOSITORY_MANAGER = holdingPattern.token<IRepositoryManager>({
    class: null,
    interface: 'IRepositoryManager',
    token: 'REPOSITORY_MANAGER'
})