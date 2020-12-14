import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
import getMenuRouter from '../utils/permission';

Vue.use(VueRouter);

const asyncRouterMap = [{
  path: '/product',
  name: 'Product',
  component: Home,
  meta: {
    title: '商品',
    hidden: false,
    icon: 'inbox',
  },
  children: [{
    path: 'list',
    name: 'ProductList',
    meta: {
      title: '商品列表',
      hidden: false,
      icon: 'unordered-list',
    },
    component: () => import('../views/pages/productList.vue'),
  }, {
    path: 'add',
    name: 'ProductAdd',
    meta: {
      title: '添加商品',
      hidden: false,
      icon: 'shopping-cart',
    },
    component: () => import('../views/pages/productAdd.vue'),
  }, {
    path: 'category',
    name: 'Category',
    meta: {
      title: '类目管理',
      hidden: false,
      icon: 'setting',
    },
    component: () => import('../views/pages/category.vue'),
  }],
}];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    meta: {
      title: '首页',
      hidden: false,
      icon: 'home',
    },
    children: [{
      path: 'index',
      name: 'Index',
      meta: {
        title: '统计',
        hidden: false,
        icon: 'line-chart',
      },
      component: () => import('../views/pages/index.vue'),
    }],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true,
    },
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});

let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.username && store.state.user.appkey && store.state.user.role) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRouter(store.state.user.role, asyncRouterMap);
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          next();
        });
        isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
