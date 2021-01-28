import axios from 'axios';
import router from "../../router";
import {
  apiGetMailingList,
  apiGetChannels,
  apiGetFilters,
  apiGetInterval,
  apiGetEndingTypes, apiGetFiltersScopes, apiGetProjects, apiGetTemplates,
} from '../../services/Api';
import sleep from '../../services/Sleep';
import store from '../index';

export default {
  actions: {

    async getAllData(context) {
      console.log('запуск метода getAllData');
      await apiGetMailingList()
        .then((response) => {
          console.log('%c%s', 'color: red;', 'Окончательно получили данные в apiGetMailingList', response.data);
          const mailings = response ? response.data : {};
          context.commit('updateState', { data: mailings, name: 'mailings' });
        }).catch(async (error) => {
          console.log(error);
          while (store.getters.isLocked) {
            await sleep(500);
          }
        });
      apiGetChannels()
        .then((response) => {
          console.log('%c%s', 'color: red;', 'Окончательно получили данные в apiGetChannels', response.data);
          const channels = response ? response.data : {};
          context.commit('updateState', { data: channels, name: 'channels' });
        });
      apiGetProjects()
        .then((response) => {
          console.log('%c%s', 'color: red;', 'Окончательно получили данные в apiGetProjects', response.data);
          context.commit('setProjectsList', response.data);
        });
      apiGetTemplates()
        .then((response) => {
          console.log('%c%s', 'color: red;', 'Окончательно получили данные в apiGetTemplates', response.data);
          context.commit('updateTemplates', response.data);
        });
      apiGetFilters()
        .then((response) => {
          console.log('%c%s', 'color: red;', 'Окончательно получили данные в apiGetFilters', response.data);
          const filters = response ? response.data : {};
          context.commit('updateState', { data: filters, name: 'filters' });
        });
      apiGetInterval()
        .then((response) => {
          console.log('%c%s', 'color: red;', 'Окончательно получили данные в apiGetInterval', response.data);
          const intervals = response ? response.data : {};
          context.commit('updateState', { data: intervals, name: 'interval' });
        });
      apiGetEndingTypes()
        .then((response) => {
          console.log('%c%s', 'color: red;', 'Окончательно получили данные в apiGetEndingTypes', response.data);
          const endingTypes = response ? response.data : {};
          context.commit('updateState', { data: endingTypes, name: 'endingTypes' });
        });
      apiGetFiltersScopes()
        .then((response) => {
          console.log('%c%s', 'color: red;', 'Окончательно получили данные в apiGetFiltersScopes', response.data);
          const filters = response ? response.data : {};
          context.commit('updateState', { data: filters, name: 'filtersScopes' });
        });
    },
    mailingCreate(context, payload) {
      // context.dispatch('getRefresh');
      const testData = {
        name: payload.name,
        project_id: payload.projectId, // существующий проект
        template_id: payload.templateId, // существующий шаблон
        status: payload.status, // 1 активна, 0 отключена
        comment: 'comment', // комментарий
        channels: payload.channels, // обязательный
        filters: payload.filters,
        event: payload.event,
      };
      axios.post('https://mailing.dev.dengisrazy.ru/mailing/create', testData)
        .then((response) => {
          console.log(response.message);
        })
        .catch((response) => {
          console.log(response.message, 'МУТАТОР');
        });
    },
    mailingEdit(context, payload) {
      context.commit('setEditMailing', payload)
    },
  },
  mutations: {
    updateState(state, payload) {
      state[payload.name] = payload.data;
    },
    updateMailings(state, mailings) { // обновляем список шаблонов
      state.mailings = mailings;
    },
    setEditMailing(state, payload) {
      state.editMailing = payload;
      router.push({path: '/mailing-create' });
    }
  },
  state: {
    mailings: [],
    editMailing: {},
    filtersScopes: [],
    additionMailing: false,
    channels: [],
    endingTypes: {},
  },
  getters: {
    getAllMailings(state) {
      return state.mailings;
    },
    getStatusAdditionallyMailing(state) {
      return state.additionMailing;
    },
    getChannels(state) {
      return state.channels;
    },
    getEndingTypes(state) {
      return state.endingTypes;
    },
    getInterval(state) {
      return state.interval;
    },
    getFiltersScopes(state) {
      return state.filtersScopes;
    },
    getEditMailing(state) {
      return state.editMailing;
    },
  },
};

