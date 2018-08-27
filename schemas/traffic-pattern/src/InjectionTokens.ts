import {Token}                    from 'typedi/Token'
import {ISchemaColumnDao}         from './dao/SchemaColumnDao'
import {ISchemaDao}               from './dao/SchemaDao'
import {ISchemaEntityDao}         from './dao/SchemaEntityDao'
import {ISchemaPropertyColumnDao} from './dao/SchemaPropertyColumnDao'
import {ISchemaPropertyDao}       from './dao/SchemaPropertyDao'
import {ISchemaReferenceDao}      from './dao/SchemaReferenceDao'
import {ISchemaRelationColumnDao} from './dao/SchemaRelationColumnDao'
import {ISchemaRelationDao}       from './dao/SchemaRelationDao'
import {ISchemaVersionDao}        from './dao/SchemaVersionDao'
import {ISchemaVersionDmo}        from './dmo/SchemaVersionDmo'

export const SchemaColumnDaoToken         = new Token<ISchemaColumnDao>()
export const SchemaDaoToken               = new Token<ISchemaDao>()
export const SchemaEntityDaoToken         = new Token<ISchemaEntityDao>()
export const SchemaPropertyColumnDaoToken = new Token<ISchemaPropertyColumnDao>()
export const SchemaPropertyDaoToken       = new Token<ISchemaPropertyDao>()
export const SchemaReferenceDaoToken      = new Token<ISchemaReferenceDao>()
export const SchemaRelationColumnDaoToken = new Token<ISchemaRelationColumnDao>()
export const SchemaRelationDaoToken       = new Token<ISchemaRelationDao>()
export const SchemaVersionDaoToken        = new Token<ISchemaVersionDao>()
export const SchemaVersionDmoToken        = new Token<ISchemaVersionDmo>()