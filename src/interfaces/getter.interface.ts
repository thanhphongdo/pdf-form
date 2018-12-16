import { Level, Topic } from '../models/index'

export interface GetSharedData {
	(key: string): any;
}

export interface GetLevelBySource {
	(sourceId: string): {
		[sourceId: string]: Array<Level>;
	};
}

export interface GetTopicBySource {
	(sourceId: string): Array<Topic>;
}

export interface GetWordBySource {
	(sourceId: string): Array<Topic>;
}
