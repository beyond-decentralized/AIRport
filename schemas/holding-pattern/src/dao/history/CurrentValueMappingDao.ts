import { Injected } from "@airport/direction-indicator";
import { BaseCurrentValueMappingDao } from "../../generated/baseDaos";
import { CurrentValueMapping } from "../../ddl/ddl";

@Injected()
export class CurrentValueMappingDao
    extends BaseCurrentValueMappingDao {

    async find(): Promise<CurrentValueMapping[]> {
        return null
    }



}
