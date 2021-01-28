import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/auth/Login';
import Analytics from '@/components/analytics/Analytics';
import Projects from '@/components/projects/Projects';
import Templates from '@/components/templates/Templates';
import Mailing from '@/components/mailing/Mailing';
import MailingCreate from '@/components/mailing/MailingCreate';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/analytics',
      name: 'Analytics',
      component: Analytics,
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
    },
    {
      path: '/templates',
      name: 'Templates',
      component: Templates,
    },
    {
      path: '/mailing',
      name: 'Mailing',
      component: Mailing,
    },

    {
      path: '/mailing-create',
      name: 'MailingCreate',
      component: MailingCreate,
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (this.$store.getters.isLogin) {
      // todo разобраться с неавторизованным доступом
      console.log(this.$store.getters.isLogin, 'бля');
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});
export default router;

