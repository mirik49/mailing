<template>
  <div class="logout">
    <p class="logout__label">Светлана С.</p>
    <button class="logout__btn" @click="logout"></button>
  </div>
</template>

<script>
export default {
  name: 'Logout',

  methods: {
    logout() {
      this.$store.commit('isLogin', false);
      this.$store.dispatch('logOut');
    },
  },
};
</script>

<style type="scss">
@import "../../style/components/auth/logout.scss";
</style>
