import { BaseSequenceDao, SEQUENCE_DAO } from '@airport/airport-code';
import { container, DI } from '@airport/di';
import { TERMINAL_STORE } from '@airport/terminal-map';
export class SequenceDao extends BaseSequenceDao {
    async findAll(entityIds) {
        const latestSchemaVersionMapByNames = (await container(this).get(TERMINAL_STORE)).getLatestSchemaVersionMapByNames();
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
DI.set(SEQUENCE_DAO, SequenceDao);
//# sourceMappingURL=SequenceDao.js.map