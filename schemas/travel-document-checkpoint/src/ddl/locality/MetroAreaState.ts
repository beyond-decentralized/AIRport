import { Entity, Id, JoinColumn, ManyToOne, Table } from "@airport/air-traffic-control";
import { MetroArea } from "./MetroArea";
import { State } from "./State";

@Entity()
@Table({ name: "METRO_AREA_STATES" })
export class MetroAreaState {

    @Id()
    @ManyToOne()
    @JoinColumn({
        name: 'STATE_LID',
        referencedColumnName: 'STATE_LID'
    })
    state: State

    @Id()
    @ManyToOne()
    @JoinColumn({
        name: 'METRO_AREA_LID',
        referencedColumnName: 'METRO_AREA_LID'
    })
    metroArea: MetroArea

}
