import { JsonObject, JsonProperty, JsonCustomConvert, JsonConvert, JsonConverter, OperationMode, ValueCheckingMode } from 'json2typescript'
import { DateConverter, ParseObeject, PointerConverter } from './global'
import { Source } from './source'

@JsonObject('Topic')
export class Topic extends ParseObeject {
    @JsonProperty('name', String)
    name?: String = undefined;

    @JsonProperty('source', PointerConverter)
    source?: Source = undefined;

    checked?: boolean = false;
}
