import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataForm: [],
    dataFormError: null
  },
  mutations: {
    SET_DATA_FORM(state, data){
      state.dataForm = data
    },
    SET_DATA_ERROR(state, error){
      state.dataFormError = error
    }
  },
  actions: {
    async guardarDaraForm({commit, state}){
      await axios.post('/api/contacto', state.dataForm)
        .then(function (res) {
          console.log(res)
        })
        .catch(error => {
          commit("SET_DATA_ERROR", error)
        })
    }
  },
  modules: {
  }
})
