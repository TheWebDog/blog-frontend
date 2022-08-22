import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
import axios from 'axios'

// 破除导航重复报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/user',
      name: '',
      component: () => {
        return import('./components/user/views/User.vue')
      },
      // 路由守卫 通过帐号权限控制可访问页面
      beforeEnter: (to, from, next) => {
        var token = VueCookies.get('token')
        if (token) {
          next()
          // axios
          // .post('/user/check', {token})
          // .then((res) => {
          //   if (res.data.user) {
          //     next()
          //   } else {
          //     next('/login')
          //   }
          // })
          // .catch((err) => {
          //   console.log(err)
          // })
          
        } else {
          next('/login')
        }

        // next()
        // if (VueCookies.isKey('key')) {
        //   next()
        // } else {
        //   next('/login')
        // }
      },
      children: [
        {
          path: '',
          name: 'userInformation',
          component: () => {
            return import('./components/user/views/userInformation.vue')
          },
        },
        {
          path: 'myReply',
          name: 'myReply',
          component: () => {
            return import('./components/user/views/myReply.vue')
          },
        },
        {
          path: 'myComments',
          name: 'myComments',
          component: () => {
            return import('./components/user/views/myComments.vue')
          },
        },
        {
          path: 'myCollection',
          name: 'myCollection',
          component: () => {
            return import('./components/user/views/myCollection.vue')
          },
        },
        {
          path: 'changeInformation',
          name: 'changeInformation',
          component: () => {
            return import('./components/user/views/changeInformation.vue')
          },
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => {
        return import('./components/login/views/Login.vue')
      },
      // 路由守卫 通过帐号权限控制可访问页面
      beforeEnter: (to, from, next) => {

        var token = VueCookies.get('token')

        if (token) {

          axios
          .post('/user/check', {token})
          .then((res) => {
            // console.log(res.data.user.power)
            if (res.data.user.power < 10) {
              next('/user')
            } else {
              next('/manager')
            }
          })
          .catch((err) => {
            console.log(err)
          })

        } else {

          next()

        }

        // next()
        // if (VueCookies.isKey('key')) {
        //   if (VueCookies.get('key').power < 10) {
        //     // console.log(from,'from')
        //     next('/user')
        //   } else {
        //     next('/manager')
        //   }
        // } else {
        //   next()
        // }
      },
    },
    {
      path: '/manager',
      name: '',
      // 因为当某个路由有子级路由的时候，这时候父级路由需要一个默认的路由，所以父级路由不能定义name属性，解决办法是：即去除父级的name属性
      component: () => {
        return import('./components/manager/views/Manager.vue')
      },
      // 路由守卫 通过帐号权限控制可访问页面
      beforeEnter: (to, from, next) => {
        var token = VueCookies.get('token')

        if (token) {

          axios
          .post('/user/check', {token})
          .then((res) => {
            // console.log(res.data.user.power)
            if (res.data.user.power < 10) {
              next('/user')
            } else {
              next()
            }
          })
          .catch((err) => {
            console.log(err)
          })

        } else {

          next('/login')

        }
      },
      children: [
        {
          path: '',
          name: 'writing',
          component: () => {
            return import('./components/writing/views/Writing.vue')
          },
        },
        {
          path: 'userManagement',
          name: 'userManagement',
          component: () => {
            return import(
              './components/userManagement/views/UserManagement.vue'
            )
          },
        },
        {
          path: 'articleManagement',
          name: 'articleManagement',
          component: () => {
            return import(
              './components/articleManagement/views/ArticleManagement.vue'
            )
          },
        },
        {
          path: 'commentManagement',
          name: 'commentManagement',
          component: () => {
            return import(
              './components/commentManagement/views/CommentManagement.vue'
            )
          },
        },
      ],
    },
    {
      path: '/',
      name: '',
      component: () => {
        return import('./components/Home.vue')
      },
      children: [
        {
          path: '',
          name: '',
          component: () => {
            return import('./components/HomeBody.vue')
          },
        },
        // {
        //   path: 'list',
        //   name: 'list',
        //   component: () => {
        //     return import('./components/list/views/List.vue')
        //   },
        // },
        {
          path: 'articleClassify',
          name: '',
          component: () => {
            return import('./components/articleClassify/views/ArticleClassify.vue')
          },
          children: [
            {
              path: ':id',
              name: ':id',
              component: () => {
                return import('./components/articleClassify/views/ArticleClassify.vue')
              },
            },
          ]
        },
        {
          path: 'search',
          name: 'search',
          component: () => {
            return import('./components/search/views/Search.vue')
          },
          props: true,
        },
        {
          path: 'article/:id',
          name: 'article/:id',
          component: () => {
            return import('./components/article/views/Article.vue')
          },
          props: true,
        },
        {
          path: 'aboutMe',
          name: 'aboutMe',
          component: () => {
            return import('./components/aboutMe/views/AboutMe.vue')
          },
          props: true,
        },

      ],
    },
    {
      path: '*',
      name: 'notFound',
      component: () => {
        return import('./components/the404.vue')
      },
    },
  ],
})


// js的
router.beforeEach(function (to, from, next) {
  // document.title = to.meta.title;
  var title = "Web Dog's Blog"
  document.title = title
  var timer,arr;
  document.addEventListener('visibilitychange', function () {
      // 用户息屏、或者切到后台运行 （离开页面） 
      if (document.visibilityState === 'hidden') {
          clearTimeout(timer);
           arr = [
              'ヾ(￣▽￣)Bye~Bye~',
              '=͟͟͞͞(꒪⌓꒪*)你咋走了',
              '(；′⌒`)记得回来',
              '‎(,,•́ . •̀,,)记得回来',
              '‎(●︎˘͈ ᵕ˘͈)在等你哦',
              '(づ ●─● )づ你别走呀',
              '(ง •̀_•́)ง我在这里',
              '<(｀^´)快点回来',
          ];
          document.title = arr[Math.ceil(Math.random() * 7)];
      }
      // 用户打开或回到页面 
      if (document.visibilityState === 'visible') {
          clearTimeout(timer);
           arr = [
              '⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄你回来辣',
              '(✿◡‿◡)你回来辣',
              '✧ʕ̢̣̣̣̣̩̩̩̩·͡˔·ོɁ̡̣̣̣̣̩̩̩̩✧你回来辣',
              '‎₍˄·͈༝·͈˄₎◞你回来辣',
              '(๑>؂<๑)你回来辣',
              '(づ ●─● )づ你回来辣',
              '(ง •̀_•́)ง你回来辣',
              'ᴗ͈ˬᴗ͈ෆ你回来辣',
              '꒰ᐢ⸝⸝•༝•⸝⸝ᐢ꒱你回来辣',
          ];
          document.title = arr[Math.ceil(Math.random() * 8)];
          timer = setTimeout(function () {
              document.title = title;
          }, 3000);
      }
  });
  next();
});


// ts的
// router.beforeEach((to: any, from, next) => {
//   document.title = to.meta.title;
//   let timer: any;
//   document.addEventListener('visibilitychange', function () {
//     // 用户息屏、或者切到后台运行 （离开页面） 
//     if (document.visibilityState === 'hidden') {
//       clearTimeout(timer)
//       const arr: Array<string> = [
//         'ヾ(￣▽￣)Bye~Bye~',
//         '=͟͟͞͞(꒪⌓꒪*)你咋走了',
//         '(；′⌒`)记得回来',
//         '‎(,,•́ . •̀,,)记得回来',
//         '‎(●︎˘͈ ᵕ˘͈)在等你哦',
//         '(づ ●─● )づ你别走呀',
//         '(ง •̀_•́)ง我在这里',
//         '<(｀^´)快点回来',
//       ]
//       document.title = arr[Math.ceil(Math.random() * 7)]
//     }
//     // 用户打开或回到页面 
//     if (document.visibilityState === 'visible') {
//       clearTimeout(timer)
//       const arr: Array<string> = [
//         '⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄你回来辣',
//         '(✿◡‿◡)你回来辣',
//         '✧ʕ̢̣̣̣̣̩̩̩̩·͡˔·ོɁ̡̣̣̣̣̩̩̩̩✧你回来辣',
//         '‎₍˄·͈༝·͈˄₎◞你回来辣',
//         '(๑>؂<๑)你回来辣',
//         '(づ ●─● )づ你回来辣',
//         '(ง •̀_•́)ง你回来辣',
//         'ᴗ͈ˬᴗ͈ෆ你回来辣',
//         '꒰ᐢ⸝⸝•༝•⸝⸝ᐢ꒱你回来辣',
//       ]
//       document.title = arr[Math.ceil(Math.random() * 8)]
//       timer = setTimeout(() => {
//         document.title = to.meta.title
//       }, 5000)
//     }
//   })


//   next();
// });





export default router