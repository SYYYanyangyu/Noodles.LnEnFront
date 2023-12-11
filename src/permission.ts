import router from '@/router'
import setting from './settings'

import 'nprogress/nprogress.css'
import pinia from './store'
import useUserStore from './store/modules/user'

let userStore = useUserStore(pinia)
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title + ` | ${setting.title}`
  let token = userStore.token
  let username = userStore.userName
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    }
    else {
      if (username) {
        next()
      }
      else {
        try {
          await userStore.userInfo()
          next({ ...to })
        }
        catch (error) {
          console.log(error)
          //await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    }
    else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
// 全局后置守卫

router.afterEach((route) => {
})
