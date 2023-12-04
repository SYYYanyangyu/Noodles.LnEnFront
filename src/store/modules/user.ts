//创建用户相关的小仓库
import { defineStore } from 'pinia'
// 路由相关
import router from '@/router'
//引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user';
// 登录接口
import type { loginFormData, loginResponseData, userInfoReponseData } from "@/api/user/type";
// 用户状态类型
import type { UserState } from './types/type';
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token';
//引入路由(常量路由)
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes';

// @ts-ignore
import cloneDeep from 'lodash/cloneDeep'

// 异步路由筛选
function filterAsyncRoute(asyncRoute: any, routes: any) {
    return asyncRoute.filter((item: any) => {
        if (routes.includes(item.name)) {
            if (item.children && item.children.length > 0) {
                item.children = filterAsyncRoute(item.children, routes)
            }
            return true
        }
    })
}

//创建用户小仓库
let useUserStore = defineStore('User', {
    //小仓库存储数据地方
    state: (): UserState => {
        return {
            token: GET_TOKEN(),//用户唯一标识token
            menuRoutes: constantRoute,//仓库存储生成菜单需要数组(路由)
            userName: '',
            avatar: '',
        }
    },
    //异步|逻辑的地方
    actions: {
        //用户登录的方法
        async userLogin(data: loginFormData) {
            //登录请求
            let result: loginResponseData = await reqLogin(data);
            //登录请求:成功200->token 
            //登录请求:失败201->登录失败错误的信息
            if (result.code == 200) {
                //pinia仓库存储一下token
                //由于pinia|vuex存储数据其实利用js对象
                let token = "Bearer " + result.data;
                this.token = (token as string);
                //本地存储持久化存储一份
                SET_TOKEN((token as string));
                //能保证当前async函数返回一个成功的promise
                return 'ok';
            } else {
                return Promise.reject(new Error(result.data));
            }
        },
        //获取用户信息方法
        async userInfo() {
            //获取用户信息进行存储仓库当中[用户头像、名字]
            let result: userInfoReponseData = await reqUserInfo();
            //如果获取用户信息成功，存储一下用户信息
            if (result.code == 200) {
                this.userName = result.data.userName;
                this.avatar = "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
                let userAsyncRoute = filterAsyncRoute(
                    cloneDeep(asyncRoute),
                    result.data.routes,
                )
                this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute];[...userAsyncRoute, anyRoute].forEach((route: any) => {
                    router.addRoute(route)
                })
                console.log('this.menuRoutes',this.menuRoutes)
                return 'ok';
            } else {
                console.log("err")
                return Promise.reject(new Error(result.message));
            }
        },
        //退出登录
        async userLogout() {
            // //退出登录请求
            // let result: any = await reqLogout();
            // console.log(result);
            // if (result.code == 200) {
            //     //目前没有mock接口:退出登录接口(通知服务器本地用户唯一标识失效)
            //     this.token = '';
            //     this.userName = '';
            //     this.avatar = '';
            //     REMOVE_TOKEN();
            //     return 'ok';
            // } else {
            //     return Promise.reject(new Error(result.message));
            // }
            this.token = '';
            this.userName = '';
            REMOVE_TOKEN();
            return 'ok';
        }

    },
    getters: {},
})
//对外暴露获取小仓库方法
export default useUserStore;