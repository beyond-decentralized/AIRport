import {Token}             from "typedi/Token";
import {ISchemaDao}        from "./dao/SchemaDao";
import {ISchemaVersionDao} from "./dao/SchemaVersionDao";

export const SchemaDaoToken = new Token<ISchemaDao>();
export const SchemaVersionDaoToken = new Token<ISchemaVersionDao>();