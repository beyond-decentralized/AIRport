import {IDatabaseFacade} from "@airport/air-control";
import {IQueryFacade}    from "@airport/air-control/lib/lingo/core/repository/DatabaseFacade";
import {Token}           from "typedi";
import {IUpdateCache}    from "./core/data/UpdateCache";

export const QueryFacadeToken = new Token<IQueryFacade>();
export const UpdateCacheToken = new Token<IUpdateCache>();
export const EntityManagerToken = new Token<IDatabaseFacade>();
