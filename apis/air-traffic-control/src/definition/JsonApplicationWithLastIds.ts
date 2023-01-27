import { JsonApplicationWithApi } from "../api/JsonApplicationWithApi";
import { LastIds } from "./LastIds";

export interface JsonApplicationWithLastIds
    extends JsonApplicationWithApi {

    lastIds?: LastIds

}
