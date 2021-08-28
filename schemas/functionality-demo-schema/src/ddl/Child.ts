import {
    Entity,
    GeneratedValue,
    Id,
    JoinColumn,
    ManyToOne
} from "@airport/air-control"
import { Parent } from "./Parent"

@Entity()
export class Child {

    @Id()
    @GeneratedValue()
    id: number

    bool: boolean

    num: number

    str: string

    @ManyToOne({ mappedBy: 'children' })
    @JoinColumn({ name: 'parentId', referencedColumnName: 'id' })
    parent: Parent

}