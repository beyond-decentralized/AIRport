import { IRepositoryEntity } from '@airport/holding-pattern';
import { ITodoItem } from './todoitem';
export interface ITodoList extends IRepositoryEntity {
    name?: string;
    items?: ITodoItem[];
}
//# sourceMappingURL=todolist.d.ts.map