<template>
  <section class="mailing">
    <ul class="mailing__list">
      <li class="mailing__item" v-for="(item, index) in this.items" :key="index">
        <div class="mailing__container">
          <p class="mailing__item-name">{{ item.name }}</p>
          <div class="mailing__item-wrapper">
            <p class="mailing__item-value">{{ item.value }}</p>
            <p class="mailing__item-logo">
              <img :src="`/static/images/icons/${item.logo}`"/>
            </p>
          </div>
        </div>
        <button class="mailing__item-btn">Выбрать</button>
      </li>
    </ul>
  </section>

</template>

<script>
export default {
  props: {
    items: Array,
  },
  name: 'MailingType',
  mounted() {
    this.items.map((item) => {
      console.log(item);
    });
  },
};
</script>

<style type="scss" scoped>
.mailing {
  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  &__container {
    padding: 20px;
  }


  &__item {
    border-radius: 10px;
    width: 100%;
    //max-width: 279px;

    &:not(:nth-of-type(1)) {
      margin-left: 38px;
    }

    &-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &:nth-of-type(1) {
      background-color: #FFD5A9;

      .mailing__item-btn {
        background-color: #C7925A;
      }

      .mailing__item-value {
        color: #80490F;
      }
    }

    &:nth-of-type(2) {
      background-color: #C9DEFF;

      .mailing__item-btn {
        background-color: #7DA3DE;
      }

      .mailing__item-value {
        color: #002661;
      }
    }

    &:nth-of-type(3) {
      background-color: #C4EFB5;

      .mailing__item-btn {
        background-color: #84C46E;
      }

      .mailing__item-value {
        color: #1A6500;
      }
    }

    &:nth-of-type(4) {
      background-color: #FDC0C3;

      .mailing__item-btn {
        background-color: #BB565B;
      }

      .mailing__item-value {
        color: #640005;
      }
    }

    &-name {
      font-family: "PoppinsRegular", "Arial", sans-serif;
      font-weight: 500;
      font-size: 18px;
      line-height: 27px;
      color: #000000;
    }

    &-value {
      font-size: 40px;
      line-height: 60px;
      font-family: "PoppinsBold", "Arial", sans-serif;
    }

    &-logo {
      width: 70px;
      height: 70px;
    }

    &-btn {
      border: none;
      font-family: "PoppinsRegular", "Arial", sans-serif;
      border-radius: 0 0 10px 10px;
      font-weight: 600;
      font-size: 14px;
      line-height: 21px;
      color: #FFFFFF;
      width: 100%;
      padding: 8px 0;
    }
  }
}
</style>
