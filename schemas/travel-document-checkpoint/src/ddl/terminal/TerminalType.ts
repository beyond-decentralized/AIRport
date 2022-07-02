import {
    Entity,
    Id,
    JoinColumn,
    ManyToOne,
    Table
} from '@airport/air-traffic-control'
import { Type } from '../type/Type'
import { Terminal } from './Terminal'


@Entity()
@Table({
    name: 'TERMINAL_TYPES'
})
export class TerminalType {

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'TERMINAL_ID', referencedColumnName: 'ID' })
    terminal: Terminal

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'TYPE_ID', referencedColumnName: 'ID' })
    type: Type

}
