import * as Parse from './parse'
import { Level, Topic, LearningSource } from '../models/index'

function learnSource (sourceId?: string, levelId?: string, topicIds?: Array<string>):Promise<Array<LearningSource>> {
  return Parse.cloud('learningSource', {
    sourceId,
    levelId,
    topicIds
  }).then(res => {
    var data = Parse.deserializeArray<LearningSource>(LearningSource, Parse.toJSON(res.data))
    return Promise.resolve(data)
  }).catch(err => {
    return Promise.reject(err)
  })
}

export const LearningSourceService = {
  learnSource
}
