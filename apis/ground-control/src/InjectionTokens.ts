import {Token}                   from "typedi";
import {ITransactionalConnector} from "./lingo/data/ITransactionalConnector";

export const TransactionalConnectorToken = new Token<ITransactionalConnector>();

export class TestClass {

}