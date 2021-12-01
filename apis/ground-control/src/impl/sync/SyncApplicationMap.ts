import {DbEntity}      from "../../lingo/application/Entity";
import {ApplicationMap}     from "../query/ApplicationMap";
import {TableMap}      from "../query/TableMap";
import {SyncColumnMap} from "./SyncColumnMap";
import {SyncTableMap}  from "./SyncTableMap";

export class SyncApplicationMap extends ApplicationMap {

	constructor(
		applicationMap?: { [applicationIndex: string]: TableMap }
	) {
		super(applicationMap);
	}

	ensureEntity(
		entity: DbEntity,
		allColumns: boolean = false
	): SyncColumnMap {
		return super.ensureEntity(entity, allColumns, SyncTableMap);
	}

	intersects(
		applicationMap: ApplicationMap
	): boolean {
		for (const applicationIndex in this.applicationMap) {
			if (applicationMap.applicationMap[applicationIndex]) {
				const syncTableMap = new SyncTableMap(parseInt(applicationIndex), this.applicationMap[applicationIndex].tableMap);
				if (syncTableMap.intersects(applicationMap.applicationMap[applicationIndex])) {
					return true;
				}
			}
		}
		return false;
	}

}