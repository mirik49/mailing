<template>
  <div :class="className">
    <p class="select__label">{{ this.label }}</p>
    <div class="select__wrapper" @click="showItems()" :class="showAllItems ? 'active' : '' ">
      <p v-if="selectedItems || this.editValue" class="select__title" :data-id="id">
        {{
          selectedItems ? selectedItems :
            typeof items[0] === 'object' ? checkActualValueIfItemsObject() : this.editValue
        }}
      </p>
      <p v-else class="select__placeholder" :data-id="id">{{ this.placeholder }}</p>
      <ul class="select__list" v-if="showAllItems">
        <li class="select__item" v-for="(item, index) in this.items" :key="index">
          <p class="select__item-text" @click="(event) =>
         setSelectedItems(event.target.textConten, item, index)">
            {{ typeof items[0] === 'object' ? item.name : item }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: ['items', 'label', 'placeholder', 'id', 'whatReturn', 'editValue'],
  mounted() {
    const app = document.getElementById('app');
    app.addEventListener('click', (event) => {
      const target = event.target;
      const isSelect = target.getAttribute('data-id');
      if (!(parseInt(isSelect) === this.id)) {
        this.showItems(false);
      }
    });
  },
  data() {
    return {
      showAllItems: false,
      selectedItems: '',
      className: 'select',
    };
  },
  methods: {
    checkActualValueIfItemsObject() {
      let valueArr = '';
      this.items.map(el => {
        if (parseInt(el.id) === this.editValue) {
          valueArr = el.name;
        }
      });
      return valueArr;
    },
    showItems(status = null) {
      this.showAllItems = status !== null ? status : !this.showAllItems;
    },
    setSelectedItems(event, selectedItem, index = null) {
      if (typeof this.items[0] === 'object') {
        this.items.map((item) => {
          if (item.id === selectedItem.id) {
            this.selectedItems = item.name;
            this.$emit('setItem', item.id);
            this.showItems();
          }
        });
      } else {
        if (this.whatReturn === 'key') {
          this.selectedItems = selectedItem;
          this.showItems();
          this.$emit('setItem', index);
        } else {
          this.selectedItems = event;
          this.showItems();
          this.$emit('setItem', event);
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../style/components/helpers/select";
</style>
