import * as Parse from './parse'
import { Level } from '../models/index'

function getLevelBySource (sourceId: string) {
  return Parse.cloud('listLevel', {}).then(res => {
    console.log(res)
    var data = Parse.deserializeArray<Level>(Level, Parse.toJSON(res.data))
    return Promise.resolve(data)
  }).catch(err => {
    return Promise.reject(err)
  })
}

export const LevelService = {
  getLevelBySource
}
