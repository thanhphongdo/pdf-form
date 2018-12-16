import Vue from 'vue'
import Vuex, { StoreOptions, Action, Getter, Mutation, Module } from 'vuex'
import { Actions } from './enums'
import { Source, Level, Topic, Word, LearningSource } from './models/index'
import * as Service from './services/index'

Vue.use(Vuex)

// export default new Vuex.Store<{
//     source?: Array<Source>,
//     levels: {
//         [sourceId: string]: Array<Level>;
//     };
//     topics: {
//         [sourceId: string]: Array<Topic>;
//     };
//     [key: string]: any;
// }>({
//     state: {
//         source: [],
//         levels: {
//             EoT3y7nabE: []
//         },
//         topics: {
//             EoT3y7nabE: []
//         }
//     },
//     getters: {
//         getLevelBySource: (state) => (sourceID: string) => {
//             return state.levels[sourceID];
//         },
//         getTopicBySource: (state) => (sourceID: string) => {
//             return state.topics[sourceID];
//         }
//     },
//     mutations: {

//     },
//     actions: {
//         setLevelBySource: ({ commit, state }, sourceId) => {
//             if (state.levels[sourceId] && state.levels[sourceId].length) return;
//             Service.LevelService.getLevelBySource(sourceId).then(data => {
//                 state.levels[sourceId] = data;
//             });
//         },
//         setTopicBySource: ({ commit, state }, sourceId) => {
//             if (state.topics[sourceId] && state.topics[sourceId].length) return;
//             Service.TopicService.getTopicBySource(sourceId).then(data => {
//                 state.topics[sourceId] = data;
//             });
//         },
//         selectTopic: ({ commit, state }, { sourceId, levelId }) => {
//             for (var i in state.topics[sourceId]) {
//                 if (state.topics[sourceId][i].id == levelId) {
//                     state.topics[sourceId][i].checked = !state.topics[sourceId][i].checked;
//                     break;
//                 }
//             }
//         }
//     }
// });

export interface ManageDataModule {
	source?: Array<Source>,
	levels: {
		[sourceId: string]: Array<Level>;
	};
	topics: {
		[sourceId: string]: Array<Topic>;
	};
	words: {
		[sourceId: string]: Array<Word>;
	};
	sharedData: {
		currentSource?: string;
		[key: string]: any;
	};
	[key: string]: any;
}

export interface ModuleBInterface {
	countb: number;
}

export interface RootStateInterface {
	manageDataModule: ManageDataModule;
	moduleB: ModuleBInterface;
}

const manageDataModule: Module<ManageDataModule, RootStateInterface> = {
  state: {
    source: [],
    levels: {
      EoT3y7nabE: []
    },
    topics: {
      EoT3y7nabE: []
    },
    words: {
      EoT3y7nabE: []
    },
    sharedData: {
      currentSource: 'EoT3y7nabE'
    }
  },
  getters: {
    getSharedData: (state) => (key: string) => {
      return state.sharedData[key]
    },
    getLevelBySource: (state) => (sourceID: string) => {
      return state.levels[sourceID]
    },
    getTopicBySource: (state) => (sourceID: string) => {
      return state.topics[sourceID]
    },
    getWordBySource: (state) => (sourceID: string) => {
      return state.words[sourceID]
    }
  },
  mutations: {

  },
  actions: {
    setSharedData: ({ commit, state }, { key, value }) => {
      state.sharedData[key] = value
    },
    setLevelBySource: ({ commit, state }, sourceId) => {
      if (state.levels[sourceId] && state.levels[sourceId].length) return
      return Service.LevelService.getLevelBySource(sourceId).then(data => {
        state.levels[sourceId] = data
      })
    },
    setTopicBySource: ({ commit, state }, sourceId) => {
      if (state.topics[sourceId] && state.topics[sourceId].length) return
      return Service.TopicService.getTopicBySource(sourceId).then(data => {
        state.topics[sourceId] = data
      })
    },
    selectTopic: ({ commit, state }, { sourceId, levelId }) => {
      for (var i in state.topics[sourceId]) {
        if (state.topics[sourceId][i].id == levelId) {
          state.topics[sourceId][i].checked = !state.topics[sourceId][i].checked
          break
        }
      }
    },
    setWordBySource: ({ commit, state }, sourceId) => {
      if (state.words[sourceId] && state.words[sourceId].length) return Promise.resolve()
      return Service.WordService.getWordBySource(sourceId).then(data => {
        state.words[sourceId] = data
      })
    },
    selectWord: ({ commit, state }, { word, sourceId }) => {
      state.words[sourceId].forEach(item => {
        if (item.id == word.id) {
          item.checked = true
        }
      })
    }
  }
}

const moduleB: Module<ModuleBInterface, RootStateInterface> = {
  state: { countb: 0 },
  mutations: {
    increment (state) {
      // `state` is the local module state
      state.countb++
    }
  },

  getters: {
    doubleCount (state) {
      return state.countb * 2
    }
  },

  actions: {
    test (context) {
      console.log(context.rootState.manageDataModule.levels)
    }
  }
}

export default new Vuex.Store({
  modules: {
    manageDataModule,
    moduleB
  }
})
