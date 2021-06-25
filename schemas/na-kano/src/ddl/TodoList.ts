import { Entity, OneToMany, Table } from "@airport/air-control";
import { RepositoryEntity } from "@airport/holding-pattern";
import { TodoItem } from "./TodoItem";

@Entity()
@Table({ name: 'TODO_LIST' })
export class TodoList
    extends RepositoryEntity {

    name: string

    @OneToMany({ mappedBy: 'todoList' })
    items: TodoItem[]

}
