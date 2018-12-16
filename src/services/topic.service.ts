import * as Parse from './parse'
import { Topic } from '../models/index'

export function getTopicBySource (sourceId: string) {
  return Parse.cloud('listTopic', { perPage: 1000 }).then(res => {
    console.log(res)
    var data = Parse.deserializeArray<Topic>(Topic, Parse.toJSON(res.data))
    return Promise.resolve(data)
  }).catch(err => {
    return Promise.reject(err)
  })
}

export const TopicService = {
  getTopicBySource
}
