import { JsonObject, JsonProperty, JsonCustomConvert, JsonConvert, JsonConverter, OperationMode, ValueCheckingMode } from 'json2typescript'
import { DateConverter, ParseObeject, PointerConverter } from './global'

@JsonObject('Level')
export class Level extends ParseObeject {
    @JsonProperty('name', String)
    name?: String = undefined;

    @JsonProperty('levelNumber', Number)
    levelNumber?: Number = undefined;
}
