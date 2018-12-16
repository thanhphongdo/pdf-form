import { JsonObject, JsonProperty, JsonCustomConvert, JsonConvert, JsonConverter, OperationMode, ValueCheckingMode } from 'json2typescript'
import { DateConverter, ParseObeject, PointerConverter } from './global'
import { Source } from './source'

@JsonObject('User')
export class User extends ParseObeject {
    @JsonProperty('email', String)
    email?: String = undefined;

    @JsonProperty('sessionToken', String)
    sessionToken?: String = undefined;

    @JsonProperty('username', String)
    username?: String = undefined;
}
