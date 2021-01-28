import axios from 'axios';
import store from '../store';

export function getRefreshToken(context) {
  const DATA = { refresh_token: localStorage.getItem('refreshToken') };
  return api('refresh-token', 'post', {}, DATA, '', context);
}

async function api(url, method, headers = {}, data = {}, responseType) {
  let BASE_URL;
  switch (process.env.NODE_ENV) {
    case 'development':
      BASE_URL = '';
      break;
    case 'production':
      BASE_URL = '';
      break;
    default:
      '';
  }
  return axios.request({

    url: BASE_URL + url,
    method,
    headers,
    responseType,
    data,
  }).then((response) => {
    const realResponse = response || {};
    if (realResponse.status === 200) {
      return response;
    }
  });
}

const getAccessToken =() => {
  return { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } };

export const apiLogin = data => api('login', 'post', { 'Content-Type': 'application/json;' }, data);
export const apiGetMailingList = () => api('mailing', 'get', getAccessToken());
export const apiGetChannels = () => api('channel/all', 'get', getAccessToken());
export const apiGetFilters = () => api('mailing/filter/actions', 'get', getAccessToken());
export const apiGetInterval = () => api('mailing/event/interval', 'get', getAccessToken());
export const apiGetEndingTypes = () => api('mailing/ending/types', 'get', getAccessToken());
export const apiGetFiltersScopes = () => api('mailing/filter/scopes', 'get', getAccessToken());
export const apiGetProjects = () => api('project', 'get', getAccessToken());
export const apiGetTemplates = () => api('template', 'get', getAccessToken());
export const apiGetMailings = () => api('mailing', 'get', getAccessToken());


axios.interceptors.request.use(async (config) => {
  return config;
}, error => Promise.reject(error));


axios.interceptors.response.use((response => response),
  (error) => {
    if (error.request.status === 403) {
      // запросы к api становятся синхронными
      store.dispatch('lockedApiQuery', true);
      getRefreshToken()
        .then((response) => {
          // обновляем токен
          const refreshData = response.data;
          localStorage.setItem('accessToken', refreshData.access_token);
          localStorage.setItem('refreshToken', refreshData.refresh_token);
          const dateNow = Math.round(new Date().getTime() / 1000);
          localStorage.setItem('expires_in', parseInt(refreshData.expires_in, 10) + dateNow);
          // eslint-disable-next-line no-param-reassign
          error.config.headers.Authorization = getAccessToken().Authorization;
          // запросы становятся асинхронными
          store.dispatch('lockedApiQuery', false);
          return axios(error.config);
        });
    }
  });

