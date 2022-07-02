import {
    Entity,
    Id,
    Table
} from '@airport/air-traffic-control'


@Entity()
@Table({
    name: 'TERMINAL_TYPE'
})
export class TerminalType {

    @Id()
    id: number

    name: string

}
