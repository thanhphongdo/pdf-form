import { JsonObject, JsonProperty, JsonCustomConvert, JsonConvert, JsonConverter, OperationMode, ValueCheckingMode } from 'json2typescript'
import { DateConverter, ParseObeject, PointerConverter } from './global'

@JsonObject('Source')
export class Source extends ParseObeject {
    @JsonProperty('name', String)
    name?: String = undefined;
}
