import { IUtils } from "@airport/air-control";
import { BaseDomainDao, IBaseDomainDao } from "../generated/baseDaos";
export interface IDomainDao extends IBaseDomainDao {
}
export declare class DomainDao extends BaseDomainDao implements IDomainDao {
    constructor(utils: IUtils);
}
