<template>
  <section class="mailing">
    <div class="mailing__wrapper">
      <h1 class="mailing__title">
        Список рассылок
      </h1>
      <Logout/>
    </div>
    <div class="mailing__actions">
      <input id="searchInput" class="mailing__actions-input" type="text" placeholder="Введите название рассылки">
      <label class="mailing__actions-label" for="searchInput"></label>
      <button class="mailing__actions-btn">Поиск</button>
      <router-link to="mailing-create" class="mailing__actions-btn">
        Создать
      </router-link>
    </div>

    <div class="mailing__container">
      <ul class="list__header">
        <li v-for="(item, key) in headerItem" class="list__header-item" :key="key">{{ item }}</li>
      </ul>
      <ul class="list__body" v-for="(mailing, key) in allMailings" :key="key">
        <li class="list__body-item">{{ mailing.id }}</li>
        <li class="list__body-item">{{ mailing.name }}</li>
        <li class="list__body-item">{{ convertTimstampInDate(mailing.event.start_date) }}</li>
        <li class="list__body-item">{{ mailing.project.name }}</li>
        <li class="list__body-item">

          <ul class="list__interior"
              :class="checkClass(mailing.event.interval)">
            <li class="list__interior-item" v-for="(date, key) in mailing.event.interval" :key="key">
              <p v-if="date.date" class="list__interior-val">{{ date.date }}</p>
              <p v-if="date.month" class="list__interior-val">{{ date.month }}</p>
              <p v-if="date.day_of_week" class="list__interior-val">{{ date.day_of_week }}</p>
            </li>
          </ul>
          <p>Время рассылки {{ mailing.event.interval_time }}</p>
        </li>
        <li class="list__body-item">
          <ul class="list__interior">
            <li class="list__interior-item" v-for="(channel, key) in mailing.channels" :key="key"> {{
                channel.name
              }}
            </li>
          </ul>
        </li>
        <li class="list__body-item">{{ correctStatus(mailing.status) }}</li>
        <li class="list__body-item">
          <button @click="setShowMore(key)" class="list__btn-more"
                  :class="showMoreActions.show && showMoreActions.key === key && 'list__btn-more--active'">
            <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line y1="2.5" x2="24" y2="2.5" stroke-width="5"/>
              <line y1="11.5" x2="24" y2="11.5" stroke-width="5"/>
              <line y1="20.5" x2="24" y2="20.5" stroke-width="5"/>
              <rect x="15" y="18" width="9" height="5"/>
              <path d="M18 18L24 18L21 23L18 18Z"/>
            </svg>
          </button>
          <div v-if="showMoreActions.show && showMoreActions.key === key" class="list__actions">
            <button class="list__actions-btn">
              Остановить
            </button>
            <button class="list__actions-btn" @click="getMailingEdit(mailing)">Редактировать</button>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import moment from 'moment';
import { apiGetMailings } from '../../services/Api';
import Logout from '../auth/Logout';

export default {
  name: 'Index',
  components: { Logout },
  data() {
    return {
      allMailings: [],
      headerItem: [
        '№', 'Название рассылки', 'Дата и время создания', 'Проект', 'Повторения', 'Канал', 'Статус', 'Действия',
      ],
      showMoreActions: {
        show: false,
        key: '',
      },
      isDaysExist: { show: false, key: '' },
    };
  },
  methods: {
    convertTimstampInDate(timstampDate) {
      return moment.unix(timstampDate)
        .format('DD MM YYYY hh:mm');
    },
    correctStatus(status) {
      return status === 1 ? 'Включена' : 'Отключена';
    },
    setShowMore(key) {
      this.showMoreActions = { show: !this.showMoreActions.show, key };
    },
    checkClass(interval) {
      const result = [];
      interval.map((date) => {
        if (date.day_of_week !== null) {
          if (result.indexOf('list__interior--days') === -1) {
            result.push('list__interior--days');
          }
        }
      });

      if (interval.length > 3) {
        result.push('list__interior--long');
      }
      return result;
    },
    getMailingEdit(mailing) {
      this.$store.dispatch('mailingEdit', mailing);
    },
  },
  mounted() {
    apiGetMailings()
      .then((response) => {
        this.allMailings = response.data.data;
      });
  },
};
</script>

<style lang="scss">
@import "../../style/components/mailing";
@import "../../style/components/list";
</style>
