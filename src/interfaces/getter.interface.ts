import { Level, Topic } from '../models/index'
import { FormDataInterface } from './qa.interface'

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

export interface GetQAData {
	(id?: any): FormDataInterface | FormDataInterface[]
}
