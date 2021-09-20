import { DI } from "@airport/di";
import { BaseChildDao } from "../generated/baseDaos";
import { CHILD_DAO } from "../server-tokens";

export interface IChildDao {

}

export class ChildDao
    extends BaseChildDao
    implements IChildDao {

}
DI.set(CHILD_DAO, ChildDao)