import { DbString, Entity, Id } from "@airport/air-traffic-control";

@Entity()
export class Client {

    @Id()
    id: number

    domain: string

    @DbString()
    uuId: string

}
