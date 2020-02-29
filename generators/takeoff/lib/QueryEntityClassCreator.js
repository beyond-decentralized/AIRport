import { orderSchemasInOrderOfPrecedence, setQSchemaEntities } from '@airport/air-control';
import { DI } from '@airport/di';
import { QUERY_ENTITY_CLASS_CREATOR } from './tokens';
export class QueryEntityClassCreator {
    createAll(schemas, airDb) {
        const schemasToCreate = orderSchemasInOrderOfPrecedence(schemas);
        schemasToCreate.map(dbSchema => this.create(dbSchema, airDb));
    }
    create(dbSchema, airDb) {
        let qSchema = airDb.QM[dbSchema.name];
        // If the Schema API source has already been loaded
        if (qSchema) {
            qSchema.__dbSchema__ = dbSchema;
        }
        else {
            qSchema = {
                __constructors__: {},
                __qConstructors__: {},
                __dbSchema__: dbSchema,
                name: dbSchema.name,
                domain: dbSchema.domain.name
            };
            airDb.QM[dbSchema.name] = qSchema;
        }
        airDb.Q[dbSchema.index] = qSchema;
        setQSchemaEntities(dbSchema, qSchema, airDb.qSchemas);
        return qSchema;
    }
}
DI.set(QUERY_ENTITY_CLASS_CREATOR, QueryEntityClassCreator);
//# sourceMappingURL=QueryEntityClassCreator.js.map