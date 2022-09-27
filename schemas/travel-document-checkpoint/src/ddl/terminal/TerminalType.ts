import {
    Entity,
    Id,
    JoinColumn,
    ManyToOne,
    Table
} from '@airport/tarmaq-entity'
import { Type } from '../type/Type'
import { Terminal } from './Terminal'


@Entity()
@Table({
    name: 'TERMINAL_TYPES'
})
export class TerminalType {

    @Id()
    @ManyToOne()
    @JoinColumn({
        name: 'TERMINAL_GUID',
        referencedColumnName: 'GUID'
    })
    terminal: Terminal

    @Id()
    @ManyToOne()
    @JoinColumn({
        name: 'TYPE_ID',
        referencedColumnName: 'TYPE_ID'
    })
    type: Type

}
