"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const SQLWhereBase_1 = require("./SQLWhereBase");
/**
 * Created by Papa on 10/2/2016.
 */
class SQLNoJoinQuery extends SQLWhereBase_1.SQLWhereBase {
    constructor(airportDb, utils, dbEntity, dialect) {
        super(airportDb, utils, dbEntity, dialect);
    }
    getTableFragment(fromRelation) {
        if (!fromRelation) {
            throw `Expecting exactly one table in UPDATE/DELETE clause`;
        }
        if (fromRelation.ri || fromRelation.jt) {
            throw `Table in UPDATE/DELETE clause cannot be joined`;
        }
        const firstDbEntity = this.airportDb.schemas[fromRelation.si][fromRelation.ti];
        if (fromRelation.si !== this.dbEntity.schema.index
            || fromRelation.ti !== this.dbEntity.index) {
            throw `Unexpected table in UPDATE/DELETE clause: '${firstDbEntity.schema.name}.${firstDbEntity.name}', expecting: '${this.dbEntity.schema.name}.${this.dbEntity.name}'`;
        }
        const firstQEntity = new air_control_1.QEntity(firstDbEntity);
        const tableAlias = air_control_1.QRelation.getAlias(fromRelation);
        this.qEntityMapByAlias[tableAlias] = firstQEntity;
        const fromFragment = `\t${this.utils.Schema.getTableName(firstDbEntity)}`;
        return fromFragment;
    }
}
exports.SQLNoJoinQuery = SQLNoJoinQuery;
//# sourceMappingURL=SQLNoJoinQuery.js.map