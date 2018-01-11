import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Register from '@/components/register'
import User from '@/components/user'
import EditUser from '@/components/editUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home,
      redirect: to => {
        return 'user';
      },
      children: [{
        path: 'user',
        component: User,
        children: [{
          name: 'editUser',
          path: 'editUser',
          component: EditUser,
          beforeEnter: (to, from, next) => {
            if(!to.params.info) {
              next('/user');
            } else {
              next();
            }
          }
        }]
      }]
    }, {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
