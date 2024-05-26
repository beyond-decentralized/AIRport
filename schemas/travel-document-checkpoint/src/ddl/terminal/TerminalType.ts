import { ITerminalType } from '@airport/ground-control'
import {
    Entity,
    Id,
    JoinColumn,
    ManyToOne,
    Table
} from '@airport/tarmaq-entity'
import { Type } from '../type/Type'
import { Terminal } from './Terminal'

/**
 * Types applicable to terminals
 */
@Entity()
@Table({
    name: 'TERMINAL_TYPES'
})
export class TerminalType
    implements ITerminalType {

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'TERMINAL_LID', nullable: false })
    terminal: Terminal

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'TYPE_ID', nullable: false })
    type: Type

}
