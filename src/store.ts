import Vue from 'vue'
import Vuex, { StoreOptions, Action, Getter, Mutation, Module } from 'vuex'
import { Actions } from './enums'
import { QuestionInterface, AnswerInterface, QAInterface, FormDataInterface } from './interfaces/index'
import * as Service from './services/index'

Vue.use(Vuex)

export interface ManageDataModule {
  formData: Array<FormDataInterface>
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
    formData: []
  },
  getters: {
    getQAData: (state) => (id: any) => {
      if (id) {
        var data = state.formData.filter(item => {
          return item.id == id
        })
        return data[0]
      }
      return state.formData
    }
  },
  mutations: {

  },
  actions: {
    answer: ({ commit, state }, formData: FormDataInterface) => {
      var qaFilter = state.formData.filter(item => {
        return item.id == formData.id
      })
      if (qaFilter.length) {
        qaFilter[0].qa = formData.qa
      } else {
        state.formData.push(formData)
      }
      console.log('xxx')
    }
  }
}

const moduleB: Module<ModuleBInterface, RootStateInterface> = {
  state: { countb: 0 },
  mutations: {

  },

  getters: {

  },

  actions: {

  }
}

export default new Vuex.Store({
  modules: {
    manageDataModule,
    moduleB
  }
})
