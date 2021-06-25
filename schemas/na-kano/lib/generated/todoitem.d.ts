import { IRepositoryEntity } from '@airport/holding-pattern';
import { ITodoList } from './todolist';
export interface ITodoItem extends IRepositoryEntity {
    assignedTo?: string;
    completed?: boolean;
    name?: string;
    todoList?: ITodoList;
}
//# sourceMappingURL=todoitem.d.ts.map