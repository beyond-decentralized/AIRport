"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const airport_code_1 = require("@airport/airport-code");
const di_1 = require("@airport/di");
const terminal_map_1 = require("@airport/terminal-map");
class SequenceDao extends airport_code_1.BaseSequenceDao {
    async findAll(entityIds) {
        const latestSchemaVersionMapByNames = (await di_1.container(this).get(terminal_map_1.TERMINAL_STORE)).getLatestSchemaVersionMapByNames();
        const sequences = [];
        for (const [domainName, schemaMapByName] of latestSchemaVersionMapByNames) {
            for (const [schemaName, schemaVersion] of schemaMapByName) {
                for (const entity of schemaVersion.entities) {
                    for (const column of entity.columns) {
                        if (column.isGenerated) {
                            const sequence = {
                                columnIndex: column.index,
                                incrementBy: column.allocationSize ? column.allocationSize : 10000,
                                schemaIndex: schemaVersion.schema.index,
                                tableIndex: entity.index,
                            };
                            sequences.push(sequence);
                        }
                    }
                }
            }
        }
        return sequences;
    }
}
exports.SequenceDao = SequenceDao;
di_1.DI.set(airport_code_1.SEQUENCE_DAO, SequenceDao);
//# sourceMappingURL=SequenceDao.js.map