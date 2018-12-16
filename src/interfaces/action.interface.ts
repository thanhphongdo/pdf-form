import { Level, Topic, Word } from '../models/index'

export interface SetSharedData {
	(key: string, value: any): void;
}

export interface SetLevelBySource {
	(sourceId: string): Promise<Level[]>;
}

export interface SetTopicBySource {
	(sourceId: string): Promise<Topic[]>;
}

export interface SetWordBySource {
	(sourceId: string): Promise<Array<Word>>;
}
