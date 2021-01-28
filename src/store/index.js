import createPersistedState from 'vuex-persistedstate';
import Vue from 'vue';
import Vuex from 'vuex';
// модули
import templates from './modules/templates';
import refreshToken from './modules/refreshToken';
import authorization from './modules/authorization';
import projects from './modules/projects';
import mailings from './modules/mailings';
import channels from './modules/channels';
import info from './modules/info';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    templates, refreshToken, authorization, projects, mailings, channels, info
  },
  plugins: [createPersistedState()],
  // actions: {
  //   SAVE_TOKEN: async (context, payload) => {
  //     // let {data} = await Axios.post('http://yourwebsite.com/api/todo');
  //     // context.commit('ADD_TODO', payload);
  //   },
  //   SET_ACCESS_TOKEN: async (context, payload) => {
  //     // let {data} = await Axios.post('http://yourwebsite.com/api/todo');
  //     context.commit('SET_TOKEN', payload);
  //   },
  // },
});
