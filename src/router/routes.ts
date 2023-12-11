//对外暴露配置路由(常量路由)
export const constantRoute = [
    {
        //登录
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta: {
            title: '登录',//菜单标题
            hidden: true,//代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
            icon: "Promotion",//菜单文字左侧的图标,支持element-plus全部图标
        }
    }
    ,
    {
        //登录成功以后展示数据的路由
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout',
        meta: {
            title: '',
            hidden: false,
            icon: ''
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'HomeFilled'
                }
            }
        ]
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden: true,
        },
    },
]

export const asyncRoute = [
    {
        path: '/listenadmin',
        component: () => import('@/layout/index.vue'),
        name: 'Category',
        meta: {
            title: '目录管理',
            hidden: false,
            icon: 'Collection',
        },
        redirect: '/listenadmin/category',
        children: [
            {
                path: '/listenadmin/category',
                component: () => import('@/views/listenadmin/category/index.vue'),
                name: "Category",
                meta: {
                    title: '听力管理',
                    hidden: false,
                    icon: 'Headset',
                }
            },
            {
                path: '/listenadmin/album',
                component: () => import('@/views/listenadmin/album/index.vue'),
                name: "Album",
                meta: {
                    title: '专辑管理',
                    hidden: false,
                    icon: 'Flag',
                }
            },
            {
                path: '/listenadmin/episode',
                component: () => import('@/views/listenadmin/episode/index.vue'),
                name: "Episode",
                meta: {
                    title: '片段管理',
                    hidden: false,
                    icon: 'Postcard',
                }
            }
        ]
    },
    {
        path: '/file',
        component: () => import('@/layout/index.vue'),
        name: 'File',
        meta: {
            title: '文件管理',
            hidden: false,
            icon: 'Files',
        },
        redirect: '/file/management',
        children: [
            {
                path: '/file/management',
                component: () => import('@/views/listenadmin/episode/index.vue'),
                name: "Manage",
                meta: {
                    title: '文件预览',
                    hidden: false,
                    icon: 'Management',
                }
            },
            {
                path: '/file/upload',
                component: () => import('@/views/file/upload/index.vue'),
                name: "Upload",
                meta: {
                    title: '文件上传',
                    hidden: false,
                    icon: 'Files',
                }
            },
        ]
    },
]


export const anyRoute = {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
        title: '任意路由',
        hidden: true,
    },
}

