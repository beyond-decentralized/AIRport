/**
 * Created by papa on 7/12/17.
 */
import {CascadeType} from '@airport/ground-control'


export interface IDbConfig {
	name: string;
	currentVersion: string;
	versions?: IDbVersion[];
	dependingUpon: IDbConfig[];
	dependants: IDbConfig[];
}

export interface IDbVersion {
	version: string;
	tables: IDbTable[];
}

export interface IDbOperation {
	ADDED,
	MODIFIED,
	REMOVED
}

export interface IDbObject {
	operation: IDbOperation;
	oldName?: string;
}

export interface IDbTable
	extends IDbObject {
	columns?: IDbColumn[];
	ids?: string[];
	indexes?: IDbIndex[];
	local?: boolean;
	name: string;
	primaryKey?: string[];
	relations?: IDbRelation[];
}

export interface IDbIndex
	extends IDbObject {
	columns?: string[];
	name: string;
	unique?: boolean;
}

export interface IDbColumn
	extends IDbObject {
	name: string;
}

export interface IDbRelation
	extends IDbObject {
	cascade: CascadeType;
	columns?: IDbRelationColumn[];
	foreignKey?: string;
	mappedBy?: string;
	name: string;
	table?: string;
	type?: IDbRelationType;
}

export interface IDbRelationType {
	MANY_TO_ONE,
	ONE_TO_MANY
}

export interface IDbRelationColumn {
	column: string;
	referencedColumn: string;
}

