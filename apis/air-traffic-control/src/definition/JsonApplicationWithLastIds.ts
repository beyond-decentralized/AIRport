import { JsonApplicationWithApi } from "../api/JsonApplicationWithApi";
import { ILastIds } from "./ILastIds";

export interface JsonApplicationWithLastIds
    extends JsonApplicationWithApi {

    lastIds?: ILastIds

}
