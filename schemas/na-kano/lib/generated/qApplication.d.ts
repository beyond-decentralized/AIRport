import { QApplication as AirportQApplication } from '@airport/air-control';
import { DbApplication, EntityId } from '@airport/ground-control';
import { QTodoItem } from './qtodoitem';
import { QTodoList } from './qtodolist';
export interface LocalQApplication extends AirportQApplication {
    db: DbApplication;
    TodoItem: QTodoItem;
    TodoList: QTodoList;
}
export declare const Q_APPLICATION: LocalQApplication;
export declare const Q: LocalQApplication;
export declare function diSet(dbEntityId: EntityId): boolean;
export declare function duoDiSet(dbEntityId: EntityId): boolean;
//# sourceMappingURL=qApplication.d.ts.map