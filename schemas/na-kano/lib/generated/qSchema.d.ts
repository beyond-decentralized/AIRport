import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema, EntityId } from '@airport/ground-control';
import { QTodoItem } from './qtodoitem';
import { QTodoList } from './qtodolist';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    TodoItem: QTodoItem;
    TodoList: QTodoList;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
export declare function diSet(dbEntityId: EntityId): boolean;
export declare function duoDiSet(dbEntityId: EntityId): boolean;
//# sourceMappingURL=qSchema.d.ts.map