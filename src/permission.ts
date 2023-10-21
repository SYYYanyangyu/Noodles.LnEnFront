import router from '@/router'
import setting from './settings'
//@ts-ignore
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
//获取用户相关的小仓库内部token数据,去判断用户是否登录
//获取用户相关的小仓库内部token数据,去判断用户是否登录成功
import useUserStore from './store/modules/user'
import pinia from './store'
const userStore = useUserStore(pinia)

// 全局路由 ： 项目当前任意触发路由切换都会触发狗子
//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
    document.title = `${setting.title} - ${to.meta.title}`
    // to and from are both route objects. must call `next`.
    nprogress.start();
    //获取token,去判断用户登录、还是未登录
    const token = userStore.token;
    //获取用户名字
    const username = userStore.userName;
    if (!token) {
        //用户未登录判断
        if (to.path == '/login') {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.path } })
        }
    }
    //登录成功,访问login,不能访问,指向首页
    if (to.path != '/login') {
        //登录成功访问其余六个路由(登录排除)
        //有用户信息 
        if (!username) {
            try {
                //获取用户信息
                const result = await userStore.userInfo()

                console.log(result)
                //放行
                //万一:刷新的时候是异步路由,有可能获取到用户信息、异步路由还没有加载完毕,出现空白的效果
                //next({ ...to })
                next()
            }
            catch (error) {
                //token过期:获取不到用户信息了
                //用户手动修改本地存储token
                //退出登录->用户相关的数据清空
                await userStore.userLogout()
                next({ path: '/login', query: { redirect: to.path } })
            }
        }
        next();
    }
    next({ path: '/' });
})

//全局后置守卫
router.afterEach((to: any, from: any) => {
    nprogress.done();
});