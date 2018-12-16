import { JsonObject, JsonProperty, JsonCustomConvert, JsonConvert, JsonConverter, OperationMode, ValueCheckingMode } from 'json2typescript'
import { DateConverter, ParseObeject, PointerConverter, FileConverter, File } from './global'
import { Source } from './source'
import { Topic } from './topic'
import { Level } from './level'

@JsonObject('Word')
export class Word extends ParseObeject {
	@JsonProperty('text', String)
	text?: String = undefined;

	@JsonProperty('textVi', String)
	textVi?: String = undefined;

	@JsonProperty('topic', PointerConverter)
	topic?: Topic = undefined;

	@JsonProperty('level', PointerConverter)
	level?: Level = undefined;

	@JsonProperty('voiceEn', FileConverter)
	voiceEn: File | any = undefined;

	checked?: boolean = false;
}
