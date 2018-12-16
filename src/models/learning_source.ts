import { JsonObject, JsonProperty, JsonCustomConvert, JsonConvert, JsonConverter, OperationMode, ValueCheckingMode } from 'json2typescript'
import { DateConverter, ParseObeject, PointerConverter } from './global'
import { User } from './user'
import { Topic } from './topic'
import { Level } from './level'
import { Source } from './source'

@JsonObject('LearningSource')
export class LearningSource extends ParseObeject {
    @JsonProperty('user', PointerConverter)
    user: User| any = undefined;

    @JsonProperty('source', PointerConverter)
    source: Source | any = undefined;

    @JsonProperty('topic', PointerConverter)
    topic: Topic | any = undefined;

    @JsonProperty('level', PointerConverter)
    level: Level | any = undefined;
}
