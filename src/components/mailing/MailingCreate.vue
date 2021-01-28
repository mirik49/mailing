<template>
  <section class="mailing">
    <!--    <div v-if="!this.getStatusAdditionallyMailing" class="mailing__all"> что это-->
    <div v-if="!create" class="mailing__all">
      <div class="header__wrapper">
        <h1 class="header__wrapper-title">
          Список шаблонов
        </h1>
        <Logout/>
        <Info/>
      </div>
      <div class="search__wrapper">
        <Search :values="mailingList"
                placeholder="Введите название рассылки"
                mutation="updateMailings"
                action="getMailings"
                @searched="resetSettings"/>
        <button class="search__wrapper-button green" @click="createMailing">Создать
        </button>
      </div>
      <div class="list__wrapper">
        <div class="list__wrapper-content">
<!--          <ListItems-->
<!--            ref="list_items"-->
<!--            :items="mailingList"-->
<!--            :projects=true-->
<!--            :events=true-->
<!--            :channels=true-->
<!--            :status=true-->
<!--          />-->
        </div>
      </div>
    </div>
    <!--    <div v-if="!this.getStatusAdditionallyMailing" class="mailing__container">-->
    <div v-if="create" class="mailing__container">
      <div class="header__wrapper">
        <h2 class="mailing__title">Добавление рассылки</h2>
        <Info/>
        <Clock/>
        <Logout/>
      </div>
      <div class="mailing__wrapper">
        <div class="mailing__block">
          <div class="mailing__form-input-label">
            <p class="mailing__form-input-text">Условие</p>
            <ul>
              <li v-for="(filter, key) in selectedFilters" :key="key">
                <!--                {{filter.filter_action_id}}-->
                <!--                {{filter.filter_field_id}}-->
                {{ filter.value }}
              </li>

            </ul>
          </div>
          <label class="mailing__form-input-label">
            <p class="mailing__form-input-text">Название рассылки</p>
            <input @input="(event) => setSelectedValue(event.target.value, 'name')"
                   class="mailing__form-input"
                   :value="name"
                   type="text" placeholder="Название рассылки"/>
          </label>
          <Select :items="this.$store.getters.projectsList" :label="'Выбор проекта'" :id="3"
                  :placeholder="'Список проектов'"
                  :editValue="selectedProject"
                  v-on:setItem="(value) => setSelectedValue(value,'selectedProject')"/>
          <Select :items="this.$store.getters.getAllTemplates" :label="'Выбор шаблона'" :id="2"
                  :placeholder="'Список шаблонов'"
                  :editValue="selectedTemplate"
                  v-on:setItem="(value) => setSelectedValue(value,'selectedTemplate')"/>
          <Select :items="status" :label="'Статус'" :placeholder="'Список статусов'" :id="1"
                  :editValue="selectedStatus"
                  v-on:setItem="(value) => setSelectedValue(value,'selectedStatus')"
          />

          <label class="mailing__form-input-label">
            <p class="mailing__form-input-text">Дата начала</p>
            <input
              @input="(event) => setSelectedValue(event.target.value, 'startDate')"
              :value="startDate"
              class="mailing__form-input"
              type="date" placeholder="Дата начала "/>
          </label>
          <!--Выбор типа окончания-->
          <Select :items="this.$store.getters.getEndingTypes"
                  :label="'Выбор типа окончания'"
                  :placeholder="'Выбрать тип окончания'" :id="4"
                  :whatReturn="'key'"
                  v-on:setItem="(value) => setSelectedValue(parseInt(value),'setEndingType')"/>


          <label v-if="setEndingType === 2" class="mailing__form-input-label">
            <p class="mailing__form-input-text">Ввод количества рассылок</p>
            <input v-on:input="(event) => setSelectedValue(event.target.value, 'setEndingValue')"
                   class="mailing__form-input"
                   type="text" placeholder="Количество рассылок"/>
          </label>
          <label v-if="setEndingType === 1" class="mailing__form-input-label">
            <p class="mailing__form-input-text">Дата окончания рассылки</p>
            <input
              v-on:input="(event) => setSelectedValue(parseInt(formatDateToTimeStamp(event.target.value)), 'setEndingValue')"
              class="mailing__form-input"
              type="date" placeholder="Дата начала "/>
          </label>
          <!--Конец выбора типа окончания-->
        </div>
        <div class="mailing__block">
          <div class="mailing__pickers">

            <!--ФИЛЬТР-->
            <div class="mailing__filters">
              <h2 class="mailing__filters-title"
                  @click="() =>this.showFilters = !showFilters"
              >
                Фильтр
              </h2>
              <ul v-if="showFilters">
                <li v-for="filter in this.$store.getters.getFiltersScopes"
                  @click="() => {showFiltersField(filter.id);}"
                >
                  {{ filter.name }}
                  <ul v-if="showFilterFields === filter.id">
                    <li  v-for="fields in filter.fields" @click="setAllFilterData(filter.id, fields.id, fields.name)">
                      <p>{{ fields.id }}</p>
                      <p>{{ fields.name }}</p>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <!--Конец фильтра-->
            <!--            Выбор канала анал отправки-->
            <h4 class="mailing__block-title">Канал отправки</h4>
            <ul>
              <li v-for="(item, index) in this.$store.getters.getChannels" :key="index">
                <label>{{ item.name }}
                  <input @click="selectedChannel(item.id)" type="checkbox">
                </label>
              </li>
            </ul>
            <!--            Конец выбора канала отправки-->
          </div>

          <!--Выбор графика рассылки-->
          <Select :items="this.$store.getters.getInterval" :label="'График рассылки'"
                  :placeholder="'Выбрать график рассылки'" :id="4"
                  :whatReturn="'key'"
                  v-on:setItem="(value) => setSelectedValue(parseInt(value),'selectedInterval')"/>
          <ul class="day-of-week" v-if="selectedInterval === 4">
            <li v-for="day in this.daysOfWeek" class="day-of-week__item"
                @click="setSelectedDaysOfWeek(day)"
                :class="selectedDaysOfWeek.indexOf(day) !== -1 && 'day-of-week__item--selected'"
            >
              {{ day }}
            </li>
          </ul>
          <!--          </div>-->
          <!--          <label v-if="selectedInterval === 2" class="mailing__form-input-label">-->
          <!--            <p class="mailing__form-input-text">ввод количества рассылок</p>-->
          <!--            <input v-on:input="(event) => setSelectedValue(event.target.value, 'event')"-->
          <!--                   class="mailing__form-input"-->
          <!--                   type="text" placeholder="График рассылки"/>-->
          <!--          </label>-->
          <div v-if="selectedInterval === 3" class="mailing__end">
            <div class="mailing__end-date-selector">
              Выбор даты
              <ul class="calendar__months-list">
                <li class="calendar__months-item" v-for="(month, index) in months"
                    :key="index"
                >
                  <p @click="(event) => setSelectedMonth(month, index)"
                     :class="selectedDate.map((date) =>
                            date.hasOwnProperty(month) && 'calendar__months-item--selected'
                       )"
                  >
                    {{ month }}
                  </p>
                  <ul class="calendar__days-list" v-if="index == selectedMonthIndex">
                    <li @click="(event) => setSelectedDays(event, day, month)"
                        class="calendar__days-item"
                        v-for="(day, index) in daysInSelectedMonth" :key="index"
                        :class="selectedDate.map((date) =>
                            date.hasOwnProperty(month) &&
                            date[month].indexOf(day) >= 0 && 'calendar__days-item--selected'
                       )"
                    >
                      {{ day }}
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
<!--          Выбор времени начала рассылка-->
          <label class="mailing__form-input-label">
            <p class="mailing__form-input-text">Время начала рассылки</p>
            <input v-on:input="(event) =>
                       setSelectedValue(event.target.value, 'selectedStartTime')"
                   class="mailing__form-input"
                   type="time"
                   placeholder="Время начала рассылки"/>
          </label>
        </div>
      </div>
      <button class="mailing__submit-btn" @click="submit()">Создать</button>
      <button @click="closeAdditionallyTemplate" class="projects__form-submit red">Назад
      </button>
      {{ outData }}
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import Select from '../helpers/Select';
import Logout from '../auth/Logout';
import Info from '../info/Info';
import Search from '../helpers/Search';
import ListItems from '../templates/ListItems';
import moment from 'moment';
import Clock from '../Clock';

export default {
  name: 'Index',
  components: { Clock, Logout, Select, Search, ListItems, Info },
  data() {
    return {
      name: this.$store.getters.getEditMailing.name || '',
      startYear: 2020,
      // isLocked: this.$store.getters.isLocked,
      create: true,
      selectedEnding: '1',
      years: [],
      selectedYear: '',
      months: [],
      // selectedMonth: "",
      daysInSelectedMonth: [],
      selectedMonthIndex: '',
      selectedYearIndex: '',
      currentDate: '',
      selectedMonth: [],
      selectedDays: [],
      selectedDate: [], // дата из календаря
      status: [{ id: '2', name: 'Отключена' }, { id: '1', name: 'Включена' }],
      preloader: '',
      selectedStatus: this.$store.getters.getEditMailing.status || '',
      templatesList: [],
      selectedTemplate: '',
      selectedProject: this.$store.getters.getEditMailing.project.name || '',
      channels: '',
      event: [],
      selectedChannels: [],
      selectedDaysIndex: '',
      startDate: this.$store.getters.getEditMailing.event.start_date ?
        this.formatTimstampToDate(this.$store.getters.getEditMailing.event.start_date) : '',
      endDate: '',
      showFilters: false,
      showFilterFields: null,
      setEndingValue: '', // ending.value
      intervalType: '', // interval_type
      setEndingType: '', // тип окончания рассылкиe nding.type
      selectedFilters: [],
      // temporaryFilter: {},
      outData: {},
      daysOfWeek: moment.localeData('en')
        .weekdaysShort(),
      selectedDaysOfWeek: [],
      selectedInterval: '',
      selectedStartTime: '',
      editMailing: this.$store.getters.getEditMailing,
    };
  },
  methods: {
    createMailing() {
      this.create = true;
    },
    closeAdditionallyTemplate() {
      this.$store.commit('controlAdditionallyMailing', false);
    },
    resetSettings() {
      this.preloader = '';
    },
    setSelectedValue(value, variable) {
      // this.$set(this.name, value, value);
      this[variable] = value;
      this.show = ' ';
    },
    selectedChannel(id) {
      if (this.selectedChannels.indexOf(id) !== -1) {
        this.selectedChannels = this.selectedChannels.filter(item => item !== id);
      } else {
        this.selectedChannels.push(id);
      }
    },
    setSelectedMonth(month, index) {
      // нужно определить правильное количество дней в месяце
      this.daysInSelectedMonth = moment(`${this.startYear}-${index + 1}`, 'YYYY-MM')
        // это предоставляет сам moment
        .daysInMonth();
      this.selectedMonthIndex = index;
      this.months.map((item) => {
        if (this.selectedDate.length < 12) {
          this.selectedDate.push({ [item]: [] });
        }
      });
    },
    setSelectedDays(event, day, month) {
      this.selectedDate.map((item, key) => {
        if (Object.keys(item)
          .toString() === month) {
          this.selectedDate[key][month].push(day);
        }
      });
      this.$forceUpdate();
    },
    showFiltersField(id) {
      this.showFilterFields = id; // показ фильра по id
    },
    setAllFilterData(filterActionId, filterFieldId, value) {
      const temporaryFilter = {};
      temporaryFilter.filter_action_id = filterActionId;
      temporaryFilter.filter_field_id = filterFieldId;
      temporaryFilter.value = value;
      this.selectedFilters.push(temporaryFilter);
    },
    formatDateToTimeStamp(date) {
      return moment(date)
        .format('X');
    },
    formatTimstampToDate(dateInTimeStamp) {
      // '2020-10-21'
      return moment.unix(dateInTimeStamp).format('YYYY-MM-DD');
    },
    correctMonthArray() {
      const clearMonthArray = [];
      this.selectedDate.map((item, key) => {
        if (item[Object.keys(item)].length > 0) {
          clearMonthArray.push(item);
        }
      });
      return clearMonthArray;
    },
    setSelectedDaysOfWeek(day) {
      const index = this.selectedDaysOfWeek.indexOf(day);
      if (index === -1) {
        this.selectedDaysOfWeek.push(day);
      } else {
        this.selectedDaysOfWeek.splice(index, 1);
      }
    },
    submit() {
      const name = this.name;
      const projectId = this.selectedProject;
      const templateId = this.selectedTemplate;
      const status = this.selectedStatus;
      const channels = this.selectedChannels;
      const filters = this.selectedFilters;
      const event = {
        start_date: parseInt(this.formatDateToTimeStamp(this.startDate)),
        // interval: this.correctMonthArray(),
        interval: this.selectedDaysOfWeek,
        interval_type: this.selectedInterval,
        interval_time: this.selectedStartTime,
        ending: {
          type: this.setEndingType,
          value: this.setEndingValue,
        },
      };
      this.outData = { name, projectId, templateId, status, channels, filters, event };
      this.$store.dispatch('mailingCreate',
        { name, projectId, templateId, status, channels, filters, event });
    },
  },

  computed: mapGetters(['getAllMailings', 'getStatusAdditionallyMailing']),
  beforeUpdate() {

  },
  mounted() {
    moment.locale('en');
    this.months = moment.monthsShort();
    this.currentDate = moment(new Date())
      .format('DD/MM/YYYY');
  },
};
</script>

<style lang="scss">
@import "../../style/components/mailing";
@import "../../style/components/elements/calendar";
@import "../../style/components/elements/day-of-week";
</style>
