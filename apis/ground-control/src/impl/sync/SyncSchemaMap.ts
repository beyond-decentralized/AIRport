import {DbEntity}      from "../../lingo/schema/Entity";
import {SchemaMap}     from "../query/SchemaMap";
import {TableMap}      from "../query/TableMap";
import {SyncColumnMap} from "./SyncColumnMap";
import {SyncTableMap}  from "./SyncTableMap";

export class SyncSchemaMap extends SchemaMap {

	constructor(
		schemaMap?: { [schemaIndex: string]: TableMap }
	) {
		super(schemaMap);
	}

	ensureEntity(
		entity: DbEntity,
		allColumns: boolean = false
	): SyncColumnMap {
		return super.ensureEntity(entity, allColumns, SyncTableMap);
	}

	intersects(
		schemaMap: SchemaMap
	): boolean {
		for (const schemaIndex in this.schemaMap) {
			if (schemaMap.schemaMap[schemaIndex]) {
				const syncTableMap = new SyncTableMap(parseInt(schemaIndex), this.schemaMap[schemaIndex].tableMap);
				if (syncTableMap.intersects(schemaMap.schemaMap[schemaIndex])) {
					return true;
				}
			}
		}
		return false;
	}

}