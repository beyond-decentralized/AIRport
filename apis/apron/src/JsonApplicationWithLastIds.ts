import { JsonApplicationWithApi } from '@airport/check-in'
import { LastIds } from "./LastIds";

export interface JsonApplicationWithLastIds
    extends JsonApplicationWithApi {

    lastIds?: LastIds

}
