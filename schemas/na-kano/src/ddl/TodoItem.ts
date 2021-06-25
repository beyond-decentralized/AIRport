import {
    Column,
    Entity,
    ManyToOne,
    Table
} from "@airport/air-control";
import { RepositoryEntity } from "@airport/holding-pattern";
import { TodoList } from "./TodoList";

@Entity()
@Table({ name: 'TODO_ITEM' })
export class TodoItem
    extends RepositoryEntity {

    @Column({ name: 'ASSIGNED_TO' })
    assignedTo: string;

    completed: boolean;

    name: string;

    @ManyToOne()
    todoList: TodoList

}
