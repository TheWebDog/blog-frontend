import Vue from 'vue'
import Vuex from 'vuex'

// 没啥大用的store 空的
import { headerStore } from './components/header'
import { footerStore } from './components/footer'
import { asideStore } from './components/aside'
import { articleStore } from './components/article'
import { loginStore } from './components/login'
import { managerStore } from './components/manager'
import { aboutMeStore } from './components/aboutMe'
import { UserStore } from './components/user'

// 有用的store
import { writingStore } from './components/writing'
import { listStore } from './components/list'
import { articleClassifyStore } from './components/articleClassify'
import { ArticleManagementStore } from './components/articleManagement'
import { CommentManagementStore } from './components/commentManagement'
import { UserManagementStore } from './components/userManagement'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isRouterAlive: true, // 用于刷新writing页面的state
    isRouterAliveTimeout: null,
    screenWidth: null,
    activeFinish: false, // 用于记录依赖的异步操作是否完成
  },
  getters: {
    //每一个getters的函数都可以接受一个state参数
    getDoubleCount: function (state) {
      return state.screenWidth
    },
    getActiveFinish: function (state) {
      return state.activeFinish
    },
  },
  mutations: {
    // 修改state的唯一方式  定义的函数接受的参数：1、state  2、自定义的参数
    increment(state) {
      // 用于刷新writing页面的方法
      state.isRouterAlive = false
      state.isRouterAliveTimeout = null
      state.isRouterAliveTimeout = setInterval(() => {
        state.isRouterAlive = true
      }, 1)
    },
    upDateScreenWidth(state, num) {
      state.screenWidth = num
    },
    ActiveIsFinish(state) {
      state.activeFinish=true
    },
    ActiveFinishReset (state) {
      state.activeFinish=false
    }
  },
  modules: {
    writingStore,
    listStore,
    articleClassifyStore,
    ArticleManagementStore,
    CommentManagementStore,
    UserManagementStore,
    UserStore,

    headerStore,
    footerStore,
    asideStore,
    articleStore,
    loginStore,
    managerStore,
    aboutMeStore,
  },
})

export default store
