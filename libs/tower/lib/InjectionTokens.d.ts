import { IDatabaseFacade } from "@airport/air-control";
import { IQueryFacade } from "@airport/air-control/lib/lingo/core/repository/DatabaseFacade";
import { Token } from "typedi";
import { IUpdateCache } from "./core/data/UpdateCache";
export declare const QueryFacadeToken: Token<IQueryFacade>;
export declare const UpdateCacheToken: Token<IUpdateCache>;
export declare const EntityManagerToken: Token<IDatabaseFacade>;
