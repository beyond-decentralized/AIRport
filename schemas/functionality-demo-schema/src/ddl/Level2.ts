import {
    Entity,
    GeneratedValue,
    Id,
    JoinColumn,
    ManyToOne
} from "@airport/air-control"
import { Level1 } from "./Level1"

@Entity()
export class Level2 {

    @Id()
    @GeneratedValue()
    id: number

    bool: boolean

    num: number

    str: string

    @ManyToOne({ mappedBy: 'contained' })
    @JoinColumn({ name: 'level1Id', referencedColumnName: 'id' })
    up: Level1

}